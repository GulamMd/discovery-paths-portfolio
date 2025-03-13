
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
}

// Replace this data with your actual information
export const contactInfo: ContactInfo = {
  name: "Your Name",
  title: "Frontend Developer",
  email: "your.email@example.com",
  phone: "+1 (123) 456-7890",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  location: "City, Country"
};

export const educationItems: EducationItem[] = [
  {
    id: "edu1",
    title: "Bachelor's Degree in Computer Science",
    institution: "University Name",
    period: "2015 - 2019",
    description: "Studied computer science with a focus on web development and user experience design. Graduated with honors.",
    coordinates: { x: 25, y: 35 }
  },
  {
    id: "edu2",
    title: "Web Development Bootcamp",
    institution: "Coding Academy",
    period: "2020",
    description: "Intensive 3-month program focused on modern frontend technologies and best practices.",
    coordinates: { x: 40, y: 30 }
  }
];

export const achievementItems: AchievementItem[] = [
  {
    id: "ach1",
    title: "Hackathon Winner",
    date: "June 2022",
    description: "First place in the annual Code Challenge hackathon for creating an innovative web application.",
    coordinates: { x: 65, y: 40 }
  },
  {
    id: "ach2",
    title: "Open Source Contributor",
    date: "2021 - Present",
    description: "Active contributor to several open source projects with over 50 accepted pull requests.",
    coordinates: { x: 75, y: 55 }
  }
];

export const projectItems: ProjectItem[] = [
  {
    id: "proj1",
    title: "E-commerce Dashboard",
    description: "A responsive dashboard for e-commerce analytics with real-time data visualization and user management.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    image: "/project1-image.jpg",
    link: "https://github.com/yourusername/project1",
    coordinates: { x: 20, y: 70 }
  },
  {
    id: "proj2",
    title: "Weather App",
    description: "A beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
    technologies: ["React", "Redux", "OpenWeatherMap API", "Mapbox"],
    image: "/project2-image.jpg", 
    link: "https://github.com/yourusername/project2",
    coordinates: { x: 40, y: 65 }
  },
  {
    id: "proj3",
    title: "Task Management System",
    description: "A collaborative task management system with real-time updates, file sharing, and team communication features.",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "React Query"],
    image: "/project3-image.jpg",
    link: "https://github.com/yourusername/project3",
    coordinates: { x: 60, y: 75 }
  }
];

export const skillItems: SkillItem[] = [
  {
    id: "skill1",
    name: "React",
    icon: "react",
    level: 5,
    coordinates: { x: 35, y: 20 }
  },
  {
    id: "skill2",
    name: "TypeScript",
    icon: "typescript",
    level: 4,
    coordinates: { x: 45, y: 15 }
  },
  {
    id: "skill3",
    name: "Tailwind CSS",
    icon: "tailwind",
    level: 5,
    coordinates: { x: 55, y: 20 }
  },
  {
    id: "skill4",
    name: "JavaScript",
    icon: "javascript",
    level: 5,
    coordinates: { x: 65, y: 25 }
  },
  {
    id: "skill5",
    name: "HTML/CSS",
    icon: "html",
    level: 5,
    coordinates: { x: 30, y: 25 }
  }
];
