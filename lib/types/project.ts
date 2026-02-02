import { Timestamp } from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  techStack: string[];
  category: string;
  featured: boolean;
  thumbnailUrl: string;
  images: string[];
  liveUrl: string;
  githubUrl: string;
  metrics: Record<string, string | number>;
  createdAt: Timestamp;
  order: number;
}
