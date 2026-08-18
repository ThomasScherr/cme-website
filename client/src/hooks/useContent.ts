/**
 * useContent Hook – Loads CMS content from the database with fallback to default values.
 * 
 * Defaults are now automatically derived from contentDefinitions.ts when not explicitly provided.
 * 
 * Usage:
 *   const { t, img, vid } = useContent('home');
 *   // t('hero.title') → returns DB value or fallback from contentDefinitions
 *   // img('hero.image') → returns DB image URL or fallback
 *   // vid('hero.video') → returns DB video URL or fallback
 */

import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { PAGES } from "@/lib/contentDefinitions";
import { localizeHtmlHrefs } from "@/lib/localizedRouting";
type LangType = "de" | "en";

export interface ContentDefaults {
  [key: string]: {
    de: string;
    en: string;
    type?: "text" | "richtext" | "image" | "video";
  };
}

interface ContentEntry {
  contentKey: string;
  contentType: string;
  valueDe: string | null;
  valueEn: string | null;
}

/**
 * Build a defaults map from the PAGES definition for a given pageKey.
 * Keys are in the format "section.field" (e.g. "hero.tagline", "features.feature.0").
 */
function buildDefaultsFromDefinitions(pageKey: string): ContentDefaults {
  const pageDef = PAGES.find((p) => p.key === pageKey);
  if (!pageDef) return {};

  const defaults: ContentDefaults = {};
  for (const section of pageDef.sections) {
    for (const field of section.fields) {
      const key = `${section.key}.${field.key}`;
      defaults[key] = {
        de: field.defaultDe || "",
        en: field.defaultEn || "",
        type: field.type,
      };
    }
  }
  return defaults;
}

export function useContent(pageKey: string, explicitDefaults?: ContentDefaults) {
  const { lang: language } = useLanguage();
  const { data: contentEntries, isLoading } = trpc.cms.getByPage.useQuery(
    { pageKey },
    { staleTime: 5_000 }
  );

  // Merge: explicit defaults override auto-derived ones
  const defaults = useMemo(() => {
    const auto = buildDefaultsFromDefinitions(pageKey);
    if (!explicitDefaults) return auto;
    return { ...auto, ...explicitDefaults };
  }, [pageKey, explicitDefaults]);

  const contentMap = useMemo(() => {
    const map = new Map<string, ContentEntry>();
    if (contentEntries) {
      for (const entry of contentEntries) {
        map.set(entry.contentKey, entry as ContentEntry);
      }
    }
    return map;
  }, [contentEntries]);

  // Redaktionelle Inhalte enthalten HTML mit internen Verweisen (etwa auf die
  // Datenschutzerklaerung). Die gehen nicht durch wouter, deshalb werden sie
  // hier uebersetzt – sonst zeigt die englische Seite auf die deutsche.
  const t = (key: string): string => localizeHtmlHrefs(rawValue(key), language);

  const rawValue = (key: string): string => {
    const fullKey = `${pageKey}.${key}`;
    const dbEntry = contentMap.get(fullKey);
    if (dbEntry) {
      const value = language === "en" ? dbEntry.valueEn : dbEntry.valueDe;
      if (value) return value;
      const fallbackValue = language === "en" ? dbEntry.valueDe : dbEntry.valueEn;
      if (fallbackValue) return fallbackValue;
    }
    const def = defaults[key];
    if (def) {
      return language === "en" ? (def.en || def.de) : (def.de || def.en);
    }
    return "";
  };

  /**
   * img() returns the CMS image URL.
   * If a DB entry exists (even with empty value = image was deleted), the DB value wins.
   * Only falls back to contentDefinitions default when NO DB entry exists at all.
   * This ensures that deleting an image in the CMS actually removes it from the page.
   */
  const img = (key: string, fallback?: string): string => {
    const fullKey = `${pageKey}.${key}`;
    const dbEntry = contentMap.get(fullKey);
    if (dbEntry) {
      // DB entry exists – return its value (may be empty string if image was deleted)
      // When a DB entry exists, we NEVER fall back to the hardcoded fallback
      return dbEntry.valueDe || dbEntry.valueEn || "";
    }
    // No DB entry at all – use fallback param, then contentDefinitions default
    const def = defaults[key];
    return fallback || def?.de || def?.en || "";
  };

  /**
   * vid() returns the CMS video URL. Same logic as img().
   */
  const vid = (key: string, fallback?: string): string => {
    const fullKey = `${pageKey}.${key}`;
    const dbEntry = contentMap.get(fullKey);
    if (dbEntry) {
      return dbEntry.valueDe || dbEntry.valueEn || "";
    }
    const def = defaults[key];
    return fallback || def?.de || def?.en || "";
  };

  const hasOverride = (key: string): boolean => {
    const fullKey = `${pageKey}.${key}`;
    return contentMap.has(fullKey);
  };

  const raw = (key: string): { de: string; en: string } | null => {
    const fullKey = `${pageKey}.${key}`;
    const dbEntry = contentMap.get(fullKey);
    if (dbEntry) {
      return { de: dbEntry.valueDe || "", en: dbEntry.valueEn || "" };
    }
    const def = defaults[key];
    if (def) {
      return { de: def.de || "", en: def.en || "" };
    }
    return null;
  };

  return { t, img, vid, raw, hasOverride, isLoading, language: language as LangType };
}

export function useAllContent() {
  const { data, isLoading, refetch } = trpc.cms.getAll.useQuery(
    undefined,
    { staleTime: 30_000 }
  );

  const contentMap = useMemo(() => {
    const map = new Map<string, ContentEntry>();
    if (data) {
      for (const entry of data) {
        map.set(entry.contentKey, entry as ContentEntry);
      }
    }
    return map;
  }, [data]);

  return { contentMap, entries: data || [], isLoading, refetch };
}
