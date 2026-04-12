/**
 * Article Translator using OpenAI API (direct, not via Manus Forge)
 * Translates German article content to English for the bilingual CME website.
 * All costs go through the user's own OpenAI token.
 */

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      "OPENAI_API_KEY ist nicht konfiguriert. Bitte im Bereich Secrets hinterlegen."
    );
  }
  return key;
}

export interface TranslationInput {
  title: string;
  excerpt?: string;
  content: string;
  tags?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface TranslationResult {
  titleEn: string;
  excerptEn: string;
  contentEn: string;
  tagsEn: string;
  metaTitleEn: string;
  metaDescriptionEn: string;
}

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

export async function translateArticle(
  input: TranslationInput
): Promise<TranslationResult> {
  const apiKey = getApiKey();

  // For very long content, we split into chunks to stay within token limits
  // gpt-4o-mini supports 128k context, so 15000 chars is safe
  const truncatedContent =
    input.content.length > 15000
      ? input.content.substring(0, 15000) + "\n\n[… content truncated …]"
      : input.content;

  const userPrompt = `Translate the following German article into English:

**Title (DE):** ${input.title}

**Excerpt/Summary (DE):** ${input.excerpt || "(none)"}

**Content (DE):**
${truncatedContent}

**Tags (DE):** ${input.tags || "(none)"}

**Meta Title (DE):** ${input.metaTitle || input.title}

**Meta Description (DE):** ${input.metaDescription || input.excerpt || "(none)"}

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
              titleEn: {
                type: "string",
                description: "English translation of the article title",
              },
              excerptEn: {
                type: "string",
                description: "English translation of the excerpt/summary",
              },
              contentEn: {
                type: "string",
                description:
                  "English translation of the full article content with HTML preserved",
              },
              tagsEn: {
                type: "string",
                description: "English comma-separated tags",
              },
              metaTitleEn: {
                type: "string",
                description: "English SEO meta title, max 60 characters",
              },
              metaDescriptionEn: {
                type: "string",
                description:
                  "English SEO meta description, 140-155 characters",
              },
            },
            required: [
              "titleEn",
              "excerptEn",
              "contentEn",
              "tagsEn",
              "metaTitleEn",
              "metaDescriptionEn",
            ],
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
    throw new Error(
      `OpenAI API Fehler bei Übersetzung: ${response.status} ${response.statusText} – ${errorText}`
    );
  }

  const data = await response.json();
  const messageContent = data.choices?.[0]?.message?.content;

  if (!messageContent) {
    throw new Error(
      "OpenAI hat eine leere Antwort bei der Übersetzung zurückgegeben."
    );
  }

  const parsed = JSON.parse(messageContent) as TranslationResult;

  // Safety: ensure all fields have values
  return {
    titleEn: parsed.titleEn || input.title,
    excerptEn: (parsed.excerptEn || "").substring(0, 300),
    contentEn: parsed.contentEn || "",
    tagsEn: parsed.tagsEn || "",
    metaTitleEn: (parsed.metaTitleEn || "").substring(0, 70),
    metaDescriptionEn: (parsed.metaDescriptionEn || "").substring(0, 160),
  };
}
