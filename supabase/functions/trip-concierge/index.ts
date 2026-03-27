import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  message: string;
  history: ChatMessage[];
  trip_context: {
    trip_name: string;
    destination: string;
    start_date: string;
    end_date: string;
    itinerary_summary: string;
  };
}

function buildSystemPrompt(ctx: RequestBody["trip_context"]): string {
  return `You are "Voya Concierge", a friendly and knowledgeable AI travel assistant.

Current trip: "${ctx.trip_name}"
Destination: ${ctx.destination}
Dates: ${ctx.start_date} to ${ctx.end_date}

Itinerary summary:
${ctx.itinerary_summary || "No activities planned yet."}

Guidelines:
- Respond in the same language the user writes in.
- Give specific, actionable recommendations for the destination.
- When suggesting activities, include estimated costs and time.
- If you suggest adding something to the itinerary, end with: [ACTION:ADD_ITINERARY]
- Keep responses concise (under 200 words).
- Be warm and enthusiastic about the trip!`;
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
    const body: RequestBody = await req.json();
    const { message, history, trip_context } = body;

    if (!message?.trim()) {
      return Response.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    const systemPrompt = buildSystemPrompt(trip_context);
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-10),
      { role: "user", content: message },
    ];

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 500,
          temperature: 0.7,
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
    const reply = data.choices?.[0]?.message?.content ?? "";
    const hasAction = reply.includes("[ACTION:ADD_ITINERARY]");
    const cleanReply = reply.replace(/\[ACTION:ADD_ITINERARY\]/g, "").trim();

    return Response.json(
      {
        data: {
          reply: cleanReply,
          has_itinerary_action: hasAction,
        },
      },
      { headers: { "Access-Control-Allow-Origin": "*" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
});
