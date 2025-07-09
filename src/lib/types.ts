import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name: string;
  school: string;
  idNo: string;
  pointsTotal: number;
}

export interface Question {
  id: string;
  text: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AnswerSheet {
  answers: number[]; // length 25
  score: number; // 0–100
  streak: number; // consecutive days
}

export interface Leader {
  uid: string;
  name: string;
  score: number;
  rank: number;
  avatarUrl?: string;
}

export interface Coupon {
  id: string;
  title: string;
  discountCode: string;
  minRank: number;
  maxRank:number;
  validUntil: Timestamp;
  link: string;
}

export interface Category {
    id: string;
    nameEn: string;
    nameTe: string;
    icon: string; // suggestion: use lucide-react icon names
}

export interface Suggestion {
    id: string;
    text: string;
}
