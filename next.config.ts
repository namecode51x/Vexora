import type { NextConfig } from "next";

/* STATIC_EXPORT=1 -> export estatico para GitHub Pages (via CI).
   Sin esa variable -> standalone normal para VPS / `npm start`. */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  // GitHub Pages sirve el sitio bajo /Vexora
  basePath: isStaticExport ? "/Vexora" : undefined,
  // expuesto a los clientes para armar rutas (/downloads/...) con el basePath
  env: {
    NEXT_PUBLIC_BASE_PATH: isStaticExport ? "/Vexora" : "",
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
