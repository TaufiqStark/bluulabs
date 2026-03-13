import { NextResponse } from "next/server";
import { db } from "@/db";
import { works, experiments, writings, categories, tags, media } from "@/db/schema";
import { desc } from "drizzle-orm";

const entityMap: Record<string, any> = {
  work: works,
  works: works,
  experiment: experiments,
  experiments: experiments,
  writing: writings,
  writings: writings,
  category: categories,
  categories: categories,
  tag: tags,
  tags: tags,
  media: media,
};

type Params = Promise<{ entity: string }>;

export async function GET(req: Request, context: { params: Params }) {
  try {
    const { entity } = await context.params;
    const table: any = entityMap[entity.toLowerCase()];

    if (!table) {
      return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
    }

    // Try to order by createdAt if the field exists securely
    // let query = db.select().from(table);
    // if ("createdAt" in table) {
    //   query = query.orderBy(desc(table.createdAt));
    // }
    const query =
      "createdAt" in table
        ? db.select().from(table).orderBy(desc(table.createdAt))
        : db.select().from(table);

    const data = await query;
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching entity`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request, context: { params: Params }) {
  try {
    const { entity } = await context.params;
    const table: any = entityMap[entity.toLowerCase()];

    if (!table) {
      return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
    }

    const body = await req.json();
    
    // Automatically set formatting if required
    if ("updatedAt" in table && body.updatedAt) {
        body.updatedAt = new Date();
    }
    
    // Auto set publishedAt timestamps if needed
    if (entity.toLowerCase() === 'writing' || entity.toLowerCase() === 'writings') {
        if (body.isPublished && !body.publishedAt) {
            body.publishedAt = new Date();
        }
    }
    
    const newItem = await db.insert(table).values(body).returning();
    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error(`Error creating entity`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
