import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, ChevronDownIcon } from "lucide-react";
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
import { useLanguage } from "../../contexts/LanguageContext";
import { supabase } from "../../../supabase/supabaseClient";

export const SignUp = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t('nav.home'), active: false, path: "/" },
    { label: t('nav.upload'), active: false, path: "/upload" },
    { label: t('nav.analyzer'), active: false, path: "/analyzer" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up attempt:", formData);
  };

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    	options: {
    data: {
      displayName: formData.username,
    },
  },
  });

  if (error) {
    setMessage(`❌ ${error.message}`);
  } else {
    alert('✅ สมัครสมาชิกสำเร็จ! กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ');
  }

  setLoading(false);
};

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: "url('/signupbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-[100px] w-full bg-white/80 backdrop-blur-sm border-b border-gray-100">
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

        {/* Sign up and Language Selector */}
        <div className="flex items-center gap-[30px]">
          {/* Sign up Button */}
          <Button className="bg-black text-white px-6 py-2 rounded-full text-xl font-normal font-['Inter'] hover:bg-gray-800 transition-colors duration-200">
            {t('signup.signupButton')}
          </Button>

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
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <div className="flex items-center gap-16 max-w-6xl w-full">
          {/* Left Side - Text Content */}
          <div className="flex-1 max-w-lg">
            <h1 className="font-['Inter'] font-bold text-black text-5xl md:text-6xl leading-tight mb-4">
              {t('signup.join')}
            </h1>
            <h2 className="font-['Inter'] font-bold text-blue-500 text-5xl md:text-6xl leading-tight mb-6">
              {t('signup.sphere')}
            </h2>
            <h3 className="font-['Inter'] font-bold text-black text-3xl md:text-4xl leading-tight mb-4">
              {t('signup.partner')}
            </h3>
            <p className="font-['Inter'] font-normal text-gray-600 text-lg leading-relaxed">
              {t('signup.description')}
            </p>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="flex-shrink-0 w-full max-w-[400px]">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <img
                    className="w-10 h-10"
                    alt="Sphere Icon"
                    src="/---------------------------1.png"
                  />
                </div>
                <h2 className="font-['Inter'] font-bold text-black text-2xl">
                  {t('signup.signupButton')}
                </h2>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Username Field */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('login.username')}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('signup.email')}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('login.password')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                    placeholder={t('signup.confirmPassword')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-['Inter'] font-semibold rounded-xl transition-all duration-200 mt-6"
                >
                  {t('signup.signupButton')}
                 
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 font-['Inter']">
                  {t('signup.alreadyAccount')}{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {t('signup.signin')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-center gap-8 py-6 text-sm text-gray-500 font-['Inter']">
        <a href="#" className="hover:text-gray-700 transition-colors">
          {t('login.privacyPolicy')}
        </a>
        <a href="#" className="hover:text-gray-700 transition-colors">
          {t('login.termsOfService')}
        </a>
        <a href="#" className="hover:text-gray-700 transition-colors">
          {t('login.help')}
        </a>
      </footer>
    </div>
  );
};