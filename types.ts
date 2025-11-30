export interface Project {
  id: number;
  title: string;
  details: string[];
  role?: string; 
  dates?: string;
  tech?: string[];
  link?: string;
  url?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  details?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  details: string[];
}

export interface Achievement {
  title: string;
  rank?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export enum AspectRatio {
  Portrait = "9:16",
  Landscape = "16:9",
  Square = "1:1"
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: AspectRatio;
}

export const WALLPAPER_STYLES = [
  "Photorealistic",
  "Cyberpunk",
  "Watercolor",
  "Oil Painting",
  "Anime",
  "Sketch",
  "Abstract",
  "Pixel Art"
];