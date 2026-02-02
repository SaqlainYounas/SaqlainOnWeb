import { Timestamp } from "firebase/firestore";

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
}
