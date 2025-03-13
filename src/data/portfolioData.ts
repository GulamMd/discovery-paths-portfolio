
export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  coordinates: { x: number; y: number };
}

export interface AchievementItem {
  id: string;
  title: string;
  date: string;
  description: string;
  coordinates: { x: number; y: number };
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  coordinates: { x: number; y: number };
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  level: number; // 1-5
  coordinates: { x: number; y: number };
}

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  location?: string;
  avatar?: string;
}

// Replace this data with your actual information
export const contactInfo: ContactInfo = {
  name: "Gulam Mohammad",
  title: "Frontend Developer",
  email: "gulam.khalid@globalids.com",
  phone: "+91 8298102935",
  github: "https://github.com/GulamMd",
  linkedin: "https://www.linkedin.com/in/gulammohammadkhalid/",
  twitter: "https://x.com/GulamMdKhalid",
  location: "Kolkata, India",
  avatar: "/lovable-uploads/fb4f8322-d626-4068-8c5d-888b136d76b8.png" // Using the uploaded steampunk avatar
};

export const educationItems: EducationItem[] = [
  {
    id: "edu1",
    title: "Bachelor's Degree in Computer Science",
    institution: "Institute of engineering and management,Kolkata",
    period: "2018 - 2022",
    description: "Studied computer science with a focus on web development and user experience design. Graduated with honors.",
    coordinates: { x: 22, y: 32 }
  },
  {
    id: "edu2",
    title: "Web Development Bootcamp",
    institution: "Coding Academy",
    period: "2020",
    description: "Intensive 3-month program focused on modern frontend technologies and best practices.",
    coordinates: { x: 38, y: 28 }
  }
];

export const achievementItems: AchievementItem[] = [
  {
    id: "ach1",
    title: "Hackathon Winner",
    date: "June 2022",
    description: "First place in the annual Code Challenge hackathon for creating an innovative web application.",
    coordinates: { x: 68, y: 35 }
  },
  {
    id: "ach2",
    title: "Open Source Contributor",
    date: "2021 - Present",
    description: "Active contributor to several open source projects with over 50 accepted pull requests.",
    coordinates: { x: 78, y: 48 }
  }
];

export const projectItems: ProjectItem[] = [
  {
    id: "proj1",
    title: "E-commerce Dashboard",
    description: "A responsive dashboard for e-commerce analytics with real-time data visualization and user management.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    image: "https://source.unsplash.com/random/800x600/?dashboard",
    link: "https://github.com/yourusername/project1",
    coordinates: { x: 18, y: 62 }
  },
  {
    id: "proj2",
    title: "Weather App",
    description: "A beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
    technologies: ["React", "Redux", "OpenWeatherMap API", "Mapbox"],
    image: "https://source.unsplash.com/random/800x600/?weather", 
    link: "https://github.com/yourusername/project2",
    coordinates: { x: 42, y: 72 }
  },
  {
    id: "proj3",
    title: "Task Management System",
    description: "A collaborative task management system with real-time updates, file sharing, and team communication features.",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "React Query"],
    image: "https://source.unsplash.com/random/800x600/?tasks",
    link: "https://github.com/yourusername/project3",
    coordinates: { x: 65, y: 68 }
  },
  {
    id: "proj4",
    title: "AI Chatbot Assistant",
    description: "An intelligent chatbot powered by machine learning that helps users find information and solve problems.",
    technologies: ["React", "Node.js", "OpenAI API", "Socket.io"],
    image: "https://source.unsplash.com/random/800x600/?robot",
    link: "https://github.com/yourusername/project4",
    coordinates: { x: 30, y: 45 }
  },
  {
    id: "proj5",
    title: "Portfolio Website",
    description: "An interactive portfolio website with a unique treasure map theme and engaging animations.",
    technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "https://source.unsplash.com/random/800x600/?map",
    link: "https://github.com/yourusername/portfolio",
    coordinates: { x: 55, y: 55 }
  }
];

export const skillItems: SkillItem[] = [
  {
    id: "skill1",
    name: "React",
    icon: "react",
    level: 5,
    coordinates: { x: 28, y: 15 }
  },
  {
    id: "skill2",
    name: "TypeScript",
    icon: "typescript",
    level: 4,
    coordinates: { x: 42, y: 12 }
  },
  {
    id: "skill3",
    name: "Tailwind CSS",
    icon: "tailwind",
    level: 5,
    coordinates: { x: 56, y: 16 }
  },
  {
    id: "skill4",
    name: "JavaScript",
    icon: "javascript",
    level: 5,
    coordinates: { x: 70, y: 18 }
  },
  {
    id: "skill5",
    name: "HTML/CSS",
    icon: "html",
    level: 5,
    coordinates: { x: 84, y: 22 }
  }
];
