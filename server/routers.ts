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
  createNdaRequest,
  getAllNdaRequests,
  markNdaWebhookSent,
  markNdaProcessed,
  getSiteStyles,
  upsertSiteStyles,
  getAllStylePresets,
  createStylePreset,
  deleteStylePreset,
} from "./db";
import { TRPCError } from "@trpc/server";
import { ENV } from "./_core/env";
import { contactRateLimiter, ndaRateLimiter, getClientIp } from "./rateLimiter";
import { sendContactEmail, sendNdaEmail } from "./email";
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
  findMediaByFilenameAndSize,
  log404,
  getAll404Logs,
  delete404Log,
  clearAll404Logs,
  getAllRedirects,
  createRedirect,
  updateRedirect,
  deleteRedirect,
  createRedirectFrom404,
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "./db";
import {
  getPublishedJobPostings,
  getAllJobPostings,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
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

  // ── Job Postings ──────────────────────────────────────────────────
  jobs: router({
    /** Public: list published job postings */
    published: publicProcedure.query(async () => {
      return getPublishedJobPostings();
    }),

    /** Admin: list all job postings (including drafts) */
    list: adminProcedure.query(async () => {
      return getAllJobPostings();
    }),

    /** Admin: create a new job posting */
    create: adminProcedure
      .input(z.object({
        titleDe: z.string().min(1).max(500),
        titleEn: z.string().max(500).optional(),
        descriptionDe: z.string().min(1),
        descriptionEn: z.string().optional(),
        employmentType: z.string().max(100).optional(),
        department: z.string().max(255).optional(),
        location: z.string().max(255).optional(),
        softgardenUrl: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createJobPosting({
          ...input,
          status: 'draft',
        });
      }),

    /** Admin: update a job posting */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        titleDe: z.string().min(1).max(500).optional(),
        titleEn: z.string().max(500).optional(),
        descriptionDe: z.string().optional(),
        descriptionEn: z.string().optional(),
        employmentType: z.string().max(100).optional(),
        department: z.string().max(255).optional(),
        location: z.string().max(255).optional(),
        softgardenUrl: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateJobPosting(id, data);
        return { success: true };
      }),

    /** Admin: toggle publish status */
    togglePublish: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { getAllJobPostings: getAll } = await import('./db');
        const allJobs = await getAll();
        const job = allJobs.find(j => j.id === input.id);
        if (!job) throw new TRPCError({ code: 'NOT_FOUND' });
        const newStatus = job.status === 'published' ? 'draft' : 'published';
        await updateJobPosting(input.id, {
          status: newStatus,
          publishedAt: newStatus === 'published' ? new Date() : null,
        });
        return { success: true, status: newStatus };
      }),

    /** Admin: delete a job posting */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteJobPosting(input.id);
        return { success: true };
      }),
  }),

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

  // ── Authors ────────────────────────────────────────────────────────────
  authors: router({
    /** Public: list all authors */
    list: publicProcedure.query(async () => {
      return getAllAuthors();
    }),

    /** Public: get author by ID */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getAuthorById(input.id);
      }),

    /** Admin: create author */
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        titleDe: z.string().max(500).optional(),
        titleEn: z.string().max(500).optional(),
        bioDe: z.string().optional(),
        bioEn: z.string().optional(),
        expertiseDe: z.string().optional(),
        expertiseEn: z.string().optional(),
        imageUrl: z.string().optional(),
        url: z.string().max(500).optional(),
        company: z.string().max(255).optional(),
        companyUrl: z.string().max(500).optional(),
        location: z.string().max(255).optional(),
        knowsAbout: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createAuthor(input);
      }),

    /** Admin: update author */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        titleDe: z.string().max(500).nullable().optional(),
        titleEn: z.string().max(500).nullable().optional(),
        bioDe: z.string().nullable().optional(),
        bioEn: z.string().nullable().optional(),
        expertiseDe: z.string().nullable().optional(),
        expertiseEn: z.string().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
        url: z.string().max(500).nullable().optional(),
        company: z.string().max(255).nullable().optional(),
        companyUrl: z.string().max(500).nullable().optional(),
        location: z.string().max(255).nullable().optional(),
        knowsAbout: z.string().nullable().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateAuthor(id, data);
        return { success: true };
      }),

    /** Admin: delete author */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteAuthor(input.id);
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
        authorId: z.number().nullable().optional(),
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
        authorId: z.number().nullable().optional(),
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

   // ── Contact Form ────────────────────────────────────────────
  contact: router({
    /** Public: submit contact form */
    submit: publicProcedure
      .input(z.object({
        salutation: z.string().max(50).optional(),
        title: z.string().max(100).optional(),
        name: z.string().min(1).max(255),
        company: z.string().max(255).optional(),
        email: z.string().email().max(320),
        phone: z.string().max(50).optional(),
        message: z.string().min(1),
        source: z.string().max(100).optional(),
        privacyConsent: z.literal(true, {
          message: 'Die Zustimmung zur Datenschutzerklärung ist erforderlich.',
        }),
        // Honeypot field – must remain empty; bots auto-fill it
        website: z.string().max(500).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Honeypot check: if filled, silently reject (looks like success to the bot)
        if (input.website) {
          console.log(`[Honeypot] Bot detected on contact.submit from IP ${getClientIp(ctx.req)}`);
          return { success: true, id: 0 };
        }

        // Rate limiting: max 5 submissions per 15 minutes per IP
        const clientIp = getClientIp(ctx.req);
        const rateCheck = contactRateLimiter.check(clientIp);
        if (!rateCheck.allowed) {
          const retryMinutes = Math.ceil(rateCheck.retryAfterMs / 60000);
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: `Zu viele Anfragen. Bitte versuchen Sie es in ${retryMinutes} Minute${retryMinutes > 1 ? 'n' : ''} erneut.`,
          });
        }

        const result = await createContactSubmission(input);

        // Send email notification via SMTP
        sendContactEmail({
          salutation: input.salutation,
          title: input.title,
          name: input.name,
          email: input.email,
          company: input.company,
          phone: input.phone,
          message: input.message,
          source: input.source,
        }).catch(err => console.error("[SMTP] Contact email failed:", err));

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

  // ── NDA Requests ───────────────────────────────────────────
  nda: router({
    /** Public: submit NDA request */
    submit: publicProcedure
      .input(z.object({
        salutation: z.string().min(1).max(50),
        firstName: z.string().min(1).max(255),
        lastName: z.string().min(1).max(255),
        company: z.string().min(1).max(255),
        email: z.string().email().max(320),
        topic: z.string().max(500).optional(),
        source: z.string().max(100).optional(),
        privacyConsent: z.literal(true, {
          message: 'Die Zustimmung zur Datenschutzerklärung ist erforderlich.',
        }),
        // Honeypot field – must remain empty; bots auto-fill it
        website: z.string().max(500).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Honeypot check: if filled, silently reject (looks like success to the bot)
        if (input.website) {
          console.log(`[Honeypot] Bot detected on nda.submit from IP ${getClientIp(ctx.req)}`);
          return { success: true, id: 0 };
        }

        // Rate limiting: max 3 submissions per 15 minutes per IP
        const clientIp = getClientIp(ctx.req);
        const rateCheck = ndaRateLimiter.check(clientIp);
        if (!rateCheck.allowed) {
          const retryMinutes = Math.ceil(rateCheck.retryAfterMs / 60000);
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: `Zu viele Anfragen. Bitte versuchen Sie es in ${retryMinutes} Minute${retryMinutes > 1 ? 'n' : ''} erneut.`,
          });
        }

        const result = await createNdaRequest(input);

        // Send NDA notification email via SMTP
        sendNdaEmail({
          salutation: input.salutation,
          firstName: input.firstName,
          lastName: input.lastName,
          company: input.company,
          email: input.email,
          topic: input.topic,
        }).catch(err => console.error("[SMTP] NDA email failed:", err));

        // Trigger webhook if configured
        if (ENV.ndaWebhookUrl) {
          try {
            const webhookPayload = {
              type: 'nda_request',
              id: result.id,
              salutation: input.salutation,
              firstName: input.firstName,
              lastName: input.lastName,
              company: input.company,
              email: input.email,
              topic: input.topic || '',
              timestamp: new Date().toISOString(),
            };
            const resp = await fetch(ENV.ndaWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(webhookPayload),
            });
            if (resp.ok) {
              await markNdaWebhookSent(result.id);
              console.log(`[NDA Webhook] Sent for request ${result.id}`);
            } else {
              console.error(`[NDA Webhook] Failed with status ${resp.status}`);
            }
          } catch (err) {
            console.error('[NDA Webhook] Error:', err);
          }
        } else {
          console.log('[NDA] No webhook URL configured, skipping webhook dispatch');
        }

        return { success: true, id: result.id };
      }),

    /** Admin: list all NDA requests */
    list: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        const { limit = 50, offset = 0 } = input ?? {};
        return getAllNdaRequests(limit, offset);
      }),

    /** Admin: mark NDA as processed */
    markProcessed: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markNdaProcessed(input.id);
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

        // Save all entries – preserve empty strings to allow clearing values
        await bulkUpsertContent(entries.map(e => ({
          contentKey: e.contentKey,
          contentType: e.contentType,
          valueDe: e.valueDe === null ? '' : (e.valueDe ?? ''),
          valueEn: e.valueEn === null ? '' : (e.valueEn ?? ''),
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
          throw new TRPCError({ code: "BAD_REQUEST", message: "Datei zu gro\u00df (max. 50 MB)" });
        }

        // Deduplication: check if a file with same name and size already exists
        const existingDuplicate = await findMediaByFilenameAndSize(input.fileName, buffer.length);
        if (existingDuplicate) {
          console.log(`[Media] Duplicate detected: ${input.fileName} (${buffer.length} bytes) → returning existing id=${existingDuplicate.id}`);
          return { id: existingDuplicate.id, url: existingDuplicate.url };
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

  // ── 404 Not Found Logs ──────────────────────────────────────────────
  notFoundLogs: router({
    /** Public: log a 404 hit (called from the 404 page) */
    log: publicProcedure
      .input(z.object({
        path: z.string().min(1).max(2048),
        referrer: z.string().max(2048).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const userAgent = ctx.req.headers['user-agent'] || undefined;
        const ip = getClientIp(ctx.req);
        await log404({
          path: input.path,
          referrer: input.referrer,
          userAgent,
          ip,
        });
        return { success: true };
      }),

    /** Admin: list all 404 logs */
    list: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(500).default(100),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        const { limit = 100, offset = 0 } = input ?? {};
        return getAll404Logs(limit, offset);
      }),

    /** Admin: delete a single 404 log entry */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await delete404Log(input.id);
        return { success: true };
      }),

    /** Admin: clear all 404 logs */
    clearAll: adminProcedure
      .mutation(async () => {
        await clearAll404Logs();
        return { success: true };
      }),

    /** Admin: create redirect from a 404 log entry */
    createRedirect: adminProcedure
      .input(z.object({
        logId: z.number(),
        targetUrl: z.string().min(1).max(2048),
        statusCode: z.number().refine(v => v === 301 || v === 302).default(301),
      }))
      .mutation(async ({ input }) => {
        return createRedirectFrom404(input.logId, input.targetUrl, input.statusCode);
      }),
  }),

  // ── URL Redirects ──────────────────────────────────────────────────
  redirects: router({
    /** Admin: list all redirects */
    list: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(500).default(100),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        const { limit = 100, offset = 0 } = input ?? {};
        return getAllRedirects(limit, offset);
      }),

    /** Admin: create a new redirect */
    create: adminProcedure
      .input(z.object({
        sourcePath: z.string().min(1).max(2048),
        targetUrl: z.string().min(1).max(2048),
        statusCode: z.number().refine(v => v === 301 || v === 302).default(301),
        note: z.string().max(500).optional(),
      }))
      .mutation(async ({ input }) => {
        return createRedirect(input);
      }),

    /** Admin: update a redirect */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        sourcePath: z.string().min(1).max(2048).optional(),
        targetUrl: z.string().min(1).max(2048).optional(),
        statusCode: z.number().refine(v => v === 301 || v === 302).optional(),
        isActive: z.boolean().optional(),
        note: z.string().max(500).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateRedirect(id, data);
        return { success: true };
      }),

    /** Admin: delete a redirect */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteRedirect(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
