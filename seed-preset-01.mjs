/**
 * Seed script: Insert the user's Preset "01" into the design_presets table.
 * Run with: node seed-preset-01.mjs
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle(process.env.DATABASE_URL);

// Full responsive config reconstructed from user's CSS export + defaults
const responsiveConfig = {
  desktop: {
    tokens: {
      colorPrimary: "#2196D3",
      colorDark: "#1a1a2e",
      colorGray: "#4a5568",
      colorAccent: "#00b4d8",
      colorBg: "#ffffff",
      fontFamily: "Roboto",
      fontWeightHeading: 700,
      fontWeightBody: 400,
      fontSizeH1: 65,
      fontSizeH2: 40,
      fontSizeH3: 28,
      fontSizeH4: 20,
      fontSizeBody: 16,
      fontSizeSmall: 13,
      lineHeightHeading: 1.15,
      lineHeightBody: 1.65,
      letterSpacingHeading: -0.5,
      headerPaddingTop: 12,
      headerPaddingBottom: 12,
      logoHeightDesktop: 48,
      logoHeightTablet: 40,
      logoHeightMobile: 32,
      diamondRadius: 0.035,
      borderRadius: 4,
      sectionPadding: 80,
      containerMaxWidth: 1280,
    },
    diamonds: {
      hero:     { size: 58, offsetX: 18,  offsetY: 0, rotate: 0 },
      service1: { size: 46, offsetX: -18, offsetY: 0, rotate: 0 },
      service2: { size: 46, offsetX: 18,  offsetY: 0, rotate: 0 },
      service3: { size: 46, offsetX: -18, offsetY: 0, rotate: 0 },
      markets:  { size: 50, offsetX: 18,  offsetY: 0, rotate: 0 },
    },
    sectionHeights: {
      hero:     { paddingTop: 80, paddingBottom: 80 },
      stats:    { paddingTop: 40, paddingBottom: 40 },
      service1: { paddingTop: 80, paddingBottom: 80 },
      service2: { paddingTop: 80, paddingBottom: 80 },
      service3: { paddingTop: 80, paddingBottom: 80 },
      usp:      { paddingTop: 80, paddingBottom: 80 },
      process:  { paddingTop: 80, paddingBottom: 80 },
      markets:  { paddingTop: 80, paddingBottom: 80 },
      contact:  { paddingTop: 80, paddingBottom: 80 },
    },
  },
  tablet: {
    tokens: {
      colorPrimary: "#2196D3",
      colorDark: "#1a1a2e",
      colorGray: "#4a5568",
      colorAccent: "#00b4d8",
      colorBg: "#ffffff",
      fontFamily: "Roboto",
      fontWeightHeading: 700,
      fontWeightBody: 400,
      fontSizeH1: 65,
      fontSizeH2: 40,
      fontSizeH3: 26,
      fontSizeH4: 17,
      fontSizeBody: 14,
      fontSizeSmall: 11,
      lineHeightHeading: 1.15,
      lineHeightBody: 1.65,
      letterSpacingHeading: -0.5,
      headerPaddingTop: 10,
      headerPaddingBottom: 10,
      logoHeightDesktop: 48,
      logoHeightTablet: 40,
      logoHeightMobile: 32,
      diamondRadius: 0.035,
      borderRadius: 4,
      sectionPadding: 68,
      containerMaxWidth: 1280,
    },
    diamonds: {
      hero:     { size: 46, offsetX: 14,  offsetY: 0, rotate: 0 },
      service1: { size: 37, offsetX: -14, offsetY: 0, rotate: 0 },
      service2: { size: 37, offsetX: 14,  offsetY: 0, rotate: 0 },
      service3: { size: 37, offsetX: -14, offsetY: 0, rotate: 0 },
      markets:  { size: 40, offsetX: 14,  offsetY: 0, rotate: 0 },
    },
    sectionHeights: {
      hero:     { paddingTop: 60, paddingBottom: 60 },
      stats:    { paddingTop: 30, paddingBottom: 30 },
      service1: { paddingTop: 60, paddingBottom: 60 },
      service2: { paddingTop: 60, paddingBottom: 60 },
      service3: { paddingTop: 60, paddingBottom: 60 },
      usp:      { paddingTop: 60, paddingBottom: 60 },
      process:  { paddingTop: 60, paddingBottom: 60 },
      markets:  { paddingTop: 60, paddingBottom: 60 },
      contact:  { paddingTop: 60, paddingBottom: 60 },
    },
  },
  mobile: {
    tokens: {
      colorPrimary: "#2196D3",
      colorDark: "#1a1a2e",
      colorGray: "#4a5568",
      colorAccent: "#00b4d8",
      colorBg: "#ffffff",
      fontFamily: "Roboto",
      fontWeightHeading: 700,
      fontWeightBody: 400,
      fontSizeH1: 32,
      fontSizeH2: 36,
      fontSizeH3: 20,
      fontSizeH4: 14,
      fontSizeBody: 11,
      fontSizeSmall: 9,
      lineHeightHeading: 1.15,
      lineHeightBody: 1.65,
      letterSpacingHeading: -0.5,
      headerPaddingTop: 8,
      headerPaddingBottom: 8,
      logoHeightDesktop: 48,
      logoHeightTablet: 40,
      logoHeightMobile: 32,
      diamondRadius: 0.035,
      borderRadius: 4,
      sectionPadding: 48,
      containerMaxWidth: 1280,
    },
    diamonds: {
      hero:     { size: 35, offsetX: 11,  offsetY: 0, rotate: 0 },
      service1: { size: 28, offsetX: -11, offsetY: 0, rotate: 0 },
      service2: { size: 28, offsetX: 11,  offsetY: 0, rotate: 0 },
      service3: { size: 28, offsetX: -11, offsetY: 0, rotate: 0 },
      markets:  { size: 30, offsetX: 11,  offsetY: 0, rotate: 0 },
    },
    sectionHeights: {
      hero:     { paddingTop: 48, paddingBottom: 48 },
      stats:    { paddingTop: 24, paddingBottom: 24 },
      service1: { paddingTop: 48, paddingBottom: 48 },
      service2: { paddingTop: 48, paddingBottom: 48 },
      service3: { paddingTop: 48, paddingBottom: 48 },
      usp:      { paddingTop: 48, paddingBottom: 48 },
      process:  { paddingTop: 48, paddingBottom: 48 },
      markets:  { paddingTop: 48, paddingBottom: 48 },
      contact:  { paddingTop: 48, paddingBottom: 48 },
    },
  },
};

import { sql } from 'drizzle-orm';

async function seed() {
  try {
    // Insert preset "01" as default
    const configJson = JSON.stringify(responsiveConfig);
    await db.execute(sql`INSERT INTO design_presets (name, isDefault, responsiveConfig) VALUES (${'01'}, ${1}, ${configJson})`);
    console.log('✅ Preset "01" erfolgreich in die Datenbank eingefügt (als Standard).');
  } catch (err) {
    console.error('❌ Fehler beim Einfügen:', err);
  }
  process.exit(0);
}

seed();
