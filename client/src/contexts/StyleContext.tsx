import { createContext, useContext, useEffect, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { DEFAULT_STYLE_TOKENS, tokensToCSSVars } from '@shared/styleDefaults';
import type { StyleTokens, SectionColor } from '@shared/styleDefaults';

interface StyleContextValue {
  tokens: StyleTokens;
  isLoading: boolean;
  /** Get section color by section ID */
  getSectionColor: (id: string) => SectionColor | undefined;
}

const StyleContext = createContext<StyleContextValue>({
  tokens: DEFAULT_STYLE_TOKENS,
  isLoading: true,
  getSectionColor: () => undefined,
});

export function useStyles() {
  return useContext(StyleContext);
}

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const { data: savedStyles, isLoading } = trpc.siteStyles.get.useQuery(undefined, {
    staleTime: 60_000, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });

  const tokens = useMemo<StyleTokens>(() => {
    if (savedStyles?.styles) {
      try {
        return JSON.parse(savedStyles.styles) as StyleTokens;
      } catch {
        return DEFAULT_STYLE_TOKENS;
      }
    }
    return DEFAULT_STYLE_TOKENS;
  }, [savedStyles]);

  // Apply CSS variables to :root whenever tokens change
  useEffect(() => {
    const cssVars = tokensToCSSVars(tokens);
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });

    // Also apply container max-width
    root.style.setProperty('--container-max', `${tokens.containerMaxWidth}px`);

    // Cleanup: remove custom properties on unmount
    return () => {
      Object.keys(cssVars).forEach(prop => {
        root.style.removeProperty(prop);
      });
      root.style.removeProperty('--container-max');
    };
  }, [tokens]);

  const getSectionColor = useMemo(() => {
    return (id: string) => tokens.sectionColors?.find(s => s.id === id);
  }, [tokens]);

  return (
    <StyleContext.Provider value={{ tokens, isLoading, getSectionColor }}>
      {children}
    </StyleContext.Provider>
  );
}
