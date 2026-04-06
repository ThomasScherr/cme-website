import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllPresets,
  getPresetById,
  createPreset,
  updatePreset,
  deletePreset,
  setPresetAsDefault,
  clearPresetDefault,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ── Design Presets ──────────────────────────────────────────────────────
  presets: router({
    /** List all presets */
    list: publicProcedure.query(async () => {
      return getAllPresets();
    }),

    /** Get a single preset by ID */
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getPresetById(input.id);
      }),

    /** Create a new preset */
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        responsiveConfig: z.any(),
        isDefault: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createPreset({
          name: input.name,
          responsiveConfig: input.responsiveConfig,
          isDefault: input.isDefault ? 1 : 0,
        });
        return result;
      }),

    /** Update an existing preset */
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        responsiveConfig: z.any().optional(),
        isDefault: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await updatePreset(input.id, {
          name: input.name,
          responsiveConfig: input.responsiveConfig,
          isDefault: input.isDefault !== undefined ? (input.isDefault ? 1 : 0) : undefined,
        });
        return { success: true };
      }),

    /** Delete a preset */
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePreset(input.id);
        return { success: true };
      }),

    /** Set a preset as the default (unsets all others) */
    setDefault: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await setPresetAsDefault(input.id);
        return { success: true };
      }),

    /** Remove default status from a preset */
    clearDefault: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await clearPresetDefault(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
