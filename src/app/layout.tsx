import type { Metadata } from "next";
import { Inter, Space_Mono } from 'next/font/google';
import "@/app/globals.css";
import { Header } from "@/components/commons/Header";
import { Footer } from "@/components/commons/Footer";
import RootClientWrapper from "@/components/commons/RootClientWrapper";
import { getGlobalSettings } from "@/lib/wp"; 

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


export default async function RootLayout({ children }: LayoutProps<"/">) {

  const globalPageData = await getGlobalSettings();
  
  const contactLinks = {
    contact_email: globalPageData?.acf?.contact_email || "j12funki@gmail.com",
    linkedin_url: globalPageData?.acf?.linkedin_url || "https://www.linkedin.com/in/jacky-fung/",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased bg-[#111] text-white px-10 py-15 md:max-w-3xl lg:max-w-4xl mx-auto">
          
          {/* 1. MOUNT THE CLIENT DRAWERS SEPARATELY OUTSIDE THE CONTENT TREE */}
          <RootClientWrapper contactData={contactLinks} />

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
