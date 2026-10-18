import { NextResponse } from "next/server";

/* Requerido para el export estatico de GitHub Pages */
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}