import { describe, it, expect } from 'vitest';

describe('Tracking Environment Variables', () => {
  it('should have VITE_GTM_ID set with correct format', () => {
    const gtmId = process.env.VITE_GTM_ID;
    expect(gtmId).toBeDefined();
    expect(gtmId).toMatch(/^GTM-[A-Z0-9]+$/);
  });

  it('should have VITE_GA4_MEASUREMENT_ID set with correct format', () => {
    const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID;
    expect(ga4Id).toBeDefined();
    expect(ga4Id).toMatch(/^G-[A-Z0-9]+$/);
  });

  it('should have VITE_LEADINFO_ID set with correct format', () => {
    const leadinfoId = process.env.VITE_LEADINFO_ID;
    expect(leadinfoId).toBeDefined();
    expect(leadinfoId).toMatch(/^LI-[A-Z0-9]+$/);
  });

  it('should have VITE_GOOGLE_ADS_ID set with correct format', () => {
    const adsId = process.env.VITE_GOOGLE_ADS_ID;
    expect(adsId).toBeDefined();
    expect(adsId).toMatch(/^AW-[0-9]+$/);
  });
});
