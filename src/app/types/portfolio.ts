// Home & Global Content
export interface HomePageData {
    welcomeMessage: string;
  }
  
  // Contact Slider Types
  export interface ContactInfo {
    intro: string;
    email: string;
    linkedinUrl: string;
    githubUrl: string;
  }
  
  // About Page Structures
  export interface SkillGroup {
    category: string;
    skills: string[];
  }
  
  export interface WorkExperience {
    id: string;
    role: string;
    company: string;
    location: string;
    achievements: string[];
    dateRange: string;
  }

  
  export interface UpcomingProject {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface PhotoGalleryItem {
    id: string;
    imageUrl: string;
    caption: string;
    altText: string;
  }
  
  // Project Details page
  export interface ProjectDescription {
    problem: string;
    goal: string;
    requirements: string[];
    solution: string;
    impact: string[];
  }
  
  export interface Project {
    id: string;
    slug: string; 
    title: string;
    tagline: string;
    thumbnailUrl: string;
    coverImg?: string;
    previewCrop?: string;
    techStack: string[];
    isFeatured: boolean;
    liveUrl?: string;
    githubUrl?: string;
    details?: ProjectDescription;
  }
  
  // Contact Form 
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }