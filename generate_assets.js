const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

// 1. Online Music Store Data Analysis SVG
const musicSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgMusic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14100c"/>
      <stop offset="100%" stop-color="#0a0807"/>
    </linearGradient>
    <linearGradient id="barGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#c2410c"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <linearGradient id="barGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#9a3412"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
  </defs>
  <rect width="800" height="480" fill="url(#bgMusic)" rx="16"/>
  <rect x="20" y="20" width="760" height="440" fill="none" stroke="rgba(249, 115, 22, 0.15)" stroke-width="1.5" rx="12"/>

  <!-- SQL Query Editor Window -->
  <g transform="translate(45, 50)">
    <rect width="360" height="240" rx="8" fill="#181310" stroke="rgba(255,255,255,0.08)"/>
    <circle cx="20" cy="18" r="4" fill="#ef4444"/>
    <circle cx="34" cy="18" r="4" fill="#eab308"/>
    <circle cx="48" cy="18" r="4" fill="#22c55e"/>
    <text x="70" y="22" fill="#9ca3af" font-family="monospace" font-size="11">analytics_query.sql</text>
    <line x1="0" y1="36" x2="360" y2="36" stroke="rgba(255,255,255,0.06)"/>

    <text x="18" y="65" fill="#f97316" font-family="monospace" font-size="12" font-weight="bold">WITH</text>
    <text x="56" y="65" fill="#e5e7eb" font-family="monospace" font-size="12">CustomerSpending</text>
    <text x="175" y="65" fill="#f97316" font-family="monospace" font-size="12" font-weight="bold">AS (</text>

    <text x="32" y="90" fill="#38bdf8" font-family="monospace" font-size="11">SELECT</text>
    <text x="82" y="90" fill="#d1d5db" font-family="monospace" font-size="11">c.customer_id, c.country,</text>
    <text x="32" y="112" fill="#fb923c" font-family="monospace" font-size="11">SUM(i.total)</text>
    <text x="118" y="112" fill="#f97316" font-family="monospace" font-size="11">AS</text>
    <text x="140" y="112" fill="#d1d5db" font-family="monospace" font-size="11">total_spent</text>

    <text x="32" y="135" fill="#38bdf8" font-family="monospace" font-size="11">FROM</text>
    <text x="70" y="135" fill="#d1d5db" font-family="monospace" font-size="11">customer c</text>
    <text x="32" y="157" fill="#38bdf8" font-family="monospace" font-size="11">JOIN</text>
    <text x="66" y="157" fill="#d1d5db" font-family="monospace" font-size="11">invoice i</text>
    <text x="135" y="157" fill="#38bdf8" font-family="monospace" font-size="11">ON</text>
    <text x="156" y="157" fill="#d1d5db" font-family="monospace" font-size="11">c.id = i.customer_id</text>

    <text x="32" y="180" fill="#38bdf8" font-family="monospace" font-size="11">GROUP BY</text>
    <text x="96" y="180" fill="#d1d5db" font-family="monospace" font-size="11">1, 2</text>
    <text x="18" y="205" fill="#f97316" font-family="monospace" font-size="12" font-weight="bold">)</text>
    <text x="18" y="226" fill="#38bdf8" font-family="monospace" font-size="11">SELECT * FROM CustomerSpending;</text>
  </g>

  <!-- Database ER Table Node -->
  <g transform="translate(45, 310)">
    <rect width="360" height="120" rx="8" fill="#181310" stroke="rgba(255,255,255,0.08)"/>
    <rect width="360" height="28" rx="8" fill="rgba(234, 88, 12, 0.2)"/>
    <text x="16" y="19" fill="#fb923c" font-family="sans-serif" font-weight="bold" font-size="12">POSTGRESQL RELATIONAL SCHEMA</text>
    <text x="16" y="52" fill="#9ca3af" font-family="monospace" font-size="11">PK  invoice_id : INT</text>
    <text x="16" y="72" fill="#9ca3af" font-family="monospace" font-size="11">FK  customer_id : INT (INDEXED)</text>
    <text x="16" y="92" fill="#9ca3af" font-family="monospace" font-size="11">    total : NUMERIC(10,2)</text>
    <text x="16" y="112" fill="#22c55e" font-family="monospace" font-size="10">✓ 100% Query Performance Optimized</text>
  </g>

  <!-- Sales & Revenue Analytics Chart Window -->
  <g transform="translate(435, 50)">
    <rect width="320" height="380" rx="8" fill="#181310" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="32" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">Revenue by Genre &amp; Country</text>
    <text x="20" y="50" fill="#9ca3af" font-family="sans-serif" font-size="11">SQL Aggregate Insights</text>

    <!-- Grid lines -->
    <line x1="20" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.06)"/>
    <line x1="20" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.06)"/>
    <line x1="20" y1="210" x2="300" y2="210" stroke="rgba(255,255,255,0.06)"/>
    <line x1="20" y1="270" x2="300" y2="270" stroke="rgba(255,255,255,0.06)"/>

    <!-- Bar Charts -->
    <!-- Rock -->
    <rect x="40" y="110" width="36" height="160" rx="4" fill="url(#barGrad1)"/>
    <text x="42" y="100" fill="#fb923c" font-family="monospace" font-size="11" font-weight="bold">$4.2K</text>
    <text x="44" y="292" fill="#9ca3af" font-family="sans-serif" font-size="10">Rock</text>

    <!-- Latin -->
    <rect x="95" y="145" width="36" height="125" rx="4" fill="url(#barGrad2)"/>
    <text x="97" y="135" fill="#fb923c" font-family="monospace" font-size="11" font-weight="bold">$3.1K</text>
    <text x="98" y="292" fill="#9ca3af" font-family="sans-serif" font-size="10">Latin</text>

    <!-- Metal -->
    <rect x="150" y="170" width="36" height="100" rx="4" fill="url(#barGrad1)"/>
    <text x="152" y="160" fill="#fb923c" font-family="monospace" font-size="11" font-weight="bold">$2.4K</text>
    <text x="151" y="292" fill="#9ca3af" font-family="sans-serif" font-size="10">Metal</text>

    <!-- Jazz -->
    <rect x="205" y="210" width="36" height="60" rx="4" fill="url(#barGrad2)"/>
    <text x="207" y="200" fill="#fb923c" font-family="monospace" font-size="11" font-weight="bold">$1.5K</text>
    <text x="210" y="292" fill="#9ca3af" font-family="sans-serif" font-size="10">Jazz</text>

    <!-- Metric Pill -->
    <rect x="20" y="320" width="280" height="42" rx="6" fill="rgba(234, 88, 12, 0.12)" stroke="rgba(234, 88, 12, 0.3)"/>
    <text x="34" y="346" fill="#fb923c" font-family="sans-serif" font-weight="bold" font-size="12">Key Growth Trend Identified</text>
    <text x="250" y="346" fill="#22c55e" font-family="sans-serif" font-weight="bold" font-size="12">+34%</text>
  </g>
</svg>`;

// 2. Face Recognition Attendance System SVG
const faceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgFace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#120f0c"/>
      <stop offset="100%" stop-color="#0a0807"/>
    </linearGradient>
    <linearGradient id="cyberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>
  <rect width="800" height="480" fill="url(#bgFace)" rx="16"/>
  <rect x="20" y="20" width="760" height="440" fill="none" stroke="rgba(249, 115, 22, 0.15)" stroke-width="1.5" rx="12"/>

  <!-- Webcam Viewport Mockup -->
  <g transform="translate(45, 50)">
    <rect width="440" height="380" rx="10" fill="#17120e" stroke="rgba(255,255,255,0.08)"/>
    
    <!-- Top bar -->
    <circle cx="20" cy="20" r="4" fill="#22c55e"/>
    <text x="32" y="24" fill="#22c55e" font-family="sans-serif" font-size="11" font-weight="bold">LIVE FEED • OpenCV VideoCapture(0)</text>
    <text x="370" y="24" fill="#9ca3af" font-family="monospace" font-size="11">30 FPS</text>
    <line x1="0" y1="40" x2="440" y2="40" stroke="rgba(255,255,255,0.06)"/>

    <!-- Simulated Face Mesh & Bounding Box -->
    <g transform="translate(130, 80)">
      <!-- Head silhouette -->
      <ellipse cx="90" cy="110" rx="65" ry="85" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
      
      <!-- Bounding Box -->
      <rect x="10" y="15" width="160" height="190" fill="rgba(34, 197, 94, 0.04)" stroke="#22c55e" stroke-width="2" stroke-dasharray="6,4"/>
      
      <!-- Corner Markers -->
      <path d="M 10 35 L 10 15 L 30 15" fill="none" stroke="#22c55e" stroke-width="3"/>
      <path d="M 150 15 L 170 15 L 170 35" fill="none" stroke="#22c55e" stroke-width="3"/>
      <path d="M 10 185 L 10 205 L 30 205" fill="none" stroke="#22c55e" stroke-width="3"/>
      <path d="M 150 205 L 170 205 L 170 185" fill="none" stroke="#22c55e" stroke-width="3"/>

      <!-- Facial Landmarks Mesh Points -->
      <circle cx="65" cy="95" r="3" fill="#38bdf8"/>
      <circle cx="115" cy="95" r="3" fill="#38bdf8"/>
      <circle cx="90" cy="120" r="3" fill="#f97316"/>
      <circle cx="75" cy="145" r="3" fill="#fb923c"/>
      <circle cx="105" cy="145" r="3" fill="#fb923c"/>
      <path d="M 65 95 Q 90 90 115 95" fill="none" stroke="rgba(56, 189, 248, 0.6)" stroke-width="1.5"/>
      <path d="M 75 145 Q 90 155 105 145" fill="none" stroke="rgba(251, 146, 60, 0.6)" stroke-width="1.5"/>

      <!-- Detection Tag -->
      <rect x="10" y="-8" width="130" height="20" rx="4" fill="#22c55e"/>
      <text x="16" y="6" fill="#000000" font-family="sans-serif" font-weight="bold" font-size="10">USER_VERIFIED • 99.2%</text>
    </g>

    <!-- Scanning line -->
    <line x1="20" y1="210" x2="420" y2="210" stroke="url(#cyberGlow)" stroke-width="1.5" stroke-opacity="0.8"/>
  </g>

  <!-- Side Panel: Real-time Attendance Logger -->
  <g transform="translate(510, 50)">
    <rect width="245" height="380" rx="10" fill="#17120e" stroke="rgba(255,255,255,0.08)"/>
    <text x="18" y="32" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Attendance Records</text>
    <text x="18" y="50" fill="#9ca3af" font-family="sans-serif" font-size="11">CSV Sync • Pandas Backend</text>
    <line x1="0" y1="65" x2="245" y2="65" stroke="rgba(255,255,255,0.06)"/>

    <!-- Attendance Entry 1 -->
    <rect x="12" y="80" width="221" height="60" rx="6" fill="rgba(34, 197, 94, 0.08)" stroke="rgba(34, 197, 94, 0.25)"/>
    <text x="24" y="102" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="12">Vivek Kumar Verma</text>
    <text x="24" y="122" fill="#86efac" font-family="monospace" font-size="10">Status: PRESENT • 09:14:22</text>

    <!-- Attendance Entry 2 -->
    <rect x="12" y="152" width="221" height="60" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)"/>
    <text x="24" y="174" fill="#d1d5db" font-family="sans-serif" font-weight="bold" font-size="12">Student #2024018</text>
    <text x="24" y="194" fill="#9ca3af" font-family="monospace" font-size="10">Status: PRESENT • 09:15:04</text>

    <!-- Attendance Entry 3 -->
    <rect x="12" y="224" width="221" height="60" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)"/>
    <text x="24" y="246" fill="#d1d5db" font-family="sans-serif" font-weight="bold" font-size="12">Student #2024089</text>
    <text x="24" y="266" fill="#9ca3af" font-family="monospace" font-size="10">Status: PRESENT • 09:16:30</text>

    <!-- Bottom Stat -->
    <rect x="12" y="305" width="221" height="55" rx="6" fill="rgba(234, 88, 12, 0.12)" stroke="rgba(234, 88, 12, 0.3)"/>
    <text x="24" y="328" fill="#fb923c" font-family="sans-serif" font-weight="bold" font-size="12">Tkinter GUI + Storage</text>
    <text x="24" y="346" fill="#d1d5db" font-family="sans-serif" font-size="11">Automated CSV Logging</text>
  </g>
</svg>`;

// 3. Customer Segmentation Model SVG
const segSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgSeg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14100d"/>
      <stop offset="100%" stop-color="#0a0807"/>
    </linearGradient>
  </defs>
  <rect width="800" height="480" fill="url(#bgSeg)" rx="16"/>
  <rect x="20" y="20" width="760" height="440" fill="none" stroke="rgba(249, 115, 22, 0.15)" stroke-width="1.5" rx="12"/>

  <!-- Scatter Plot Chart Canvas -->
  <g transform="translate(45, 50)">
    <rect width="480" height="380" rx="10" fill="#17120e" stroke="rgba(255,255,255,0.08)"/>
    <text x="24" y="34" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">K-Means Cluster Distribution</text>
    <text x="24" y="52" fill="#9ca3af" font-family="sans-serif" font-size="11">Annual Income vs. Spending Score</text>

    <!-- Axes -->
    <line x1="60" y1="330" x2="450" y2="330" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    <line x1="60" y1="80" x2="60" y2="330" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    <text x="210" y="358" fill="#9ca3af" font-family="sans-serif" font-size="11">Annual Income (k$)</text>
    <text x="12" y="200" fill="#9ca3af" font-family="sans-serif" font-size="11" transform="rotate(-90 12,200)">Spending Score</text>

    <!-- Cluster 1: High Spenders (Orange) -->
    <circle cx="340" cy="130" r="6" fill="#f97316" fill-opacity="0.8"/>
    <circle cx="360" cy="145" r="5" fill="#f97316" fill-opacity="0.8"/>
    <circle cx="330" cy="160" r="5" fill="#f97316" fill-opacity="0.8"/>
    <circle cx="380" cy="135" r="6" fill="#f97316" fill-opacity="0.8"/>
    <circle cx="350" cy="170" r="5" fill="#f97316" fill-opacity="0.8"/>
    <circle cx="395" cy="155" r="5" fill="#f97316" fill-opacity="0.8"/>
    <!-- Centroid 1 -->
    <polygon points="355,140 361,152 349,152" fill="#ffffff" stroke="#f97316" stroke-width="2"/>

    <!-- Cluster 2: Target Mid Tier (Cyan) -->
    <circle cx="230" cy="210" r="5" fill="#38bdf8" fill-opacity="0.8"/>
    <circle cx="245" cy="225" r="6" fill="#38bdf8" fill-opacity="0.8"/>
    <circle cx="260" cy="195" r="5" fill="#38bdf8" fill-opacity="0.8"/>
    <circle cx="220" cy="235" r="5" fill="#38bdf8" fill-opacity="0.8"/>
    <circle cx="270" cy="220" r="6" fill="#38bdf8" fill-opacity="0.8"/>
    <!-- Centroid 2 -->
    <polygon points="245,210 251,222 239,222" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>

    <!-- Cluster 3: Conservative Savers (Emerald) -->
    <circle cx="120" cy="270" r="6" fill="#22c55e" fill-opacity="0.8"/>
    <circle cx="135" cy="285" r="5" fill="#22c55e" fill-opacity="0.8"/>
    <circle cx="145" cy="255" r="5" fill="#22c55e" fill-opacity="0.8"/>
    <circle cx="110" cy="290" r="5" fill="#22c55e" fill-opacity="0.8"/>
    <circle cx="160" cy="275" r="6" fill="#22c55e" fill-opacity="0.8"/>
    <!-- Centroid 3 -->
    <polygon points="135,270 141,282 129,282" fill="#ffffff" stroke="#22c55e" stroke-width="2"/>
  </g>

  <!-- Side Metrics & ML Pipeline -->
  <g transform="translate(550, 50)">
    <rect width="205" height="380" rx="10" fill="#17120e" stroke="rgba(255,255,255,0.08)"/>
    <text x="18" y="32" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Unsupervised ML</text>
    <text x="18" y="50" fill="#9ca3af" font-family="sans-serif" font-size="11">Scikit-Learn Pipeline</text>
    <line x1="0" y1="65" x2="205" y2="65" stroke="rgba(255,255,255,0.06)"/>

    <rect x="12" y="80" width="181" height="65" rx="6" fill="rgba(234, 88, 12, 0.1)" stroke="rgba(234, 88, 12, 0.25)"/>
    <text x="20" y="104" fill="#fb923c" font-family="sans-serif" font-weight="bold" font-size="11">ELBOW METHOD</text>
    <text x="20" y="124" fill="#e5e7eb" font-family="sans-serif" font-size="12">Optimal K = 5</text>

    <rect x="12" y="158" width="181" height="65" rx="6" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.25)"/>
    <text x="20" y="182" fill="#38bdf8" font-family="sans-serif" font-weight="bold" font-size="11">SILHOUETTE SCORE</text>
    <text x="20" y="202" fill="#e5e7eb" font-family="sans-serif" font-size="12">Score: 0.554 (Strong)</text>

    <rect x="12" y="236" width="181" height="120" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)"/>
    <text x="20" y="260" fill="#d1d5db" font-family="sans-serif" font-weight="bold" font-size="11">STACK APPLIED:</text>
    <text x="20" y="282" fill="#9ca3af" font-family="monospace" font-size="10">• Scikit-learn</text>
    <text x="20" y="302" fill="#9ca3af" font-family="monospace" font-size="10">• Matplotlib / Seaborn</text>
    <text x="20" y="322" fill="#9ca3af" font-family="monospace" font-size="10">• Pandas &amp; NumPy</text>
    <text x="20" y="342" fill="#22c55e" font-family="sans-serif" font-weight="bold" font-size="10">✓ Marketing Targeted</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'project_music_store.svg'), musicSvg, 'utf8');
fs.writeFileSync(path.join(assetsDir, 'project_face_recognition.svg'), faceSvg, 'utf8');
fs.writeFileSync(path.join(assetsDir, 'project_customer_segmentation.svg'), segSvg, 'utf8');

console.log('Project SVG assets generated successfully!');

