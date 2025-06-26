import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import { ChevronDownIcon, DownloadIcon, EyeIcon, TrashIcon } from "lucide-react";
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


export const History = (): JSX.Element => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [historyItems, setHistoryItems] = useState<any[]>([]);
const [modalOpen, setModalOpen] = useState(false);

interface ApiResponse {
  file?: string;
  url?: string;
  error?: string;
}


const [fetchError, setFetchError] = useState<string | null>(null); // สำหรับดึงเอกสาร
const [pdfError, setPdfError] = useState<string | null>(null); // สำหรับ export PDF
const [loading, setLoading] = useState(false);
const [pdfUrl, setPdfUrl] = useState<string | null>(null);

const handleGeneratePdf = async (documentId: string) => {
  setLoading(true);
  setPdfError(null);
  setPdfUrl(null);

  // ✅ ดึง token ที่ถูกต้องจาก Supabase SDK
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (!session) {
    setPdfError("ยังไม่ได้เข้าสู่ระบบ หรือ session หมดอายุ");
    setLoading(false);
    return;
  }

  const token = session.access_token;

  try {
    const res = await fetch('https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/export-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ ใช้ token ที่เชื่อถือได้
      },
      body: JSON.stringify({ documentId })
    });

    const data = await res.json();

    if (!res.ok) {
      setPdfError(data.error || 'เกิดข้อผิดพลาด');
    } else {
      setPdfUrl(data.url || null);
      console.log("PDF URL:", data.url);
    }
  } catch (err: any) {
    setPdfError(err.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
  }

  setLoading(false);
};


  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: t('nav.home'), active: false, path: "/" },
    { label: t('nav.upload'), active: false, path: "/upload" },
    { label: t('nav.analyzer'), active: false, path: "/analyzer" },
  ];

  type DocumentType = {
  project_name: string;
  document_id: string;
};

  const [documents, setDocuments] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchDocuments = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      setError("User not logged in");
      return;
    }

    const accessToken = session.access_token;

    const response = await fetch(
      "https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/list-documents",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const { error } = await response.json();
      setError(error);
      return;
    }

    const result = await response.json();

    // เก็บ object ทั้งชุด ไม่ map แค่ id
    setDocuments(result.document_ids);

    console.log("Fetched documents:", result.document_ids);
  };

  fetchDocuments();
}, []);

const handleLogout = () => {
  logout();
};

const [selectedProposal, setSelectedProposal] = useState<any>(null);

const fetchProposal = async (documentId: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return;
  }

  const response = await fetch(
    `https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/view-document?document_id=${documentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const err = await response.json();
    console.error("Fetch proposal error:", err);
    alert("ดึงข้อมูล proposal ไม่สำเร็จ");
    return;
  }

  const { proposal } = await response.json();
  console.log("Proposal fetched:", proposal);
  setSelectedProposal(proposal); // setState เพื่อแสดงผล
  setModalOpen(true);
};


 

const handleDeleteDocument = async (documentId: string) => {
  try {
    
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      return;
    }

    const accessToken = session.access_token;

  
    const res = await fetch(
      `https://xxkenjwjnoebowwlhdtk.supabase.co/functions/v1/del-new?document_id=${documentId}`,
      {
        method: "DELETE", 
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Delete failed:", result.error);
      alert(`ลบไม่สำเร็จ: ${result.error}`);
      return;
    }

    alert("ลบสำเร็จแล้ว");
    // 👉 รีเฟรชหรืออัปเดต state หลังลบ
  } catch (err: any) {
    console.error("Unexpected error:", err);
    alert("เกิดข้อผิดพลาดขณะลบเอกสาร");
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
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <nav className="space-y-2">
            <Link
              to="/profile"
              className="block w-full text-left px-4 py-3 rounded-lg font-['Inter'] text-gray-600 hover:bg-gray-50 font-normal transition-colors duration-200"
            >
              {t('nav.profile')}
            </Link>
            <div className="w-full text-left px-4 py-3 rounded-lg font-['Inter'] bg-blue-50 text-blue-600 font-medium">
              {t('nav.history')}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-['Inter'] font-bold text-3xl text-black mb-2">
                  {t('history.title')}
                </h1>
                <p className="font-['Inter'] text-gray-600 text-base">
                  {t('history.subtitle')}
                </p>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.username?.charAt(0)?.toUpperCase() 
  ?? user?.user_metadata?.displayName?.charAt(0)?.toUpperCase() 
  ?? user?.email?.charAt(0)?.toUpperCase() 
  ?? "?"}
                  </span>
                </div>
                <div>
                  <div className="font-['Inter'] font-semibold text-black text-sm">
                    {user?.username}
                  </div>
                  <div className="font-['Inter'] text-gray-500 text-xs">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={t('history.searchAnalysis')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-['Inter'] text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>
            </div>

            {/* History List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {documents.map((doc, index) => (
                <div
                 key={doc.document_id} 
                className={`flex items-center justify-between p-6 ${
                index !== documents.length - 1 ? "border-b border-gray-100" : ""
                }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-['Inter'] font-semibold text-black text-base">
                  {doc.project_name}
                    </h3>
                     <p className="font-['Inter'] text-gray-500 text-sm">
                   ID: {doc.document_id}
                    </p>
                     
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fetchProposal(doc.document_id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title={t('history.view')}
                      >
                        
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleGeneratePdf(doc.document_id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title={t('history.download')}
                      >
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteDocument(doc.document_id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title={t('history.delete')}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            

                {modalOpen && selectedProposal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 pb-16 px-4 z-50 overflow-auto"
    onClick={() => setModalOpen(false)}
  >
    <div
      className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 print:p-0 print:max-h-auto print:overflow-visible"
      onClick={(e) => e.stopPropagation()} // ป้องกันคลิกปิดเมื่อคลิกใน modal
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      {/* ชื่อเรื่องใหญ่ หน้ากระดาษ */}
      <h1 className="text-4xl font-bold mb-8 text-center">{selectedProposal.proposal_title}</h1>

      {/* แต่ละ section จะแยกด้วยเส้นใต้ และมี spacing เยอะ */}
      <section className="mb-8">
        <h2 className="font-semibold text-2xl border-b border-gray-300 pb-2 mb-4">
          Executive Summary
        </h2>
        <p className="whitespace-pre-line text-justify leading-relaxed text-gray-800">
          {selectedProposal.executive_summary}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-2xl border-b border-gray-300 pb-2 mb-4">
          Client Needs Understanding
        </h2>
        <p className="whitespace-pre-line text-justify leading-relaxed text-gray-800">
          {selectedProposal.client_needs_understanding}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-2xl border-b border-gray-300 pb-2 mb-4">
          Proposed Solution Description
        </h2>
        <p className="whitespace-pre-line text-justify leading-relaxed text-gray-800">
          {selectedProposal.proposed_solution_description}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-2xl border-b border-gray-300 pb-2 mb-4">
          Work Plan Timeline
        </h2>
        <p className="whitespace-pre-line text-justify leading-relaxed text-gray-800">
          {selectedProposal.work_plan_timeline}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-2xl border-b border-gray-300 pb-2 mb-4">
          Financial Proposal Details
        </h2>
        <p className="whitespace-pre-line text-justify leading-relaxed text-gray-800">
          {selectedProposal.financial_proposal_details}
        </p>
      </section>

      {/* ปุ่มปิด */}
      <div className="text-center">
        <button
          onClick={() => setModalOpen(false)}
          className="inline-block mt-6 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

            
          </div>
        </div>
        
      </div>
    </div>
  );
};