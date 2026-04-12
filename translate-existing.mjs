/**
 * One-time migration script: Translate all existing articles without EN translations
 * Uses the OpenAI API directly (same approach as articleTranslator.ts)
 */

import 'dotenv/config';
import mysql from 'mysql2/promise';

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `You are a professional technical translator specializing in electronics engineering, power electronics, mechatronics, and EMS (Electronic Manufacturing Services).

The company is **CME Control Motion Electronics GmbH** – a development service provider and manufacturing partner for electronic products with focus on:
- Power electronics
- Mechatronics
- Thermally demanding projects
- Drive electronics

## Your Task

Translate the given German article content into professional, natural-sounding English. The translation must:

1. **Preserve technical accuracy** – Use correct English technical terminology for electronics, power electronics, EMC, thermal management, etc.
2. **Maintain the original tone** – Keep the professional B2B tone without making it sound overly casual or overly formal.
3. **Preserve HTML formatting** – The content may contain HTML tags (headings, bold, lists, links, etc.). Keep ALL HTML tags intact and only translate the text content within them.
4. **SEO awareness** – The translated meta title and description should follow SEO best practices for English-language search engines.
5. **Industry terms** – Use established English equivalents for German technical terms (e.g., "Leistungselektronik" → "Power Electronics", "Antriebselektronik" → "Drive Electronics", "EMV" → "EMC").

## Important Rules
- Do NOT translate brand names, product names, or company names
- Do NOT change URLs or link targets
- Preserve all HTML structure and tags exactly
- Keep meta title under 60 characters
- Keep meta description between 140-155 characters
- Tags should be the English equivalents of the German keywords

Respond exclusively in the required JSON format.`;

async function translateArticle(article) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  const truncatedContent = article.content.length > 15000
    ? article.content.substring(0, 15000) + "\n\n[… content truncated …]"
    : article.content;

  const userPrompt = `Translate the following German article into English:

**Title (DE):** ${article.title}

**Excerpt/Summary (DE):** ${article.excerpt || "(none)"}

**Content (DE):**
${truncatedContent}

**Tags (DE):** ${article.tags || "(none)"}

**Meta Title (DE):** ${article.metaTitle || article.title}

**Meta Description (DE):** ${article.metaDescription || article.excerpt || "(none)"}

Respond exclusively in the following JSON format:
{
  "titleEn": "English title",
  "excerptEn": "English summary (max 300 characters)",
  "contentEn": "Full English content with HTML preserved",
  "tagsEn": "English Tag1, English Tag2, ...",
  "metaTitleEn": "English SEO title (max 60 characters)",
  "metaDescriptionEn": "English SEO description (140-155 characters)"
}`;

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_translation",
          strict: true,
          schema: {
            type: "object",
            properties: {
              titleEn: { type: "string" },
              excerptEn: { type: "string" },
              contentEn: { type: "string" },
              tagsEn: { type: "string" },
              metaTitleEn: { type: "string" },
              metaDescriptionEn: { type: "string" },
            },
            required: ["titleEn", "excerptEn", "contentEn", "tagsEn", "metaTitleEn", "metaDescriptionEn"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} – ${errorText}`);
  }

  const data = await response.json();
  const messageContent = data.choices?.[0]?.message?.content;
  if (!messageContent) throw new Error("Empty OpenAI response");

  return JSON.parse(messageContent);
}

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  console.log("Connecting to database...");
  const connection = await mysql.createConnection(dbUrl);

  // Find articles without EN translation
  const [articles] = await connection.execute(
    "SELECT id, title, excerpt, content, tags, metaTitle, metaDescription FROM articles WHERE titleEn IS NULL OR titleEn = ''"
  );

  console.log(`Found ${articles.length} article(s) without EN translation.`);

  if (articles.length === 0) {
    console.log("Nothing to translate. All articles already have EN translations.");
    await connection.end();
    return;
  }

  for (const article of articles) {
    console.log(`\nTranslating article #${article.id}: "${article.title}"...`);
    try {
      const translation = await translateArticle(article);

      await connection.execute(
        `UPDATE articles SET 
          titleEn = ?, 
          excerptEn = ?, 
          contentEn = ?, 
          tagsEn = ?, 
          metaTitleEn = ?, 
          metaDescriptionEn = ? 
        WHERE id = ?`,
        [
          (translation.titleEn || "").substring(0, 500),
          (translation.excerptEn || "").substring(0, 300),
          translation.contentEn || "",
          translation.tagsEn || "",
          (translation.metaTitleEn || "").substring(0, 255),
          (translation.metaDescriptionEn || "").substring(0, 160),
          article.id,
        ]
      );

      console.log(`  ✓ Translated: "${translation.titleEn}"`);
    } catch (err) {
      console.error(`  ✗ Failed to translate article #${article.id}:`, err.message);
    }
  }

  await connection.end();
  console.log("\nDone! All articles processed.");
}

main().catch(console.error);
