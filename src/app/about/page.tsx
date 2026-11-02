import type { Metadata } from "next";
import { Skills } from "@/components/about/Skills";
// import PhotoGallery from "@/app/components/PhotoGallery";
// import OrbitalGrid from "./OrbitalGrid";
// import { Experience } from "./Experience";
import { getPageBySlug, getLifeUpdates, getData } from "@/lib/wp";
import { Blocks, Package , Compass} from "lucide-react";


export const metadata: Metadata = {
    title: "About Me | Jacky Fung",
    description: "6+ years of experience specializing in custom WordPress optimization and modern full-stack web applications.",
    openGraph: {
      title: "About Me | Jacky Fung",
      description: "Full-Stack Developer portfolio featuring headless WordPress & Nextjs projects.",
      url: "https://jfunki.com/about",
      siteName: "Jacky Fung's Portfolio",
      images: [
        {
          url: "https://jfunki.com/og-image.png", // Create a cool preview image and put it in your public folder!
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "profile",
    },
  };

export default async function AboutPage() {

    // use Promise to execute data fetching for both components, or else 
    // the second one would start only when the first is done
    const [pageData, updates] = await Promise.all([
        getPageBySlug("about"),
        getLifeUpdates()
    ]);

    const expData = await getData("experience", "orderby=date&order=desc");

    // when fetching pages by filtering through a slug, WP may send back a JSON 
    // array instead of JSON object beacuse it doesn't know if database contain 
    // duplicate slug. So we use a rawPageObject to verify and break it up 
    // if the returned response was a JSON Array.  

    const rawPageObject = Array.isArray(pageData) ? pageData[0] : pageData;
    const upcomingProjData = rawPageObject?.acf?.upcoming_projects || "";
    const acfData = rawPageObject?.acf || {};

    return (
        <div className="flex flex-col gap-16 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Side: Biography + Experience */}
            <div className="lg:col-span-6 space-y-12">
              {/* Biography Section */}
              <div className="bio-content max-w-none mb-5">
                {pageData?.content?.rendered && (
                  <>
                    <div className="flex flex-wrap items-baseline text-2xl sm:text-3xl font-bold font-mono mb-6 gap-x-4">
                      <span>Life in the</span>
                      <span className="whitespace-nowrap flex items-baseline">
                        C
                        <Package className="w-[0.7em] h-[0.7em] stroke-[2.5] self-center mx-[2px] translate-y-[2px]" />
                        de
                      </span>
                    </div>
                    <div
                      className="mt-5 text-white"
                      dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
                    />
                  </>
                )}
              </div>
    
              {/* Experience Section */}
              <div className="mt-10">
                <div className="flex flex-wrap items-baseline text-2xl sm:text-3xl font-bold font-mono mb-6 gap-x-4">
                  <span className="whitespace-nowrap flex items-baseline">
                    <Blocks className="w-[1em] h-[1em] stroke-[2.5] self-center mx-[2px] translate-y-[-2px]" />
                    xperience
                  </span>
                </div>
                {/* <Experience experiences={expData} /> */}
                Experience Section
              </div>
            </div>
    
            {/* Right Side: Skills + Upcoming Projects */}
            <div className="lg:col-span-6 pt-5">
              <div className="mb-10">
                <Skills acfData={acfData} />
                Skills Section
              </div>
    
              <div className="lg:sticky lg:top-24">
                {/* <OrbitalGrid upcomingProjects={upcomingProjData} /> */}
                Upcoming Projects Section
              </div>
            </div>
          </div>
    
          {/* Photo Gallery Section */}
          <div className="w-full border-t border-zinc-800/60 pt-12 pb-12">
            <div className="flex flex-wrap items-baseline text-2xl sm:text-3xl font-bold font-mono mb-6 gap-x-4">
              <span>Life</span>
              <span className="whitespace-nowrap flex items-baseline">
                b
                <Compass className="w-[0.7em] h-[0.7em] stroke-[2.5] self-center mx-[2px] translate-y-[1px]" />
                yond
              </span>
              <span className="whitespace-nowrap">the Code</span>
            </div>
            {/* <PhotoGallery wpData={updates} /> */}
            Photo Gallery Section
          </div>
        </div>
      );



  }