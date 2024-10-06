import { Application, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Serve static files from the dist directory
app.use(async (context, next) => {
  try {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/dist`,
      index: "index.html",
    });
  } catch {
    // If file is not found, serve index.html
    if (context.response.status === 404) {
      await send(context, "index.html", {
        root: `${Deno.cwd()}/dist`,
      });
    } else {
      await next();
    }
  }
});

// Your other routes and middleware here

await app.listen({ port: 8000 });
