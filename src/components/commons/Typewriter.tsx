"use client";

import { useState, useEffect } from "react";

export function Typewriter() {
  const [text, setText] = useState<string>("turned");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [bgPos, setBgPos] = useState<number>(0);

  const suffixes: string[] = ["ed", "ing"];
  const base: string = "turn";

  useEffect(() => {
    const currentSuffix = suffixes[loopNum % suffixes.length];
    
    const fullText = `${base}${currentSuffix}`;

    const handleType = () => {
      if (!isDeleting) {
        const nextText = fullText.substring(0, text.length + 1);
        setText(nextText);

        if (nextText === fullText) {
          setBgPos((prev) => prev + 33); 
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        const nextText = fullText.substring(0, text.length - 1);
        setText(nextText);

        if (nextText === base) {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 200 : 300);
    return () => clearTimeout(timer);
  }, [isDeleting, loopNum, text]);

  return (
    <p className="text-center text-md md:text-base leading-relaxed">
      {/* Line 1 */}
      <span className="block sm:inline-block">A WordPress specialist</span> 
      
      {/* Line 2 */}
      <span className="block sm:inline-block sm:ml-1 py-2 sm:py-0">
        <span 
          className="inline-block bg-clip-text text-4xl sm:text-base text-transparent font-mono font-bold transition-all duration-3000 ease-in-out"
          style={{
            backgroundImage: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)',
            backgroundSize: '400% 100%',
            backgroundPosition: `${bgPos}% 0%`,
          }}
        >
          {text}
        </span>

        <span className="animate-pulse inline-block h-[1.2em] align-middle border-r-2 border-white/50 mr-1 sm:mr-0" /> 
      </span>   
      
      {/* Line 3 */}
      <span className="block sm:inline-block sm:ml-1">Full-Stack Developer</span>  
    </p>
  );
}