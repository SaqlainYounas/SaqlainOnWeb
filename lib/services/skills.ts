import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Skill } from "@/lib/types/skill";

export async function getAllSkills(): Promise<Skill[]> {
  const q = query(collection(db, "skills"), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Skill);
}
