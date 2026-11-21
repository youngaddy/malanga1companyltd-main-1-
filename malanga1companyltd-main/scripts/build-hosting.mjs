/**
 * Production build for Firebase Hosting.
 *
 * Firebase serves static files only, so the site needs two things that a single
 * TanStack Start build cannot produce together:
 *
 *   1. Real HTML for every known route (good SEO, instant first paint).
 *   2. A fallback page for routes that did not exist at build time — property
 *      pages are created in Firestore through the admin dashboard, so their
 *      URLs are unknown until a visitor asks for them.
 *
 * This script runs two passes and merges the output:
 *
 *   pass 1  BUILD_SHELL=1  ->  `_shell.html`, a client-only router shell
 *   pass 2  (default)      ->  prerendered HTML for every static route
 *
 * The merged `dist/client` is uploaded to Firebase Hosting, whose rewrite
 * config sends unknown paths to `/_shell.html`.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(appRoot, "dist", "client");
const shellPath = join(outDir, "_shell.html");
const stashedShell = join(appRoot, "dist", "_shell.stashed.html");

function build(env) {
  console.log(`\n[build-hosting] vite build${env.BUILD_SHELL ? " (shell pass)" : " (prerender pass)"}\n`);
  execFileSync("vite", ["build"], {
    cwd: appRoot,
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: true,
  });
}

function checkAssets() {
  const manifestPath = join(outDir, "assets");
  if (!existsSync(manifestPath)) throw new Error("Build produced no assets directory.");
}

build({ BUILD_SHELL: "1" });
if (!existsSync(shellPath)) {
  throw new Error("Shell pass did not produce dist/client/_shell.html");
}
checkAssets();
copyFileSync(shellPath, stashedShell);

build({});
checkAssets();

copyFileSync(stashedShell, shellPath);
rmSync(stashedShell, { force: true });

const html = readFileSync(shellPath, "utf8");
const entry = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
if (!entry) throw new Error("Could not find the shell's entry script.");
if (!existsSync(join(outDir, entry[1].slice(1)))) {
  throw new Error(
    `Shell entry ${entry[1]} is missing from the prerendered build. The two passes ` +
      "produced different asset hashes, so the merged output would be broken.",
  );
}

console.log(`\n[build-hosting] done. Shell: ${entry[1]}`);
console.log("[build-hosting] Upload dist/client with `firebase deploy --only hosting`.\n");
