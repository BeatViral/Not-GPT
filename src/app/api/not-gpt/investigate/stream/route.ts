import { checkRateLimit } from "@/lib/rate-limit";
import { runNotGptInvestigation } from "@/services/not-gpt/pipeline";

function encodeEvent(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const rateLimit = checkRateLimit(`not-gpt-stream:${ip}`, Number(process.env.RATE_LIMIT_SEARCHES ?? 20));

  if (!rateLimit.ok) {
    return new Response(encodeEvent("error", { error: "Search rate limit reached. Please try again shortly." }), {
      status: 429,
      headers: { "Content-Type": "text/event-stream" }
    });
  }

  const body = await request.json();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const answer = await runNotGptInvestigation(body, {
          onProgress(stage) {
            controller.enqueue(encoder.encode(encodeEvent("stage", stage)));
          }
        });
        controller.enqueue(encoder.encode(encodeEvent("answer", answer)));
      } catch {
        controller.enqueue(
          encoder.encode(
            encodeEvent("error", {
              error: "The investigation could not be completed. Please revise the question and try again."
            })
          )
        );
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
