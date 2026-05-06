export default {
  async fetch(request: Request): Promise<Response> {
    return new Response(
      JSON.stringify({
        message: "Hello from Cloudflare Workers",
        status: "ok"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};