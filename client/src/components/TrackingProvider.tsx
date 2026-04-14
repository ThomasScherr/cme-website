import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useConsent } from '@/contexts/ConsentContext';
import { initConsentModeDefaults, applyTracking, trackPageView } from '@/lib/tracking';

/**
 * TrackingProvider
 *
 * - Initializes Google Consent Mode v2 defaults (denied) on mount
 * - Applies tracking scripts when consent changes
 * - Tracks SPA page views on route changes
 */
export default function TrackingProvider() {
  const { consent } = useConsent();
  const [location] = useLocation();

  // Initialize consent mode defaults once on mount
  useEffect(() => {
    initConsentModeDefaults();
  }, []);

  // Apply tracking when consent changes
  useEffect(() => {
    applyTracking(consent);
  }, [consent]);

  // Track SPA page views
  useEffect(() => {
    if (consent?.analytics) {
      trackPageView(location);
    }
  }, [location, consent?.analytics]);

  // Listen for consent-updated events (from ConsentContext)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      applyTracking(detail);
    };
    window.addEventListener('consent-updated', handler);
    return () => window.removeEventListener('consent-updated', handler);
  }, []);

  return null; // Renderless component
}
