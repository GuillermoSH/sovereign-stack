import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import fs from 'node:fs'
import path from 'node:path'

function seoStaticFiles(): Plugin {
  return {
    name: 'seo-static-files',
    closeBundle() {
      const site = (process.env.VITE_SITE_URL || 'https://sovereign-stack.vercel.app').replace(
        /\/$/,
        '',
      )
      const blogDir = path.resolve('src/content/blog')
      const slugs = fs.existsSync(blogDir)
        ? fs
            .readdirSync(blogDir)
            .filter((f) => f.endsWith('.es.mdx'))
            .map((f) => f.replace(/\.es\.mdx$/, ''))
        : []

      const paths = ['/', '/blog', '/legal', '/privacy', '/cookies', ...slugs.map((s) => `/blog/${s}`)]
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = paths
        .map(
          (p) => `  <url>
    <loc>${site}${p}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
        )
        .join('\n')

      const dist = path.resolve('dist')
      if (!fs.existsSync(dist)) return

      fs.writeFileSync(
        path.join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      )

      fs.writeFileSync(
        path.join(dist, 'robots.txt'),
        `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
    seoStaticFiles(),
  ],
  server: {
    // Expose on LAN so phones/tablets can hit the same Wi‑Fi IP.
    host: true,
  },
})
