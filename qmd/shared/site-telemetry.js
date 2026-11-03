/**
 * =========================================================================
 * SYNTROMETRIE SITE TELEMETRY & LIVE VISITOR COUNTER
 * Privacy-Preserving Global Hit Badge (visitorbadge.io) + Local Session Ledger
 * Tracks: Global Visits, Device Visits, Session Time & Chapter Exploration Progress
 * Zero Cookies · Zero PII · GDPR & Privacy-by-Design Compliant
 * =========================================================================
 */
(function() {
  if (window.__SYN_SITE_TELEMETRY_LOADED__) return;
  window.__SYN_SITE_TELEMETRY_LOADED__ = true;

  const BADGE_BASE = "https://api.visitorbadge.io/api/visitors?path=MetaSympl3x.Syntrometric-Topos";
  const BADGE_URL_HEADER = BADGE_BASE + "&label=VISITS&labelColor=%230a101d&countColor=%234169E1&style=flat-square";
  const BADGE_URL_MODAL  = BADGE_BASE + "&label=TOTAL%20VISITORS&labelColor=%230a101d&countColor=%234169E1&style=for-the-badge";

  // 1. Initialize Local Storage & Session Telemetry
  let visitCount = 1;
  let isNewSession = false;
  try {
    const storedVisits = parseInt(localStorage.getItem('syn_local_visits') || '0', 10);
    const activeSession = sessionStorage.getItem('syn_session_active');
    if (!activeSession) {
      isNewSession = true;
      visitCount = storedVisits + 1;
      localStorage.setItem('syn_local_visits', visitCount.toString());
      sessionStorage.setItem('syn_session_active', Date.now().toString());
    } else {
      visitCount = Math.max(1, storedVisits);
    }
  } catch (e) {
    visitCount = 1;
  }

  // Session start time
  let sessionStart = Date.now();
  try {
    const st = sessionStorage.getItem('syn_session_active');
    if (st) sessionStart = parseInt(st, 10);
  } catch (e) {}

  // Visited chapters tracking
  function recordChapterVisit(chNum) {
    if (!chNum) return;
    try {
      let visited = JSON.parse(sessionStorage.getItem('syn_visited_chapters') || '[]');
      if (!visited.includes(chNum)) {
        visited.push(chNum);
        sessionStorage.setItem('syn_visited_chapters', JSON.stringify(visited));
      }
      let allVisited = JSON.parse(localStorage.getItem('syn_all_visited_chapters') || '[]');
      if (!allVisited.includes(chNum)) {
        allVisited.push(chNum);
        localStorage.setItem('syn_all_visited_chapters', JSON.stringify(allVisited));
      }
    } catch (e) {}
  }

  // Detect current chapter from URL
  const pathMatch = window.location.pathname.match(/chapter(\d+)/i) || window.location.hash.match(/chapter(\d+)/i) || window.location.search.match(/ch=(\d+)/i);
  if (pathMatch) {
    recordChapterVisit(parseInt(pathMatch[1], 10));
  } else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    recordChapterVisit(1);
  }

  // Listen to postMessage from iframe
  window.addEventListener('message', function(evt) {
    if (evt.data && evt.data.type === 'syn-chapter-selected' && evt.data.chapter) {
      recordChapterVisit(parseInt(evt.data.chapter, 10));
    }
  });

  // 2. Inject Telemetry & Counter CSS
  const styles = `
    .syn-visit-counter-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(10, 16, 29, 0.85);
      border: 1px solid rgba(65, 105, 225, 0.45);
      border-radius: 9999px;
      padding: 2px 7px 2px 6px;
      height: 24px;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      text-decoration: none;
      flex-shrink: 0;
    }
    .syn-visit-counter-pill:hover {
      background: rgba(20, 32, 58, 0.95);
      border-color: #60a5fa;
      box-shadow: 0 0 12px rgba(65, 105, 225, 0.55);
      transform: translateY(-1px);
    }
    .syn-pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 6px #10b981;
      animation: syn-pulse-anim 2.2s infinite ease-in-out;
      flex-shrink: 0;
    }
    @keyframes syn-pulse-anim {
      0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px #10b981; }
      50% { opacity: 0.4; transform: scale(0.85); box-shadow: 0 0 2px #10b981; }
    }
    .syn-counter-badge-img {
      height: 17px;
      border-radius: 3px;
      vertical-align: middle;
      display: inline-block;
      pointer-events: none;
    }
    .syn-counter-fallback {
      font-size: 11px;
      font-weight: 700;
      color: #60a5fa;
      letter-spacing: 0.3px;
      font-family: monospace;
      display: none;
    }

    /* Telemetry Modal */
    .syn-telemetry-modal {
      position: fixed;
      inset: 0;
      background: rgba(4, 8, 18, 0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      animation: synFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes synFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .syn-telemetry-container {
      background: linear-gradient(145deg, #0a1124 0%, #060b18 100%);
      border: 1px solid rgba(65, 105, 225, 0.4);
      border-radius: 12px;
      width: 100%;
      max-width: 580px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(65, 105, 225, 0.2);
      padding: 22px 24px;
      box-sizing: border-box;
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .syn-telemetry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(65, 105, 225, 0.3);
      padding-bottom: 12px;
      margin-bottom: 18px;
    }
    .syn-telemetry-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
    }
    .syn-telemetry-close {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.15s ease;
    }
    .syn-telemetry-close:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: #ef4444;
      color: #fff;
    }
    .syn-telemetry-hero {
      text-align: center;
      padding: 16px;
      background: rgba(13, 22, 45, 0.6);
      border: 1px solid rgba(65, 105, 225, 0.25);
      border-radius: 8px;
      margin-bottom: 18px;
    }
    .syn-hero-badge-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin: 10px 0;
    }
    .syn-telemetry-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }
    @media (max-width: 480px) {
      .syn-telemetry-grid {
        grid-template-columns: 1fr;
      }
    }
    .syn-stat-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .syn-stat-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
    }
    .syn-stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #60a5fa;
      font-family: monospace;
    }
    .syn-stat-sub {
      font-size: 0.7rem;
      color: #64748b;
    }
    .syn-progress-bar-bg {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
      margin-top: 4px;
    }
    .syn-progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #4169E1, #20B2AA);
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    .syn-privacy-note {
      font-size: 0.75rem;
      color: #94a3b8;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 6px;
      padding: 10px 12px;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .overview-stats-ribbon {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
    }
    .overview-stats-ribbon .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(65, 105, 225, 0.3);
      border-radius: 6px;
      padding: 2px 8px;
      font-size: 0.72rem;
      color: #cbd5e1;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // 3. Create Telemetry Modal DOM
  const modal = document.createElement('div');
  modal.className = 'syn-telemetry-modal';
  modal.id = 'syn-telemetry-modal';
  modal.onclick = function(e) {
    if (e.target === modal) window.closeVisitTelemetryModal();
  };

  modal.innerHTML = `
    <div class="syn-telemetry-container">
      <div class="syn-telemetry-header">
        <h3 class="syn-telemetry-title">
          <span>📡 Syntrometrie Treatise Telemetry</span>
          <span style="font-size:0.65em; background:rgba(16,185,129,0.15); border:1px solid #10b981; color:#34d399; padding:2px 6px; border-radius:4px;">LIVE</span>
        </h3>
        <button class="syn-telemetry-close" onclick="window.closeVisitTelemetryModal()">✕ Close</button>
      </div>

      <div class="syn-telemetry-hero">
        <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px;">Global Monograph Readership Counter</div>
        <div class="syn-hero-badge-wrap">
          <img src="${BADGE_URL_MODAL}" alt="Live Global Visitors" style="border-radius:4px; max-width:100%; height:26px;" onerror="this.style.display='none';" />
        </div>
        <div style="font-size:0.75rem; color:#60a5fa;">Verified live hit tracker via privacy-focused distributed badge API</div>
      </div>

      <div class="syn-telemetry-grid">
        <div class="syn-stat-card">
          <div class="syn-stat-label">Your Device Visits</div>
          <div class="syn-stat-value" id="syn-stat-local-visits">#${visitCount}</div>
          <div class="syn-stat-sub">Persistent across browser restarts</div>
        </div>

        <div class="syn-stat-card">
          <div class="syn-stat-label">Current Session Time</div>
          <div class="syn-stat-value" id="syn-stat-session-time">00:00</div>
          <div class="syn-stat-sub">Active engagement duration</div>
        </div>

        <div class="syn-stat-card">
          <div class="syn-stat-label">Chapter Exploration</div>
          <div class="syn-stat-value" id="syn-stat-ch-ratio">0 / 15</div>
          <div class="syn-progress-bar-bg">
            <div class="syn-progress-bar-fill" id="syn-stat-ch-progress" style="width: 0%;"></div>
          </div>
          <div class="syn-stat-sub" id="syn-stat-ch-pct">0% of chapters explored</div>
        </div>

        <div class="syn-stat-card">
          <div class="syn-stat-label">Treatise Extent</div>
          <div class="syn-stat-value" style="color:#20B2AA;">244 Slides</div>
          <div class="syn-stat-sub">15 Chapters · 180 Manim Animations · 380+ Theorems</div>
        </div>
      </div>

      <div class="syn-privacy-note">
        <span style="font-size:1.1rem; line-height:1;">🛡️</span>
        <div>
          <b>Privacy-First Architecture:</b> Zero third-party profiling, zero cookies, zero IP logging. Site counters utilize anonymous aggregate hits and browser-local state storage.
        </div>
      </div>

      <div style="margin-top:16px; display:flex; justify-content:flex-end; gap:8px;">
        <button class="syn-telemetry-close" onclick="window.toggleOverview ? (window.closeVisitTelemetryModal(), window.toggleOverview()) : null" style="background:rgba(65,105,225,0.2); border-color:#4169E1; color:#93c5fd;">
          ☰ Open Atlas (M)
        </button>
        <button class="syn-telemetry-close" onclick="window.closeVisitTelemetryModal()">
          Done
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // 4. Session Stopwatch & Telemetry Updating
  let timerInterval = null;
  function updateTelemetryStats() {
    const elapsedSec = Math.floor((Date.now() - sessionStart) / 1000);
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    const timeEl = document.getElementById('syn-stat-session-time');
    if (timeEl) timeEl.textContent = timeStr;

    try {
      const visited = JSON.parse(sessionStorage.getItem('syn_visited_chapters') || '[]');
      const count = Math.min(15, visited.length);
      const ratioEl = document.getElementById('syn-stat-ch-ratio');
      const progEl = document.getElementById('syn-stat-ch-progress');
      const pctEl = document.getElementById('syn-stat-ch-pct');
      if (ratioEl) ratioEl.textContent = `${count} / 15`;
      if (progEl) progEl.style.width = `${Math.round((count / 15) * 100)}%`;
      if (pctEl) pctEl.textContent = `${Math.round((count / 15) * 100)}% of chapters explored`;
    } catch (e) {}
  }

  window.openVisitTelemetryModal = function(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    updateTelemetryStats();
    if (!timerInterval) {
      timerInterval = setInterval(updateTelemetryStats, 1000);
    }
    const m = document.getElementById('syn-telemetry-modal');
    if (m) m.style.display = 'flex';
  };

  window.closeVisitTelemetryModal = function() {
    const m = document.getElementById('syn-telemetry-modal');
    if (m) m.style.display = 'none';
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  // 5. Update any fallback badges on the page
  const fallbackNum = document.getElementById('syn-local-num');
  if (fallbackNum) fallbackNum.textContent = visitCount.toString();

  // Export functions
  window.recordChapterVisit = recordChapterVisit;
})();
