import { COOKIE_NAME, SITE_ACCESS_COOKIE } from "@shared/const";
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
  getSiteStyles,
  upsertSiteStyles,
  getAllStylePresets,
  createStylePreset,
  deleteStylePreset,
} from "./db";
import { TRPCError } from "@trpc/server";
import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";
import { generateSeoContent } from "./seoGenerator";
import { translateArticle } from "./articleTranslator";
import { batchTranslateFields } from "./contentTranslator";
import { storagePut } from "./storage";
import crypto from "crypto";
import {
  getAllContent,
  getContentByPage,
  getContentByKeys,
  upsertContent,
  bulkUpsertContent,
  deleteContent,
  getAllMedia,
  getMediaByType,
  createMediaItem,
  deleteMediaItem,
  searchMedia,
} from "./db";

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

  // ── Site Access (Password Protection) ─────────────────────────
  siteAccess: router({
    /** Check if password protection is enabled and if user has access */
    check: publicProcedure.query(({ ctx }) => {
      const password = ENV.siteAccessPassword;
      if (!password) return { required: false, granted: true };
      const cookieHeader = ctx.req.headers.cookie || '';
      const cookies = cookieHeader.split(';').reduce((acc, c) => {
        const [k, ...v] = c.trim().split('=');
        if (k) acc[k] = v.join('=');
        return acc;
      }, {} as Record<string, string>);
      const granted = cookies[SITE_ACCESS_COOKIE] === 'granted';
      return { required: true, granted };
    }),

    /** Verify password and set access cookie */
    verify: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(({ ctx, input }) => {
        const password = ENV.siteAccessPassword;
        if (!password) return { success: true };
        if (input.password !== password) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Falsches Passwort' });
        }
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(SITE_ACCESS_COOKIE, 'granted', {
          ...cookieOptions,
          httpOnly: false,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        return { success: true };
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
        const result = await createArticle(input);
        // Trigger async EN translation (non-blocking)
        translateArticle({
          title: input.title,
          excerpt: input.excerpt,
          content: input.content,
          tags: input.tags,
          metaTitle: input.metaTitle,
          metaDescription: input.metaDescription,
        }).then(async (translation) => {
          try {
            await updateArticle(result.id, translation);
            console.log(`[Translation] EN translation saved for article ${result.id}`);
          } catch (err) {
            console.error(`[Translation] Failed to save EN translation for article ${result.id}:`, err);
          }
        }).catch((err) => {
          console.error(`[Translation] Failed to translate article ${result.id}:`, err);
        });
        return result;
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
        // Trigger async EN translation if title or content changed (non-blocking)
        if (input.title || input.content) {
          // Fetch the full article to get all fields for translation
          const fullArticle = await getArticleById(id);
          if (fullArticle) {
            translateArticle({
              title: fullArticle.title,
              excerpt: fullArticle.excerpt || undefined,
              content: fullArticle.content,
              tags: fullArticle.tags || undefined,
              metaTitle: fullArticle.metaTitle || undefined,
              metaDescription: fullArticle.metaDescription || undefined,
            }).then(async (translation) => {
              try {
                await updateArticle(id, translation);
                console.log(`[Translation] EN translation updated for article ${id}`);
              } catch (err) {
                console.error(`[Translation] Failed to save EN translation for article ${id}:`, err);
              }
            }).catch((err) => {
              console.error(`[Translation] Failed to translate article ${id}:`, err);
            });
          }
        }
        return { success: true };
      }),

    /** Admin: delete article */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteArticle(input.id);
        return { success: true };
      }),

    /** Admin: upload cover image to S3 */
    uploadCover: adminProcedure
      .input(z.object({
        fileName: z.string().min(1),
        fileBase64: z.string().min(1),
        mimeType: z.string().refine(
          (v) => ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"].includes(v),
          { message: "Nur Bilder (JPEG, PNG, WebP, GIF, SVG) erlaubt" }
        ),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.fileBase64, "base64");
        // Max 10 MB
        if (buffer.length > 10 * 1024 * 1024) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Datei zu groß (max. 10 MB)" });
        }
        const ext = input.fileName.split(".").pop() || "jpg";
        const randomSuffix = crypto.randomBytes(8).toString("hex");
        const fileKey = `insights/covers/${Date.now()}-${randomSuffix}.${ext}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        return { url };
      }),

    /** Admin: generate SEO metadata using OpenAI */
    generateSeo: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await generateSeoContent({
            title: input.title,
            content: input.content,
          });
          return result;
        } catch (err: any) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message || "SEO-Generierung fehlgeschlagen",
          });
        }
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

  // ── Site Styles (Stylesheet Editor) ────────────────────────────
  siteStyles: router({
    /** Public: get current site styles (for applying on every page) */
    get: publicProcedure.query(async () => {
      const result = await getSiteStyles();
      return result ?? null;
    }),

    /** Admin: update site styles */
    update: adminProcedure
      .input(z.object({ styles: z.string() }))
      .mutation(async ({ input }) => {
        await upsertSiteStyles(input.styles);
        return { success: true };
      }),
  }),

  // ── CMS: Site Content ─────────────────────────────────────────────
  cms: router({
    /** Public: get all content (bulk load for frontend) */
    getAll: publicProcedure.query(async () => {
      return getAllContent();
    }),

    /** Public: get content for a specific page */
    getByPage: publicProcedure
      .input(z.object({ pageKey: z.string() }))
      .query(async ({ input }) => {
        return getContentByPage(input.pageKey);
      }),

    /** Public: get content by specific keys */
    getByKeys: publicProcedure
      .input(z.object({ keys: z.array(z.string()) }))
      .query(async ({ input }) => {
        return getContentByKeys(input.keys);
      }),

    /** Admin: update a single content field (with auto-translation) */
    update: adminProcedure
      .input(z.object({
        contentKey: z.string().min(1),
        contentType: z.enum(["text", "richtext", "image", "video"]),
        valueDe: z.string().nullable().optional(),
        valueEn: z.string().nullable().optional(),
        /** Which language was edited (triggers translation to the other) */
        editedLang: z.enum(["de", "en"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { contentKey, contentType, valueDe, valueEn, editedLang } = input;

        // Save the content first
        const result = await upsertContent({
          contentKey,
          contentType,
          valueDe: valueDe ?? undefined,
          valueEn: valueEn ?? undefined,
        });

        // Auto-translate text/richtext if a language was edited
        if (editedLang && (contentType === "text" || contentType === "richtext")) {
          const sourceText = editedLang === "de" ? valueDe : valueEn;
          if (sourceText) {
            const fromLang = editedLang;
            const toLang = editedLang === "de" ? "en" : "de";
            // Non-blocking async translation
            batchTranslateFields({
              fields: { [contentKey]: sourceText },
              fromLang,
              toLang,
              pageContext: contentKey.split(".").slice(0, 2).join(" "),
            }).then(async (translations) => {
              const translated = translations[contentKey];
              if (translated) {
                await upsertContent({
                  contentKey,
                  contentType,
                  valueDe: toLang === "de" ? translated : valueDe ?? undefined,
                  valueEn: toLang === "en" ? translated : valueEn ?? undefined,
                });
                console.log(`[CMS] Auto-translated ${contentKey} ${fromLang}→${toLang}`);
              }
            }).catch((err) => {
              console.error(`[CMS] Auto-translation failed for ${contentKey}:`, err);
            });
          }
        }

        return { success: true, id: result.id };
      }),

    /** Admin: bulk update multiple content fields */
    bulkUpdate: adminProcedure
      .input(z.object({
        entries: z.array(z.object({
          contentKey: z.string().min(1),
          contentType: z.enum(["text", "richtext", "image", "video"]),
          valueDe: z.string().nullable().optional(),
          valueEn: z.string().nullable().optional(),
        })),
        /** Which language was edited (triggers batch translation) */
        editedLang: z.enum(["de", "en"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { entries, editedLang } = input;

        // Save all entries
        await bulkUpsertContent(entries.map(e => ({
          contentKey: e.contentKey,
          contentType: e.contentType,
          valueDe: e.valueDe ?? undefined,
          valueEn: e.valueEn ?? undefined,
        })));

        // Auto-translate text fields if a language was edited
        if (editedLang) {
          const textEntries = entries.filter(
            e => (e.contentType === "text" || e.contentType === "richtext")
          );
          const fieldsToTranslate: Record<string, string> = {};
          for (const entry of textEntries) {
            const sourceText = editedLang === "de" ? entry.valueDe : entry.valueEn;
            if (sourceText) {
              fieldsToTranslate[entry.contentKey] = sourceText;
            }
          }

          if (Object.keys(fieldsToTranslate).length > 0) {
            const fromLang = editedLang;
            const toLang = editedLang === "de" ? "en" : "de";
            // Non-blocking async batch translation
            batchTranslateFields({
              fields: fieldsToTranslate,
              fromLang,
              toLang,
            }).then(async (translations) => {
              const updates = Object.entries(translations).map(([key, translated]) => {
                const original = entries.find(e => e.contentKey === key);
                return {
                  contentKey: key,
                  contentType: (original?.contentType || "text") as "text" | "richtext" | "image" | "video",
                  valueDe: toLang === "de" ? translated : original?.valueDe ?? undefined,
                  valueEn: toLang === "en" ? translated : original?.valueEn ?? undefined,
                };
              });
              await bulkUpsertContent(updates);
              console.log(`[CMS] Batch auto-translated ${updates.length} fields ${fromLang}→${toLang}`);
            }).catch((err) => {
              console.error(`[CMS] Batch auto-translation failed:`, err);
            });
          }
        }

        return { success: true };
      }),

    /** Admin: delete a content entry */
    delete: adminProcedure
      .input(z.object({ contentKey: z.string() }))
      .mutation(async ({ input }) => {
        await deleteContent(input.contentKey);
        return { success: true };
      }),
  }),

  // ── CMS: Media Library ───────────────────────────────────────────
  media: router({
    /** Admin: list all media */
    list: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(200).default(100),
        offset: z.number().min(0).default(0),
        typeFilter: z.string().optional(), // e.g. "image/" or "video/"
      }).optional())
      .query(async ({ input }) => {
        const { limit = 100, offset = 0, typeFilter } = input ?? {};
        if (typeFilter) {
          return getMediaByType(typeFilter, limit);
        }
        return getAllMedia(limit, offset);
      }),

    /** Admin: search media by filename or tags */
    search: adminProcedure
      .input(z.object({ query: z.string().min(1) }))
      .query(async ({ input }) => {
        return searchMedia(input.query);
      }),

    /** Admin: upload a media file to S3 and add to library */
    upload: adminProcedure
      .input(z.object({
        fileName: z.string().min(1),
        fileBase64: z.string().min(1),
        mimeType: z.string().min(1),
        tags: z.string().optional(),
        altText: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.fileBase64, "base64");
        // Max 50 MB for videos
        if (buffer.length > 50 * 1024 * 1024) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Datei zu groß (max. 50 MB)" });
        }
        const ext = input.fileName.split(".").pop() || "bin";
        const randomSuffix = crypto.randomBytes(8).toString("hex");
        const fileKey = `cms/media/${Date.now()}-${randomSuffix}.${ext}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Add to media library
        const result = await createMediaItem({
          url,
          filename: input.fileName,
          mimeType: input.mimeType,
          fileSize: buffer.length,
          tags: input.tags,
          altText: input.altText,
        });

        return { id: result.id, url };
      }),

    /** Admin: delete a media item */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMediaItem(input.id);
        return { success: true };
      }),
  }),

  // ── Style Presets ───────────────────────────────────────────────────
  stylePresets: router({
    /** Admin: list all presets */
    list: adminProcedure.query(async () => {
      return getAllStylePresets();
    }),

    /** Admin: save current styles as a new preset */
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        styles: z.string(),
      }))
      .mutation(async ({ input }) => {
        return createStylePreset(input);
      }),

    /** Admin: delete a preset */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteStylePreset(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
