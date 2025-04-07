import { JWT } from "google-auth-library";
import fs from "fs";

const serviceAccountPath = "src/providers/Firebase/ServiceAccountKey.json";

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

export async function generateAccessToken() {
  const client = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const token = await client.authorize();
  console.log("🔑 ACCESS_TOKEN:", token.access_token);

  return token.access_token
}

generateAccessToken();
