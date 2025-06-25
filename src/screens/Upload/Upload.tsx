import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ChevronDownIcon, FolderIcon, TargetIcon, BriefcaseIcon, ClockIcon, DollarSignIcon, PackageIcon, AlertTriangleIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";

export const Upload = (): JSX.Element => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    projectName: "",
    projectObjective: "",
    scopeOfWork: "",
    timeline: "",
    budget: "",
    deliverables: "",
    constraints: ""
  });

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: t('nav.home'), active: false, path: "/" },
    { label: t('nav.upload'), active: true, path: "/upload" },
    { label: t('nav.analyzer'), active: false, path: "/analyzer" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    if (!formData.projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    console.log("Analyzing project:", formData);
    
    // Here you would typically send the data to your backend for processing
    alert("Project analysis started! This would normally process your data.");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 md:px-[100px] w-full bg-white border-b border-gray-100">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <div className="flex items-center">
              <img
                className="w-[60px] h-[60px] object-cover"
                alt="Sphere Logo"
                src="/---------------------------1.png"
              />
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <div className="font-extrabold text-black text-[32px] font-['Inter']">S</div>
                <div className="flex w-[11px] h-5 px-0 py-1.5 flex-col items-start relative">
                  <img
                    className="relative w-[15px] h-[15px] mb-[-7.00px] mr-[-4.00px]"
                    alt="Repeat"
                    src="/repeat-1.svg"
                  />
                  <img
                    className="mb-[-16.00px] mt-[-3px] relative"
                    alt="Frame"
                    src="/frame-1-1.svg"
                  />
                </div>
              </div>
              <div className="text-black text-2xl font-extrabold font-['Inter']">here</div>
            </div>
          </Link>

          {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-[30px]">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link to={item.path}>
                    <NavigationMenuLink
                      className={`px-4 py-2 rounded-[90px] text-xl font-['Inter'] transition-all duration-200 cursor-pointer ${
                        item.active
                          ? "bg-black text-white font-semibold"
                          : "text-black font-normal hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Profile and Language Selector */}
        <div className="flex items-center gap-[30px]">
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center hover:shadow-lg transition-shadow duration-200">
                <span className="text-white font-semibold text-sm">
                {user?.username?.charAt(0)?.toUpperCase()
  ?? user?.user_metadata?.displayName?.charAt(0)?.toUpperCase()
  ?? user?.email?.charAt(0)?.toUpperCase()
  ?? "?"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t('nav.profile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/history" className="flex items-center gap-2 w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('nav.history')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('nav.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-[5px] py-2.5 h-auto hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-lg font-normal text-black font-['Inter']">{language}</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('EN')}>
                <span className={language === 'EN' ? 'font-semibold' : ''}>EN</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('TH')}>
                <span className={language === 'TH' ? 'font-semibold' : ''}>TH</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8">
        <div className="w-full max-w-6xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <img
                className="w-12 h-12"
                alt="Sphere Icon"
                src="/---------------------------1.png"
              />
            </div>
            <h1 className="font-['Inter'] font-bold text-black text-4xl md:text-5xl mb-4">
              Create Project Analysis
            </h1>
            <p className="font-['Inter'] font-normal text-gray-600 text-xl">
              Fill in the project details to generate comprehensive analysis and proposals
            </p>
          </div>

          {/* Project Information Form */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="font-['Inter'] font-semibold text-black text-2xl mb-6">
                Project Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <FolderIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.projectName')}
                  </label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('upload.projectNamePlaceholder')}
                    required
                  />
                </div>

                {/* Project Objective */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <TargetIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.projectObjective')}
                  </label>
                  <input
                    type="text"
                    value={formData.projectObjective}
                    onChange={(e) => handleInputChange("projectObjective", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('upload.projectObjectivePlaceholder')}
                  />
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <ClockIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.timeline')}
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('upload.timelinePlaceholder')}
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <DollarSignIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.budget')}
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('upload.budgetPlaceholder')}
                  />
                </div>

                {/* Scope of Work */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <BriefcaseIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.scopeOfWork')}
                  </label>
                  <textarea
                    value={formData.scopeOfWork}
                    onChange={(e) => handleInputChange("scopeOfWork", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                    placeholder={t('upload.scopeOfWorkPlaceholder')}
                  />
                </div>

                {/* Deliverables */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <PackageIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.deliverables')}
                  </label>
                  <textarea
                    value={formData.deliverables}
                    onChange={(e) => handleInputChange("deliverables", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                    placeholder={t('upload.deliverablesPlaceholder')}
                  />
                </div>

                {/* Constraints */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    <AlertTriangleIcon className="w-4 h-4 inline mr-2" />
                    {t('upload.constraints')}
                  </label>
                  <textarea
                    value={formData.constraints}
                    onChange={(e) => handleInputChange("constraints", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                    placeholder={t('upload.constraintsPlaceholder')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generate Analysis Button */}
          <div className="text-center">
            <Button
              onClick={handleAnalyze}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-['Inter'] font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Generate Analysis
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="font-['Inter'] text-gray-500 text-sm">
              Your project information will be analyzed securely and privately. We don't store your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};