import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { readFile } from "https://deno.land/std/fs/mod.ts";

const app = new Application();
const router = new Router();

// Serve static files from the dist directory
app.use(async (context, next) => {
  try {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/dist`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// API route to get all blog posts
router.get("/api/blog-posts", async (context) => {
  const blogPosts = [
    {
      id: 1,
      title: "My First Blog Post",
      slug: "my-first-blog-post",
      date: "2023-05-01",
      author: "haquire",
      excerpt: "Welcome to my first blog post! In this article, we'll explore the fascinating world of web development and discuss some of the latest trends in the industry.",
      image: "/images/blog/first-post.jpg",
      tags: ["Web Development", "JAMstack"],
      readTime: 5
    },
    // Add more blog posts here
  ];

  context.response.body = blogPosts;
});

// API route to get a single blog post
router.get("/api/blog-posts/:slug", async (context) => {
  const { slug } = context.params;
  try {
    const content = await readFile(`${Deno.cwd()}/public/blog-posts/${slug}.html`, { encoding: "utf-8" });
    context.response.body = { content };
  } catch (error) {
    console.error(`Error reading blog post: ${error}`);
    context.response.status = 404;
    context.response.body = { error: "Blog post not found" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Serve index.html for all other routes
app.use(async (context) => {
  await send(context, "index.html", {
    root: `${Deno.cwd()}/dist`,
  });
});

await app.listen({ port: 8000 });