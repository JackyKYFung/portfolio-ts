import Image from "next/image";
import { Typewriter } from "@/components/commons/Typewriter";

export default function Home() {
  return (
    <section className="animate-fade-in px-5 flex flex-col justify-between min-h-[calc(100vh-220px)]">
    

      {/* Hero Container */}
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <h1 className="text-5xl md:text-6xl font-bold font-mono mb-8 sm:mb-5 tracking-tight leading-snug">
          Hi, I am Jacky
        </h1>
        <Typewriter />
        {/* Invisible spacer to perfectly balance the vertical center alignment */}
        <div className="hidden sm:block h-25" aria-hidden="true" />
      </div>

    </section>
  );
}
