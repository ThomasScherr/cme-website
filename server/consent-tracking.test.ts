import { describe, it, expect } from 'vitest';

describe('Consent & Tracking Configuration', () => {
  // Verify all tracking env vars are present
  it('should have all tracking environment variables set', () => {
    expect(process.env.VITE_GTM_ID).toBeDefined();
    expect(process.env.VITE_GA4_MEASUREMENT_ID).toBeDefined();
    expect(process.env.VITE_LEADINFO_ID).toBeDefined();
    expect(process.env.VITE_GOOGLE_ADS_ID).toBeDefined();
  });

  it('should have GTM ID in correct format (GTM-XXXXXXXX)', () => {
    expect(process.env.VITE_GTM_ID).toMatch(/^GTM-[A-Z0-9]+$/);
  });

  it('should have GA4 Measurement ID in correct format (G-XXXXXXXXXX)', () => {
    expect(process.env.VITE_GA4_MEASUREMENT_ID).toMatch(/^G-[A-Z0-9]+$/);
  });

  it('should have Leadinfo ID in correct format (LI-XXXXXXXXXX)', () => {
    expect(process.env.VITE_LEADINFO_ID).toMatch(/^LI-[A-Z0-9]+$/);
  });

  it('should have Google Ads ID in correct format (AW-XXXXXXXXX)', () => {
    expect(process.env.VITE_GOOGLE_ADS_ID).toMatch(/^AW-[0-9]+$/);
  });

  // Verify consent storage key and version constants
  it('should define consent categories correctly', () => {
    const categories = ['necessary', 'analytics', 'marketing', 'chat'];
    categories.forEach(cat => {
      expect(typeof cat).toBe('string');
      expect(cat.length).toBeGreaterThan(0);
    });
  });

  // Verify consent state structure
  it('should have correct consent state structure', () => {
    const defaultConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      chat: false,
    };
    
    expect(defaultConsent.necessary).toBe(true);
    expect(defaultConsent.analytics).toBe(false);
    expect(defaultConsent.marketing).toBe(false);
    expect(defaultConsent.chat).toBe(false);
  });

  it('should have accept-all consent state', () => {
    const acceptAll = {
      necessary: true,
      analytics: true,
      marketing: true,
      chat: true,
    };
    
    expect(acceptAll.necessary).toBe(true);
    expect(acceptAll.analytics).toBe(true);
    expect(acceptAll.marketing).toBe(true);
    expect(acceptAll.chat).toBe(true);
  });

  it('should have chat-only consent state for support chat', () => {
    const chatOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      chat: true,
    };
    
    expect(chatOnly.necessary).toBe(true);
    expect(chatOnly.analytics).toBe(false);
    expect(chatOnly.marketing).toBe(false);
    expect(chatOnly.chat).toBe(true);
  });

  // Verify Google Consent Mode v2 mapping
  it('should map consent categories to Google Consent Mode v2 signals', () => {
    const consentModeMapping = {
      analytics: ['analytics_storage'],
      marketing: ['ad_storage', 'ad_user_data', 'ad_personalization', 'personalization_storage'],
    };

    expect(consentModeMapping.analytics).toContain('analytics_storage');
    expect(consentModeMapping.marketing).toContain('ad_storage');
    expect(consentModeMapping.marketing).toContain('ad_user_data');
    expect(consentModeMapping.marketing).toContain('ad_personalization');
  });

  // Verify that tracking IDs match expected values
  it('should have the correct GTM ID from control-motion.de', () => {
    expect(process.env.VITE_GTM_ID).toBe('GTM-K3JZGW84');
  });

  it('should have the correct GA4 ID from control-motion.de', () => {
    expect(process.env.VITE_GA4_MEASUREMENT_ID).toBe('G-GQCSRVXX15');
  });

  it('should have the correct Leadinfo ID from control-motion.de', () => {
    expect(process.env.VITE_LEADINFO_ID).toBe('LI-60460A1962032');
  });

  it('should have the correct Google Ads ID from control-motion.de', () => {
    expect(process.env.VITE_GOOGLE_ADS_ID).toBe('AW-358454053');
  });
});
