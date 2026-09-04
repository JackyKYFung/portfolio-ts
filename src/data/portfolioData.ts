import {
    HomePageData,
    ContactInfo,
    SkillGroup,
    WorkExperience,
    UpcomingProject,
    PhotoGalleryItem,
    ProjectDescription,
    Project,
    ContactFormData,
} from '@/types/portfolio';

export const homePageData: HomePageData = {
    welcomeMessage: "Hi, I'm Jacky. A WordPress specialist turning Full-Stack Developer",
  };
  
  export const contactInfo: ContactInfo = {
    intro: "Let's build something together or talk web development.",
    email: "j12funki@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/jacky-fung/",
    githubUrl: "https://github.com/JackyKYFung/",
  };
  
  export const skillGroups: SkillGroup[] = [
    {
      category: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    },
    {
      category: "Backend & CMS",
      skills: ["PHP", "WordPress (Headless)", "Node.js", "Hono", "REST APIs"],
    },
  ];
  
  export const workExperiences: WorkExperience[] = [
    {
      id: "exp-1",
      role: "Web Developer",
      company: "Y5 Creative",
      location: "Vancouver, BC",
      dateRange: "2020 – Present",
      achievements: [
        "Maintained and optimized custom WordPress architectures and web applications.",
        "Developed responsive components using modern JavaScript frameworks.",
      ],
    },
  ];
  
  export const upcomingProjects: UpcomingProject[] = [
    {
      id: "up-1",
      name: "Full-Stack Next.js App",
      icon: "🚀",
    },
  ];
  
  export const photoGalleryItems: PhotoGalleryItem[] = [
    {
      id: "photo-1",
      imageUrl: "https://jfunki.com/_next/image?url=https%3A%2F%2Fwp.jfunki.com%2Fwp-content%2Fuploads%2F2026%2F05%2Fcoffee-scaled.webp&w=1920&q=75",
      caption: "Black Matcha at Tokyo Latte Mania",
      altText: "Coffee day in Tokyo",
      icon: "Coffee",
    },
  ];
  
  export const projects: Project[] = [
    {
      id: "proj-1",
      slug: "vancity-sippy",
      title: "Vancity Sippy",
      tagline: "A modern web application built with Next.js and Vercel.",
      thumbnailUrl: "/images/projects/vancity-sippy-thumb.jpg",
      coverImg: "/images/projects/vancity-sippy-cover.jpg",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      isFeatured: true,
      githubUrl: "https://github.com/JackyKYFung/vancity-sippy",
      liveUrl: "https://vancity-sippy.jfunki.com",
      details: {
        problem: "Needed a clean, performant platform to showcase locations for coffee.",
        goal: "Build a highly responsive application utilizing modern App Router features.",
        requirements: [
          "Strict TypeScript safety across components",
          "Fast page loads and optimized image delivery",
        ],
        solution: "Engineered a lightweight Next.js app with dynamic routes and static data rendering.",
        impact: [
          "Achieved fast Lighthouse performance scores",
          "Seamless deployment pipeline with Vercel",
        ],
      },
    },
  ];