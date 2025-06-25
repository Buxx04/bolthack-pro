import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ChevronDownIcon, CameraIcon, LogOutIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

export const Profile = (): JSX.Element => {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("Profile");
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: ""
  });

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: t('nav.home'), active: false, path: "/" },
    { label: t('nav.upload'), active: false, path: "/upload" },
    { label: t('nav.analyzer'), active: false, path: "/analyzer" },
  ];

  const sidebarItems = [
    { label: t('nav.profile'), active: activeTab === "Profile" },
    { label: t('nav.history'), active: activeTab === "History" },
  ];

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

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
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full text-left px-4 py-3 rounded-lg font-['Inter'] transition-colors duration-200 ${
                  item.active
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 font-normal"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-['Inter'] text-sm transition-colors duration-200"
            >
              <LogOutIcon className="w-4 h-4" />
              {t('profile.signOut')}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {activeTab === "Profile" && (
            <div className="max-w-2xl">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <CameraIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-['Inter'] font-bold text-2xl text-black">
                      {user.username}
                    </h1>
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-['Inter'] text-gray-500 text-sm mb-1">
                    ID: {user.id}@smartsphere123
                  </p>
                  <p className="font-['Inter'] text-gray-700 text-sm">
                    Email: {user.email}
                  </p>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-['Inter'] font-semibold text-xl text-black mb-6">
                  {t('profile.changePassword')}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={passwords.old}
                      onChange={(e) => handlePasswordChange("old", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder={t('profile.oldPassword')}
                    />
                  </div>
                  
                  <div>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => handlePasswordChange("new", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder={t('profile.newPassword')}
                    />
                  </div>
                  
                  <div>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                      placeholder={t('profile.confirmNewPassword')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "History" && (
            <div className="max-w-4xl">
              <h2 className="font-['Inter'] font-bold text-2xl text-black mb-6">
                {t('nav.history')}
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
                <p className="font-['Inter'] text-gray-500 text-lg">
                  {t('profile.noHistory')}
                </p>
                <p className="font-['Inter'] text-gray-400 text-sm mt-2">
                  {t('profile.uploadToSee')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};