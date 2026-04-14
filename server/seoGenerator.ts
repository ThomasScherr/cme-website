/**
 * SEO Content Generator using OpenAI API
 * Generates: excerpt (summary), tags, metaTitle, metaDescription
 * Optimized for Google, Bing, and AI search systems (ChatGPT, Perplexity, Google AI Overview)
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

export interface SeoGenerationInput {
  title: string;
  content: string;
}

export interface SeoGenerationResult {
  excerpt: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
}

const SYSTEM_PROMPT = `Du bist ein SEO- und Content-Strategie-Experte, spezialisiert auf technische B2B-Inhalte im Bereich Elektronikentwicklung und EMS (Electronic Manufacturing Services).

Das Unternehmen ist **CME Control Motion Electronics GmbH** – ein Entwicklungsdienstleister und Fertigungspartner für elektronische Produkte mit Fokus auf:
- Leistungselektronik
- Mechatronik
- Thermisch anspruchsvolle Projekte
- Antriebselektronik

## Deine Aufgabe

Generiere aus dem gegebenen Artikelinhalt SEO-optimierte Metadaten, die sowohl für klassische Suchmaschinen (Google, Bing) als auch für **KI-Suchsysteme** (ChatGPT Search, Perplexity, Google AI Overview, Microsoft Copilot) optimiert sind.

## Technische SEO-Anforderungen

### Meta-Titel (metaTitle)
- **50–60 Zeichen** (nicht überschreiten!)
- Primäres Keyword am Anfang
- Klar, spezifisch und handlungsorientiert
- Optional: "| CME" am Ende, wenn Platz bleibt

### Meta-Beschreibung (metaDescription)
- **140–155 Zeichen** (nicht überschreiten!)
- Enthält primäres und sekundäres Keyword natürlich eingebettet
- Endet mit Nutzenversprechen oder Call-to-Action
- Formuliere als vollständigen, ansprechenden Satz

### Zusammenfassung (excerpt)
- **2–3 prägnante Sätze, maximal 300 Zeichen**
- Beantwortet die Kernfrage des Artikels direkt (wichtig für KI-Suchsysteme!)
- Enthält die wichtigsten Fakten und Schlüsselwörter
- Geeignet als Featured Snippet und für Social-Media-Vorschauen

### Tags
- **5–8 relevante Keywords**, kommagetrennt
- Mix aus deutschen Fachbegriffen und englischen Branchenbegriffen
- Enthält sowohl spezifische als auch allgemeinere Suchbegriffe
- Keine Hashtags, nur Begriffe

## Optimierung für KI-Suchsysteme

- Verwende klare, faktische Sprache (KI-Systeme bevorzugen eindeutige Aussagen)
- Integriere Frage-Antwort-Muster in die Zusammenfassung
- Nutze strukturierte, informationsreiche Formulierungen
- Vermeide Marketing-Floskeln – KI-Systeme priorisieren Substanz über Werbung
- Verwende branchenübliche Terminologie konsistent

Antworte ausschließlich im geforderten JSON-Format.`;

export async function generateSeoContent(
  input: SeoGenerationInput
): Promise<SeoGenerationResult> {
  const apiKey = getApiKey();

  // Truncate content to ~4000 chars to stay within token limits and reduce cost
  const truncatedContent =
    input.content.length > 4000
      ? input.content.substring(0, 4000) + "\n\n[… Inhalt gekürzt …]"
      : input.content;

  const userPrompt = `Generiere SEO-optimierte Metadaten für folgenden Artikel:

**Titel:** ${input.title}

**Inhalt:**
${truncatedContent}

Antworte ausschließlich im folgenden JSON-Format:
{
  "excerpt": "Zusammenfassung (max 300 Zeichen)",
  "tags": "Tag1, Tag2, Tag3, Tag4, Tag5, Tag6",
  "metaTitle": "SEO-Titel (50-60 Zeichen)",
  "metaDescription": "SEO-Beschreibung (140-155 Zeichen)"
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
          name: "seo_metadata",
          strict: true,
          schema: {
            type: "object",
            properties: {
              excerpt: {
                type: "string",
                description: "Short summary, max 300 characters",
              },
              tags: {
                type: "string",
                description: "Comma-separated SEO tags",
              },
              metaTitle: {
                type: "string",
                description: "SEO meta title, 50-60 characters",
              },
              metaDescription: {
                type: "string",
                description: "SEO meta description, 140-155 characters",
              },
            },
            required: ["excerpt", "tags", "metaTitle", "metaDescription"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.4,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenAI API Fehler: ${response.status} ${response.statusText} – ${errorText}`
    );
  }

  const data = await response.json();
  const messageContent = data.choices?.[0]?.message?.content;

  if (!messageContent) {
    throw new Error("OpenAI hat eine leere Antwort zurückgegeben.");
  }

  const parsed = JSON.parse(messageContent) as SeoGenerationResult;

  // Enforce length constraints as safety net
  return {
    excerpt: (parsed.excerpt || "").substring(0, 300),
    tags: parsed.tags || "",
    metaTitle: (parsed.metaTitle || "").substring(0, 70),
    metaDescription: (parsed.metaDescription || "").substring(0, 160),
  };
}
