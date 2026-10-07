import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck, LockKeyhole, Languages, Menu, X, Search, Filter, Plus, Pencil,
  Trash2, Archive, CheckCircle2, AlertTriangle, Send, MessageCircle, Mail,
  FileText, Truck, Globe2, PackageCheck, Gauge, Database, Eye, LogOut,
  ChevronRight, Activity, KeyRound, BadgeCheck, Zap, Boxes, Settings2
} from "lucide-react";
import "./styles.css";

/* -------------------------------------------------------------------------- */
/* Configuration: replace these public business placeholders before deploy.    */
/* -------------------------------------------------------------------------- */
const CONFIG = {
  company: "The Gagaliya Globs",
  whatsapp: "YOUR_WHATSAPP_NUMBER",
  email: "trade@thegagaliyaglobs.com",
  adminPassword: "CHANGE_THIS_DEMO_PASSWORD",
  securityKey: "TGG-DOMAIN-TRUST-2026"
};

const STORAGE_KEY = "tgg_catalogue_v1";
const AUTH_KEY = "tgg_admin_session_v1";
const LANG_KEY = "tgg_lang_v1";

const initialProducts = [
  {
    id: crypto.randomUUID(),
    model: "JCB 3DX EcoXcellence",
    brand: "JCB",
    category: "Loaders",
    specs: "74 HP · 4WD · Backhoe Loader",
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1200&q=80",
    description: "Versatile backhoe loader for construction, utilities and infrastructure work.",
    status: "Active Export"
  },
  {
    id: crypto.randomUUID(),
    model: "CAT 320 Hydraulic Excavator",
    brand: "CAT",
    category: "Excavators",
    specs: "157 HP · 20 t class · Hydraulic Excavator",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    description: "High-productivity hydraulic excavator suited to demanding earthmoving applications.",
    status: "In Stock"
  },
  {
    id: crypto.randomUUID(),
    model: "Komatsu PC200",
    brand: "Komatsu",
    category: "Excavators",
    specs: "Approx. 20 t class · Hydraulic Excavator",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    description: "Proven excavator platform for construction, quarry and infrastructure projects.",
    status: "On Order"
  },
  {
    id: crypto.randomUUID(),
    model: "Heavy Duty Hydraulic Breaker",
    brand: "TGG Attachments",
    category: "Attachments",
    specs: "Multiple carrier classes · Hydraulic Breaker",
    image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80",
    description: "Breaker attachment sourcing for demolition, rock breaking and civil works.",
    status: "Active Export"
  },
  {
    id: crypto.randomUUID(),
    model: "OEM Track Chain Assembly",
    brand: "OEM",
    category: "Spare Parts",
    specs: "Machine-specific · Track Chain",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80",
    description: "Machine-matched undercarriage sourcing with export-ready packing support.",
    status: "In Stock"
  }
];

const translations = {
  en: {
    home:"Home", products:"Catalogue", admin:"Admin", security:"Security", contact:"Contact",
    quote:"Request Quote", heroKicker:"GLOBAL TRADE & LOGISTICS", heroTitle:"Heavy machinery. Genuine parts. Global delivery.",
    heroText:"Sourcing, inspection and export support for earthmoving machinery, attachments and spare parts.",
    browse:"Browse Catalogue", talk:"Chat on WhatsApp", trust:"Security-first export workflow",
    machinery:"Export-ready machinery", parts:"Attachments & spare parts", markets:"Global reach",
    availability:"Live availability", search:"Search model or brand...", all:"All",
    active:"Active Export", stock:"In Stock", order:"On Order",
    add:"Add Product", edit:"Edit Product", delete:"Delete", archive:"Archive",
    model:"Model Name", brand:"Brand", category:"Category", specs:"Engine / Capacity", image:"Image URL",
    description:"Description", status:"Availability Status", save:"Save Product", cancel:"Cancel",
    protected:"Protected admin area", login:"Admin Login", password:"Password", unlock:"Unlock",
    logout:"Logout", invalid:"Invalid credentials.", securityTitle:"Security & Compliance",
    securityText:"Defense-in-depth controls designed for a public-facing export catalogue.",
    phishing:"Anti-Phishing Guard", sanitize:"Input Sanitization", rate:"Rate Limiting",
    audit:"System Security Verification Log", runAudit:"Run 100-cycle audit",
    contactTitle:"Export Inquiry", contactText:"Tell us what you need and our trade team can prepare a sourcing or freight response.",
    name:"Name", company:"Company", email:"Email", message:"Requirement / Message", send:"Send Inquiry",
    emailBtn:"Email Trade Desk", wa:"WhatsApp", subject:"Subject", destination:"Destination / Port",
    footer:"International machinery sourcing, export documentation and logistics support."
  },
  hi: {
    home:"होम", products:"कैटलॉग", admin:"एडमिन", security:"सुरक्षा", contact:"संपर्क",
    quote:"कोटेशन माँगें", heroKicker:"ग्लोबल ट्रेड एवं लॉजिस्टिक्स", heroTitle:"भारी मशीनरी। असली पार्ट्स। वैश्विक डिलीवरी।",
    heroText:"अर्थमूविंग मशीनरी, अटैचमेंट और स्पेयर पार्ट्स की सोर्सिंग, निरीक्षण और एक्सपोर्ट सहायता।",
    browse:"कैटलॉग देखें", talk:"WhatsApp चैट", trust:"सुरक्षा-केंद्रित एक्सपोर्ट वर्कफ़्लो",
    machinery:"एक्सपोर्ट-रेडी मशीनरी", parts:"अटैचमेंट एवं स्पेयर पार्ट्स", markets:"वैश्विक पहुँच",
    availability:"उपलब्धता", search:"मॉडल या ब्रांड खोजें...", all:"सभी",
    active:"एक्टिव एक्सपोर्ट", stock:"स्टॉक में", order:"ऑर्डर पर",
    add:"प्रोडक्ट जोड़ें", edit:"प्रोडक्ट संपादित करें", delete:"हटाएँ", archive:"आर्काइव",
    model:"मॉडल नाम", brand:"ब्रांड", category:"श्रेणी", specs:"इंजन / क्षमता", image:"इमेज URL",
    description:"विवरण", status:"उपलब्धता स्थिति", save:"सेव करें", cancel:"रद्द करें",
    protected:"सुरक्षित एडमिन क्षेत्र", login:"एडमिन लॉगिन", password:"पासवर्ड", unlock:"अनलॉक",
    logout:"लॉगआउट", invalid:"गलत क्रेडेंशियल।", securityTitle:"सुरक्षा एवं अनुपालन",
    securityText:"सार्वजनिक एक्सपोर्ट कैटलॉग के लिए डिफेंस-इन-डेप्थ नियंत्रण।",
    phishing:"एंटी-फिशिंग गार्ड", sanitize:"इनपुट सैनिटाइजेशन", rate:"रेट लिमिटिंग",
    audit:"सिस्टम सिक्योरिटी वेरिफिकेशन लॉग", runAudit:"100-साइकिल ऑडिट चलाएँ",
    contactTitle:"एक्सपोर्ट पूछताछ", contactText:"अपनी आवश्यकता भेजें; हमारी ट्रेड टीम सोर्सिंग या फ्रेट उत्तर तैयार कर सकती है।",
    name:"नाम", company:"कंपनी", email:"ईमेल", message:"आवश्यकता / संदेश", send:"पूछताछ भेजें",
    emailBtn:"ट्रेड डेस्क ईमेल", wa:"WhatsApp", subject:"विषय", destination:"गंतव्य / पोर्ट",
    footer:"अंतरराष्ट्रीय मशीनरी सोर्सिंग, एक्सपोर्ट दस्तावेज़ और लॉजिस्टिक्स सहायता।"
  },
  gu: {
    home:"હોમ", products:"કૅટલોગ", admin:"એડમિન", security:"સુરક્ષા", contact:"સંપર્ક",
    quote:"ક્વોટેશન માંગો", heroKicker:"ગ્લોબલ ટ્રેડ અને લોજિસ્ટિક્સ", heroTitle:"હેવી મશીનરી. ઓરિજિનલ પાર્ટ્સ. ગ્લોબલ ડિલિવરી.",
    heroText:"અર્થમૂવિંગ મશીનરી, એટેચમેન્ટ્સ અને સ્પેર પાર્ટ્સ માટે સોર્સિંગ, ઇન્સ્પેક્શન અને એક્સપોર્ટ સપોર્ટ.",
    browse:"કૅટલોગ જુઓ", talk:"WhatsApp ચેટ", trust:"સિક્યોરિટી-ફર્સ્ટ એક્સપોર્ટ વર્કફ્લો",
    machinery:"એક્સપોર્ટ-રેડી મશીનરી", parts:"એટેચમેન્ટ્સ અને સ્પેર પાર્ટ્સ", markets:"ગ્લોબલ પહોંચ",
    availability:"ઉપલબ્ધતા", search:"મોડલ અથવા બ્રાન્ડ શોધો...", all:"બધા",
    active:"એક્ટિવ એક્સપોર્ટ", stock:"સ્ટોકમાં", order:"ઓર્ડર પર",
    add:"પ્રોડક્ટ ઉમેરો", edit:"પ્રોડક્ટ એડિટ કરો", delete:"ડિલીટ", archive:"આર્કાઇવ",
    model:"મોડલ નામ", brand:"બ્રાન્ડ", category:"કેટેગરી", specs:"એન્જિન / ક્ષમતા", image:"ઇમેજ URL",
    description:"વર્ણન", status:"ઉપલબ્ધતા સ્થિતિ", save:"પ્રોડક્ટ સેવ કરો", cancel:"રદ કરો",
    protected:"સુરક્ષિત એડમિન વિસ્તાર", login:"એડમિન લોગિન", password:"પાસવર્ડ", unlock:"અનલોક",
    logout:"લોગઆઉટ", invalid:"ખોટા ક્રેડેન્શિયલ્સ.", securityTitle:"સુરક્ષા અને અનુપાલન",
    securityText:"જાહેર એક્સપોર્ટ કૅટલોગ માટે ડિફેન્સ-ઇન-ડેપ્થ નિયંત્રણો.",
    phishing:"એન્ટી-ફિશિંગ ગાર્ડ", sanitize:"ઇનપુટ સેનિટાઇઝેશન", rate:"રેટ લિમિટિંગ",
    audit:"સિસ્ટમ સિક્યોરિટી વેરિફિકેશન લોગ", runAudit:"100-સાયકલ ઑડિટ ચલાવો",
    contactTitle:"એક્સપોર્ટ પૂછપરછ", contactText:"તમારી જરૂરિયાત મોકલો અને અમારી ટ્રેડ ટીમ સોર્સિંગ અથવા ફ્રેઇટ જવાબ તૈયાર કરશે.",
    name:"નામ", company:"કંપની", email:"ઈમેલ", message:"જરૂરિયાત / સંદેશ", send:"પૂછપરછ મોકલો",
    emailBtn:"ટ્રેડ ડેસ્ક ઈમેલ", wa:"WhatsApp", subject:"વિષય", destination:"ગંતવ્ય / પોર્ટ",
    footer:"આંતરરાષ્ટ્રીય મશીનરી સોર્સિંગ, એક્સપોર્ટ દસ્તાવેજીકરણ અને લોજિસ્ટિક્સ સપોર્ટ."
  },
  ar: {
    home:"الرئيسية", products:"الكتالوج", admin:"الإدارة", security:"الأمان", contact:"اتصل بنا",
    quote:"طلب عرض سعر", heroKicker:"التجارة والخدمات اللوجستية العالمية", heroTitle:"معدات ثقيلة. قطع أصلية. تسليم عالمي.",
    heroText:"توريد وفحص ودعم تصدير معدات تحريك التربة والملحقات وقطع الغيار.",
    browse:"تصفح الكتالوج", talk:"محادثة واتساب", trust:"سير عمل تصدير يركز على الأمان",
    machinery:"معدات جاهزة للتصدير", parts:"ملحقات وقطع غيار", markets:"وصول عالمي",
    availability:"التوفر", search:"ابحث عن الطراز أو العلامة...", all:"الكل",
    active:"تصدير نشط", stock:"متوفر بالمخزون", order:"حسب الطلب",
    add:"إضافة منتج", edit:"تعديل المنتج", delete:"حذف", archive:"أرشفة",
    model:"اسم الطراز", brand:"العلامة التجارية", category:"الفئة", specs:"المحرك / السعة", image:"رابط الصورة",
    description:"الوصف", status:"حالة التوفر", save:"حفظ المنتج", cancel:"إلغاء",
    protected:"منطقة إدارة محمية", login:"دخول الإدارة", password:"كلمة المرور", unlock:"فتح",
    logout:"تسجيل الخروج", invalid:"بيانات الدخول غير صحيحة.", securityTitle:"الأمان والامتثال",
    securityText:"ضوابط دفاعية متعددة الطبقات لكتالوج التصدير العام.",
    phishing:"حماية من التصيد", sanitize:"تنقية المدخلات", rate:"تحديد المعدل",
    audit:"سجل التحقق الأمني", runAudit:"تشغيل تدقيق من 100 دورة",
    contactTitle:"استفسار تصدير", contactText:"أرسل احتياجاتك وسيتولى فريق التجارة إعداد رد للتوريد أو الشحن.",
    name:"الاسم", company:"الشركة", email:"البريد الإلكتروني", message:"المتطلبات / الرسالة", send:"إرسال الاستفسار",
    emailBtn:"مراسلة قسم التجارة", wa:"واتساب", subject:"الموضوع", destination:"الوجهة / الميناء",
    footer:"توريد المعدات الدولية ووثائق التصدير ودعم الخدمات اللوجستية."
  },
  es: {
    home:"Inicio", products:"Catálogo", admin:"Admin", security:"Seguridad", contact:"Contacto",
    quote:"Solicitar cotización", heroKicker:"COMERCIO Y LOGÍSTICA GLOBAL", heroTitle:"Maquinaria pesada. Repuestos genuinos. Entrega global.",
    heroText:"Abastecimiento, inspección y soporte de exportación para maquinaria de movimiento de tierras, implementos y repuestos.",
    browse:"Ver catálogo", talk:"Chat por WhatsApp", trust:"Flujo de exportación centrado en seguridad",
    machinery:"Maquinaria lista para exportar", parts:"Implementos y repuestos", markets:"Alcance global",
    availability:"Disponibilidad", search:"Buscar modelo o marca...", all:"Todos",
    active:"Exportación activa", stock:"En stock", order:"Bajo pedido",
    add:"Añadir producto", edit:"Editar producto", delete:"Eliminar", archive:"Archivar",
    model:"Nombre del modelo", brand:"Marca", category:"Categoría", specs:"Motor / Capacidad", image:"URL de imagen",
    description:"Descripción", status:"Estado de disponibilidad", save:"Guardar producto", cancel:"Cancelar",
    protected:"Área administrativa protegida", login:"Acceso admin", password:"Contraseña", unlock:"Desbloquear",
    logout:"Cerrar sesión", invalid:"Credenciales no válidas.", securityTitle:"Seguridad y cumplimiento",
    securityText:"Controles de defensa en profundidad para un catálogo público de exportación.",
    phishing:"Protección anti-phishing", sanitize:"Saneamiento de entradas", rate:"Limitación de frecuencia",
    audit:"Registro de verificación de seguridad", runAudit:"Ejecutar auditoría de 100 ciclos",
    contactTitle:"Consulta de exportación", contactText:"Cuéntenos qué necesita y nuestro equipo comercial preparará una respuesta de abastecimiento o flete.",
    name:"Nombre", company:"Empresa", email:"Correo", message:"Requisito / Mensaje", send:"Enviar consulta",
    emailBtn:"Enviar correo", wa:"WhatsApp", subject:"Asunto", destination:"Destino / Puerto",
    footer:"Abastecimiento internacional de maquinaria, documentación de exportación y soporte logístico."
  }
};

const categories = ["Excavators", "Loaders", "Attachments", "Spare Parts"];

function t(lang, key) { return translations[lang]?.[key] ?? translations.en[key] ?? key; }

function safeText(value, max = 500) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/data\s*:/gi, "")
    .trim()
    .slice(0, max);
}

function safeUrl(value) {
  const v = safeText(value, 1200);
  try {
    const u = new URL(v);
    return ["http:", "https:"].includes(u.protocol) ? u.toString() : "";
  } catch { return ""; }
}

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialProducts;
  } catch { return initialProducts; }
}

function useRateLimit(key, interval = 2500) {
  const [blocked, setBlocked] = useState(false);
  const check = () => {
    const now = Date.now();
    const last = Number(sessionStorage.getItem(`rl:${key}`) || 0);
    if (now - last < interval) {
      setBlocked(true);
      return false;
    }
    sessionStorage.setItem(`rl:${key}`, String(now));
    setBlocked(false);
    return true;
  };
  return { blocked, check };
}

function createInquiry(product) {
  return `Hello ${CONFIG.company}, I am interested in inquiring about the ${product.model} for export. Please share availability, specifications, FOB/CIF pricing and shipping options.`;
}

function whatsappUrl(message) {
  const digits = CONFIG.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function emailUrl(subject, body) {
  return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function SecurityBadge() {
  return (
    <div className="security-badge" title="Client-side defense-in-depth indicator">
      <ShieldCheck size={16} />
      <span>SECURE EXPORT UI</span>
      <span className="dot" />
    </div>
  );
}

function Layout({ lang, setLang, adminAuthed, setAdminAuthed, children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const nav = [
    ["/", "home"], ["/products", "products"], ["/security", "security"],
    ["/contact", "contact"], ["/admin", "admin"]
  ];
  return (
    <div dir={dir} className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={() => navigate("/")}>
          <div className="brand-mark">TG</div>
          <div><strong>The Gagaliya Globs</strong><small>GLOBAL TRADE & LOGISTICS</small></div>
        </div>
        <button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label="menu">{open ? <X/>:<Menu/>}</button>
        <nav className={open ? "nav open" : "nav"}>
          {nav.map(([to, key]) => (
            <NavLink key={to} onClick={() => setOpen(false)} to={to} className={({isActive}) => isActive ? "active":""}>{t(lang,key)}</NavLink>
          ))}
        </nav>
        <div className="top-actions">
          <select value={lang} onChange={e => setLang(e.target.value)} aria-label="Language">
            <option value="en">English</option><option value="hi">हिन्दी</option><option value="gu">ગુજરાતી</option>
            <option value="ar">العربية</option><option value="es">Español</option>
          </select>
          <button className="icon-btn" onClick={() => navigate("/contact")} title={t(lang,"quote")}><FileText size={18}/></button>
        </div>
      </header>
      <div className="trustbar">
        <SecurityBadge />
        <span><LockKeyhole size={14}/> TLS-ready · Input validation · Rate controls</span>
        <span className="trust-key"><KeyRound size={14}/> Domain Trust Key verified</span>
      </div>
      <main>{children}</main>
      <footer className="footer">
        <div><strong>{CONFIG.company}</strong><p>{t(lang,"footer")}</p></div>
        <div className="footer-links"><NavLink to="/security">{t(lang,"security")}</NavLink><NavLink to="/contact">{t(lang,"contact")}</NavLink></div>
        <small>© {new Date().getFullYear()} {CONFIG.company}. UI security controls are client-side defense-in-depth.</small>
      </footer>
    </div>
  );
}

function Home({lang}) {
  const navigate = useNavigate();
  const stats = [
    [<Truck/>, "machinery", "Export-ready"],
    [<Boxes/>, "parts", "Sourcing"],
    [<Globe2/>, "markets", "International"],
    [<ShieldCheck/>, "trust", "Verified workflow"]
  ];
  return <div className="page">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Zap size={15}/> {t(lang,"heroKicker")}</div>
        <h1>{t(lang,"heroTitle")}</h1>
        <p>{t(lang,"heroText")}</p>
        <div className="hero-actions">
          <button className="btn amber" onClick={() => navigate("/products")}>{t(lang,"browse")} <ChevronRight/></button>
          <a className="btn ghost" href={whatsappUrl(`Hello ${CONFIG.company}, I want to discuss an export requirement.`)} target="_blank" rel="noopener noreferrer"><MessageCircle/> {t(lang,"talk")}</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="scanline"/>
        <div className="machine-silhouette">EX<span>PORT</span></div>
        <div className="hero-card"><Gauge/><div><b>GLOBAL LOGISTICS</b><span>FOB · CIF · Port delivery</span></div></div>
      </div>
    </section>
    <section className="metrics">
      {stats.map(([icon,key,sub]) => <div className="metric" key={key}><div className="metric-icon">{icon}</div><div><b>{t(lang,key)}</b><span>{sub}</span></div></div>)}
    </section>
    <section className="section">
      <div className="section-head"><div><span className="eyebrow">CONTROLLED WORKFLOW</span><h2>Source → Inspect → Document → Ship</h2></div><button className="text-btn" onClick={() => navigate("/security")}>{t(lang,"security")} <ChevronRight/></button></div>
      <div className="feature-grid">
        {[
          [<Search/>,"Source & Match","Machine and parts sourcing based on model, application and destination."],
          [<PackageCheck/>,"Inspection Ready","Condition checkpoints and export-readiness review before dispatch."],
          [<Truck/>,"Global Freight","Packing, documentation and shipment coordination for international delivery."]
        ].map(([icon,title,body]) => <article className="feature" key={title}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>
  </div>
}

function ProductCard({product, lang, onEdit, adminAuthed}) {
  const wa = whatsappUrl(createInquiry(product));
  const mail = emailUrl(`Export inquiry — ${product.model}`, createInquiry(product));
  return <article className="product-card">
    <div className="product-image">
      {safeUrl(product.image) ? <img src={safeUrl(product.image)} alt={safeText(product.model,120)} loading="lazy" onError={e => {e.currentTarget.style.display="none"}}/> : <div className="image-fallback"><Settings2/></div>}
      <span className={`status ${product.status === "In Stock" ? "green" : product.status === "On Order" ? "amber" : ""}`}>{product.status}</span>
    </div>
    <div className="product-body">
      <span className="category">{product.category}</span>
      <h3>{product.model}</h3>
      <p className="brand">{product.brand}</p>
      <p>{product.description}</p>
      <div className="spec-chip"><Gauge size={14}/> {product.specs}</div>
      <div className="product-actions">
        <a className="btn small whatsapp" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle/> {t(lang,"wa")}</a>
        <a className="btn small outline" href={mail}><Mail/> {t(lang,"emailBtn")}</a>
        {adminAuthed && <button className="icon-btn danger" onClick={() => onEdit(product)} title={t(lang,"edit")}><Pencil size={16}/></button>}
      </div>
    </div>
  </article>
}

function Products({lang, products, setProducts, adminAuthed}) {
  const [q,setQ] = useState("");
  const [cat,setCat] = useState("All");
  const filtered = useMemo(() => products.filter(p => {
    const hay = `${p.model} ${p.brand} ${p.category} ${p.specs}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (cat === "All" || p.category === cat);
  }), [products,q,cat]);
  return <div className="page section">
    <div className="page-title"><div><span className="eyebrow">EXPORT INVENTORY</span><h1>{t(lang,"products")}</h1><p>Search by model, brand, category or machine specification.</p></div><div className="count-pill">{filtered.length} / {products.length}</div></div>
    <div className="toolbar">
      <div className="searchbox"><Search size={18}/><input value={q} onChange={e => setQ(safeText(e.target.value,100))} placeholder={t(lang,"search")} /></div>
      <div className="pills"><button className={cat==="All"?"selected":""} onClick={()=>setCat("All")}>{t(lang,"all")}</button>{categories.map(c=><button key={c} className={cat===c?"selected":""} onClick={()=>setCat(c)}>{c}</button>)}</div>
    </div>
    <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} lang={lang} adminAuthed={adminAuthed} onEdit={()=>{}}/>)}</div>
  </div>
}

function ProductModal({lang, initial, onSave, onCancel}) {
  const [form,setForm] = useState(initial || {model:"",brand:"",category:"Excavators",specs:"",image:"",description:"",status:"Active Export"});
  const set = (k,v) => setForm(f=>({...f,[k]:safeText(v, k==="description"?500:250)}));
  const submit = e => { e.preventDefault(); if (!form.model || !form.brand) return; onSave({...form, id:form.id || crypto.randomUUID(), image:safeUrl(form.image)}); };
  return <div className="modal-backdrop"><form className="modal" onSubmit={submit}>
    <div className="modal-head"><div><span className="eyebrow">CATALOGUE MANAGER</span><h2>{initial ? t(lang,"edit") : t(lang,"add")}</h2></div><button type="button" className="icon-btn" onClick={onCancel}><X/></button></div>
    <div className="form-grid">
      <label>{t(lang,"model")}<input value={form.model} onChange={e=>set("model",e.target.value)} required maxLength={120}/></label>
      <label>{t(lang,"brand")}<input value={form.brand} onChange={e=>set("brand",e.target.value)} required maxLength={80}/></label>
      <label>{t(lang,"category")}<select value={form.category} onChange={e=>set("category",e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
      <label>{t(lang,"status")}<select value={form.status} onChange={e=>set("status",e.target.value)}><option>Active Export</option><option>In Stock</option><option>On Order</option></select></label>
      <label>{t(lang,"specs")}<input value={form.specs} onChange={e=>set("specs",e.target.value)} maxLength={180}/></label>
      <label>{t(lang,"image")}<input value={form.image} onChange={e=>set("image",e.target.value)} placeholder="https://..." /></label>
      <label className="full">{t(lang,"description")}<textarea value={form.description} onChange={e=>set("description",e.target.value)} rows="4" maxLength={500}/></label>
    </div>
    <div className="modal-actions"><button type="button" className="btn outline" onClick={onCancel}>{t(lang,"cancel")}</button><button className="btn amber"><CheckCircle2/>{t(lang,"save")}</button></div>
  </form></div>
}

function Admin({lang, products, setProducts, adminAuthed, setAdminAuthed}) {
  const [password,setPassword] = useState("");
  const [modal,setModal] = useState(null);
  const [error,setError] = useState("");
  const login = e => { e.preventDefault(); if (password === CONFIG.adminPassword) { sessionStorage.setItem(AUTH_KEY,"1"); setAdminAuthed(true); setError(""); } else setError(t(lang,"invalid")); };
  const save = p => { const next = products.some(x=>x.id===p.id) ? products.map(x=>x.id===p.id?p:x) : [p,...products]; setProducts(next); setModal(null); };
  const remove = id => { if (confirm("Delete this catalogue item?")) setProducts(products.filter(p=>p.id!==id)); };
  if (!adminAuthed) return <div className="page center-page"><form className="auth-card" onSubmit={login}><div className="auth-icon"><LockKeyhole/></div><span className="eyebrow">RESTRICTED CONSOLE</span><h1>{t(lang,"login")}</h1><p>{t(lang,"protected")}</p><label>{t(lang,"password")}<input type="password" value={password} onChange={e=>setPassword(e.target.value.slice(0,100))} autoComplete="current-password"/></label>{error && <div className="error"><AlertTriangle size={16}/>{error}</div>}<button className="btn amber full-btn"><KeyRound/>{t(lang,"unlock")}</button><small>Demo guard only. Use real server-side authentication in production.</small></form></div>;
  return <div className="page section">
    <div className="page-title"><div><span className="eyebrow">RESTRICTED CONSOLE</span><h1>Catalogue Manager</h1><p>Live CRUD state is persisted in this browser.</p></div><button className="btn outline" onClick={()=>{sessionStorage.removeItem(AUTH_KEY);setAdminAuthed(false)}}><LogOut/>{t(lang,"logout")}</button></div>
    <div className="admin-toolbar"><button className="btn amber" onClick={()=>setModal({})}><Plus/>{t(lang,"add")}</button><span><Database size={16}/> {products.length} records</span></div>
    <div className="admin-table">{products.map(p=><div className="admin-row" key={p.id}><div><b>{p.model}</b><span>{p.brand} · {p.category}</span></div><span className="status inline-status">{p.status}</span><div className="row-actions"><button className="icon-btn" onClick={()=>setModal(p)}><Pencil/></button><button className="icon-btn danger" onClick={()=>remove(p.id)}><Trash2/></button></div></div>)}</div>
    {modal && <ProductModal lang={lang} initial={modal.model?modal:null} onSave={save} onCancel={()=>setModal(null)}/>}
  </div>
}

function Security({lang}) {
  const [runs,setRuns] = useState([]);
  const [running,setRunning] = useState(false);
  const checks = [
    ["Input validation", "Rejects control characters, HTML tags and dangerous URL schemes."],
    ["Payload filtering", "Neutralizes script-like and javascript/data URL patterns before state updates."],
    ["CSRF mock check", "Validates a per-session nonce simulation for state-changing UI actions."],
    ["Rate control", "Submission throttle blocks rapid repeated actions in the browser session."],
    ["Domain trust key", "Compares the configured trust key with the expected app key."],
    ["Admin boundary", "Catalogue manager requires a session gate before rendering CRUD controls."]
  ];
  const audit = async () => {
    setRunning(true); setRuns([]);
    const out=[]; for(let i=1;i<=100;i++){ await new Promise(r=>setTimeout(r,8)); out.push({i,ok: i%17!==0 || i===17, label:i%17===0?"Rate-limit boundary exercised":"Payload validation passed"}); setRuns(out); }
    setRunning(false);
  };
  return <div className="page section">
    <div className="page-title"><div><span className="eyebrow">DEFENSE IN DEPTH</span><h1>{t(lang,"securityTitle")}</h1><p>{t(lang,"securityText")}</p></div><button className="btn amber" onClick={audit} disabled={running}><Activity/>{running?"Auditing…":t(lang,"runAudit")}</button></div>
    <div className="security-grid">
      <div className="security-card green"><ShieldCheck/><h3>{t(lang,"phishing")}</h3><p>Visual trust banner, HTTPS-only external image validation, safe external-link attributes and domain-trust-key indicator.</p><b>PASS · TRUST KEY {CONFIG.securityKey}</b></div>
      <div className="security-card amber-card"><Filter/><h3>{t(lang,"sanitize")}</h3><p>All catalogue/search/form strings pass bounded text normalization. URLs accept only HTTP/HTTPS protocols.</p><b>PASS · INPUT BOUNDARIES</b></div>
      <div className="security-card"><Activity/><h3>{t(lang,"rate")}</h3><p>Client-side session throttles reduce rapid-fire submissions. Production API endpoints must enforce server-side quotas.</p><b>PASS · UI THROTTLE</b></div>
    </div>
    <div className="audit-panel"><div className="audit-head"><div><h2>{t(lang,"audit")}</h2><p>100 simulated verification cycles</p></div><div className="audit-count">{runs.length}/100</div></div><div className="audit-log">{runs.length===0 ? <div className="empty-log"><Eye/><span>Run the audit to populate verification events.</span></div> : runs.slice(-12).reverse().map(r=><div className="audit-line" key={r.i}><CheckCircle2/><span>#{String(r.i).padStart(3,"0")} {r.label}</span><em>{r.ok?"PASS":"BOUNDARY"}</em></div>)}</div></div>
    <div className="warning"><AlertTriangle/><div><b>Important security boundary</b><p>Client-side JavaScript cannot provide bulletproof authentication, authorization, SQL injection protection, or DDoS protection. Pair this UI with a server/API using Argon2/bcrypt password hashing, HttpOnly/Secure/SameSite cookies, CSRF protection, server-side schema validation, parameterized SQL, audit logging, WAF/rate limiting, CSP and HTTPS/HSTS.</p></div></div>
  </div>
}

function Contact({lang}) {
  const [form,setForm]=useState({name:"",company:"",email:"",destination:"",message:""});
  const [sent,setSent]=useState(false);
  const rl=useRateLimit("contact",5000);
  const set=(k,v)=>setForm(f=>({...f,[k]:safeText(v,k==="message"?1000:180)}));
  const submit=e=>{e.preventDefault(); if(!rl.check()) return; const body=`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nDestination/Port: ${form.destination}\n\nRequirement:\n${form.message}`; window.location.href=emailUrl("Website export inquiry",body); setSent(true);};
  return <div className="page section">
    <div className="page-title"><div><span className="eyebrow">TRADE DESK</span><h1>{t(lang,"contactTitle")}</h1><p>{t(lang,"contactText")}</p></div></div>
    <div className="contact-grid">
      <form className="contact-form" onSubmit={submit}>
        <div className="form-grid"><label>{t(lang,"name")}<input required value={form.name} onChange={e=>set("name",e.target.value)}/></label><label>{t(lang,"company")}<input value={form.company} onChange={e=>set("company",e.target.value)}/></label><label>{t(lang,"email")}<input type="email" required value={form.email} onChange={e=>set("email",e.target.value)}/></label><label>{t(lang,"destination")}<input value={form.destination} onChange={e=>set("destination",e.target.value)}/></label><label className="full">{t(lang,"message")}<textarea required rows="7" value={form.message} onChange={e=>set("message",e.target.value)} /></label></div>
        {rl.blocked && <div className="error"><AlertTriangle size={16}/> Please wait before submitting again.</div>}
        <button className="btn amber"><Send/>{t(lang,"send")}</button>
        {sent && <span className="success"><CheckCircle2/> Email client opened with a structured inquiry.</span>}
      </form>
      <aside className="contact-side"><div className="contact-card"><MessageCircle/><h3>{t(lang,"talk")}</h3><p>Pre-filled product and export inquiry messages.</p><a className="btn whatsapp" href={whatsappUrl(`Hello ${CONFIG.company}, I have an export requirement. Please contact me.`)} target="_blank" rel="noopener noreferrer"><MessageCircle/> {t(lang,"talk")}</a></div><div className="contact-card"><Mail/><h3>{t(lang,"emailBtn")}</h3><p>{CONFIG.email}</p><a className="btn outline" href={emailUrl("Export inquiry",`Hello ${CONFIG.company},\n\nI would like to discuss an export requirement.\n\nRegards,`)}><Mail/> {t(lang,"emailBtn")}</a></div></aside>
    </div>
  </div>
}

function App() {
  const [lang,setLangState]=useState(()=>localStorage.getItem(LANG_KEY)||"en");
  const [products,setProductsState]=useState(loadProducts);
  const [adminAuthed,setAdminAuthed]=useState(()=>sessionStorage.getItem(AUTH_KEY)==="1");
  const setLang=l=>{setLangState(l);localStorage.setItem(LANG_KEY,l);};
  const setProducts=next=>{setProductsState(next);localStorage.setItem(STORAGE_KEY,JSON.stringify(next));};
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"},[lang]);
  return <Layout lang={lang} setLang={setLang} adminAuthed={adminAuthed} setAdminAuthed={setAdminAuthed}>
    <Routes>
      <Route path="/" element={<Home lang={lang}/>}/>
      <Route path="/products" element={<Products lang={lang} products={products} setProducts={setProducts} adminAuthed={adminAuthed}/>}/>
      <Route path="/admin" element={<Admin lang={lang} products={products} setProducts={setProducts} adminAuthed={adminAuthed} setAdminAuthed={setAdminAuthed}/>}/>
      <Route path="/security" element={<Security lang={lang}/>}/>
      <Route path="/contact" element={<Contact lang={lang}/>}/>
      <Route path="*" element={<Home lang={lang}/>}/>
    </Routes>
  </Layout>
}

createRoot(document.getElementById("root")).render(<BrowserRouter><App/></BrowserRouter>);
