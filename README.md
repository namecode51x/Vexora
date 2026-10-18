# Vexora

Landing page oficial de **VEXORA** — sitio de descarga, features, planes y FAQ.
Hecho con Next.js 16, React 19, Tailwind CSS v4 y shadcn/ui.

🌐 **Web en vivo:** https://namecode51x.github.io/Vexora

## Desarrollo local

Requisito: [Node.js](https://nodejs.org) 20+ (o [Bun](https://bun.sh)).

```bash
bun install        # o npm install
bun run dev        # http://localhost:3000
```

## Build de producción

```bash
bun run build      # build standalone (VPS / Vercel / Railway)
bun run start      # sirve la versión optimizada
```

La landing **no necesita base de datos**: Prisma/SQLite solo viene del template y
no se usa en ninguna página.

## Despliegue (GitHub Pages)

El workflow `.github/workflows/deploy.yml` construye y publica el sitio
automáticamente en cada push a `main`:

1. En el repo de GitHub: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.
2. Cada push a `main` redespliega solo.
3. La web queda en `https://namecode51x.github.io/Vexora`.

Para un build estático manual:

```bash
STATIC_EXPORT=1 bunx next build   # genera ./out
```

## Actualizar el instalador

Todos los botones de descarga usan el mismo fichero:
`public/downloads/VEXORA-Setup-v1.2.0.exe`. Reemplázalo y actualiza las
constantes de `src/lib/download.ts`.

## Estructura

```
src/
  app/            layout, página principal y API route de prueba
  components/
    ui/           componentes shadcn/ui
    vexora/       secciones de la landing (hero, features, plans, FAQ...)
  lib/            utilidades (descarga, cn, db)
public/
  downloads/      instalador .exe
prisma/           schema (sin uso en la landing)
```

> La app de escritorio VEXORA vive en `Vexora_App/` (fuera de este repo).
