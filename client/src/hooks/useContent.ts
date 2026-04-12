/**
 * useContent Hook – Loads CMS content from the database with fallback to default values.
 * 
 * Usage:
 *   const { t, img, vid } = useContent('home', defaultContent);
 *   // t('hero.title') → returns DB value or fallback
 *   // img('hero.image') → returns DB image URL or fallback
 *   // vid('hero.video') → returns DB video URL or fallback
 */

import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
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

export function useContent(pageKey: string, defaults: ContentDefaults = {}) {
  const { lang: language } = useLanguage();
  const { data: contentEntries, isLoading } = trpc.cms.getByPage.useQuery(
    { pageKey },
    { staleTime: 60_000 }
  );

  const contentMap = useMemo(() => {
    const map = new Map<string, ContentEntry>();
    if (contentEntries) {
      for (const entry of contentEntries) {
        map.set(entry.contentKey, entry as ContentEntry);
      }
    }
    return map;
  }, [contentEntries]);

  const t = (key: string): string => {
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

  const img = (key: string): string => {
    const fullKey = `${pageKey}.${key}`;
    const dbEntry = contentMap.get(fullKey);
    if (dbEntry) {
      return dbEntry.valueDe || dbEntry.valueEn || "";
    }
    const def = defaults[key];
    return def?.de || def?.en || "";
  };

  const vid = (key: string): string => {
    const fullKey = `${pageKey}.${key}`;
    const dbEntry = contentMap.get(fullKey);
    if (dbEntry) {
      return dbEntry.valueDe || dbEntry.valueEn || "";
    }
    const def = defaults[key];
    return def?.de || def?.en || "";
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
