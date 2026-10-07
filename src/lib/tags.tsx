// lib/tags.ts

export const TAG_THEMES: Record<string, string> = {
  javascript: "bg-[#FFA556]", 
  react: "bg-[#61AFEF]",      
  nextjs: "bg-[#B2FFA8]",     
  tailwind: "bg-[#56B6C2]",   
  css: "bg-[#ff7b71]",
  wordpress: "bg-[#ffd800]",
  acf: "bg-[#D6FF79]",
  php: "bg-[#7BC5F6]",
  elementor: "bg-[#4ec9b0]",
  wpbakery: "bg-[#6A69B5]",
  jquery: "bg-[#A96760]",
  html5: "bg-[#F36987]",
  "framer motion": "bg-[#FF0A74]",
  "headless wordpress": "bg-[#ffd800]",
  "graphql/rest api": "bg-[#FF674D]",
  vercel: "bg-[#022248]/200 text-white",
  default: "bg-black text-white",
};

/**
 * Helper to get the theme safely
 */
export const getTagTheme = (tagName: string) => {
  return TAG_THEMES[tagName.toLowerCase()] || TAG_THEMES.default;
};
