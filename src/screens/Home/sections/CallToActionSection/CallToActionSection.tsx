import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import { useAuth } from "../../../../contexts/AuthContext";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const CallToActionSection = (): JSX.Element => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t('nav.home'), active: true, path: "/" },
    { label: t('nav.upload'), active: false, path: "/upload" },
    { label: t('nav.analyzer'), active: false, path: "/analyzer" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
   <header className="flex items-center justify-between px-6 py-6 md:px-[100px] w-full bg-white/10 backdrop-blur-md z-50">
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

      {/* Login/Profile and Language Selector */}
      <div className="flex items-center gap-[30px]">
        {/* Login Button or User Profile */}
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center hover:shadow-lg transition-shadow duration-200">
                <span className="text-white font-semibold text-sm">
                 {(user.username || user.email || "U").charAt(0).toUpperCase()}
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
        ) : (
          <Link to="/login">
            <Button className="bg-black text-white px-6 py-2 rounded-full text-xl font-normal font-['Inter'] hover:bg-gray-800 transition-colors duration-200">
              {t('nav.login')}
            </Button>
          </Link>
        )}

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
  );
};