import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  displayName: text("display_name"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("admin"), // 'master', 'admin'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  aiSummary: text("ai_summary"),
  isPublished: boolean("is_published").default(false).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  authorId: integer("author_id").references(() => users.id),
  
  // SEO Metadata
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  
  // Scheduling
  scheduledAt: timestamp("scheduled_at"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const articleTags = pgTable("article_tags", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").notNull().references(() => articles.id, { onDelete: 'cascade' }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: 'cascade' }),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const trafficAnalytics = pgTable("traffic_analytics", {
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  visitedUrl: text("visited_url").notNull(),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const securityLogs = pgTable("security_logs", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(),
  ipAddress: text("ip_address"),
  details: text("details"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
