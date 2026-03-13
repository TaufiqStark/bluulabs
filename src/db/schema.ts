import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  json,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// --- Categories & Tags ---
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
});

// --- Works (Projects) ---
export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  content: json("content"), // For Editor.js block output
  role: varchar("role", { length: 255 }),
  year: varchar("year", { length: 10 }),
  link: varchar("link", { length: 512 }),
  coverImage: varchar("cover_image", { length: 512 }),
  accentColor: varchar("accent_color", { length: 50 }),
  glowColor: varchar("glow_color", { length: 50 }),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Joins for Works
export const worksToCategories = pgTable(
  "works_to_categories",
  {
    workId: integer("work_id")
      .notNull()
      .references(() => works.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.workId, t.categoryId] }),
  })
);

export const worksToTags = pgTable(
  "works_to_tags",
  {
    workId: integer("work_id")
      .notNull()
      .references(() => works.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.workId, t.tagId] }),
  })
);

// --- Experiments ---
export const experiments = pgTable("experiments", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  content: json("content"), // For Editor.js
  techStack: json("tech_stack"), // Array of strings or object representation
  githubUrl: varchar("github_url", { length: 512 }),
  liveUrl: varchar("live_url", { length: 512 }),
  coverImage: varchar("cover_image", { length: 512 }),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Writings (Blog) ---
export const writings = pgTable("writings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: json("content"), // For Editor.js block output
  coverImage: varchar("cover_image", { length: 512 }),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Media ---
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  url: varchar("url", { length: 512 }).notNull(), // Fast.io URL or similar
  mimeType: varchar("mime_type", { length: 50 }),
  size: integer("size"),
  hash: varchar("hash", { length: 64 }), // SHA-256 hash for deduplication
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
