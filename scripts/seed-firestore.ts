import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import * as dotenv from "dotenv";
import { resolve } from "path";

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
const db = getFirestore(app);

const skills = [
  { name: "HTML", category: "Frontend", proficiency: 95, icon: "html5", order: 0 },
  { name: "CSS", category: "Frontend", proficiency: 90, icon: "css3", order: 1 },
  { name: "JavaScript", category: "Frontend", proficiency: 90, icon: "javascript", order: 2 },
  { name: "TypeScript", category: "Frontend", proficiency: 85, icon: "typescript", order: 3 },
  { name: "React JS / TS", category: "Frontend", proficiency: 90, icon: "react", order: 4 },
  { name: "Next JS / TS", category: "Frontend", proficiency: 85, icon: "nextjs", order: 5 },
  { name: "Tailwind", category: "Frontend", proficiency: 85, icon: "tailwindcss", order: 6 },
  { name: "Redux", category: "Frontend", proficiency: 75, icon: "redux", order: 7 },
  { name: "Node JS / TS", category: "Backend", proficiency: 75, icon: "nodejs", order: 8 },
  { name: "Git", category: "DevOps", proficiency: 85, icon: "git", order: 9 },
  { name: "CI/CD", category: "DevOps", proficiency: 70, icon: "cicd", order: 10 },
  { name: "Microsoft Azure DevOps", category: "DevOps", proficiency: 70, icon: "azure", order: 11 },
  { name: "MS Dynamics 365 Commerce", category: "Other", proficiency: 75, icon: "dynamics365", order: 12 },
  { name: "Jest", category: "Testing", proficiency: 70, icon: "jest", order: 13 },
  { name: "Unit Testing", category: "Testing", proficiency: 70, icon: "testing", order: 14 },
  { name: "OOP", category: "Other", proficiency: 80, icon: "oop", order: 15 },
];

const projects = [
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    description: "A modern portfolio site built with Next.js and Firebase.",
    longDescription: "A responsive portfolio website showcasing projects, skills, and contact information. Built with Next.js App Router and styled with Tailwind CSS.",
    problem: "Needed a professional online presence to showcase work and skills.",
    solution: "Built a performant, SEO-friendly portfolio using Next.js with Firebase as the backend.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    category: "Web App",
    featured: true,
    thumbnailUrl: "",
    images: [],
    liveUrl: "",
    githubUrl: "",
    metrics: { performance: "95+", lighthouse: "90+" },
    createdAt: Timestamp.now(),
    order: 0,
  },
  {
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description: "A full-featured e-commerce platform built with MS Dynamics 365 Commerce.",
    longDescription: "An enterprise e-commerce solution leveraging Microsoft Dynamics 365 Commerce for product management, checkout, and order processing.",
    problem: "Client needed a scalable e-commerce solution integrated with their existing Microsoft ecosystem.",
    solution: "Implemented a custom storefront using Dynamics 365 Commerce with React-based modules.",
    techStack: ["MS Dynamics 365 Commerce", "React", "TypeScript", "Node.js"],
    category: "E-Commerce",
    featured: true,
    thumbnailUrl: "",
    images: [],
    liveUrl: "",
    githubUrl: "",
    metrics: {},
    createdAt: Timestamp.now(),
    order: 1,
  },
];

async function clearCollection(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const deletes = snapshot.docs.map((d) => deleteDoc(d.ref));
  await Promise.all(deletes);
  console.log(`Cleared ${snapshot.size} docs from "${collectionName}"`);
}

async function seed() {
  // Clear and reseed skills
  await clearCollection("skills");
  for (const skill of skills) {
    const ref = doc(collection(db, "skills"));
    await setDoc(ref, skill);
  }
  console.log(`Seeded ${skills.length} skills`);

  // Clear and seed projects
  await clearCollection("projects");
  for (const project of projects) {
    const ref = doc(collection(db, "projects"));
    await setDoc(ref, project);
  }
  console.log(`Seeded ${projects.length} projects`);

  console.log("Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
