import type { Metadata } from "next";
import { Inter, Space_Mono } from 'next/font/google';
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RootClientWrapper from "@/components/RootClientWrapper";
//import { getGlobalSettings } from "@/lib/wp"; 

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Defines the CSS variable name
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono', 
})

export const metadata: Metadata = {
  title: "Jacky Fung | WordPress & Full-Stack Developer",
  description: "Personal portfolio showcasing headless WordPress and Next.js projects.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased bg-[#111] text-white px-10 py-15 md:max-w-3xl lg:max-w-4xl mx-auto">
          
          {/* 1. MOUNT THE CLIENT DRAWERS SEPARATELY OUTSIDE THE CONTENT TREE */}
          <RootClientWrapper />

          {/* 2. KEEP YOUR CORE PAGE CONTENT ON THE PURE SERVER TRACK */}
          <div 
            className="noise fixed inset-0 pointer-events-none z-[9999]" 
            aria-hidden="true" 
          />
          
          <div className="relative z-10">  
            <Header />
              <main className="flex-grow">{children}</main>
            <Footer />
          </div>
      </body>

        

    </html>
  );
}
