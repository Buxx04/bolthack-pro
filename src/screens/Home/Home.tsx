import React from "react";
import { CallToActionSection } from "./sections/CallToActionSection";
import { DocumentConversionSection } from "./sections/DocumentConversionSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HeroSection } from "./sections/HeroSection";

export const Home = (): JSX.Element => {
  return (
    <div 
      className="flex flex-row justify-center w-full min-h-screen relative"
      style={{
        backgroundImage: "url('/homebg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]"></div>
      
      <div className="bg-transparent overflow-hidden w-full max-w-[1440px] relative z-10">
        {/* Content */}
        <div className="relative z-10 flex flex-col w-full">
          <CallToActionSection />
          <div className="flex flex-col items-center gap-24 px-5 py-12 w-full">
            <DocumentConversionSection />
            <FeaturesSection />
            <HeroSection />
          </div>
        </div>
      </div>
    </div>
  );
};