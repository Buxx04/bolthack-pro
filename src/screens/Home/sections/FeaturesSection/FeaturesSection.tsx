import { DownloadCloudIcon, SettingsIcon, UploadCloudIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const FeaturesSection = (): JSX.Element => {
  const { t } = useLanguage();

  const features = [
    {
      id: "01",
      idColor: "text-blue-200",
      icon: <UploadCloudIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700",
      title: t('home.step1.title'),
      description: t('home.step1.desc'),
    },
    {
      id: "02",
      idColor: "text-purple-200",
      icon: <SettingsIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700",
      title: t('home.step2.title'),
      description: t('home.step2.desc'),
    },
    {
      id: "03",
      idColor: "text-green-200",
      icon: <DownloadCloudIcon className="w-12 h-12 text-white" />,
      iconBg: "bg-gradient-to-b from-blue-200 via-teal-400 to-green-500",
      title: t('home.step3.title'),
      description: t('home.step3.desc'),
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 py-16 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 max-w-4xl px-4 text-center">
        <h2 className="font-['Inter'] font-bold text-black text-2xl md:text-3xl leading-tight">
          {t('home.steps.title')}
        </h2>
        <p className="font-['Inter'] font-normal text-gray-600 text-lg leading-relaxed">
          {t('home.steps.subtitle')}
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="flex flex-col h-full min-h-[400px] items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <CardContent className="flex flex-col items-center justify-between gap-6 p-0 h-full text-center">
              {/* Icon */}
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-xl ${feature.iconBg} flex-shrink-0`}
              >
                {feature.icon}
              </div>

              {/* Step Number */}
              <div
                className={`font-['Inter'] font-bold ${feature.idColor} text-6xl md:text-7xl leading-none flex-shrink-0`}
              >
                {feature.id}
              </div>

              {/* Content Container */}
              <div className="flex flex-col gap-4 flex-grow justify-center">
                {/* Title */}
                <h3 className="font-['Inter'] font-extrabold text-black text-xl leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-['Inter'] font-normal text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};