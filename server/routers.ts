import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";
import { z } from "zod";
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getPublishedArticles,
  getAllArticles,
  getArticleBySlug,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  createContactSubmission,
  getAllContactSubmissions,
  markContactAsRead,
} from "./db";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./_core/notification";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Categories ──────────────────────────────────────────────────
  categories: router({
    list: publicProcedure.query(async () => {
      return getAllCategories();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getCategoryBySlug(input.slug);
      }),

    create: adminProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        slug: z.string().min(1).max(255),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createCategory(input);
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        slug: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateCategory(id, data);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteCategory(input.id);
        return { success: true };
      }),
  }),

  // ── Articles (Blog / Insights) ────────────────────────────────
  articles: router({
    /** Public: list published articles */
    listPublished: publicProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        categoryId: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        const { limit = 20, offset = 0, categoryId } = input ?? {};
        return getPublishedArticles(limit, offset, categoryId);
      }),

    /** Public: get single article by slug */
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getArticleBySlug(input.slug);
      }),

    /** Admin: list all articles (including drafts) */
    listAll: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        const { limit = 50, offset = 0 } = input ?? {};
        return getAllArticles(limit, offset);
      }),

    /** Admin: get article by ID */
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getArticleById(input.id);
      }),

    /** Admin: create article */
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(1).max(255),
        title: z.string().min(1).max(500),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        coverImage: z.string().optional(),
        author: z.string().default("CME Redaktion"),
        status: z.enum(["draft", "published"]).default("draft"),
        categoryId: z.number().optional(),
        tags: z.string().optional(),
        metaTitle: z.string().max(255).optional(),
        metaDescription: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createArticle(input);
      }),

    /** Admin: update article */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().min(1).max(255).optional(),
        title: z.string().min(1).max(500).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        author: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        categoryId: z.number().nullable().optional(),
        tags: z.string().optional(),
        metaTitle: z.string().max(255).optional(),
        metaDescription: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateArticle(id, data);
        return { success: true };
      }),

    /** Admin: delete article */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteArticle(input.id);
        return { success: true };
      }),
  }),

  // ── Contact Form ──────────────────────────────────────────────
  contact: router({
    /** Public: submit contact form */
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        company: z.string().max(255).optional(),
        email: z.string().email().max(320),
        phone: z.string().max(50).optional(),
        message: z.string().min(1),
        source: z.string().max(100).optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createContactSubmission(input);

        // Notify the owner about the new contact submission
        await notifyOwner({
          title: `Neue Kontaktanfrage von ${input.name}`,
          content: `Name: ${input.name}\nFirma: ${input.company || "-"}\nE-Mail: ${input.email}\nTelefon: ${input.phone || "-"}\nNachricht: ${input.message}`,
        }).catch(err => console.error("[Notification] Failed:", err));

        return { success: true, id: result.id };
      }),

    /** Admin: list all submissions */
    list: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        const { limit = 50, offset = 0 } = input ?? {};
        return getAllContactSubmissions(limit, offset);
      }),

    /** Admin: mark submission as read */
    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markContactAsRead(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
