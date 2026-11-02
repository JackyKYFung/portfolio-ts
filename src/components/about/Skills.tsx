"use client";

import { useState, useEffect, useMemo } from "react";

interface ACFSkillsData {
  wordpress?: string;
  payments?: string;
  frontend?: string;
  backend?: string;
  performance?: string;
  hosting?: string;
  design?: string;
  [key: string]: string | undefined;
}

interface SkillsProps {
  acfData: ACFSkillsData;
}

const CATEGORIES = [
  "wordpress",
  "payments",
  "frontend",
  "backend",
  "performance",
  "hosting",
  "design",
] as const;

export function Skills({ acfData }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Flatten and randomize skills
  const randomizedSkills = useMemo(() => {
    if (!acfData) return [];

    const categoryMap = [
      { field: "wordpress", cat: "wordpress" },
      { field: "payments", cat: "payments" },
      { field: "frontend", cat: "frontend" },
      { field: "backend", cat: "backend" },
      { field: "performance", cat: "performance" },
      { field: "hosting", cat: "hosting" },
      { field: "design", cat: "design" },
    ];

    const allSkills: Array<{ name: string; category: string }> = [];

    categoryMap.forEach(({ field, cat }) => {
      const rawString = acfData[field] || "";

      if (rawString) {
        const skillsArray = rawString
          .split("|")
          .map((item: string) => item.trim())
          .filter((item: string) => item !== "");

        skillsArray.forEach((skillName: string) => {
          allSkills.push({
            name: skillName,
            category: cat,
          });
        });
      }
    });

    return allSkills.sort(() => Math.random() - 0.5);
  }, [acfData]);

  // 2. Set mounted flag on client post-hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  };

  // Prevent hydration errors by rendering a hidden layout during SSR
  if (!isMounted) {
    return (
      <section className="opacity-0">
        <div className="skills-wrapper grid grid-cols-[100px_1fr] max-w-fit mx-auto lg:max-w-none p-5 border-[2px] rounded-xl">
          <h1 className="mb-5 items-end text-right font-bold">My Skills</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in">
      <div className="skills-wrapper grid grid-cols-[100px_1fr] max-w-fit mx-auto lg:max-w-none p-5 border-[2px] rounded-xl">
        {/* Sidebar Header */}
        <h1 className="mb-5 items-end text-right font-bold">My Skills</h1>
        <div className="self-center pl-5 mb-5">
          <p className="text-center text-xs opacity-80 italic">
            (The skills sort randomly on load!)
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="skill-categories flex flex-col items-end border-r border-black/10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                onClick={() => handleCategoryClick(cat)}
                data-cat={cat}
                className={`skill-category font-bold w-fit capitalize text-sm mb-2 transition-opacity ${
                  isActive
                    ? "opacity-100 text-white"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Skills Showcase Section */}
        <div className="skills pl-3 max-w-none lg:max-w-83 flex flex-wrap">
          {randomizedSkills.map((item, index) => {
            const isMatch = activeCategory === item.category;
            const isDimmed = activeCategory !== null && !isMatch;

            return (
              <span
                key={`${item.name}-${index}`}
                data-cat={item.category}
                className={`inline-block pr-[3px] text-sm md:text-lg lg:text-sm rounded cursor-default transition-all duration-300 font-bold ${
                  isMatch
                    ? "opacity-100 text-white scale-105"
                    : isDimmed
                    ? "opacity-25"
                    : "opacity-80"
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}