/**
 * CMS Content Translator using OpenAI API
 * Translates individual text fields between DE and EN for the CMS.
 * Uses the user's own OpenAI token.
 */

import { buildGlossaryPromptSection } from "@shared/translationGlossary";

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

const SYSTEM_PROMPT = `You are a professional technical translator for CME Control Motion Electronics GmbH – a development service provider and manufacturing partner for electronic products (power electronics, mechatronics, thermally demanding projects, drive electronics).

## Rules
- Translate accurately while preserving technical terminology
- Maintain the professional B2B tone
- Preserve ALL HTML tags if present – only translate text content within them
- Do NOT translate brand names, product names, or company names
- Do NOT change URLs or link targets
- Keep the same formatting and structure
- Respond with ONLY the translated text, no explanations or wrappers

${buildGlossaryPromptSection()}`;

export interface TranslateTextInput {
  text: string;
  fromLang: "de" | "en";
  toLang: "de" | "en";
  context?: string; // e.g. "hero headline", "section description" for better context
}

export async function translateText(input: TranslateTextInput): Promise<string> {
  const apiKey = getApiKey();

  const fromLabel = input.fromLang === "de" ? "German" : "English";
  const toLabel = input.toLang === "de" ? "German" : "English";

  const userPrompt = `Translate the following ${fromLabel} text to ${toLabel}${input.context ? ` (context: ${input.context})` : ""}:

${input.text}`;

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
    throw new Error("OpenAI hat eine leere Antwort bei der Übersetzung zurückgegeben.");
  }

  return messageContent.trim();
}

/**
 * Batch translate multiple fields at once (more efficient – single API call)
 */
export interface BatchTranslateInput {
  fields: Record<string, string>; // key → text to translate
  fromLang: "de" | "en";
  toLang: "de" | "en";
  pageContext?: string; // e.g. "Entwicklung page hero section"
}

export async function batchTranslateFields(
  input: BatchTranslateInput
): Promise<Record<string, string>> {
  const apiKey = getApiKey();

  const fromLabel = input.fromLang === "de" ? "German" : "English";
  const toLabel = input.toLang === "de" ? "German" : "English";

  const fieldEntries = Object.entries(input.fields);
  if (fieldEntries.length === 0) return {};

  // Build a structured prompt for batch translation
  const fieldsText = fieldEntries
    .map(([key, value]) => `[${key}]: ${value}`)
    .join("\n\n");

  const userPrompt = `Translate the following ${fromLabel} text fields to ${toLabel}${input.pageContext ? ` (page context: ${input.pageContext})` : ""}.

${fieldsText}

Respond in JSON format with the same keys and translated values:
${JSON.stringify(Object.fromEntries(fieldEntries.map(([k]) => [k, `translated ${toLabel} text`])))}`;

  const schemaProperties: Record<string, { type: string; description: string }> = {};
  for (const [key] of fieldEntries) {
    schemaProperties[key] = {
      type: "string",
      description: `${toLabel} translation of the "${key}" field`,
    };
  }

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
          name: "batch_translation",
          strict: true,
          schema: {
            type: "object",
            properties: schemaProperties,
            required: fieldEntries.map(([k]) => k),
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
      `OpenAI API Fehler bei Batch-Übersetzung: ${response.status} ${response.statusText} – ${errorText}`
    );
  }

  const data = await response.json();
  const messageContent = data.choices?.[0]?.message?.content;

  if (!messageContent) {
    throw new Error("OpenAI hat eine leere Antwort bei der Batch-Übersetzung zurückgegeben.");
  }

  return JSON.parse(messageContent) as Record<string, string>;
}
