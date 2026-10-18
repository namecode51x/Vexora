import type { MetadataRoute } from "next";

/* Solo genera sitemap real en el export estático (GitHub Pages).
   En modo Worker (standalone) no hay URL pública fija aún: lista vacía. */
const BASE_URL =
  process.env.STATIC_EXPORT === "1" ? "https://namecode51x.github.io/Vexora" : "";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!BASE_URL) return [];
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
