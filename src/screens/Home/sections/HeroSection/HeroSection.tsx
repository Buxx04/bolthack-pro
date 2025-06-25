import { AwardIcon, ClockIcon, CpuIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const HeroSection = (): JSX.Element => {
  const { t } = useLanguage();

  const featureCards = [
    {
      icon: <SearchIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-r from-orange-400 via-red-500 to-orange-600",
      title: t('home.feature1.title'),
      description: t('home.feature1.desc'),
    },
    {
      icon: <CpuIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600",
      title: t('home.feature2.title'),
      description: t('home.feature2.desc'),
    },
    {
      icon: <ClockIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-r from-green-500 via-teal-500 to-teal-600",
      title: t('home.feature3.title'),
      description: t('home.feature3.desc'),
    },
    {
      icon: <AwardIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600",
      title: t('home.feature4.title'),
      description: t('home.feature4.desc'),
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 w-full max-w-6xl mx-auto">
      {/* Premium Features Badge */}
      <Badge
        variant="outline"
        className="flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-full border-purple-200"
      >
        <img className="w-5 h-5" alt="Award" src="/award.svg" />
        <span className="font-['Prompt'] font-light text-purple-700 text-sm">
          {t('home.premium')}
        </span>
      </Badge>

      {/* Section Title */}
      <h2 className="font-['Inter'] font-extrabold text-black text-3xl md:text-4xl text-center max-w-2xl">
        {t('home.features.title')}
      </h2>

      {/* Feature Cards */}
      <div className="flex flex-col w-full gap-6">
        {featureCards.map((card, index) => (
          <Card
            key={`feature-card-${index}`}
            className="flex items-start gap-6 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 bg-white"
          >
            <CardContent className="p-0 flex gap-6 w-full">
              {/* Icon */}
              <div
                className={`flex w-20 h-20 items-center justify-center rounded-xl ${card.iconBg} flex-shrink-0`}
              >
                {card.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-['Inter'] font-semibold text-black text-xl md:text-2xl leading-tight">
                  {card.title}
                </h3>
                <p className="font-['Inter'] font-normal text-gray-600 text-base md:text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};