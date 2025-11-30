import React, { useState } from 'react';
import { Project, Education, Experience, Achievement, SkillCategory } from './types';

// --- Resume Data ---

const EXPERIENCE: Experience[] = [
  {
    company: "Indegene",
    role: "Software Engineer (Backend Developer)",
    period: "Sept 2024 – Current",
    location: "Bengaluru, Karnataka",
    details: [
      "Engineered a healthcare chatbot using FastAPI, LangChain, and Llama models, providing patients access to medical info, FAQs, and appointment support.",
      "Orchestrated a multi-agent system using Microsoft AutoGen, allowing LLM agents (data retrieval, summarization, validation) to collaborate, reducing manual effort by 35%.",
      "Introduced a reporting feature offering interactive dashboards, empowering healthcare leadership to make data-driven decisions.",
      "Worked on LLM fine-tuning and evaluation for domain-specific medical data, improving answer relevance by 20% over baseline models.",
      "Deployed distributed RAG pipelines with LangChain and Pinecone, enhancing response accuracy and ensuring system reliability."
    ]
  },
  {
    company: "MountBlue Technologies",
    role: "Full-Stack Developer Trainee",
    period: "June 2024 – Aug 2024",
    location: "Bengaluru, Karnataka",
    details: [
      "Acquired hands-on experience in backend and frontend technologies: Python, Java, SQL, React, REST APIs, and distributed systems.",
      "Worked on production-ready enterprise applications emphasizing scalability, reliability, and fault-tolerant design.",
      "Promoted to Indegene full-time role due to consistent delivery of maintainable, production-quality code."
    ]
  }
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI-Powered YouTube Video Summarizer",
    dates: "Nov 2024 – Dec 2024",
    details: [
      "Engineered a GenAI summarizer using Python, Whisper V3 Turbo, and Llama 3.1 8B, producing multi-language YouTube video summaries efficiently.",
      "Integrated LangChain for advanced text processing, enabling structured, concise summaries from large datasets.",
      "Enabled multi-language support and private content handling via FFmpeg and yt-dlp, ensuring secure and scalable performance."
    ],
    link: "View Project",
    url: "https://github.com/lalitha145/Youtube_Summarizer"
  },
  {
    id: 2,
    title: "CareerAI Assistant",
    dates: "Sep 2025 – Present",
    details: [
      "Built an AI-powered tool generating tailored interview questions by analyzing candidate resumes.",
      "Implemented parsing pipelines for PDF, DOCX, PPTX, and image formats using PyPDF2, python-docx, python-pptx, and Tesseract OCR.",
      "Designed an interactive Streamlit frontend for candidates to practice mock interviews and assess readiness."
    ],
    link: "View Project",
    url: "#"
  },
  {
    id: 3,
    title: "SmartQuiz Platform",
    dates: "July 2024 – Aug 2024",
    details: [
      "Launched an interactive quiz platform with 50+ dynamic questions, timers, and real-time scoring, boosting engagement by 30%.",
      "Implemented a leaderboard system to track performance, improving retention by 20%.",
      "Built responsive UI with interactive elements for seamless multi-device experience.",
      "Integrated persistent storage for user scores and progress, enabling personalized analytics.",
      "Optimized performance and question rendering for smooth gameplay with multiple concurrent users."
    ],
    link: "View Project",
    url: "https://gitlab.com/chinthalalitha2004/quiz-application"
  }
];

const SKILL_CATEGORIES: SkillCategory[] = [
  { category: "Languages", skills: ["Java", "Python", "JavaScript", "SQL"] },
  { category: "GenAI", skills: ["LangChain", "AutoGen", "Prompt Engineering", "RAG"] },
  { category: "Backend", skills: ["FastAPI", "Flask", "REST APIs", "Microservices", "Concurrency", "Distributed Systems"] },
  { category: "Databases", skills: ["MySQL", "MongoDB", "Pinecone (Vector DB)"] },
  { category: "System Design", skills: ["API Design", "Caching", "Load Balancing", "High Availability", "Event-Driven Arch"] },
  { category: "Cloud & DevOps", skills: ["AWS (S3, EC2, Lambda, RDS, IAM)", "Docker", "CI/CD"] },
  { category: "Tools", skills: ["Git/GitHub", "GitLab", "VS Code", "IntelliJ", "Postman", "Jupyter"] }
];

const ACHIEVEMENTS: Achievement[] = [
  { title: "Secured global rank 60/19K+ in Coding Ninjas Weekend Contest 107." },
  { title: "Secured global rank 1274/140,000+ in CodeKaze, June 2023." },
  { title: "Secured global rank 863/35,576 in Newton Coding Challenge, Coderush April 2023." },
  { title: "1300+ problems solved on Leetcode." }
];

const EDUCATION: Education[] = [
  {
    school: "Sree Vidyanikethan Engineering College",
    degree: "B.Tech in Computer Science and Engineering",
    year: "Dec 2020 – May 2024",
    details: "CGPA: 9/10 | Tirupati, Andhra Pradesh"
  },
  {
    school: "Sri Chaitanya Junior College",
    degree: "MPC - Intermediate",
    year: "April 2018 – March 2020",
    details: "Score: 979/1000 | Vijayawada, Andhra Pradesh"
  }
];

// --- Components ---

interface PageProps {
  pageNum: number;
  zIndex: number;
  flipped: boolean;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onFlip?: () => void;
}

const Page: React.FC<PageProps> = ({ pageNum, zIndex, flipped, frontContent, backContent, onFlip }) => {
  const isFrontCover = pageNum === 0;
  const isBackCover = pageNum === 3; // The last page

  return (
    <div 
      className={`page ${flipped ? 'flipped' : ''}`} 
      style={{ zIndex: zIndex }}
      onClick={onFlip}
    >
      <div className={`front ${isFrontCover ? 'cover-front' : 'lines'} overflow-y-auto overflow-x-hidden no-scrollbar`}>
        {frontContent}
      </div>
      {/* Logic: Page 3 Back uses cover-back. Page 0 Back and others use lines. */}
      <div className={`back ${isBackCover ? 'cover-back' : 'lines'} overflow-y-auto overflow-x-hidden no-scrollbar`}>
        {backContent}
      </div>
    </div>
  );
};

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = 4; // 0: Cover, 1: Exp/Proj, 2: Skills/Edu, 3: Achieve/Close

  const goNext = () => {
    if (currentPageIndex < totalPages) setCurrentPageIndex(prev => prev + 1);
  };

  const goPrev = () => {
    if (currentPageIndex > 0) setCurrentPageIndex(prev => prev - 1);
  };
  
  const getZIndex = (index: number) => {
    if (index < currentPageIndex) {
        return index;
    } else {
        return totalPages - index + 10;
    }
  };

  // GRID SYSTEM CONSTANTS
  // All text must strictly adhere to leading-[28px] (1.75rem)
  const lineH = "leading-[28px]"; 
  const textInk = `font-sans text-[15px] text-ink ${lineH} break-words whitespace-normal`;
  
  // Headers: occupy 2 lines (56px) = 1.5 line text + 0.5 line space
  const headerClass = "font-marker text-3xl text-ink leading-[56px] h-[56px] mb-[28px]"; 
  
  // Section Headers: occupy 1 line
  const subHeaderClass = `font-hand text-lg font-bold text-gray-700 leading-[28px] h-[28px] overflow-hidden`;
  
  // Normal Font Section Header (For Skills)
  const subHeaderNormalClass = `font-sans font-bold text-[15px] text-gray-700 leading-[28px] h-[28px] overflow-hidden uppercase tracking-wide`;

  return (
    <div className="book-scene">
      <div className="book">
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 hidden md:block">
           <button 
             onClick={goPrev} 
             disabled={currentPageIndex === 0}
             className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-0 transition-all"
            >
             &larr;
           </button>
        </div>
        <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 hidden md:block">
           <button 
             onClick={goNext} 
             disabled={currentPageIndex === totalPages}
             className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-0 transition-all"
            >
             &rarr;
           </button>
        </div>


        {/* --- PAGE 0: COVER --- */}
        <Page 
          pageNum={0}
          zIndex={getZIndex(0)}
          flipped={currentPageIndex > 0}
          // Front: Leather Cover
          frontContent={
            <div className="h-full flex flex-col justify-center items-center text-center text-yellow-100/90 border-4 border-yellow-600/30 rounded p-8">
               <div className="w-16 h-1 bg-yellow-600/50 mb-6 rounded-full"></div>
               <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-wide uppercase text-yellow-50 mb-2">Lalitha Chintha</h1>
               <p className="font-sans text-xs md:text-sm tracking-[0.2em] opacity-80 uppercase font-semibold text-yellow-100/80">Software Engineer</p>
            </div>
          }
          // Back: Contact & Links (Intro Left) -> PAPER
          backContent={
             <div className="h-full flex flex-col justify-center items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 border-4 border-white shadow-md overflow-hidden relative flex items-center justify-center text-4xl text-gray-400">
                    <span>LC</span>
                </div>
                <h2 className="font-hand text-3xl text-ink mb-2">Contact Info</h2>
                
                <div className="space-y-2 text-center mb-8">
                   <p className="font-sans text-sm text-gray-600">+91 6302271653</p>
                   <p className="font-sans text-sm text-gray-600">chinthalalitha2004@gmail.com</p>
                   <p className="font-sans text-xs text-gray-400">Bengaluru, Karnataka, India</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-xs justify-center">
                    <a href="https://www.linkedin.com/in/lalitha-chintha-044bb9235/" target="_blank" rel="noreferrer" className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded shadow-sm text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                        LinkedIn
                    </a>
                    <a href="https://github.com/lalitha145" target="_blank" rel="noreferrer" className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded shadow-sm text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors">
                        Github
                    </a>
                     <a href="https://leetcode.com/u/chinthalalitha3/" target="_blank" rel="noreferrer" className="col-span-2 flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded shadow-sm text-xs font-bold text-orange-600 hover:bg-orange-50 transition-colors">
                        Leetcode
                    </a>
                </div>
             </div>
          }
        />

        {/* --- PAGE 1: EXPERIENCE & PROJECTS --- */}
        <Page 
          pageNum={1}
          zIndex={getZIndex(1)}
          flipped={currentPageIndex > 1}
          // Front: Experience
          frontContent={
             <div className="h-full flex flex-col">
                <h2 className={headerClass}>Experience</h2>
                
                <div className="flex-1 overflow-y-auto">
                    {EXPERIENCE.map((exp, i) => (
                        <div key={i} className="mb-[28px]">
                            {/* Company Name & Date */}
                            <div className="flex justify-between items-baseline h-[28px] overflow-hidden w-full">
                                <h3 className={`font-sans font-bold text-ink ${lineH}`}>{exp.company}</h3>
                                <span className={`font-mono text-[11px] text-gray-500 ${lineH}`}>{exp.period}</span>
                            </div>
                            
                            {/* Role */}
                            <div className="h-[28px] overflow-hidden w-full">
                                <p className={`font-serif italic text-gray-600 ${lineH}`}>{exp.role}</p>
                            </div>
                            
                            {/* Details - Bullet Points using Flex for safe wrapping */}
                            <ul className="list-none mt-0 w-full">
                                {exp.details.map((point, idx) => (
                                    <li key={idx} className={`flex flex-row items-start ${textInk} mb-0`}>
                                        <span className="w-4 shrink-0 leading-[28px]">•</span>
                                        <span className="flex-1">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="text-right text-gray-400 font-mono text-xs h-[28px] flex items-center justify-end">1</div>
             </div>
          }
          // Back: Projects
          backContent={
            <div className="h-full flex flex-col">
                 <h2 className={headerClass}>Key Projects</h2>
                <div className="flex-1 overflow-y-auto">
                    {PROJECTS.map((proj) => (
                        <div key={proj.id} className="group mb-[28px]">
                             {/* Title & Date */}
                             <div className="flex justify-between items-baseline h-[28px] overflow-hidden w-full">
                                <h3 className={`font-sans font-bold text-ink group-hover:text-accent transition-colors ${lineH} truncate pr-2`}>{proj.title}</h3>
                                <span className={`text-[10px] font-mono text-gray-400 ${lineH} whitespace-nowrap`}>{proj.dates}</span>
                            </div>

                            {/* Details - Bullet Points with Flex Layout */}
                            <ul className="list-none mt-0 w-full">
                                {proj.details.map((point, idx) => (
                                    <li key={idx} className={`flex flex-row items-start ${textInk} mb-0`}>
                                        <span className="w-4 shrink-0 leading-[28px]">•</span>
                                        <span className="flex-1">{point}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Link */}
                            <div className="h-[28px] flex items-center w-full">
                              <a 
                                href={proj.url || '#'} 
                                target={proj.url ? "_blank" : undefined}
                                rel={proj.url ? "noopener noreferrer" : undefined}
                                className={`text-xs font-bold text-blue-500 hover:underline ${lineH}`}
                              >
                                  {proj.link} &rarr;
                              </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-left text-gray-400 font-mono text-xs h-[28px] flex items-center">2</div>
            </div>
          }
        />

        {/* --- PAGE 2: SKILLS & EDUCATION --- */}
        <Page 
          pageNum={2}
          zIndex={getZIndex(2)}
          flipped={currentPageIndex > 2}
          // Front: Skills
          frontContent={
            <div className="h-full flex flex-col">
                <h2 className={headerClass}>Technical Skills</h2>
                
                <div className="flex-1 overflow-y-auto">
                    {SKILL_CATEGORIES.map((cat) => (
                        <div key={cat.category} className="mb-[28px]">
                            {/* Changed to normal font as requested */}
                            <h4 className={subHeaderNormalClass}>{cat.category}</h4>
                             <div className={`${textInk} w-full`}>
                                {cat.skills.join(", ")}
                             </div>
                        </div>
                    ))}
                </div>
                <div className="text-right text-gray-400 font-mono text-xs h-[28px] flex items-center justify-end">3</div>
            </div>
          }
          // Back: Education (Dedicated Page)
          backContent={
            <div className="h-full flex flex-col">
                 <div className="flex-1 overflow-y-auto">
                    <section className="mb-[28px]">
                        <h2 className={headerClass}>Education</h2>
                        <div className="space-y-[28px]">
                            {EDUCATION.map((edu, i) => (
                                <div key={i}>
                                    <h3 className={`font-sans font-bold text-ink ${lineH}`}>{edu.school}</h3>
                                    <p className={`font-serif italic text-gray-600 ${lineH}`}>{edu.degree}</p>
                                    <p className={`${textInk}`}>{edu.details} ({edu.year})</p>
                                </div>
                            ))}
                        </div>
                    </section>
                 </div>
                 <div className="text-left text-gray-400 font-mono text-xs h-[28px] flex items-center">4</div>
            </div>
          }
        />

        {/* --- PAGE 3: ACHIEVEMENTS & CLOSING --- */}
        <Page 
          pageNum={3}
          zIndex={getZIndex(3)}
          flipped={currentPageIndex > 3}
          // Front: Achievements
          frontContent={
            <div className="h-full flex flex-col">
                <h2 className={headerClass}>Achievements</h2>
                <div className="flex-1 overflow-y-auto">
                     <ul className="list-none w-full">
                        {ACHIEVEMENTS.map((ach, i) => (
                            <li key={i} className={`flex flex-row items-start ${textInk}`}>
                                <span className="w-5 shrink-0 text-yellow-500 text-xs leading-[28px]">★</span>
                                <span className="flex-1">{ach.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-right text-gray-400 font-mono text-xs h-[28px] flex items-center justify-end">5</div>
            </div>
          }
          // Back: Closing / Thank You -> LEATHER
          backContent={
            <div className="h-full flex flex-col justify-center items-center text-center text-yellow-50">
                 <div className="mb-12 rotate-2">
                    <h3 className="font-hand text-5xl text-yellow-100 leading-[56px] mb-4">Thank You!</h3>
                    <p className="font-hand text-xl text-yellow-200/80">for visiting my portfolio</p>
                 </div>
                 
                 <div className="space-y-4 p-8 border border-yellow-600/30 bg-black/20 rounded shadow-sm rotate-1 transform mb-6 backdrop-blur-sm">
                     <h4 className="font-sans font-bold text-yellow-600 uppercase tracking-widest text-xs">Get In Touch</h4>
                     <div className="space-y-1">
                        <p className={`font-sans font-bold text-yellow-50 ${lineH}`}>chinthalalitha2004@gmail.com</p>
                     </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3 w-full max-w-[200px]">
                    <a href="https://www.linkedin.com/in/lalitha-chintha-044bb9235/" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-300 hover:text-white hover:underline transition-colors">LinkedIn</a>
                    <a href="https://github.com/lalitha145" target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-300 hover:text-white hover:underline transition-colors">Github</a>
                 </div>
                 
                 <div className="mt-12 text-yellow-900/40 text-xs font-mono">
                    Notebook Portfolio © {new Date().getFullYear()}
                 </div>
            </div>
          }
        />

      </div>

      {/* Mobile Instructions */}
      <div className="absolute bottom-8 text-white/50 text-xs md:hidden animate-pulse">
        Tap page edge to flip
      </div>
    </div>
  );
}