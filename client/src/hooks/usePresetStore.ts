/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  CME Preset Store – Persistent via Database (tRPC)                 ║
 * ║                                                                     ║
 * ║  Presets werden in der Datenbank gespeichert und über die tRPC     ║
 * ║  API geladen/gespeichert. Sie bleiben über Deployments, Browser    ║
 * ║  und Geräte hinweg erhalten.                                       ║
 * ║                                                                     ║
 * ║  NICHT ÄNDERN, es sei denn der Benutzer fordert es explizit an.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { trpc } from '@/lib/trpc';
import type { FullResponsiveConfig } from './useResponsiveTokens';

// ── Preset Interface (frontend-facing) ───────────────────────────────────

export interface DesignPreset {
  id: number;
  name: string;
  createdAt: Date;
  isDefault: boolean;
  responsiveConfig: FullResponsiveConfig;
}

// ── Helper: map DB row to frontend preset ────────────────────────────────

function mapDbPreset(row: {
  id: number;
  name: string;
  createdAt: Date;
  isDefault: number;
  responsiveConfig: unknown;
}): DesignPreset {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.createdAt,
    isDefault: row.isDefault === 1,
    responsiveConfig: row.responsiveConfig as FullResponsiveConfig,
  };
}

// ── Helper for startup: get preset config ────────────────────────────────

export function getPresetConfig(preset: DesignPreset): FullResponsiveConfig | null {
  if (preset.responsiveConfig) {
    return preset.responsiveConfig;
  }
  return null;
}

// ── React Hook ───────────────────────────────────────────────────────────

export function usePresetStore() {
  const utils = trpc.useUtils();

  // Query all presets
  const { data: rawPresets, isLoading } = trpc.presets.list.useQuery(undefined, {
    staleTime: 5000,
  });

  const presets: DesignPreset[] = (rawPresets ?? []).map(mapDbPreset);
  const defaultPreset = presets.find(p => p.isDefault) ?? null;
  const defaultId = defaultPreset?.id ?? null;

  // Mutations
  const createMutation = trpc.presets.create.useMutation({
    onSuccess: () => utils.presets.list.invalidate(),
  });
  const updateMutation = trpc.presets.update.useMutation({
    onSuccess: () => utils.presets.list.invalidate(),
  });
  const deleteMutation = trpc.presets.delete.useMutation({
    onSuccess: () => utils.presets.list.invalidate(),
  });
  const setDefaultMutation = trpc.presets.setDefault.useMutation({
    onSuccess: () => utils.presets.list.invalidate(),
  });
  const clearDefaultMutation = trpc.presets.clearDefault.useMutation({
    onSuccess: () => utils.presets.list.invalidate(),
  });

  const create = async (name: string, responsiveConfig: FullResponsiveConfig) => {
    const result = await createMutation.mutateAsync({
      name,
      responsiveConfig: responsiveConfig as any,
    });
    return result;
  };

  const update = async (id: number, responsiveConfig: FullResponsiveConfig, name?: string) => {
    await updateMutation.mutateAsync({
      id,
      responsiveConfig: responsiveConfig as any,
      name,
    });
  };

  const remove = async (id: number) => {
    await deleteMutation.mutateAsync({ id });
  };

  const setAsDefault = async (id: number | null) => {
    if (id) {
      await setDefaultMutation.mutateAsync({ id });
    } else if (defaultId) {
      await clearDefaultMutation.mutateAsync({ id: defaultId });
    }
  };

  return {
    presets,
    defaultId,
    isLoading,
    create,
    update,
    remove,
    setAsDefault,
  };
}
