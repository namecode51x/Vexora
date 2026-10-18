// Runs after `bun install`. Workers Builds (CI) sets WORKERS_CI=1 by default,
// so the OpenNext bundle is built during install and the dashboard Deploy
// command (`npx wrangler deploy`) finds `.open-next/` ready to upload.
// Locally (no WORKERS_CI) this is a no-op.
const { spawnSync } = require("child_process");

if (!process.env.WORKERS_CI) {
	console.log("[postinstall] not on Workers Builds (no WORKERS_CI), skipping OpenNext build");
	process.exit(0);
}

console.log("[postinstall] Workers Builds detected (WORKERS_CI=1): building OpenNext bundle...");
const result = spawnSync("bunx", ["--bun", "opennextjs-cloudflare", "build"], {
	stdio: "inherit",
	shell: true,
});
process.exit(result.status ?? 1);
