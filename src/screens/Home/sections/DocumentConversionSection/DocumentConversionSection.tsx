import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const DocumentConversionSection = (): JSX.Element => {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center gap-8 relative w-full max-w-[900px] mx-auto pt-12">
      {/* AI-Powered Badge */}
      <Badge
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-blue-200"
        variant="outline"
      >
        <div className="bg-gradient-to-r from-orange-400 to-red-500 w-2 h-2 rounded-full" />
        <span className="font-['Inter'] font-medium text-blue-600 text-sm">
          {t("home.badge")}
        </span>
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-2 h-2 rounded-full" />
      </Badge>

      {/* Main Heading */}
      <div className="text-center max-w-4xl">
        <h1 className="font-['Inter'] font-bold text-black leading-tight mb-6">
          <span className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-b from-[#FF8B0F]  via-[#7AB1E9] via-[#4299F4] to-[#0A81FF] bg-clip-text text-transparent">
            {t("home.title.sphere")}
          </span>

          <span className="text-black text-3xl md:text-4xl lg:text-4xl">
            {t("home.title.reads")}
          </span>
          <br />
          <span className="text-purple-600 text-3xl md:text-4xl lg:text-4xl">
            {t("home.title.uncovers")}
          </span>
          <br />
          <span className="text-purple-700 text-3xl md:text-4xl lg:text-4xl">
            {t("home.title.ready")}
          </span>
          <span className="text-black text-3xl md:text-4xl lg:text-4xl">
            {t("home.title.ai")}
          </span>
        </h1>
      </div>

      {/* Try Free Button */}
      <Button className="flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
        <span className="font-['Inter'] font-bold text-white text-xl mr-2">
          {t("home.tryFree")}
        </span>
        <ArrowRightIcon className="h-5 w-5 text-white" />
      </Button>

      {/* Security Features */}
      <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-['Inter'] font-normal text-gray-700 text-sm">
            {t("home.secure")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-['Inter'] font-normal text-gray-700 text-sm">
            {t("home.secure")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-['Inter'] font-normal text-gray-700 text-sm">
            {t("home.secure")}
          </span>
        </div>
      </div>
    </section>
  );
};
