import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ChevronDownIcon,
  SearchIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  UsersIcon,
  BriefcaseIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
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

export const Analyzer = (): JSX.Element => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: t('nav.home'), active: false, path: "/" },
    { label: t('nav.upload'), active: false, path: "/upload" },
    { label: t('nav.analyzer'), active: true, path: "/analyzer" },
  ];

  const insightCards = [
    {
      icon: <SearchIcon className="w-8 h-8 text-blue-500" />,
      number: "7",
      label: t('analyzer.findings'),
      description: t('analyzer.findingsDesc')
    },
    {
      icon: <AlertTriangleIcon className="w-8 h-8 text-red-500" />,
      number: "3",
      label: t('analyzer.issues'),
      description: t('analyzer.issuesDesc')
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8 text-green-500" />,
      number: "12",
      label: t('analyzer.recommendations'),
      description: t('analyzer.recommendationsDesc')
    }
  ];

  const analysisResults = [
    {
      icon: <BriefcaseIcon className="w-12 h-12 text-blue-500" />,
      iconBg: "bg-blue-50",
      title: t('analyzer.executiveSummary'),
      description: t('analyzer.executiveDesc')
    },
    {
      icon: <UsersIcon className="w-12 h-12 text-purple-500" />,
      iconBg: "bg-purple-50",
      title: t('analyzer.teamExpertise'),
      description: t('analyzer.teamDesc')
    }
  ];

  const handleLogout = () => {
    logout();
  };

useEffect(() => {
  const fetchDocuments = async () => {
    try {
      // ดึง session และ access_token ของ user ปัจจุบัน
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('❌ ไม่มี session หรือ error:', error);
        setDocuments([]);
        return;
      }

      const token = session.access_token;
      const userId = session.user.id; // ดึง user id จาก session

      const res = await fetch(
        `https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/list-analyzer?user_id=${encodeURIComponent(userId)}`, // แนบ user_id ไปใน query
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // ใช้ token จาก session
          },
        }
      );

      const data = await res.json();
      console.log("📦 ได้ข้อมูล documents:", data);

      if (Array.isArray(data)) {
        setDocuments(data);
      } else {
        console.error("❌ ไม่ใช่ array:", data);
        setDocuments([]); // fallback กันหน้าแตก
      }
    } catch (err) {
      console.error('❌ โหลดเอกสารล้มเหลว:', err);
      setDocuments([]);
    }
  };

  fetchDocuments();
}, []);


const handleAnalyze = async () => {
  if (!selectedId) return;

  setLoading(true);
  try {
    // ดึง session และ token ของ user ปัจจุบัน
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      console.error('❌ ไม่มี session หรือ error:', error);
      setAnalysis('กรุณาล็อกอินก่อนทำการวิเคราะห์');
      setLoading(false);
      return;
    }

    const token = session.access_token;

    const res = await fetch('https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/smooth-responder', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // เพิ่มส่วนนี้
      },
      body: JSON.stringify({ document_id: selectedId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setAnalysis(errorData.error || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์');
    } else {
      const result = await res.json();
      setAnalysis(result.result || 'ไม่พบข้อมูล');
    }
  } catch (err) {
    console.error('❌ วิเคราะห์เอกสารล้มเหลว:', err);
    setAnalysis('เกิดข้อผิดพลาดในการวิเคราะห์');
  } finally {
    setLoading(false);
  }
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
      <div className="flex flex-col items-center p-8 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 w-full">
          <h1 className="font-['Inter'] font-bold text-black text-4xl md:text-5xl mb-4">
            {t('analyzer.title')}
          </h1>
          <p className="font-['Inter'] font-normal text-gray-600 text-lg">
            {t('analyzer.subtitle')}
          </p>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
          {insightCards.map((card, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <CardContent className="flex flex-col items-center text-center p-0">
                <div className="mb-4">
                  {card.icon}
                </div>
                <div className="font-['Inter'] font-bold text-3xl text-black mb-2">
                  {card.number}
                </div>
                <div className="font-['Inter'] font-semibold text-lg text-black mb-1">
                  {card.label}
                </div>
                <div className="font-['Inter'] font-normal text-sm text-gray-500">
                  {card.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis Results Section */}
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="font-['Inter'] font-bold text-black text-3xl md:text-4xl mb-4">
              {t('analyzer.resultsTitle')}
            </h2>
            <p className="font-['Inter'] font-normal text-gray-600 text-lg">
              {t('analyzer.resultsSubtitle')}
            </p>
          </div>

          {/* Analysis Cards */}
         <div>
      <select onChange={(e) => setSelectedId(e.target.value)}>
  <option value="">-- เลือกเอกสาร --</option>
  {documents.map((doc) => (
    <option key={doc.document_id} value={doc.document_id}>
      {doc.project_name}  {/* เปลี่ยนตรงนี้จาก file_name เป็น project_name */}
    </option>
  ))}
</select>

      <button onClick={handleAnalyze} disabled={loading || !selectedId}>
        {loading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์'}
      </button>

      {analysis && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3>ผลการวิเคราะห์:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  
        </div>
      </div>
    </div>
  );
};