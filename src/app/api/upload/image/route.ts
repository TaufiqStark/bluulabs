import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/db";
import { media } from "@/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

// Initialize the S3 client configured for Filebase
const s3Client = new S3Client({
  region: "us-east-1", // Filebase uses us-east-1 for S3 compatibility
  endpoint: "https://s3.filebase.com",
  credentials: {
    accessKeyId: process.env.FILEBASE_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.FILEBASE_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;
    
    if (!file) {
       return NextResponse.json({ success: 0, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Calculate SHA-256 Hash for deduplication
    const fileHash = crypto.createHash("sha256").update(buffer).digest("hex");
    
    // Check if the file already exists in the Postgres database
    const existingMedia = await db.query.media.findFirst({
      where: eq(media.hash, fileHash),
    });

    if (existingMedia) {
      console.log("Duplicate image detected, skipping S3 upload. Returning existing URL.");
      // Return the exact existing URL, skip S3 upload entirely!
      return NextResponse.json({
        success: 1,
        file: {
          url: existingMedia.url,
        }
      });
    }

    // Build secure filename
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${uuidv4()}.${ext}`;
    
    // Upload object to Filebase bucket
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.FILEBASE_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type || "image/jpeg",
      })
    );
    
    // Fetch the stored object metadata to get the Filebase IPFS CID
    const headResult = await s3Client.send(
      new HeadObjectCommand({
        Bucket: process.env.FILEBASE_BUCKET_NAME,
        Key: filename,
      })
    );
    
    // Filebase injects the CID into the custom metadata headers (x-amz-meta-cid)
    const ipfsCid = headResult.Metadata?.cid;
    
    let fileUrl = "";
    if (ipfsCid) {
       // Use a public gateway. Dedicated gateways (ipfs.filebase.io) require paid plans and will 403 on free tier.
       const gatewayUrl = process.env.NEXT_PUBLIC_FILEBASE_GATEWAY_URL?.replace(/\/$/, "") || "https://dweb.link/ipfs";
       fileUrl = `${gatewayUrl}/${ipfsCid}`;
    } else {
       // Fallback to S3 domain (will return 403 if bucket is private)
       fileUrl = `https://${process.env.FILEBASE_BUCKET_NAME}.s3.filebase.com/${filename}`;
    }

    // Attempt to save metadata to the Postgres database
    try {
      await db.insert(media).values({
        filename: file.name,
        url: fileUrl,
        mimeType: file.type || "image/jpeg",
        size: buffer.length,
        hash: fileHash,
      });
    } catch (dbError) {
      console.error("Database Error! Deleting S3 Object to prevent orphans", dbError);
      
      // Rollback S3 Upload
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.FILEBASE_BUCKET_NAME,
          Key: filename,
        })
      );
      
      return NextResponse.json({ success: 0, message: "Server Database Error. Upload aborted." }, { status: 500 });
    }

    // Return the specific JSON layout expected by Editor.js
    return NextResponse.json({
      success: 1,
      file: {
        url: fileUrl,
      }
    });

  } catch (error) {
    console.error("Error uploading image to Filebase:", error);
    return NextResponse.json({ success: 0, message: "Server error" }, { status: 500 });
  }
}
