import type { NextConfig } from "next";

/* STATIC_EXPORT=1 -> export estatico para GitHub Pages (via CI).
   Sin esa variable -> standalone normal para VPS / `npm start`. */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  // GitHub Pages sirve el sitio bajo /Vexora
  basePath: isStaticExport ? "/Vexora" : undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
