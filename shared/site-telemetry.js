/**
 * =========================================================================
 * SYNTROMETRIE SITE TELEMETRY & LIVE VISITOR COUNTER
 * Privacy-Preserving Global Hit Badge (visitorbadge.io) + Cross-Tab Device Session Ledger
 * Tracks: Global Visits, Device Visits, Session Time & Chapter Exploration Progress
 * Cross-Tab Device Caching: Synchronizes across all open & newly opened Chrome/device tabs
 * Inactive Session Lease: 30 minutes of inactivity before counting a new device visit
 * Incognito/Private Mode Bypass: Incognito attempts are NEVER cached (always fresh live hit)
 * Zero Cookies · Zero PII · GDPR & Privacy-by-Design Compliant
 * =========================================================================
 */
(function() {
  if (window.__SYN_SITE_TELEMETRY_LOADED__) return;
  window.__SYN_SITE_TELEMETRY_LOADED__ = true;

  // Fresh reset path starting clean at 1
  const BADGE_API_URL = "https://api.visitorbadge.io/api/visitors?path=MetaSympl3x-SyntrometricTopos-v6&label=VISITS&labelColor=%230a101d&countColor=%234169E1&style=flat-square";
  const SESSION_LEASE_MS = 30 * 60 * 1000; // 30 minutes inactivity timeout

  let isIncognitoMode = false;
  let deviceVisits = 1;
  let sessionStart = Date.now();

  // 1. Reset old inflated telemetry keys & Initialize clean V6 session
  try {
    if (!localStorage.getItem('syn_v6_reset_done')) {
      [
        'syn_local_visits', 'syn_last_known_global_visits',
        'syn_v2_reset_done', 'syn_v2_local_visits', 'syn_v2_session_active',
        'syn_v2_cached_svg', 'syn_v2_cached_count', 'syn_v2_last_global',
        'syn_visited_chapters', 'syn_all_visited_chapters',
        'syn_v3_reset_done', 'syn_v3_local_visits', 'syn_v3_session_active',
        'syn_v3_cached_svg', 'syn_v3_cached_count', 'syn_v3_last_global',
        'syn_v3_visited_chapters', 'syn_v3_all_visited_chapters',
        'syn_v4_reset_done', 'syn_v4_local_visits', 'syn_v4_session_active',
        'syn_v4_cached_svg', 'syn_v4_cached_count', 'syn_v4_last_global',
        'syn_v4_session_expires', 'syn_v4_session_start', 'syn_v4_fetch_inflight',
        'syn_v4_visited_chapters', 'syn_v4_all_visited_chapters',
        'syn_v5_reset_done', 'syn_v5_local_visits', 'syn_v5_session_active',
        'syn_v5_cached_svg', 'syn_v5_cached_count', 'syn_v5_last_global',
        'syn_v5_session_expires', 'syn_v5_session_start', 'syn_v5_fetch_inflight',
        'syn_v5_visited_chapters', 'syn_v5_all_visited_chapters'
      ].forEach(function(k) {
        try { localStorage.removeItem(k); } catch (e) {}
        try { sessionStorage.removeItem(k); } catch (e) {}
      });
      localStorage.setItem('syn_v6_reset_done', 'true');
    }
  } catch (e) {}

  // 2. Visited chapters tracking (stored in localStorage for cross-tab sync)
  function recordChapterVisit(chNum) {
    if (!chNum) return;
    try {
      let visited = JSON.parse(localStorage.getItem('syn_v6_visited_chapters') || '[]');
      if (!visited.includes(chNum)) {
        visited.push(chNum);
        localStorage.setItem('syn_v6_visited_chapters', JSON.stringify(visited));
      }
      let allVisited = JSON.parse(localStorage.getItem('syn_v6_all_visited_chapters') || '[]');
      if (!allVisited.includes(chNum)) {
        allVisited.push(chNum);
        localStorage.setItem('syn_v6_all_visited_chapters', JSON.stringify(allVisited));
      }
      // Touch session lease on navigation
      if (!isIncognitoMode) {
        const now = Date.now();
        const exp = parseInt(localStorage.getItem('syn_v6_session_expires') || '0', 10);
        if (exp && now < exp) {
          localStorage.setItem('syn_v6_session_expires', (now + SESSION_LEASE_MS).toString());
        }
      }
    } catch (e) {}
  }

  // Detect current chapter from URL
  const pathMatch = window.location.pathname.match(/chapter(\d+)/i) || 
                    window.location.hash.match(/chapter(\d+)/i) || 
                    window.location.search.match(/ch=(\d+)/i);
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

  // 3. Inject Telemetry & Counter CSS
  const styles = `
    .syn-visit-counter-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(10, 16, 29, 0.85);
      border: 1px solid rgba(65, 105, 225, 0.45);
      border-radius: 9999px;
      padding: 0 8px 0 6px;
      height: 24px;
      line-height: 24px;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      overflow: hidden;
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
      height: 17px !important;
      max-height: 17px !important;
      width: auto !important;
      border-radius: 3px;
      vertical-align: middle;
      display: inline-block;
      pointer-events: none;
      object-fit: contain;
    }
    .syn-counter-fallback {
      font-size: 11px;
      font-weight: 700;
      color: #60a5fa;
      letter-spacing: 0.3px;
      font-family: monospace;
      display: inline-block;
      vertical-align: middle;
      line-height: 17px;
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
      min-height: 26px;
    }
    .syn-hero-badge-wrap img {
      height: 24px !important;
      max-height: 24px !important;
      width: auto !important;
      border-radius: 4px;
      object-fit: contain;
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

  // 4. Create Telemetry Modal DOM
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
          <img class="syn-counter-badge-img" id="modal-hero-badge-img" alt="Global Visits" height="24" style="display:none;" />
          <span class="syn-counter-fallback" id="modal-hero-fallback" style="font-size:1.1rem;">VISITS: <span class="syn-visit-count-display">1</span></span>
        </div>
        <div style="font-size:0.75rem; color:#60a5fa;">Verified live hit tracker with cross-tab device session caching</div>
      </div>

      <div class="syn-telemetry-grid">
        <div class="syn-stat-card">
          <div class="syn-stat-label">Your Device Visits</div>
          <div class="syn-stat-value" id="syn-stat-local-visits">#1</div>
          <div class="syn-stat-sub">Persistent across browser restarts &amp; tabs</div>
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

  if (document.body) {
    document.body.appendChild(modal);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(modal);
    });
  }

  // 5. Update all badge <img> elements with data URL (renders cleanly, never clips!)
  function updateAllBadgeImages(svgText, countStr) {
    if (!svgText && !isIncognitoMode) {
      try {
        svgText = localStorage.getItem('syn_v6_cached_svg');
        countStr = countStr || localStorage.getItem('syn_v6_cached_count');
      } catch (e) {}
    }

    if (!countStr && svgText) {
      const match = svgText.match(/aria-label=["'][^:"]*:\s*([0-9,kK\.\+]+)["']/) ||
                    svgText.match(/<title>[^:<]*:\s*([0-9,kK\.\+]+)<\/title>/);
      if (match) countStr = match[1];
    }

    let dataUrl = null;
    if (svgText) {
      dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
    }

    document.querySelectorAll('.syn-counter-badge-img').forEach(function(img) {
      if (dataUrl) {
        img.src = dataUrl;
        img.style.display = 'inline-block';
      }
    });

    const modalHeroImg = document.getElementById('modal-hero-badge-img');
    const modalHeroFb = document.getElementById('modal-hero-fallback');
    if (modalHeroImg && dataUrl) {
      modalHeroImg.src = dataUrl;
      modalHeroImg.style.display = 'inline-block';
      if (modalHeroFb) modalHeroFb.style.display = 'none';
    }

    // Hide ALL fallback labels whenever the SVG image is active!
    if (dataUrl) {
      document.querySelectorAll('.syn-counter-fallback').forEach(function(fb) {
        fb.style.display = 'none';
      });
    } else {
      document.querySelectorAll('.syn-counter-fallback').forEach(function(fb) {
        fb.style.display = 'inline-block';
      });
    }

    if (countStr) {
      document.querySelectorAll('.syn-visit-count-display').forEach(function(el) {
        el.textContent = countStr;
      });
    }
  }

  function updateDeviceVisitsDisplay(val) {
    const el = document.getElementById('syn-stat-local-visits');
    if (el) el.textContent = '#' + val;
  }

  // 6. Incognito / Private Mode Detection
  function checkIncognito(callback) {
    let finished = false;
    function done(isIncog) {
      if (finished) return;
      finished = true;
      callback(isIncog);
    }

    // Explicit bypass via query parameter
    if (window.location.search.indexOf('incognito') !== -1 || window.location.search.indexOf('nocache') !== -1) {
      done(true);
      return;
    }

    // Safety fallback timeout (350ms)
    setTimeout(function() {
      done(false);
    }, 350);

    // 1. Chromium check (Chrome, Edge, Opera, Brave)
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(function(est) {
        var isLowQuota = est.quota && est.quota < 4000000000;
        if (isLowQuota) {
          done(true);
          return;
        }
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (fs) {
          fs(window.TEMPORARY, 100, function() {
            done(false);
          }, function() {
            done(true);
          });
          return;
        }
        done(false);
      }).catch(function() {
        done(true);
      });
      return;
    }

    // 2. Safari / iOS WebKit check
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      try {
        if (window.openDatabase) {
          window.openDatabase(null, null, null, null);
        }
      } catch (e) {
        done(true);
        return;
      }
    }

    // 3. Firefox check
    if ('MozAppearance' in document.documentElement.style) {
      if (!window.indexedDB) {
        done(true);
        return;
      }
      try {
        var db = window.indexedDB.open('test_incog');
        db.onerror = function() { done(true); };
        db.onsuccess = function() { done(false); };
        return;
      } catch (e) {
        done(true);
        return;
      }
    }

    done(false);
  }

  // 7. Fetch Logic with Incognito Bypass
  function fetchBadge(isIncognito) {
    var url = BADGE_API_URL;
    if (isIncognito) {
      url += '&_t=' + Date.now();
    }

    fetch(url, { mode: 'cors', cache: isIncognito ? 'no-store' : 'default' })
      .then(function(res) {
        if (!res.ok) throw new Error('Status ' + res.status);
        return res.text();
      })
      .then(function(svgText) {
        var count = '1';
        var match = svgText.match(/aria-label=["'][^:"]*:\s*([0-9,kK\.\+]+)["']/) ||
                    svgText.match(/<title>[^:<]*:\s*([0-9,kK\.\+]+)<\/title>/);
        if (match) count = match[1];

        // ONLY cache in persistent device storage if NOT in incognito mode
        if (!isIncognito) {
          try {
            localStorage.setItem('syn_v6_cached_svg', svgText);
            localStorage.setItem('syn_v6_cached_count', count);
            localStorage.setItem('syn_v6_last_global', count);
            localStorage.removeItem('syn_v6_fetch_inflight');
          } catch (e) {}
        }

        updateAllBadgeImages(svgText, count);
      })
      .catch(function(err) {
        if (!isIncognito) {
          try { localStorage.removeItem('syn_v6_fetch_inflight'); } catch (e) {}
        }
        var fb = '1';
        if (!isIncognito) {
          try {
            fb = localStorage.getItem('syn_v6_last_global') || 
                 localStorage.getItem('syn_v6_device_visits') || '1';
          } catch (e) {}
        }
        updateAllBadgeImages(null, fb);
      });
  }

  // 8. Device Session Initialization & Cross-Tab Deduplication
  function initDeviceSession() {
    const now = Date.now();

    try {
      const storedVisits = parseInt(localStorage.getItem('syn_v6_device_visits') || '0', 10);
      const sessionExpires = parseInt(localStorage.getItem('syn_v6_session_expires') || '0', 10);
      const storedStart = parseInt(localStorage.getItem('syn_v6_session_start') || '0', 10);

      if (sessionExpires && now < sessionExpires) {
        // Active device session exists across Chrome/device tabs!
        deviceVisits = Math.max(1, storedVisits);
        sessionStart = storedStart || now;
        // Extend session expiration lease (sliding window)
        localStorage.setItem('syn_v6_session_expires', (now + SESSION_LEASE_MS).toString());
      } else {
        // New distinct device session (first visit or after 30+ min of inactivity)
        deviceVisits = storedVisits + 1;
        sessionStart = now;
        localStorage.setItem('syn_v6_device_visits', deviceVisits.toString());
        localStorage.setItem('syn_v6_session_start', sessionStart.toString());
        localStorage.setItem('syn_v6_session_expires', (now + SESSION_LEASE_MS).toString());
        // Expire previous cached badge so fresh session queries the latest count
        localStorage.removeItem('syn_v6_cached_svg');
        localStorage.removeItem('syn_v6_cached_count');
      }
    } catch (e) {
      deviceVisits = 1;
    }

    updateDeviceVisitsDisplay(deviceVisits);

    // Check if we already have a valid cached SVG in localStorage
    let cachedSvg = null;
    let cachedCount = null;
    try {
      cachedSvg = localStorage.getItem('syn_v6_cached_svg');
      cachedCount = localStorage.getItem('syn_v6_cached_count');
    } catch (e) {}

    if (cachedSvg) {
      // Reused across tabs! Zero network requests, zero extra count!
      updateAllBadgeImages(cachedSvg, cachedCount || '1');
      return;
    }

    // No cached SVG yet. Check if another tab is currently fetching it (inflight lock):
    let inflightTime = 0;
    try {
      inflightTime = parseInt(localStorage.getItem('syn_v6_fetch_inflight') || '0', 10);
    } catch (e) {}

    if (inflightTime && (now - inflightTime) < 8000) {
      // Another tab in this browser is currently fetching the badge!
      // Wait for it to finish; it will broadcast via the 'storage' event.
      setTimeout(function() {
        let svg = null;
        try { svg = localStorage.getItem('syn_v6_cached_svg'); } catch (e) {}
        if (svg) {
          updateAllBadgeImages(svg, localStorage.getItem('syn_v6_cached_count') || '1');
        } else {
          fetchBadge(false);
        }
      }, 2500);
      return;
    }

    // We are the leader tab to perform the fetch:
    try {
      localStorage.setItem('syn_v6_fetch_inflight', now.toString());
    } catch (e) {}

    fetchBadge(false);
  }

  // Cross-tab real-time sync across Chrome/device tabs
  window.addEventListener('storage', function(e) {
    if (!e) return;
    if (e.key === 'syn_v6_cached_svg' && e.newValue) {
      let count = '1';
      try { count = localStorage.getItem('syn_v6_cached_count') || '1'; } catch (err) {}
      updateAllBadgeImages(e.newValue, count);
    }
    if (e.key === 'syn_v6_device_visits' && e.newValue) {
      updateDeviceVisitsDisplay(e.newValue);
    }
    if (e.key === 'syn_v6_visited_chapters' || e.key === 'syn_v6_all_visited_chapters') {
      updateTelemetryStats();
    }
  });

  // Execute with incognito awareness
  checkIncognito(function(isIncog) {
    isIncognitoMode = isIncog;

    if (isIncog) {
      // In Incognito mode: NEVER use or write to persistent device cache, perform fresh live fetch
      deviceVisits = 1;
      updateDeviceVisitsDisplay(1);
      fetchBadge(true);
    } else {
      // Regular mode: use persistent cross-tab device session cache
      initDeviceSession();
    }
  });

  function syncExistingElements() {
    var svg = null;
    var count = null;
    if (!isIncognitoMode) {
      try {
        svg = localStorage.getItem('syn_v6_cached_svg');
        count = localStorage.getItem('syn_v6_cached_count');
      } catch (e) {}
    }
    if (svg) updateAllBadgeImages(svg, count);
  }

  document.addEventListener('DOMContentLoaded', syncExistingElements);
  window.addEventListener('load', syncExistingElements);

  // 9. Session Stopwatch & Telemetry Updating
  let timerInterval = null;
  function updateTelemetryStats() {
    const elapsedSec = Math.floor((Date.now() - sessionStart) / 1000);
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    const timeEl = document.getElementById('syn-stat-session-time');
    if (timeEl) timeEl.textContent = timeStr;

    try {
      const visited = JSON.parse(localStorage.getItem('syn_v6_visited_chapters') || '[]');
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
    syncExistingElements();
    updateTelemetryStats();
    updateDeviceVisitsDisplay(deviceVisits);
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

  window.updateAllTelemetryBadgeImages = updateAllBadgeImages;
  window.recordChapterVisit = recordChapterVisit;
})();
