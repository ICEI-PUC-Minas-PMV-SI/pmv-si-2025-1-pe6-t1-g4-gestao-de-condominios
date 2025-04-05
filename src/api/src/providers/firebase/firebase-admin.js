import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const serviceAccountPath = path.resolve(__dirname, "ServiceAccountKey.json");

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin inicializado!");
  }
} else {
  console.warn("⚠️ Arquivo ServiceAccountKey.json não encontrado. O Firebase Admin não foi inicializado.");
}

const FirebaseMessaging = getMessaging(admin.app());

export { admin, FirebaseMessaging };
