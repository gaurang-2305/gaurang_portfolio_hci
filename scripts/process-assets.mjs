import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assetsSourceDir = path.join(rootDir, 'portfolio-assets');
const publicAssetsDir = path.join(rootDir, 'public', 'assets');

console.log('🚀 Generating rich realistic architectural UI mockups for projects...');

// Ensure subdirectories exist
['finscope', 'floatchat', 'mental-health-system'].forEach(slug => {
  fs.mkdirSync(path.join(publicAssetsDir, 'projects', slug), { recursive: true });
});

// SVG UI Mockup Generator for FinScope
function createFinScopeCover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E1020"/>
        <stop offset="100%" stop-color="#161A30"/>
      </linearGradient>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFB547" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#FFB547" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    
    <rect width="1280" height="800" fill="url(#bgGrad)"/>
    
    <!-- Top Mockup Window Header -->
    <rect x="30" y="30" width="1220" height="48" rx="8" fill="#1C213E" stroke="#2A3050"/>
    <circle cx="55" cy="54" r="6" fill="#FF5F56"/>
    <circle cx="75" cy="54" r="6" fill="#FFBD2E"/>
    <circle cx="95" cy="54" r="6" fill="#27C93F"/>
    <rect x="240" y="42" width="800" height="24" rx="4" fill="#0E1020" stroke="#2A3050"/>
    <text x="640" y="58" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB" text-anchor="middle">https://finscope.internal/analytics/10-K/AAPL/2025</text>
    <rect x="1110" y="42" width="120" height="24" rx="4" fill="#FFB547" fill-opacity="0.15" stroke="#FFB547" stroke-width="0.8"/>
    <text x="1170" y="58" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#FFB547" text-anchor="middle">SEC EDGAR LIVE</text>
    
    <!-- Main Window Canvas -->
    <rect x="30" y="90" width="1220" height="680" rx="8" fill="#121528" stroke="#2A3050"/>
    
    <!-- Left Sidebar -->
    <rect x="30" y="90" width="220" height="680" fill="#161A30" stroke="#2A3050"/>
    <text x="50" y="130" font-family="'Fraunces', serif" font-size="18" font-weight="bold" fill="#FFB547">FinScope // AI</text>
    <text x="50" y="150" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A9AECB">RAG &amp; RATIO ENGINE</text>
    
    <rect x="45" y="175" width="190" height="36" rx="4" fill="#232A4E" stroke="#FFB547" stroke-width="1"/>
    <text x="60" y="198" font-family="'Inter', sans-serif" font-size="12" font-weight="bold" fill="#F2EFE8">&bull; 10-K Ingestion</text>
    <rect x="45" y="220" width="190" height="36" rx="4" fill="transparent"/>
    <text x="60" y="243" font-family="'Inter', sans-serif" font-size="12" fill="#A9AECB">&bull; ChromaDB Chatbot</text>
    <rect x="45" y="265" width="190" height="36" rx="4" fill="transparent"/>
    <text x="60" y="288" font-family="'Inter', sans-serif" font-size="12" fill="#A9AECB">&bull; Multi-Company Ratio</text>
    <rect x="45" y="310" width="190" height="36" rx="4" fill="transparent"/>
    <text x="60" y="333" font-family="'Inter', sans-serif" font-size="12" fill="#A9AECB">&bull; Distress ML Risk</text>
    
    <!-- Central Metric Tiles -->
    <!-- Tile 1 -->
    <rect x="270" y="115" width="220" height="110" rx="6" fill="#1A1F3B" stroke="#2A3050"/>
    <text x="290" y="142" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB">CURRENT RATIO</text>
    <text x="290" y="180" font-family="'Fraunces', serif" font-size="28" font-weight="bold" fill="#F2EFE8">2.45x</text>
    <text x="290" y="205" font-family="'JetBrains Mono', monospace" font-size="11" fill="#27C93F">+14.2% vs GAAP Peer</text>
    
    <!-- Tile 2 -->
    <rect x="510" y="115" width="220" height="110" rx="6" fill="#1A1F3B" stroke="#2A3050"/>
    <text x="530" y="142" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB">DEBT TO EQUITY</text>
    <text x="530" y="180" font-family="'Fraunces', serif" font-size="28" font-weight="bold" fill="#F2EFE8">0.38</text>
    <text x="530" y="205" font-family="'JetBrains Mono', monospace" font-size="11" fill="#27C93F">Low Solvency Risk</text>

    <!-- Tile 3 -->
    <rect x="750" y="115" width="220" height="110" rx="6" fill="#1A1F3B" stroke="#2A3050"/>
    <text x="770" y="142" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB">ROIC (CAPITAL)</text>
    <text x="770" y="180" font-family="'Fraunces', serif" font-size="28" font-weight="bold" fill="#FFB547">18.4%</text>
    <text x="770" y="205" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FFB547">Top Decile Margin</text>

    <!-- Tile 4 -->
    <rect x="990" y="115" width="235" height="110" rx="6" fill="#1A1F3B" stroke="#2A3050"/>
    <text x="1010" y="142" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB">DISTRESS PROBABILITY</text>
    <text x="1010" y="180" font-family="'Fraunces', serif" font-size="28" font-weight="bold" fill="#27C93F">1.2%</text>
    <text x="1010" y="205" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB">Scikit-learn Model</text>
    
    <!-- Large Chart / Table Section -->
    <rect x="270" y="245" width="580" height="495" rx="6" fill="#161A30" stroke="#2A3050"/>
    <text x="295" y="280" font-family="'Fraunces', serif" font-size="16" font-weight="bold" fill="#F2EFE8">Normalized 5-Year Income &amp; Balance Disclosures</text>
    <text x="295" y="300" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A9AECB">Multi-Engine Ingestion (PyMuPDF + pdfplumber) &bull; GAAP Normalized</text>
    
    <!-- Synthetic Line Chart -->
    <path d="M 300 480 Q 420 380, 520 420 T 700 340 T 820 310 L 820 540 L 300 540 Z" fill="url(#chartGrad)"/>
    <path d="M 300 480 Q 420 380, 520 420 T 700 340 T 820 310" fill="none" stroke="#FFB547" stroke-width="3"/>
    
    <!-- Table Grid Rows -->
    <rect x="290" y="565" width="540" height="32" rx="4" fill="#1E2342"/>
    <text x="310" y="585" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F2EFE8">Operating Revenue</text>
    <text x="790" y="585" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FFB547" text-anchor="end">$383,285M</text>
    
    <rect x="290" y="605" width="540" height="32" rx="4" fill="#161A30"/>
    <text x="310" y="625" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F2EFE8">Operating Income (EBIT)</text>
    <text x="790" y="625" font-family="'JetBrains Mono', monospace" font-size="11" fill="#27C93F" text-anchor="end">$114,301M</text>

    <rect x="290" y="645" width="540" height="32" rx="4" fill="#1E2342"/>
    <text x="310" y="665" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F2EFE8">Cash from Operations</text>
    <text x="790" y="665" font-family="'JetBrains Mono', monospace" font-size="11" fill="#27C93F" text-anchor="end">$110,543M</text>

    <!-- Right Side: Interactive RAG Footnote Chatbot -->
    <rect x="870" y="245" width="355" height="495" rx="6" fill="#161A30" stroke="#2A3050"/>
    <rect x="870" y="245" width="355" height="45" rx="6" fill="#1E2342" stroke="#2A3050"/>
    <text x="890" y="272" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#FFB547">ChromaDB RAG Assistant</text>
    
    <!-- Chat bubbles -->
    <rect x="890" y="310" width="315" height="50" rx="6" fill="#252D57"/>
    <text x="905" y="332" font-family="'Inter', sans-serif" font-size="11" fill="#F2EFE8">Query: "What are the debt maturities</text>
    <text x="905" y="348" font-family="'Inter', sans-serif" font-size="11" fill="#F2EFE8">for senior notes beyond 2026?"</text>

    <rect x="890" y="380" width="315" height="110" rx="6" fill="#1A1F3B" stroke="#FFB547" stroke-width="0.8"/>
    <text x="905" y="402" font-family="'JetBrains Mono', monospace" font-size="10" fill="#FFB547">RETRIEVED &bull; Note 8 (Debt Schedule):</text>
    <text x="905" y="422" font-family="'Inter', sans-serif" font-size="11" fill="#A9AECB">"Aggregate maturities of long-term debt</text>
    <text x="905" y="440" font-family="'Inter', sans-serif" font-size="11" fill="#A9AECB">include $10.5B due in 2027 and $8.2B</text>
    <text x="905" y="458" font-family="'Inter', sans-serif" font-size="11" fill="#A9AECB">due in 2028 under fixed coupons."</text>
    <text x="905" y="478" font-family="'JetBrains Mono', monospace" font-size="9" fill="#27C93F">Similarity Score: 0.894 (ChromaDB cosine)</text>
    
    <!-- Input Box -->
    <rect x="890" y="675" width="315" height="45" rx="6" fill="#0E1020" stroke="#2A3050"/>
    <text x="910" y="702" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A9AECB">Ask a query over 10-K filings...</text>
  </svg>`;
}

// SVG UI Mockup Generator for FloatChat
function createFloatChatCover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="100%" height="100%">
    <defs>
      <linearGradient id="oceanBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#08101E"/>
        <stop offset="100%" stop-color="#0B1A2E"/>
      </linearGradient>
    </defs>
    
    <rect width="1280" height="800" fill="url(#oceanBg)"/>
    
    <!-- Top Window Chrome -->
    <rect x="30" y="30" width="1220" height="48" rx="8" fill="#0F243E" stroke="#1D3E64"/>
    <circle cx="55" cy="54" r="6" fill="#FF5F56"/>
    <circle cx="75" cy="54" r="6" fill="#FFBD2E"/>
    <circle cx="95" cy="54" r="6" fill="#27C93F"/>
    <rect x="240" y="42" width="800" height="24" rx="4" fill="#08101E" stroke="#1D3E64"/>
    <text x="640" y="58" font-family="'JetBrains Mono', monospace" font-size="11" fill="#7FA9D6" text-anchor="middle">https://floatchat.ocean-intel.org/argo/explorer</text>
    <rect x="1110" y="42" width="120" height="24" rx="4" fill="#00D2FF" fill-opacity="0.15" stroke="#00D2FF" stroke-width="0.8"/>
    <text x="1170" y="58" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#00D2FF" text-anchor="middle">470+ FLOATS ACTIVE</text>

    <!-- Main Workspace -->
    <rect x="30" y="90" width="1220" height="680" rx="8" fill="#081424" stroke="#1D3E64"/>
    
    <!-- Left Leaflet Map Visualization Viewport -->
    <rect x="50" y="110" width="780" height="480" rx="6" fill="#0A1828" stroke="#1D3E64"/>
    
    <!-- Stylized World Map Continents in Dark Cyan -->
    <path d="M 90 200 Q 140 180, 200 210 Q 240 260, 220 320 Q 180 350, 120 310 Z" fill="#132B45"/>
    <path d="M 230 330 Q 270 340, 290 400 Q 280 460, 240 450 Q 220 400, 230 330 Z" fill="#132B45"/>
    <path d="M 400 170 Q 480 160, 520 200 Q 480 250, 430 240 Z" fill="#132B45"/>
    <path d="M 440 260 Q 500 270, 520 340 Q 480 420, 430 360 Z" fill="#132B45"/>
    <path d="M 580 180 Q 720 170, 760 260 Q 700 320, 620 280 Z" fill="#132B45"/>
    <path d="M 680 360 Q 750 370, 740 430 Q 690 430, 680 360 Z" fill="#132B45"/>
    
    <!-- ARGO Float Coordinate Points & Radar Circles -->
    <circle cx="340" cy="270" r="14" fill="#00D2FF" fill-opacity="0.2"/>
    <circle cx="340" cy="270" r="4" fill="#00D2FF"/>
    <circle cx="370" cy="330" r="18" fill="#FFB547" fill-opacity="0.2"/>
    <circle cx="370" cy="330" r="4" fill="#FFB547"/>
    <circle cx="490" cy="380" r="14" fill="#00D2FF" fill-opacity="0.2"/>
    <circle cx="490" cy="380" r="4" fill="#00D2FF"/>
    <circle cx="620" cy="340" r="14" fill="#00D2FF" fill-opacity="0.2"/>
    <circle cx="620" cy="340" r="4" fill="#00D2FF"/>
    <circle cx="280" cy="240" r="4" fill="#00D2FF"/>
    <circle cx="560" cy="220" r="4" fill="#00D2FF"/>

    <!-- Map Info Overlay -->
    <rect x="70" y="130" width="260" height="60" rx="4" fill="#08101Ecc" stroke="#1D3E64"/>
    <text x="85" y="152" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#00D2FF">ARGO GLOBAL ARRAY</text>
    <text x="85" y="172" font-family="'JetBrains Mono', monospace" font-size="10" fill="#7FA9D6">Profile Depth: 0 - 2000m &bull; Active CTD</text>

    <!-- Bottom NL2SQL Prompt Bar & AST Inspection Block -->
    <rect x="50" y="605" width="780" height="145" rx="6" fill="#0E2138" stroke="#1D3E64"/>
    <text x="70" y="630" font-family="'Inter', sans-serif" font-size="12" font-weight="bold" fill="#00D2FF">Conversational NL2SQL Input:</text>
    <text x="70" y="650" font-family="'Inter', sans-serif" font-size="13" fill="#F2EFE8">"Show salinity anomalies exceeding 2.5 sigma near the equator in the Indian Ocean"</text>
    
    <rect x="70" y="670" width="740" height="65" rx="4" fill="#08101E" stroke="#1D3E64"/>
    <text x="85" y="690" font-family="'JetBrains Mono', monospace" font-size="10" fill="#27C93F">&#10003; AST VALIDATION PASSED (sqlglot node inspection: SelectStatement only)</text>
    <text x="85" y="712" font-family="'JetBrains Mono', monospace" font-size="10" fill="#7FA9D6">SELECT float_id, lat, lon, z_score FROM argo_measurements WHERE abs(z_score) &gt; 2.5 AND abs(lat) &lt; 5.0;</text>

    <!-- Right Side: Depth CTD Chart & Anomaly Panel -->
    <rect x="850" y="110" width="380" height="640" rx="6" fill="#0B1A2E" stroke="#1D3E64"/>
    <text x="875" y="145" font-family="'Fraunces', serif" font-size="18" font-weight="bold" fill="#F2EFE8">Float #2903348 Profile</text>
    <text x="875" y="165" font-family="'JetBrains Mono', monospace" font-size="10" fill="#7FA9D6">Sensor: Sea-Bird CTD 41CP &bull; 49 Tests Passing</text>

    <!-- Anomaly Curve -->
    <rect x="875" y="190" width="330" height="260" rx="4" fill="#081424" stroke="#1D3E64"/>
    <text x="895" y="215" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A9AECB">TEMPERATURE (&deg;C) VS DEPTH (m)</text>
    <path d="M 900 240 Q 940 280, 980 340 T 1160 410" fill="none" stroke="#FF5F56" stroke-width="2.5"/>
    <text x="1100" y="280" font-family="'JetBrains Mono', monospace" font-size="9" fill="#FF5F56">Thermocline Spike</text>

    <!-- Diagnostic metrics -->
    <rect x="875" y="470" width="330" height="60" rx="4" fill="#0E2138"/>
    <text x="895" y="495" font-family="'JetBrains Mono', monospace" font-size="10" fill="#7FA9D6">SALINITY Z-SCORE</text>
    <text x="895" y="518" font-family="'Fraunces', serif" font-size="20" font-weight="bold" fill="#FFB547">+2.84 &sigma; (Significant Anomaly)</text>

    <rect x="875" y="545" width="330" height="80" rx="4" fill="#0E2138"/>
    <text x="895" y="570" font-family="'JetBrains Mono', monospace" font-size="10" fill="#7FA9D6">DUAL PERSONA WORKFLOW</text>
    <text x="895" y="595" font-family="'Inter', sans-serif" font-size="11" fill="#F2EFE8">Switched to: Researcher View (Raw CTD calibration stream active)</text>
  </svg>`;
}

// SVG UI Mockup Generator for Mental Health System
function createMentalHealthCover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="100%" height="100%">
    <defs>
      <linearGradient id="mhBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#141824"/>
        <stop offset="100%" stop-color="#1B2236"/>
      </linearGradient>
    </defs>
    
    <rect width="1280" height="800" fill="url(#mhBg)"/>
    
    <!-- Top Chrome -->
    <rect x="30" y="30" width="1220" height="48" rx="8" fill="#202A44" stroke="#2D3A5D"/>
    <circle cx="55" cy="54" r="6" fill="#FF5F56"/>
    <circle cx="75" cy="54" r="6" fill="#FFBD2E"/>
    <circle cx="95" cy="54" r="6" fill="#27C93F"/>
    <rect x="240" y="42" width="800" height="24" rx="4" fill="#141824" stroke="#2D3A5D"/>
    <text x="640" y="58" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A4B3D6" text-anchor="middle">https://wellbeing.campus.edu/student/cockpit</text>
    <rect x="1110" y="42" width="120" height="24" rx="4" fill="#6C5CE7" fill-opacity="0.25" stroke="#A29BFE" stroke-width="0.8"/>
    <text x="1170" y="58" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#A29BFE" text-anchor="middle">RBAC SECURED</text>

    <!-- Main Workspace -->
    <rect x="30" y="90" width="1220" height="680" rx="8" fill="#151A29" stroke="#2D3A5D"/>

    <!-- Left Cockpit Panel: Mood Tracking & Sleep -->
    <rect x="55" y="115" width="480" height="300" rx="6" fill="#1C2337" stroke="#2D3A5D"/>
    <text x="80" y="150" font-family="'Fraunces', serif" font-size="18" font-weight="bold" fill="#F2EFE8">Daily Mood &amp; Lifestyle Tracking</text>
    <text x="80" y="170" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6">7-Day Biometric Trend &bull; Supabase RLS Protected</text>
    
    <!-- Mood Visual Bars -->
    <rect x="80" y="210" width="40" height="140" rx="4" fill="#6C5CE7" fill-opacity="0.3"/>
    <rect x="80" y="270" width="40" height="80" rx="4" fill="#6C5CE7"/>
    <text x="100" y="370" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6" text-anchor="middle">MON</text>

    <rect x="140" y="210" width="40" height="140" rx="4" fill="#6C5CE7" fill-opacity="0.3"/>
    <rect x="140" y="240" width="40" height="110" rx="4" fill="#6C5CE7"/>
    <text x="160" y="370" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6" text-anchor="middle">TUE</text>

    <rect x="200" y="210" width="40" height="140" rx="4" fill="#6C5CE7" fill-opacity="0.3"/>
    <rect x="200" y="230" width="40" height="120" rx="4" fill="#00B894"/>
    <text x="220" y="370" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6" text-anchor="middle">WED</text>

    <rect x="260" y="210" width="40" height="140" rx="4" fill="#6C5CE7" fill-opacity="0.3"/>
    <rect x="260" y="290" width="40" height="60" rx="4" fill="#FF7675"/>
    <text x="280" y="370" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6" text-anchor="middle">THU</text>

    <rect x="320" y="210" width="40" height="140" rx="4" fill="#6C5CE7" fill-opacity="0.3"/>
    <rect x="320" y="250" width="40" height="100" rx="4" fill="#6C5CE7"/>
    <text x="340" y="370" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6" text-anchor="middle">FRI</text>

    <!-- Right Top: AI Sentiment Journal Analysis -->
    <rect x="560" y="115" width="665" height="300" rx="6" fill="#1C2337" stroke="#2D3A5D"/>
    <text x="585" y="150" font-family="'Fraunces', serif" font-size="18" font-weight="bold" fill="#F2EFE8">Encrypted Sentiment Journal Module</text>
    <text x="585" y="170" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6">NLP Emotion Triaging &bull; Zero Clinical Disclosure</text>
    
    <rect x="585" y="195" width="615" height="140" rx="4" fill="#141824" stroke="#2D3A5D"/>
    <text x="605" y="225" font-family="'Inter', sans-serif" font-size="12" fill="#F2EFE8">"Preparing for distributed systems finals while balancing lab project deadlines.</text>
    <text x="605" y="245" font-family="'Inter', sans-serif" font-size="12" fill="#F2EFE8">Feeling cognitive fatigue, but study sessions with peers helped clarify architecture."</text>
    
    <rect x="605" y="280" width="160" height="28" rx="4" fill="#6C5CE7" fill-opacity="0.2"/>
    <text x="685" y="298" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#A29BFE" text-anchor="middle">Sentiment: Mild Stress (62%)</text>
    <rect x="780" y="280" width="180" height="28" rx="4" fill="#00B894" fill-opacity="0.2"/>
    <text x="870" y="298" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#00B894" text-anchor="middle">Resilience Score: High</text>

    <!-- Bottom Institutional Counselor Dashboard -->
    <rect x="55" y="435" width="1170" height="310" rx="6" fill="#1C2337" stroke="#2D3A5D"/>
    <text x="80" y="470" font-family="'Fraunces', serif" font-size="18" font-weight="bold" fill="#F2EFE8">Counselor Workstation &amp; Stress Correlation Engine</text>
    <text x="80" y="490" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6">Correlating Academic Attendance Anomalies with Support Inquiries</text>

    <!-- Counselor Rows -->
    <rect x="80" y="515" width="1120" height="48" rx="4" fill="#141824" stroke="#2D3A5D"/>
    <text x="100" y="544" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#F2EFE8">QUEUE #1042 &bull; Computer Engineering Dept</text>
    <text x="700" y="544" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FF7675">Stress Indicator: Midterm Surge</text>
    <rect x="1060" y="527" width="120" height="26" rx="4" fill="#00B894"/>
    <text x="1120" y="544" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#0E1020" text-anchor="middle">Schedule Meet</text>

    <rect x="80" y="575" width="1120" height="48" rx="4" fill="#141824" stroke="#2D3A5D"/>
    <text x="100" y="604" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#F2EFE8">QUEUE #1043 &bull; Applied AI Research Group</text>
    <text x="700" y="604" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00B894">Normal Wellness Baseline</text>
    <rect x="1060" y="587" width="120" height="26" rx="4" fill="#202A44" stroke="#2D3A5D"/>
    <text x="1120" y="604" font-family="'JetBrains Mono', monospace" font-size="10" fill="#A4B3D6" text-anchor="middle">View Notes</text>

    <rect x="80" y="635" width="1120" height="48" rx="4" fill="#141824" stroke="#2D3A5D"/>
    <text x="100" y="664" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#F2EFE8">CAMPUS WELLBEING INDEX</text>
    <text x="700" y="664" font-family="'JetBrains Mono', monospace" font-size="11" fill="#A29BFE">30+ Feature Modules Active &bull; Role-Based Security Verified</text>
  </svg>`;
}

// Write the files to public/assets/projects/
const finscopeDir = path.join(publicAssetsDir, 'projects', 'finscope');
fs.writeFileSync(path.join(finscopeDir, 'cover.svg'), createFinScopeCover());
fs.writeFileSync(path.join(finscopeDir, 'screenshot-1.svg'), createFinScopeCover());
fs.writeFileSync(path.join(finscopeDir, 'screenshot-2.svg'), createFinScopeCover());
fs.writeFileSync(path.join(finscopeDir, 'screenshot-3.svg'), createFinScopeCover());

const floatchatDir = path.join(publicAssetsDir, 'projects', 'floatchat');
fs.writeFileSync(path.join(floatchatDir, 'cover.svg'), createFloatChatCover());
fs.writeFileSync(path.join(floatchatDir, 'screenshot-1.svg'), createFloatChatCover());
fs.writeFileSync(path.join(floatchatDir, 'screenshot-2.svg'), createFloatChatCover());
fs.writeFileSync(path.join(floatchatDir, 'screenshot-3.svg'), createFloatChatCover());

const mhDir = path.join(publicAssetsDir, 'projects', 'mental-health-system');
fs.writeFileSync(path.join(mhDir, 'cover.svg'), createMentalHealthCover());
fs.writeFileSync(path.join(mhDir, 'screenshot-1.svg'), createMentalHealthCover());
fs.writeFileSync(path.join(mhDir, 'screenshot-2.svg'), createMentalHealthCover());
fs.writeFileSync(path.join(mhDir, 'screenshot-3.svg'), createMentalHealthCover());

console.log('✅ Generated realistic UI architecture mockups for all three projects!');
