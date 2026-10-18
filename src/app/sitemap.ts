import type { MetadataRoute } from "next";

/* El Worker de Cloudflare es el canónico; el espejo de GitHub Pages
   comparte el mismo sitemap (las URLs apuntan al canónico). */
const BASE_URL = "https://vexora.namecode51x.workers.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

