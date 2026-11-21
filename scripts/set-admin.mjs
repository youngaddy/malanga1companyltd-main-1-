/**
 * Creates the Malanga 1 admin account and grants it the `admin` custom claim.
 *
 * Run this once after Firebase Authentication has been enabled for the project
 * (it needs the Blaze plan). Safe to run again later — it only updates the
 * account it finds.
 *
 *   node scripts/set-admin.mjs
 *
 * Optional overrides:
 *   ADMIN_EMAIL=someone@example.com ADMIN_PASSWORD=secret node scripts/set-admin.mjs
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT = "malanga1company";
const EMAIL = process.env.ADMIN_EMAIL || "admin@malanga1company.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "Ma0201629806@";
const BASE = `https://identitytoolkit.googleapis.com/v1/projects/${PROJECT}`;

function accessToken() {
  const paths = [
    join(homedir(), ".config", "configstore", "firebase-tools.json"),
    join(process.env.APPDATA || "", "configstore", "firebase-tools.json"),
  ];
  for (const path of paths) {
    try {
      const raw = JSON.parse(readFileSync(path, "utf8"));
      if (raw?.tokens?.access_token) return raw.tokens.access_token;
    } catch {
      /* try next */
    }
  }
  throw new Error("No Firebase CLI access token found. Run `firebase login` first.");
}

async function call(path, body) {
  const response = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  return { ok: response.ok, status: response.status, json };
}

async function lookup() {
  const { ok, json } = await call("/accounts:lookup", { email: [EMAIL] });
  return ok && json.users?.length ? json.users[0] : null;
}

async function main() {
  let user = await lookup();

  if (!user) {
    const created = await call("/accounts", {
      email: EMAIL,
      password: PASSWORD,
      emailVerified: true,
    });
    if (!created.ok) {
      throw new Error(
        `Could not create ${EMAIL}: ${created.status} ${JSON.stringify(created.json)}`,
      );
    }
    user = created.json;
    console.log(`created account  ${EMAIL}`);
  } else {
    console.log(`found account    ${EMAIL}`);
  }

  const updated = await call("/accounts:update", {
    localId: user.localId,
    emailVerified: true,
    customAttributes: JSON.stringify({ admin: true }),
  });
  if (!updated.ok) {
    throw new Error(
      `Could not grant the admin claim: ${updated.status} ${JSON.stringify(updated.json)}`,
    );
  }

  console.log(`admin claim set  ${EMAIL}`);
  console.log("Sign in at https://malanga1company.web.app/admin");
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  if (String(error.message).includes("CONFIGURATION_NOT_FOUND")) {
    console.error(
      "Firebase Authentication is not enabled yet. Enable Blaze billing, then turn on\n" +
        "the Email/Password provider:\n" +
        `https://console.firebase.google.com/project/${PROJECT}/authentication\n`,
    );
  }
  process.exit(1);
});
