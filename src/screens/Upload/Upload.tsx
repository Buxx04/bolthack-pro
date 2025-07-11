import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ChevronDownIcon, FolderIcon, TargetIcon, BriefcaseIcon, ClockIcon, DollarSignIcon, PackageIcon, AlertTriangleIcon, BookOpenIcon, CheckCircleIcon, SettingsIcon } from "lucide-react";
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
import { supabase } from "../../../supabase/supabaseClient";

export const Upload = (): JSX.Element => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [documentType, setDocumentType] = useState<'RFP' | 'TOR'>('RFP');
  
  // RFP Form Data
  const [rfpFormData, setRfpFormData] = useState({
    Project_Name: "",
    Project_Objective: "",
    Scope_of_Work: "",
    Timeline: "",
    Budget: "",
    Deliverables: "",
    Constraints: ""
  });

  // TOR Form Data
  const [torFormData, setTorFormData] = useState({
    Project_Title: "",
    Background: "",
    Objective: "",
    Scope_of_Work: "",
    Deliverables: "",
    Duration: "",
    Evaluation_Criteria: "",
    Technical_Requirement: ""
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

  const handleRfpInputChange = (field: string, value: string) => {
    setRfpFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTorInputChange = (field: string, value: string) => {
    setTorFormData(prev => ({ ...prev, [field]: value }));
  };

  const [loading, setLoading] = useState(false);
const [proposalResult, setProposalResult] = useState<any>(null);
const [error, setError] = useState<string | null>(null);

const handleAnalyze = async () => {
  setLoading(true);
  setProposalResult(null);
  setError(null);

  const fields = documentType === 'RFP' ? rfpFormData : torFormData;

  const payload = {
    type: documentType,
    fields,
  };

  try {
  
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error("ไม่สามารถดึง session ได้");
    }
    console.log("Payload:", payload);
    const response = await fetch(
      "https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/proposal-gen",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}` 
        },
        body: JSON.stringify(payload)
      }
    );
    

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "เกิดข้อผิดพลาดจาก API");
    }

    setProposalResult(data.proposal);
    console.log("Proposal Result:", data.proposal);
  } catch (err: any) {
    setError(err.message || "เกิดข้อผิดพลาด");
  } finally {
    setLoading(false);
  }
};
 const handleLogout = () => {
    logout();
  };

  const formatSectionTitle = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize
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
              {t('upload.title')}
            </h1>
            <p className="font-['Inter'] font-normal text-gray-600 text-xl">
              {t('upload.subtitle')}
            </p>
          </div>

          {/* Document Type Selection */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-['Inter'] font-semibold text-black text-lg mb-4">
                Document Type
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setDocumentType('RFP')}
                  className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                    documentType === 'RFP'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <BriefcaseIcon className="w-5 h-5" />
                    <span>RFP (Request for Proposal)</span>
                  </div>
                </button>
                <button
                  onClick={() => setDocumentType('TOR')}
                  className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                    documentType === 'TOR'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <BookOpenIcon className="w-5 h-5" />
                    <span>TOR (Terms of Reference)</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* RFP Form */}
          {documentType === 'RFP' && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="font-['Inter'] font-semibold text-black text-2xl">
                    RFP Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <FolderIcon className="w-4 h-4 inline mr-2" />
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={rfpFormData.Project_Name}
                      onChange={(e) => handleRfpInputChange("Project_Name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  {/* Project Objective */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <TargetIcon className="w-4 h-4 inline mr-2" />
                      Project Objective
                    </label>
                    <input
                      type="text"
                      value={rfpFormData.Project_Objective}
                      onChange={(e) => handleRfpInputChange("Project_Objective", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="Describe the main objective"
                    />
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <ClockIcon className="w-4 h-4 inline mr-2" />
                      Timeline
                    </label>
                    <input
                      type="text"
                      value={rfpFormData.Timeline}
                      onChange={(e) => handleRfpInputChange("Timeline", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="e.g., 6 months, Q1 2024"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <DollarSignIcon className="w-4 h-4 inline mr-2" />
                      Budget
                    </label>
                    <input
                      type="text"
                      value={rfpFormData.Budget}
                      onChange={(e) => handleRfpInputChange("Budget", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="e.g., $50,000"
                    />
                  </div>

                  {/* Scope of Work */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <BriefcaseIcon className="w-4 h-4 inline mr-2" />
                      Scope of Work
                    </label>
                    <textarea
                      value={rfpFormData.Scope_of_Work}
                      onChange={(e) => handleRfpInputChange("Scope_of_Work", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="Define the scope and boundaries of the work"
                    />
                  </div>

                  {/* Deliverables */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <PackageIcon className="w-4 h-4 inline mr-2" />
                      Deliverables
                    </label>
                    <textarea
                      value={rfpFormData.Deliverables}
                      onChange={(e) => handleRfpInputChange("Deliverables", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="List expected deliverables and outcomes"
                    />
                  </div>

                  {/* Constraints */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <AlertTriangleIcon className="w-4 h-4 inline mr-2" />
                      Constraints
                    </label>
                    <textarea
                      value={rfpFormData.Constraints}
                      onChange={(e) => handleRfpInputChange("Constraints", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="Describe any limitations or constraints"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOR Form */}
          {documentType === 'TOR' && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="font-['Inter'] font-semibold text-black text-2xl">
                    TOR Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <FolderIcon className="w-4 h-4 inline mr-2" />
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={torFormData.Project_Title}
                      onChange={(e) => handleTorInputChange("Project_Title", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="Enter project title"
                      required
                    />
                  </div>

                  {/* Objective */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <TargetIcon className="w-4 h-4 inline mr-2" />
                      Objective
                    </label>
                    <input
                      type="text"
                      value={torFormData.Objective}
                      onChange={(e) => handleTorInputChange("Objective", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="Define the main objective"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <ClockIcon className="w-4 h-4 inline mr-2" />
                      Duration
                    </label>
                    <input
                      type="text"
                      value={torFormData.Duration}
                      onChange={(e) => handleTorInputChange("Duration", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="e.g., 12 months, 2024-2025"
                    />
                  </div>

                  {/* Evaluation Criteria */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <CheckCircleIcon className="w-4 h-4 inline mr-2" />
                      Evaluation Criteria
                    </label>
                    <input
                      type="text"
                      value={torFormData.Evaluation_Criteria}
                      onChange={(e) => handleTorInputChange("Evaluation_Criteria", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder="Define evaluation criteria"
                    />
                  </div>

                  {/* Background (Context) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <BookOpenIcon className="w-4 h-4 inline mr-2" />
                      Background (Context)
                    </label>
                    <textarea
                      value={torFormData.Background}
                      onChange={(e) => handleTorInputChange("Background", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="Provide background and context for the project"
                    />
                  </div>

                  {/* Scope of Work */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <BriefcaseIcon className="w-4 h-4 inline mr-2" />
                      Scope of Work
                    </label>
                    <textarea
                      value={torFormData.Scope_of_Work}
                      onChange={(e) => handleTorInputChange("Scope_of_Work", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="Define the scope and boundaries of the work"
                    />
                  </div>

                  {/* Deliverables */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <PackageIcon className="w-4 h-4 inline mr-2" />
                      Deliverables
                    </label>
                    <textarea
                      value={torFormData.Deliverables}
                      onChange={(e) => handleTorInputChange("Deliverables", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="List expected deliverables and outcomes"
                    />
                  </div>

                  {/* Technical Requirement */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                      <SettingsIcon className="w-4 h-4 inline mr-2" />
                      Technical Requirement
                    </label>
                    <textarea
                      value={torFormData.Technical_Requirement}
                      onChange={(e) => handleTorInputChange("Technical_Requirement", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white resize-none"
                      placeholder="Specify technical requirements and specifications"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generate Analysis Button */}
          <div className="text-center">
           <Button
  onClick={handleAnalyze}
  disabled={loading}
  className={`px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-['Inter'] font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg transform ${
    loading ? 'opacity-60 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105'
  }`}
>
  {loading ? (
    <div className="flex items-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>กำลังประมวลผล...</span>
    </div>
  ) : (
    t('upload.analyzeDocument')
  )}
</Button>
          </div>
          {proposalResult && (
  <div className="mt-6 border p-6 rounded-lg bg-white shadow-md space-y-6">
    <h2 className="text-2xl font-bold text-blue-700">📄 Proposal Generated</h2>
    {Object.entries(proposalResult).map(([key, value]) => (
      <div key={key} className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {formatSectionTitle(key)}
        </h3>
        <div className="whitespace-pre-wrap text-gray-700">
          {value}
        </div>
      </div>
    ))}
  </div>
)}

          {/* Help Text */}
          <div className="mt-8 text-center">
          
          </div>
        </div>
      </div>
    </div>
  );
};