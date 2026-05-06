interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        message: "AI Conversation Analytics Assistant is running",
        status: "ok"
      });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      const body = await request.json() as { message?: string };
      const userMessage = body.message?.trim();

      if (!userMessage) {
        return Response.json(
          { error: "Missing message" },
          { status: 400 }
        );
      }

      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content:
              "You are a helpful support assistant. Keep responses concise, professional, and useful."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      });

      return Response.json({
        user_message: userMessage,
        ai_response: aiResponse
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};