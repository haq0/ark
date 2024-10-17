import { parse } from "https://deno.land/std@0.177.0/encoding/yaml.ts";
import { marked } from "https://jspm.dev/marked@4.0.12";
import { join } from "https://deno.land/std@0.177.0/path/mod.ts";
import hljs from 'npm:highlight.js';

const __dirname = new URL('.', import.meta.url).pathname;
const postsDirectory = join(__dirname, "..", "src", "blog-posts");
const outputDirectory = join(__dirname, "..", "public", "blog-posts");

// Custom renderer for various elements
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `
<h${level} id="${escapedText}">
<a class="anchor" href="#${escapedText}">
<span class="header-link"></span>
</a>
${text}
</h${level}>`;
  },

  list(body, ordered) {
    const type = ordered ? 'ol' : 'ul';
    return `<${type} style="text-align: left; list-style-position: inside;">${body}</${type}>`;
  },

  listitem(text) {
    return `<li">${text}</li>`;
  },

  code(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return `<pre><code class="hljs language-${validLanguage}">${
hljs.highlight(code, { language: validLanguage }).value
}</code></pre>`;
  },

  blockquote(quote) {
    return `<blockquote>${quote}</blockquote>`;
  },

  table(header, body) {
    return `<div class="table-container"><table>
<thead>${header}</thead>
<tbody>${body}</tbody>
</table></div>`;
  },

  paragraph(text) {
    if (text.startsWith(':::')) {
      const lines = text.split('\n');
      const type = lines[0].replace(':::', '').trim();
      const content = lines.slice(1, -1).join('\n');

      switch (type) {
        case 'note':
        case 'warning':
        case 'tip':
          return `<div class="custom-block ${type}">
<p class="custom-block-title">${type.toUpperCase()}</p>
${marked.parseInline(content)}
</div>`;
        case 'collapse':
          const [title, ...collapseContent] = content.split('\n');
          return `<details class="custom-block collapse">
<summary>${title}</summary>
${marked.parseInline(collapseContent.join('\n'))}
</details>`;
        default:
          return `<div class="custom-block">${marked.parseInline(content)}</div>`;
      }
    }
    return `<p>${text}</p>`;
  },



image(href, title, text) {
  const alignMatch = title ? title.match(/align-(left|center|right)/) : null;
  const align = alignMatch ? alignMatch[1] : 'center';
  const caption = title ? title.replace(/align-(left|center|right)/, '').trim() : '';
  return `
    <figure style="text-align: ${align};">
      <img src="${href}" alt="${text}" title="${caption}">
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>
  `;
  }
};

// Custom block extension for ::: tip, ::: warning, ::: end
// Task list extension
const taskListExtension = {
  name: 'taskList',
  level: 'inline',
  start(src) { return src.match(/\[[ x]\]/)?.index; },
  tokenizer(src, tokens) {
    const rule = /^\[( |x)\] (.+)/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'taskListItem',
        raw: match[0],
        checked: match[1] === 'x',
        text: match[2]
      };
    }
  },
  renderer(token) {
    return `<li class="task-list-item">
<input type="checkbox" ${token.checked ? 'checked' : ''} disabled>
${marked.parseInline(token.text)}
</li>`;
  }
};

// Set up marked with custom renderer and extensions
marked.use({ 
  renderer,
  headerIds: true,
  extensions: [taskListExtension]
});

function generateTableOfContents(content) {
  const headings = content.match(/<h([2-6]).*?id="(.*?)".*?>(.*?)<\/h[2-6]>/g) || [];
  let toc = '<div class="toc-container">\n<h2>Table of Contents</h2>\n<ul>';
  let currentLevel = 0;

  headings.forEach((heading) => {
    const [, level, id, text] = heading.match(/<h([2-6]).*?id="(.*?)".*?>(.*?)<\/h[2-6]>/);
    const numericLevel = parseInt(level);

    if (numericLevel > currentLevel) {
      toc += '<ul>'.repeat(numericLevel - currentLevel);
    } else if (numericLevel < currentLevel) {
      toc += '</ul>'.repeat(currentLevel - numericLevel);
    }

    toc += `<li><a href="#${id}">${text}</a></li>`;
    currentLevel = numericLevel;
  });

  toc += '</ul>'.repeat(currentLevel);
  toc += '</ul>\n</div>';

  return toc;
}async function generateBlogPosts() {
  try {
    await Deno.mkdir(outputDirectory, { recursive: true });
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error;
    }
  }

  const posts = [];

  for await (const dirEntry of Deno.readDir(postsDirectory)) {
    if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
      const filePath = join(postsDirectory, dirEntry.name);
      const fileContents = await Deno.readTextFile(filePath);

      console.log(`Processing file: ${dirEntry.name}`);

      const parts = fileContents.split(/---\s*\n/);
      if (parts.length < 3) {
        console.error(`Invalid front matter in ${dirEntry.name}`);
        continue;
      }

      const frontMatter = parts[1];
      let content = parts.slice(2).join('---\n');

      let data;
      try {
        data = parse(frontMatter);
      } catch (error) {
        console.error(`Error parsing front matter for ${dirEntry.name}:`, error);
        data = {};
      }

      const slug = dirEntry.name.replace(".md", "");
      let htmlContent;
      try {
        htmlContent = marked(content);
      } catch (error) {
        console.error(`Error parsing Markdown for ${dirEntry.name}:`, error);
        continue;
      }

      // Generate table of contents if enabled
if (data.toc === true) {
  const toc = generateTableOfContents(htmlContent);
  htmlContent += toc; // Add the TOC at the end of the content
}

      // Now convert to HTML
      htmlContent = marked(content);

      const formattedDate = data.date ? new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : 'Unknown Date';

     const postHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title || 'Untitled Post'}</title>
    <link rel="stylesheet" href="/asr/markdown-styles.css">
    <style>
      .toc-container {
        background-color: var(--toc-bg, #f0f0f0); /* Slightly darker shade */
        border: 1px solid var(--border-color, #ddd);
        border-radius: 5px;
        padding: 20px;
        margin-top: 30px;
      }
      .toc-container h2 {
        margin-top: 0;
      }
      .toc-container ul {
        padding-left: 20px;
      }
    </style>
</head>
<body>
    <article>
        <header>
            <h1>${data.title || 'Untitled Post'}</h1>
            <p>By ${data.author || 'Anonymous'} on ${formattedDate} • ${data.readTime || 'Unknown'} min read</p>
        </header>
        ${htmlContent}
    </article>
</body>
</html>
`;

      const outputPath = join(outputDirectory, `${slug}.html`);
      await Deno.writeTextFile(outputPath, postHtml);

      posts.push({
        title: data.title || 'Untitled Post',
        date: data.date || 'Unknown Date',
        author: data.author || 'Anonymous',
        readTime: data.readTime || 'Unknown',
        slug,
        tags: data.tags || [],
      });

      console.log(`Generated HTML for ${slug}`);
    }
  }

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const postsListPath = join(outputDirectory, "posts.json");
  await Deno.writeTextFile(postsListPath, JSON.stringify(sortedPosts));

  console.log(`Generated ${posts.length} blog posts.`);
}

await generateBlogPosts();

