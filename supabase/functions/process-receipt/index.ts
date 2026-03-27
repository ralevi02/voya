import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

const SYSTEM_PROMPT = `You are a receipt data extractor. Analyze the receipt image and extract ONLY the following data as JSON:
{
  "amount": number (total amount paid),
  "currency": string (3-letter ISO code, e.g. "USD", "CLP", "PEN"),
  "category": string (one of: "food", "transport", "lodging", "activity", "shopping", "health", "communication", "other"),
  "merchant": string (store/restaurant name),
  "date": string (YYYY-MM-DD format if visible, null otherwise)
}
Return ONLY valid JSON. No explanations, no markdown.`;

interface ReceiptResult {
  amount: number;
  currency: string;
  category: string;
  merchant: string;
  date: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { image_base64, image_url } = await req.json();

    if (!image_base64 && !image_url) {
      return Response.json(
        { error: "image_base64 or image_url required" },
        { status: 400 },
      );
    }

    const imageContent = image_url
      ? { type: "image_url", image_url: { url: image_url } }
      : {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${image_base64}`,
          },
        };

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                { type: "text", text: "Extract data from this receipt:" },
                imageContent,
              ],
            },
          ],
          max_tokens: 300,
          temperature: 0,
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      return Response.json(
        { error: `OpenAI error: ${err}` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const result: ReceiptResult = JSON.parse(cleaned);

    return Response.json({ data: result }, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
});
