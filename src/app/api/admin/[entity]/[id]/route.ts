import { NextResponse } from "next/server";
import { db } from "@/db";
import { works, experiments, writings, categories, tags, media } from "@/db/schema";
import { eq } from "drizzle-orm";

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

type Params = Promise<{ entity: string; id: string }>;

export async function GET(req: Request, context: { params: Params }) {
  try {
    const { entity, id } = await context.params;
    const table: any = entityMap[entity.toLowerCase()];

    if (!table) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
    
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });

    const item = await db.select().from(table).where(eq(table.id, numericId));
    
    if (!item.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item[0]);
  } catch (error) {
    console.error(`Error fetching entity`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Params }) {
  try {
    const { entity, id } = await context.params;
    const table: any = entityMap[entity.toLowerCase()];

    if (!table) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
    
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });

    const body = await req.json();
    if ("updatedAt" in table) {
      body.updatedAt = new Date();
    }

    const updatedItem = await db.update(table).set(body).where(eq(table.id, numericId)).returning();
    if (!updatedItem.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updatedItem[0]);
  } catch (error) {
    console.error(`Error updating entity`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const { entity, id } = await context.params;
    const table: any = entityMap[entity.toLowerCase()];

    if (!table) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
    
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });

    const deletedItem = await db.delete(table).where(eq(table.id, numericId)).returning();
    if (!deletedItem.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(`Error deleting entity`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
