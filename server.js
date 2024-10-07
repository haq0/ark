import { Application, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Serve static files from the dist directory
app.use(async (context) => {
  try {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/dist`,
      index: "index.html",
    });
  } catch {
    // If the file is not found, serve index.html for client-side routing
    await send(context, "index.html", {
      root: `${Deno.cwd()}/dist`,
    });
  }
});

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });