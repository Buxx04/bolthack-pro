import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'TH';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation dictionary
const translations = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.upload': 'Upload',
    'nav.analyzer': 'Analyzer',
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    'nav.history': 'History',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.badge': 'AI-Powered Proposal Generation',
    'home.title.sphere': 'Sphere',
    'home.title.reads': ' reads your documents,',
    'home.title.uncovers': 'uncovers insights, and generates',
    'home.title.ready': 'ready-to-send proposals.',
    'home.title.ai': ' — All with AI.',
    'home.tryFree': 'Try Free',
    'home.secure': 'Secure & Private',
    'home.steps.title': 'Turn your document into a proposal — in 3 simple steps',
    'home.steps.subtitle': 'Built from what\'s inside, not around it.',
    'home.step1.title': '1. Upload your RFP or TOR',
    'home.step1.desc': 'Submit your file — Sphere carefully reads and interprets the content.',
    'home.step2.title': '2. See what matters',
    'home.step2.desc': 'We extract key goals, issues, and instructions that shape your proposal.',
    'home.step3.title': '3. Download a structured response',
    'home.step3.desc': 'You get a clean, formal proposal — built directly from your RFP or TOR.',
    'home.features.title': 'What Sphere Does for You',
    'home.feature1.title': 'Reveal gaps, contradictions, and vague requirements',
    'home.feature1.desc': 'Spot missing deadlines, unclear deliverables, or conflicting instructions that could affect your response.',
    'home.feature2.title': 'Draft a full proposal — based entirely on the brief',
    'home.feature2.desc': 'No templates. No guesswork. Sphere writes a structured, relevant proposal directly from what the document requires.',
    'home.feature3.title': 'You\'ll spend your time reviewing — not rewriting',
    'home.feature3.desc': 'You get a structured draft that\'s easy to work with — so instead of spending hours summarizing or copying, you can simply review, refine, and send.',
    'home.feature4.title': 'You get a proposal that\'s properly formatted and ready to submit',
    'home.feature4.desc': 'Clean layout. Clear sections. No extra formatting needed.',
    'home.premium': 'Premium Features',
    
    // Login Page
    'login.welcome': 'Welcome to',
    'login.sphere': 'Sphere',
    'login.enhance': 'Enhance your proposal process with Sphere.',
    'login.analyze': 'Analyze RFP or TOR files with precision and generate high-quality, ready proposals.',
    'login.save': 'Save time, reduce complexity, and boost professionalism—',
    'login.smart': 'all through smart, fast, and effective document communication.',
    'login.memberLogin': 'Member login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.emailPassword': 'Email password',
    'login.forgotPassword': 'Forgot password',
    'login.loginButton': 'Login',
    'login.createAccount': 'Create Account',
    'login.privacyPolicy': 'Privacy Policy',
    'login.termsOfService': 'Terms of Service',
    'login.help': 'Help',
    
    // Sign Up Page
    'signup.join': 'Join',
    'signup.sphere': 'Sphere',
    'signup.partner': 'Your partner',
    'signup.description': 'in powerful proposal generation, delivering speed, simplicity and professional results at your fingertips',
    'signup.signupButton': 'Sign up',
    'signup.email': 'Email',
    'signup.confirmPassword': 'Confirm Password',
    'signup.alreadyAccount': 'Already have an account?',
    'signup.signin': 'Sign in',
    
    // Upload Page
    'upload.title': 'Analyze RFP or TOR documents',
    'upload.subtitle': 'Upload your RFP or TOR to generate a proposal tailored to your needs',
    'upload.dropHere': 'Drop your document here, or',
    'upload.browse': 'browse',
    'upload.supports': 'Supports: PDF, DOC, DOCX, TXT (Max 10MB)',
    'upload.analyzeDocument': 'Analyze Document',
    'upload.secureNote': 'Your document will be analyzed securely and privately. We don\'t store your files.',
    
    // New Upload Form Fields
    'upload.projectName': 'Project Name',
    'upload.projectNamePlaceholder': 'Enter project name',
    'upload.projectObjective': 'Project Objective',
    'upload.projectObjectivePlaceholder': 'Describe the main objective of the project',
    'upload.scopeOfWork': 'Scope of Work',
    'upload.scopeOfWorkPlaceholder': 'Define the scope and boundaries of the work',
    'upload.timeline': 'Timeline',
    'upload.timelinePlaceholder': 'Enter project timeline (e.g., 6 months, Q1 2024)',
    'upload.budget': 'Budget',
    'upload.budgetPlaceholder': 'Enter budget amount (e.g., $50,000)',
    'upload.deliverables': 'Deliverables',
    'upload.deliverablesPlaceholder': 'List expected deliverables and outcomes',
    'upload.constraints': 'Constraints',
    'upload.constraintsPlaceholder': 'Describe any limitations or constraints',
    
    // Analyzer Page
    'analyzer.title': 'Proposal Insights',
    'analyzer.subtitle': 'View key performance indicators derived from the analysis.',
    'analyzer.findings': 'Findings',
    'analyzer.findingsDesc': 'Key insights discovered',
    'analyzer.issues': 'Issues',
    'analyzer.issuesDesc': 'Areas requiring attention',
    'analyzer.recommendations': 'Recommendations',
    'analyzer.recommendationsDesc': 'Suggested improvements',
    'analyzer.resultsTitle': 'Analysis Results',
    'analyzer.resultsSubtitle': 'Analysis Overview (Grouped by Category)',
    'analyzer.executiveSummary': 'Executive Summary',
    'analyzer.executiveDesc': 'A brief overview of the proposal and its key offerings.',
    'analyzer.teamExpertise': 'Team and Expertise',
    'analyzer.teamDesc': 'Roles and experience of the project team members.',
    
    // Profile Page
    'profile.changePassword': 'Change password',
    'profile.oldPassword': 'old password',
    'profile.newPassword': 'new password',
    'profile.confirmNewPassword': 'confirm new password',
    'profile.signOut': 'Sign Out',
    'profile.noHistory': 'No analysis history available yet.',
    'profile.uploadToSee': 'Upload and analyze documents to see your history here.',
    
    // History Page
    'history.title': 'History',
    'history.subtitle': 'View your analysis history and download generated proposals',
    'history.searchAnalysis': 'Search analysis',
    'history.businessPlan': 'Business plan',
    'history.marketingStrategy': 'Marketing strategy',
    'history.technicalProposal': 'Technical proposal',
    'history.financialAnalysis': 'Financial analysis',
    'history.researchProposal': 'Research proposal',
    'history.strategicPlan': 'Strategic plan',
    'history.daysAgo': 'days ago',
    'history.weekAgo': 'week ago',
    'history.weeksAgo': 'weeks ago',
    'history.monthAgo': 'month ago',
    'history.view': 'View',
    'history.download': 'Download',
    'history.delete': 'Delete',
  },
  TH: {
    // Navigation
    'nav.home': 'หน้าหลัก',
    'nav.upload': 'อัปโหลด',
    'nav.analyzer': 'วิเคราะห์',
    'nav.login': 'เข้าสู่ระบบ',
    'nav.profile': 'โปรไฟล์',
    'nav.history': 'ประวัติ',
    'nav.logout': 'ออกจากระบบ',
    
    // Home Page
    'home.badge': 'การสร้างข้อเสนอด้วย AI',
    'home.title.sphere': 'Sphere',
    'home.title.reads': ' อ่านเอกสารของคุณ',
    'home.title.uncovers': 'ค้นหาข้อมูลเชิงลึก และสร้าง',
    'home.title.ready': 'ข้อเสนอที่พร้อมส่ง',
    'home.title.ai': ' — ทั้งหมดด้วย AI',
    'home.tryFree': 'ทดลองฟรี',
    'home.secure': 'ปลอดภัยและเป็นส่วนตัว',
    'home.steps.title': 'เปลี่ยนเอกสารของคุณเป็นข้อเสนอ — ใน 3 ขั้นตอนง่ายๆ',
    'home.steps.subtitle': 'สร้างจากสิ่งที่อยู่ข้างใน ไม่ใช่รอบๆ มัน',
    'home.step1.title': '1. อัปโหลด RFP หรือ TOR ของคุณ',
    'home.step1.desc': 'ส่งไฟล์ของคุณ — Sphere อ่านและตีความเนื้อหาอย่างระมัดระวัง',
    'home.step2.title': '2. ดูสิ่งที่สำคัญ',
    'home.step2.desc': 'เราดึงเป้าหมายหลัก ปัญหา และคำแนะนำที่สำคัญที่กำหนดข้อเสนอของคุณ',
    'home.step3.title': '3. ดาวน์โหลดการตอบสนองที่มีโครงสร้าง',
    'home.step3.desc': 'คุณจะได้ข้อเสนอที่สะอาดและเป็นทางการ — สร้างโดยตรงจาก RFP หรือ TOR ของคุณ',
    'home.features.title': 'สิ่งที่ Sphere ทำให้คุณ',
    'home.feature1.title': 'เปิดเผยช่องว่าง ความขัดแย้ง และข้อกำหนดที่คลุมเครือ',
    'home.feature1.desc': 'ตรวจพบกำหนดเวลาที่หายไป ผลงานที่ไม่ชัดเจน หรือคำแนะนำที่ขัดแย้งกันที่อาจส่งผลต่อการตอบสนองของคุณ',
    'home.feature2.title': 'ร่างข้อเสนอฉบับเต็ม — อิงจากสรุปทั้งหมด',
    'home.feature2.desc': 'ไม่มีเทมเพลต ไม่ต้องเดา Sphere เขียนข้อเสนอที่มีโครงสร้างและเกี่ยวข้องโดยตรงจากสิ่งที่เอกสารต้องการ',
    'home.feature3.title': 'คุณจะใช้เวลาในการตรวจสอบ — ไม่ใช่เขียนใหม่',
    'home.feature3.desc': 'คุณจะได้ร่างที่มีโครงสร้างที่ง่ายต่อการทำงาน — แทนที่จะใช้เวลาหลายชั่วโมงในการสรุปหรือคัดลอก คุณสามารถตรวจสอบ ปรับแต่ง และส่งได้',
    'home.feature4.title': 'คุณจะได้ข้อเสนอที่จัดรูปแบบอย่างเหมาะสมและพร้อมส่ง',
    'home.feature4.desc': 'เลย์เอาต์สะอาด ส่วนที่ชัดเจน ไม่ต้องจัดรูปแบบเพิ่มเติม',
    'home.premium': 'คุณสมบัติพรีเมียม',
    
    // Login Page
    'login.welcome': 'ยินดีต้อนรับสู่',
    'login.sphere': 'Sphere',
    'login.enhance': 'ปรับปรุงกระบวนการข้อเสนอของคุณด้วย Sphere',
    'login.analyze': 'วิเคราะห์ไฟล์ RFP หรือ TOR อย่างแม่นยำและสร้างข้อเสนอคุณภาพสูงที่พร้อมใช้',
    'login.save': 'ประหยัดเวลา ลดความซับซ้อน และเพิ่มความเป็นมืออาชีพ—',
    'login.smart': 'ทั้งหมดผ่านการสื่อสารเอกสารที่ฉลาด รวดเร็ว และมีประสิทธิภาพ',
    'login.memberLogin': 'เข้าสู่ระบบสมาชิก',
    'login.username': 'ชื่อผู้ใช้',
    'login.password': 'รหัสผ่าน',
    'login.emailPassword': 'อีเมลรหัสผ่าน',
    'login.forgotPassword': 'ลืมรหัสผ่าน',
    'login.loginButton': 'เข้าสู่ระบบ',
    'login.createAccount': 'สร้างบัญชี',
    'login.privacyPolicy': 'นโยบายความเป็นส่วนตัว',
    'login.termsOfService': 'เงื่อนไขการให้บริการ',
    'login.help': 'ช่วยเหลือ',
    
    // Sign Up Page
    'signup.join': 'เข้าร่วม',
    'signup.sphere': 'Sphere',
    'signup.partner': 'พันธมิตรของคุณ',
    'signup.description': 'ในการสร้างข้อเสนอที่ทรงพลัง มอบความเร็ว ความเรียบง่าย และผลลัพธ์ระดับมืออาชีพที่ปลายนิ้วของคุณ',
    'signup.signupButton': 'สมัครสมาชิก',
    'signup.email': 'อีเมล',
    'signup.confirmPassword': 'ยืนยันรหัสผ่าน',
    'signup.alreadyAccount': 'มีบัญชีอยู่แล้ว?',
    'signup.signin': 'เข้าสู่ระบบ',
    
    // Upload Page
    'upload.title': 'วิเคราะห์เอกสาร RFP หรือ TOR',
    'upload.subtitle': 'อัปโหลด RFP หรือ TOR ของคุณเพื่อสร้างข้อเสนอที่เหมาะกับความต้องการของคุณ',
    'upload.dropHere': 'วางเอกสารของคุณที่นี่ หรือ',
    'upload.browse': 'เรียกดู',
    'upload.supports': 'รองรับ: PDF, DOC, DOCX, TXT (สูงสุด 10MB)',
    'upload.analyzeDocument': 'วิเคราะห์เอกสาร',
    'upload.secureNote': 'เอกสารของคุณจะถูกวิเคราะห์อย่างปลอดภัยและเป็นส่วนตัว เราไม่เก็บไฟล์ของคุณ',
    
    // New Upload Form Fields
    'upload.projectName': 'ชื่อโครงการ',
    'upload.projectNamePlaceholder': 'กรอกชื่อโครงการ',
    'upload.projectObjective': 'วัตถุประสงค์โครงการ',
    'upload.projectObjectivePlaceholder': 'อธิบายวัตถุประสงค์หลักของโครงการ',
    'upload.scopeOfWork': 'ขอบเขตงาน',
    'upload.scopeOfWorkPlaceholder': 'กำหนดขอบเขตและขอบเขตของงาน',
    'upload.timeline': 'กรอบเวลา',
    'upload.timelinePlaceholder': 'กรอกกรอบเวลาโครงการ (เช่น 6 เดือน, Q1 2024)',
    'upload.budget': 'งบประมาณ',
    'upload.budgetPlaceholder': 'กรอกจำนวนงบประมาณ (เช่น 50,000 บาท)',
    'upload.deliverables': 'ผลงานที่ส่งมอบ',
    'upload.deliverablesPlaceholder': 'ระบุผลงานและผลลัพธ์ที่คาดหวัง',
    'upload.constraints': 'ข้อจำกัด',
    'upload.constraintsPlaceholder': 'อธิบายข้อจำกัดหรือเงื่อนไขต่างๆ',
    
    // Analyzer Page
    'analyzer.title': 'ข้อมูลเชิงลึกข้อเสนอ',
    'analyzer.subtitle': 'ดูตัวชี้วัดประสิทธิภาพหลักที่ได้จากการวิเคราะห์',
    'analyzer.findings': 'การค้นพบ',
    'analyzer.findingsDesc': 'ข้อมูลเชิงลึกหลักที่ค้นพบ',
    'analyzer.issues': 'ปัญหา',
    'analyzer.issuesDesc': 'พื้นที่ที่ต้องการความสนใจ',
    'analyzer.recommendations': 'คำแนะนำ',
    'analyzer.recommendationsDesc': 'การปรับปรุงที่แนะนำ',
    'analyzer.resultsTitle': 'ผลการวิเคราะห์',
    'analyzer.resultsSubtitle': 'ภาพรวมการวิเคราะห์ (จัดกลุ่มตามหมวดหมู่)',
    'analyzer.executiveSummary': 'สรุปผู้บริหาร',
    'analyzer.executiveDesc': 'ภาพรวมสั้นๆ ของข้อเสนอและข้อเสนอหลัก',
    'analyzer.teamExpertise': 'ทีมและความเชี่ยวชาญ',
    'analyzer.teamDesc': 'บทบาทและประสบการณ์ของสมาชิกในทีมโครงการ',
    
    // Profile Page
    'profile.changePassword': 'เปลี่ยนรหัสผ่าน',
    'profile.oldPassword': 'รหัสผ่านเก่า',
    'profile.newPassword': 'รหัสผ่านใหม่',
    'profile.confirmNewPassword': 'ยืนยันรหัสผ่านใหม่',
    'profile.signOut': 'ออกจากระบบ',
    'profile.noHistory': 'ยังไม่มีประวัติการวิเคราะห์',
    'profile.uploadToSee': 'อัปโหลดและวิเคราะห์เอกสารเพื่อดูประวัติของคุณที่นี่',
    
    // History Page
    'history.title': 'ประวัติ',
    'history.subtitle': 'ดูประวัติการวิเคราะห์และดาวน์โหลดข้อเสนอที่สร้างขึ้น',
    'history.searchAnalysis': 'ค้นหาการวิเคราะห์',
    'history.businessPlan': 'แผนธุรกิจ',
    'history.marketingStrategy': 'กลยุทธ์การตลาด',
    'history.technicalProposal': 'ข้อเสนอทางเทคนิค',
    'history.financialAnalysis': 'การวิเคราะห์ทางการเงิน',
    'history.researchProposal': 'ข้อเสนอการวิจัย',
    'history.strategicPlan': 'แผนกลยุทธ์',
    'history.daysAgo': 'วันที่แล้ว',
    'history.weekAgo': 'สัปดาห์ที่แล้ว',
    'history.weeksAgo': 'สัปดาห์ที่แล้ว',
    'history.monthAgo': 'เดือนที่แล้ว',
    'history.view': 'ดู',
    'history.download': 'ดาวน์โหลด',
    'history.delete': 'ลบ',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};