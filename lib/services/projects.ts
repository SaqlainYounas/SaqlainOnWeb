import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/lib/types/project";

function docToProject(doc: import("firebase/firestore").QueryDocumentSnapshot): Project {
  const data = doc.data();
  return { id: doc.id, ...data } as Project;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "projects"),
    where("featured", "==", true),
    orderBy("order"),
    limit(6)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToProject);
}

export async function getAllProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const q = query(collection(db, "projects"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return docToProject(snapshot.docs[0]!);
}
