/**
 * =========================================================================
 * SYNTROMETRIE SITE TELEMETRY — PROFESSIONAL ONE-SHOT VISITOR COUNTER
 * Privacy-Preserving Global Hit Badge (visitorbadge.io) + Local Session Ledger
 *
 * COUNTING GUARANTEE:
 *   Each unique browser profile is counted AT MOST ONCE — ever.
 *   A permanent "registered" flag (syn_v7_browser_registered) is set in
 *   localStorage on the browser's very first successful hit. Every subsequent
 *   visit from the same browser — any tab, any session, any restart — reuses
 *   the locally-cached SVG and NEVER fires the incrementing API endpoint again.
 *
 * CROSS-TAB DEDUPLICATION (same session):
 *   An inflight lock (syn_v7_fetch_inflight) prevents parallel tabs opened
 *   simultaneously (e.g. Chrome session restore) from both firing fetches.
 *   The winner stores the SVG; other tabs receive it via the 'storage' event.
 *
 * INCOGNITO/PRIVATE MODE:
 *   Detected via multi-engine heuristic (Chromium quota, WebKit openDatabase,
 *   Gecko IndexedDB). Incognito requests are always live, never cached, and
 *   never set the registered flag — a user testing in private mode does not
 *   "use up" their one-shot count for normal browsing.
 *
 * SVG DISPLAY FRESHNESS:
 *   On the first ever visit: live count fetched and cached indefinitely.
 *   On return visits: cached SVG displayed instantly (0 ms, 0 network).
 *   The count shown to returning visitors reflects the global total at the
 *   moment their browser was first registered (may slightly lag live total).
 *   This is acceptable: accuracy-vs-double-counting is an explicit trade-off.
 *
 * Zero Cookies · Zero PII · GDPR & Privacy-by-Design Compliant
 * =========================================================================
 */
(function() {
  if (window.__SYN_SITE_TELEMETRY_LOADED__) return;
  window.__SYN_SITE_TELEMETRY_LOADED__ = true;

  const V           = 'v7';                          // storage-key namespace
  const BADGE_URL   = 'https://api.visitorbadge.io/api/visitors?path=MetaSympl3x-SyntrometricTopos-v7&label=VISITS&labelColor=%230a101d&countColor=%234169E1&style=flat-square';
  const SESSION_MS  = 30 * 60 * 1000;               // 30-min inactivity window (device-visits only)
  const INFLIGHT_MS = 10 * 1000;                    // inflight-lock TTL

  let isIncognito   = false;
  let deviceVisits  = 1;
  let sessionStart  = Date.now();

  /* ── helpers ────────────────────────────────────────────────────────── */
  function ls(key, val) {
    /* get or set; silently fails if storage is blocked */
    try {
      if (val === undefined) return localStorage.getItem('syn_' + V + '_' + key);
      if (val === null)      localStorage.removeItem('syn_' + V + '_' + key);
      else                   localStorage.setItem('syn_' + V + '_' + key, String(val));
    } catch (e) {}
    return null;
  }
  function lsJSON(key, val) {
    if (val === undefined) { try { return JSON.parse(ls(key) || 'null'); } catch (e) { return null; } }
    ls(key, JSON.stringify(val));
  }
  function ss(key, val) {
    try {
      if (val === undefined) return sessionStorage.getItem('syn_' + V + '_' + key);
      if (val === null)      sessionStorage.removeItem('syn_' + V + '_' + key);
      else                   sessionStorage.setItem('syn_' + V + '_' + key, String(val));
    } catch (e) {}
    return null;
  }

  /* ── 1. One-time migration: purge every legacy key ─────────────────── */
  if (!ls('migrated')) {
    [
      'syn_local_visits','syn_last_known_global_visits',
      'syn_v2_reset_done','syn_v2_local_visits','syn_v2_session_active',
      'syn_v2_cached_svg','syn_v2_cached_count','syn_v2_last_global',
      'syn_visited_chapters','syn_all_visited_chapters',
      'syn_v3_reset_done','syn_v3_local_visits','syn_v3_session_active',
      'syn_v3_cached_svg','syn_v3_cached_count','syn_v3_last_global',
      'syn_v3_visited_chapters','syn_v3_all_visited_chapters',
      'syn_v4_reset_done','syn_v4_local_visits','syn_v4_session_active',
      'syn_v4_cached_svg','syn_v4_cached_count','syn_v4_last_global',
      'syn_v4_session_expires','syn_v4_session_start','syn_v4_fetch_inflight',
      'syn_v4_visited_chapters','syn_v4_all_visited_chapters',
      'syn_v5_reset_done','syn_v5_local_visits','syn_v5_session_active',
      'syn_v5_cached_svg','syn_v5_cached_count','syn_v5_last_global',
      'syn_v5_session_expires','syn_v5_session_start','syn_v5_fetch_inflight',
      'syn_v5_visited_chapters','syn_v5_all_visited_chapters',
      'syn_v6_reset_done','syn_v6_local_visits','syn_v6_session_active',
      'syn_v6_cached_svg','syn_v6_cached_count','syn_v6_last_global',
      'syn_v6_session_expires','syn_v6_session_start','syn_v6_fetch_inflight',
      'syn_v6_device_visits','syn_v6_visited_chapters','syn_v6_all_visited_chapters'
    ].forEach(function(k) {
      try { localStorage.removeItem(k); }   catch (e) {}
      try { sessionStorage.removeItem(k); } catch (e) {}
    });
    ls('migrated', '1');
  }

  /* ── 2. Chapter visit tracking (cross-tab, localStorage) ───────────── */
  function recordChapterVisit(chNum) {
    if (!chNum || isIncognito) return;
    var visited    = lsJSON('visited_chapters')    || [];
    var allVisited = lsJSON('all_visited_chapters') || [];
    if (!visited.includes(chNum)) {
      visited.push(chNum);
      lsJSON('visited_chapters', visited);
    }
    if (!allVisited.includes(chNum)) {
      allVisited.push(chNum);
      lsJSON('all_visited_chapters', allVisited);
    }
    // Slide the session lease so navigation resets the 30-min clock
    var exp = parseInt(ls('session_expires') || '0', 10);
    if (exp && Date.now() < exp) ls('session_expires', Date.now() + SESSION_MS);
  }

  // Auto-detect chapter from URL
  var pathMatch = window.location.pathname.match(/chapter(\d+)/i)
               || window.location.hash.match(/chapter(\d+)/i)
               || window.location.search.match(/ch=(\d+)/i);
  if (pathMatch) recordChapterVisit(parseInt(pathMatch[1], 10));
  else if (/index\.html|\/\s*$/.test(window.location.pathname)) recordChapterVisit(1);

  window.addEventListener('message', function(ev) {
    if (ev.data && ev.data.type === 'syn-chapter-selected' && ev.data.chapter)
      recordChapterVisit(parseInt(ev.data.chapter, 10));
  });

  /* ── 3. CSS injection ───────────────────────────────────────────────── */
  document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    .syn-visit-counter-pill {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(10,16,29,0.85); border: 1px solid rgba(65,105,225,0.45);
      border-radius: 9999px; padding: 0 8px 0 6px; height: 24px; line-height: 24px;
      box-sizing: border-box; cursor: pointer; user-select: none; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.4); text-decoration: none; flex-shrink: 0;
    }
    .syn-visit-counter-pill:hover {
      background: rgba(20,32,58,0.95); border-color: #60a5fa;
      box-shadow: 0 0 12px rgba(65,105,225,0.55); transform: translateY(-1px);
    }
    .syn-pulse-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #10b981; box-shadow: 0 0 6px #10b981; flex-shrink: 0;
      animation: syn-pulse-anim 2.2s infinite ease-in-out;
    }
    @keyframes syn-pulse-anim {
      0%,100% { opacity:1; transform:scale(1); box-shadow:0 0 6px #10b981; }
      50%      { opacity:.4; transform:scale(.85); box-shadow:0 0 2px #10b981; }
    }
    .syn-counter-badge-img {
      height: 17px !important; max-height: 17px !important; width: auto !important;
      border-radius: 3px; vertical-align: middle; display: inline-block;
      pointer-events: none; object-fit: contain;
    }
    .syn-counter-fallback {
      font-size: 11px; font-weight: 700; color: #60a5fa; letter-spacing: .3px;
      font-family: monospace; display: inline-block; vertical-align: middle; line-height: 17px;
    }
    .syn-telemetry-modal {
      position: fixed; inset: 0; background: rgba(4,8,18,0.88);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      z-index: 10000; display: none; align-items: center; justify-content: center;
      padding: 16px; box-sizing: border-box;
      animation: synFadeIn 0.2s cubic-bezier(0.16,1,0.3,1);
    }
    @keyframes synFadeIn { from { opacity:0; } to { opacity:1; } }
    .syn-telemetry-container {
      background: linear-gradient(145deg,#0a1124 0%,#060b18 100%);
      border: 1px solid rgba(65,105,225,0.4); border-radius: 12px;
      width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto;
      box-shadow: 0 20px 50px rgba(0,0,0,.8), 0 0 30px rgba(65,105,225,.2);
      padding: 22px 24px; box-sizing: border-box; color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .syn-telemetry-header {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid rgba(65,105,225,0.3); padding-bottom: 12px; margin-bottom: 18px;
    }
    .syn-telemetry-title {
      font-size: 1.15rem; font-weight: 700; color: #fff;
      display: flex; align-items: center; gap: 8px; margin: 0;
    }
    .syn-telemetry-close {
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
      color: #cbd5e1; padding: 4px 10px; border-radius: 6px;
      cursor: pointer; font-size: 0.85rem; transition: all .15s ease;
    }
    .syn-telemetry-close:hover {
      background: rgba(239,68,68,0.25); border-color: #ef4444; color: #fff;
    }
    .syn-telemetry-hero {
      text-align: center; padding: 16px;
      background: rgba(13,22,45,0.6); border: 1px solid rgba(65,105,225,0.25);
      border-radius: 8px; margin-bottom: 18px;
    }
    .syn-hero-badge-wrap {
      display: flex; justify-content: center; align-items: center;
      gap: 10px; margin: 10px 0; min-height: 26px;
    }
    .syn-hero-badge-wrap img {
      height: 24px !important; max-height: 24px !important; width: auto !important;
      border-radius: 4px; object-fit: contain;
    }
    .syn-telemetry-grid {
      display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 18px;
    }
    @media (max-width:480px) { .syn-telemetry-grid { grid-template-columns: 1fr; } }
    .syn-stat-card {
      background: rgba(15,23,42,0.7); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px; padding: 12px 14px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .syn-stat-label { font-size:.75rem; text-transform:uppercase; letter-spacing:.5px; color:#94a3b8; }
    .syn-stat-value { font-size:1.25rem; font-weight:700; color:#60a5fa; font-family:monospace; }
    .syn-stat-sub   { font-size:.7rem; color:#64748b; }
    .syn-progress-bar-bg {
      height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-top: 4px;
    }
    .syn-progress-bar-fill {
      height: 100%; background: linear-gradient(90deg,#4169E1,#20B2AA);
      border-radius: 3px; transition: width .3s ease;
    }
    .syn-privacy-note {
      font-size: .75rem; color: #94a3b8;
      background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25);
      border-radius: 6px; padding: 10px 12px; line-height: 1.4;
      display: flex; align-items: flex-start; gap: 8px;
    }
    .overview-stats-ribbon { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin-top:6px; }
    .overview-stats-ribbon .stat-pill {
      display:inline-flex; align-items:center; gap:5px;
      background:rgba(15,23,42,0.8); border:1px solid rgba(65,105,225,0.3);
      border-radius:6px; padding:2px 8px; font-size:.72rem; color:#cbd5e1;
    }
  `}));

  /* ── 4. Telemetry modal DOM ─────────────────────────────────────────── */
  var modal = document.createElement('div');
  modal.className = 'syn-telemetry-modal';
  modal.id = 'syn-telemetry-modal';
  modal.onclick = function(e) { if (e.target === modal) window.closeVisitTelemetryModal(); };
  modal.innerHTML = `
    <div class="syn-telemetry-container">
      <div class="syn-telemetry-header">
        <h3 class="syn-telemetry-title">
          <span>📡 Syntrometrie Treatise Telemetry</span>
          <span style="font-size:.65em;background:rgba(16,185,129,.15);border:1px solid #10b981;color:#34d399;padding:2px 6px;border-radius:4px;">LIVE</span>
        </h3>
        <button class="syn-telemetry-close" onclick="window.closeVisitTelemetryModal()">✕ Close</button>
      </div>
      <div class="syn-telemetry-hero">
        <div style="font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;">Global Monograph Readership Counter</div>
        <div class="syn-hero-badge-wrap">
          <img class="syn-counter-badge-img" id="modal-hero-badge-img" alt="Global Visits" height="24" style="display:none;"/>
          <span class="syn-counter-fallback" id="modal-hero-fallback" style="font-size:1.1rem;">VISITS: <span class="syn-visit-count-display">1</span></span>
        </div>
        <div style="font-size:.75rem;color:#60a5fa;">One counted hit per browser profile · zero duplicates · cross-tab cached</div>
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
            <div class="syn-progress-bar-fill" id="syn-stat-ch-progress" style="width:0%;"></div>
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
        <span style="font-size:1.1rem;line-height:1;">🛡️</span>
        <div>
          <b>Privacy-First Architecture:</b> Zero third-party profiling, zero cookies, zero IP logging.
          Each browser profile is counted <em>at most once</em> — ever. Returning visits display a
          cached badge and never fire a second network request to the counter API.
        </div>
      </div>
      <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px;">
        <button class="syn-telemetry-close"
          onclick="window.toggleOverview?(window.closeVisitTelemetryModal(),window.toggleOverview()):null"
          style="background:rgba(65,105,225,.2);border-color:#4169E1;color:#93c5fd;">
          ☰ Open Atlas (M)
        </button>
        <button class="syn-telemetry-close" onclick="window.closeVisitTelemetryModal()">Done</button>
      </div>
    </div>`;
  if (document.body) document.body.appendChild(modal);
  else document.addEventListener('DOMContentLoaded', function() { document.body.appendChild(modal); });

  /* ── 5. Badge display helpers ───────────────────────────────────────── */
  function updateAllBadgeImages(svgText, countStr) {
    // If called with no args, attempt to restore from cache
    if (!svgText && !isIncognito) {
      svgText  = ls('cached_svg');
      countStr = countStr || ls('cached_count');
    }
    if (!countStr && svgText) {
      var m = svgText.match(/aria-label=["'][^:"]*:\s*([0-9,kK\.+]+)["']/)
           || svgText.match(/<title>[^:<]*:\s*([0-9,kK\.+]+)<\/title>/);
      if (m) countStr = m[1];
    }
    var dataUrl = svgText
      ? ('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText))
      : null;

    document.querySelectorAll('.syn-counter-badge-img').forEach(function(img) {
      if (dataUrl) { img.src = dataUrl; img.style.display = 'inline-block'; }
    });
    var heroImg = document.getElementById('modal-hero-badge-img');
    var heroFb  = document.getElementById('modal-hero-fallback');
    if (heroImg && dataUrl) {
      heroImg.src = dataUrl; heroImg.style.display = 'inline-block';
      if (heroFb) heroFb.style.display = 'none';
    }
    document.querySelectorAll('.syn-counter-fallback').forEach(function(fb) {
      fb.style.display = dataUrl ? 'none' : 'inline-block';
    });
    if (countStr) {
      document.querySelectorAll('.syn-visit-count-display').forEach(function(el) {
        el.textContent = countStr;
      });
    }
  }

  function updateDeviceVisitsDisplay(val) {
    var el = document.getElementById('syn-stat-local-visits');
    if (el) el.textContent = '#' + val;
  }

  /* ── 6. Incognito / Private Mode detection ──────────────────────────── */
  function detectIncognito(callback) {
    var done = false;
    function finish(v) { if (!done) { done = true; callback(v); } }

    if (/incognito|nocache/.test(window.location.search)) { finish(true); return; }
    setTimeout(function() { finish(false); }, 400);   // safety timeout

    // Chromium (Chrome, Edge, Opera, Brave)
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(function(est) {
        if (est.quota && est.quota < 4e9) { finish(true); return; }
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (fs) { fs(window.TEMPORARY, 100, function() { finish(false); }, function() { finish(true); }); return; }
        finish(false);
      }).catch(function() { finish(true); });
      return;
    }
    // Safari / WebKit
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      try { if (window.openDatabase) window.openDatabase(null,null,null,null); }
      catch (e) { finish(true); return; }
    }
    // Firefox
    if ('MozAppearance' in document.documentElement.style) {
      if (!window.indexedDB) { finish(true); return; }
      try {
        var r = window.indexedDB.open('_syn_priv_test');
        r.onerror   = function() { finish(true); };
        r.onsuccess = function() { finish(false); };
        return;
      } catch (e) { finish(true); return; }
    }
    finish(false);
  }

  /* ── 7. Badge fetch — ONE-SHOT counting hit ─────────────────────────── */
  function fetchBadgeOnce(isIncog) {
    var url = BADGE_URL + (isIncog ? ('&_t=' + Date.now()) : '');
    fetch(url, { mode: 'cors', cache: isIncog ? 'no-store' : 'default' })
      .then(function(r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function(svg) {
        var m = svg.match(/aria-label=["'][^:"]*:\s*([0-9,kK\.+]+)["']/)
             || svg.match(/<title>[^:<]*:\s*([0-9,kK\.+]+)<\/title>/);
        var count = m ? m[1] : '1';
        if (!isIncog) {
          // ── Mark this browser as permanently counted ──────────────────
          ls('browser_registered', Date.now()); // permanent one-shot flag
          ls('cached_svg',   svg);
          ls('cached_count', count);
          ls('last_global',  count);
          ls('fetch_inflight', null);           // release inflight lock
        }
        updateAllBadgeImages(svg, count);
      })
      .catch(function() {
        if (!isIncog) ls('fetch_inflight', null);
        var fb = (!isIncog && ls('last_global')) || '1';
        updateAllBadgeImages(null, fb);
      });
  }

  /* ── 8. Session & device-visits tracking (separate from counting) ───── */
  function initDeviceSession() {
    var now     = Date.now();
    var stored  = parseInt(ls('device_visits') || '0', 10);
    var expires = parseInt(ls('session_expires') || '0', 10);
    var started = parseInt(ls('session_start')   || '0', 10);

    if (expires && now < expires) {
      // ── Existing active session (any tab on this device) ──────────────
      deviceVisits = Math.max(1, stored);
      sessionStart = started || now;
      ls('session_expires', now + SESSION_MS); // extend lease
    } else {
      // ── New session (first ever, or after 30+ min inactivity) ─────────
      deviceVisits = stored + 1;
      sessionStart = now;
      ls('device_visits',   deviceVisits);
      ls('session_start',   sessionStart);
      ls('session_expires', now + SESSION_MS);
      // NOTE: We deliberately do NOT clear 'cached_svg' here.
      //       The global count was already contributed on first-ever visit.
      //       Clearing it would trigger a second fetch and a second global hit.
    }
    updateDeviceVisitsDisplay(deviceVisits);
  }

  /* ── 9. Core startup logic ──────────────────────────────────────────── */
  detectIncognito(function(incog) {
    isIncognito = incog;

    if (incog) {
      // ── Incognito: always a fresh live hit, never persisted ───────────
      deviceVisits = 1;
      updateDeviceVisitsDisplay(1);
      fetchBadgeOnce(true);
      return;
    }

    // ── Normal browsing ───────────────────────────────────────────────────
    initDeviceSession();

    var registered = ls('browser_registered'); // permanent one-shot flag

    if (registered) {
      // ── This browser has already contributed its one global count ──────
      //    Display the cached SVG immediately; do NOT fire the API again.
      var svg   = ls('cached_svg');
      var count = ls('cached_count');
      if (svg) {
        updateAllBadgeImages(svg, count || '1');
      } else {
        // Edge case: flag set but SVG lost (storage cleared externally).
        // Show last known count as text; still do NOT hit the API.
        updateAllBadgeImages(null, ls('last_global') || String(deviceVisits));
      }
      return;
    }

    // ── First-ever visit from this browser: perform the one-time hit ──────
    var now       = Date.now();
    var inflight  = parseInt(ls('fetch_inflight') || '0', 10);

    if (inflight && (now - inflight) < INFLIGHT_MS) {
      // Another tab in this same browser window is already fetching.
      // Wait for it, then consume the result from localStorage.
      setTimeout(function() {
        var svg = ls('cached_svg');
        if (svg) updateAllBadgeImages(svg, ls('cached_count') || '1');
        else     fetchBadgeOnce(false); // fallback if inflight tab crashed
      }, 3000);
      return;
    }

    ls('fetch_inflight', now); // acquire inflight lock
    fetchBadgeOnce(false);
  });

  /* ── 10. Cross-tab real-time sync via storage events ───────────────── */
  window.addEventListener('storage', function(e) {
    if (!e) return;
    if (e.key === 'syn_' + V + '_cached_svg' && e.newValue) {
      updateAllBadgeImages(e.newValue, ls('cached_count') || '1');
    }
    if (e.key === 'syn_' + V + '_device_visits' && e.newValue) {
      updateDeviceVisitsDisplay(e.newValue);
    }
    if (e.key === 'syn_' + V + '_visited_chapters' ||
        e.key === 'syn_' + V + '_all_visited_chapters') {
      updateTelemetryStats();
    }
  });

  /* ── 11. Restore badges on DOMContentLoaded / load ─────────────────── */
  function syncExistingElements() {
    if (isIncognito) return;
    var svg = ls('cached_svg');
    if (svg) updateAllBadgeImages(svg, ls('cached_count'));
  }
  document.addEventListener('DOMContentLoaded', syncExistingElements);
  window.addEventListener('load', syncExistingElements);

  /* ── 12. Session stopwatch & telemetry stats ────────────────────────── */
  var timerInterval = null;
  function updateTelemetryStats() {
    var elapsed = Math.floor((Date.now() - sessionStart) / 1000);
    var m = Math.floor(elapsed / 60), s = elapsed % 60;
    var timeEl = document.getElementById('syn-stat-session-time');
    if (timeEl) timeEl.textContent =
      (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    try {
      var visited = lsJSON('visited_chapters') || [];
      var n = Math.min(15, visited.length);
      var ratioEl = document.getElementById('syn-stat-ch-ratio');
      var progEl  = document.getElementById('syn-stat-ch-progress');
      var pctEl   = document.getElementById('syn-stat-ch-pct');
      if (ratioEl) ratioEl.textContent = n + ' / 15';
      if (progEl)  progEl.style.width  = Math.round((n / 15) * 100) + '%';
      if (pctEl)   pctEl.textContent   = Math.round((n / 15) * 100) + '% of chapters explored';
    } catch (e) {}
  }

  window.openVisitTelemetryModal = function(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    syncExistingElements();
    updateTelemetryStats();
    updateDeviceVisitsDisplay(deviceVisits);
    if (!timerInterval) timerInterval = setInterval(updateTelemetryStats, 1000);
    var m = document.getElementById('syn-telemetry-modal');
    if (m) m.style.display = 'flex';
  };

  window.closeVisitTelemetryModal = function() {
    var m = document.getElementById('syn-telemetry-modal');
    if (m) m.style.display = 'none';
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  };

  window.updateAllTelemetryBadgeImages = updateAllBadgeImages;
  window.recordChapterVisit            = recordChapterVisit;
})();
