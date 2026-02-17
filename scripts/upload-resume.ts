import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

dotenv.config({ path: resolve(__dirname, "../.env.local") });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const RESUME_PATH = resolve("C:/Users/saqoo/Desktop/Saqlain/Saqlain Resume 2026 v3.pdf");
const STORAGE_PATH = "resume/saqlain-resume.pdf";

async function upload() {
  console.log("Reading file:", RESUME_PATH);
  const fileBuffer = readFileSync(RESUME_PATH);

  console.log("Uploading to Firebase Storage...");
  const storageRef = ref(storage, STORAGE_PATH);
  await uploadBytes(storageRef, fileBuffer, { contentType: "application/pdf" });

  const downloadURL = await getDownloadURL(storageRef);
  console.log("Upload complete. URL:", downloadURL);

  // Store the URL in Firestore so the app can fetch it
  await setDoc(doc(db, "site", "resume"), { url: downloadURL });
  console.log("Saved download URL to Firestore (site/resume)");

  process.exit(0);
}

upload().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
