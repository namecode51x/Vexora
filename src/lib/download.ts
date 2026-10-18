/* Instalador real servido desde /public/downloads. Todos los botones
   "Download" del sitio (navbar, hero, planes y CTA final) disparan este
   mismo fichero: se sustituye el .exe de ahi y se actualiza DOWNLOAD_FILE. */
export const DOWNLOAD_FILE = "VEXORA-Setup-v1.2.0.exe";
export const DOWNLOAD_SIZE_MB = 2.8;

export function downloadVexora() {
  const link = document.createElement("a");
  link.href = `/downloads/${DOWNLOAD_FILE}`;
  link.download = DOWNLOAD_FILE;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
