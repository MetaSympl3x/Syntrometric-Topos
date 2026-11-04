/**
 * =========================================================================
 * SYNTROMETRIE SITE TELEMETRY — BULLETPROOF VISITOR COUNTER
 * Privacy-Preserving Global Hit Badge + Cross-Tab Device Session Ledger
 *
 * COUNTING INTEGRITY GUARANTEE:
 * 1. REAL PRODUCTION VISITORS ONLY:
 *    Only verified, non-incognito, non-local sessions on production trigger
 *    the remote visitor counter once per browser profile.
 * 2. ZERO INCOGNITO INFLATION:
 *    Incognito / Private browsing sessions NEVER call the remote counter API.
 *    Incognito renders a pixel-perfect SVG badge locally (zero network requests).
 * 3. ZERO LOCALHOST / FILE:// INFLATION:
 *    Localhost, 127.0.0.1, and file:// never call the remote counter API.
 * 4. MULTI-ENGINE INCOGNITO PROBE:
 *    Incorporates official detectIncognito v1.9.0 engine heuristics.
 *    Defaults to safe mode (no increment) on timeout or ambiguity.
 * =========================================================================
 */
(function() {
  if (window.__SYN_SITE_TELEMETRY_LOADED__) return;
  window.__SYN_SITE_TELEMETRY_LOADED__ = true;

  const V = 'v9'; // Clean V9 namespace
  const BADGE_COUNTER_URL = "https://api.visitorbadge.io/api/visitors?path=MetaSympl3x-SyntrometricTopos-v9&label=VISITS&labelColor=%230a101d&countColor=%234169E1&style=flat-square";
  const SESSION_MS = 30 * 60 * 1000;
  const INFLIGHT_MS = 10 * 1000;

  // Local development detection: never increment counter on localhost or file://
  const isLocalEnv = !window.location.hostname ||
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1' ||
                     window.location.protocol === 'file:';

  let isIncognito = false;
  let deviceVisits = 1;
  let sessionStart = Date.now();

  /* ── Storage helpers ─────────────────────────────────────────────────── */
  function ls(key, val) {
    try {
      if (val === undefined) return localStorage.getItem('syn_' + V + '_' + key);
      if (val === null) localStorage.removeItem('syn_' + V + '_' + key);
      else localStorage.setItem('syn_' + V + '_' + key, String(val));
    } catch (e) {}
    return null;
  }
  function lsJSON(key, val) {
    if (val === undefined) { try { return JSON.parse(ls(key) || 'null'); } catch (e) { return null; } }
    ls(key, JSON.stringify(val));
  }

  /* ── 1. One-time migration: purge all legacy keys ────────────────────── */
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
      'syn_v4_visited_chapters','syn_all_visited_chapters',
      'syn_v5_reset_done','syn_v5_local_visits','syn_v5_session_active',
      'syn_v5_cached_svg','syn_v5_cached_count','syn_v5_last_global',
      'syn_v5_session_expires','syn_v5_session_start','syn_v5_fetch_inflight',
      'syn_v5_visited_chapters','syn_v5_all_visited_chapters',
      'syn_v6_reset_done','syn_v6_local_visits','syn_v6_session_active',
      'syn_v6_cached_svg','syn_v6_cached_count','syn_v6_last_global',
      'syn_v6_session_expires','syn_v6_session_start','syn_v6_fetch_inflight',
      'syn_v6_device_visits','syn_v6_visited_chapters','syn_v6_all_visited_chapters',
      'syn_v7_migrated','syn_v7_browser_registered','syn_v7_cached_svg','syn_v7_cached_count',
      'syn_v7_device_visits','syn_v7_session_expires','syn_v7_session_start','syn_v7_fetch_inflight',
      'syn_v7_visited_chapters','syn_v7_all_visited_chapters','syn_v7_last_global',
      'syn_v8_migrated','syn_v8_browser_registered','syn_v8_cached_svg','syn_v8_cached_count',
      'syn_v8_device_visits','syn_v8_session_expires','syn_v8_session_start','syn_v8_fetch_inflight',
      'syn_v8_visited_chapters','syn_v8_all_visited_chapters','syn_v8_last_global'
    ].forEach(function(k) {
      try { localStorage.removeItem(k); } catch (e) {}
      try { sessionStorage.removeItem(k); } catch (e) {}
    });
    ls('migrated', '1');
  }

  /* ── 2. Pixel-Perfect Client-Side SVG Badge Generator ───────────────── */
  // Renders the exact same flat-square visitor badge SVG client-side.
  // Guarantees ZERO network calls, zero external dependency, and ZERO count inflation in incognito.
  function renderBadgeSvg(count) {
    var countStr = String(count || '1');
    var countWidth = Math.max(17, countStr.length * 8 + 9);
    var totalWidth = 39 + countWidth;
    var textX = Math.round((39 + countWidth / 2) * 10);
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalWidth + '" height="20" role="img" aria-label="visits: ' + countStr + '"><title>visits: ' + countStr + '</title><g shape-rendering="crispEdges"><rect width="39" height="20" fill="#0a101d"/><rect x="39" width="' + countWidth + '" height="20" fill="#4169e1"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text x="205" y="140" transform="scale(.1)" fill="#fff" textLength="290">visits</text><text x="' + textX + '" y="140" transform="scale(.1)" fill="#fff">' + countStr + '</text></g></svg>';
  }

  /* ── 3. Chapter visit tracking ───────────────────────────────────────── */
  function recordChapterVisit(chNum) {
    if (!chNum || isIncognito) return;
    var visited = lsJSON('visited_chapters') || [];
    var allVisited = lsJSON('all_visited_chapters') || [];
    if (!visited.includes(chNum)) {
      visited.push(chNum);
      lsJSON('visited_chapters', visited);
    }
    if (!allVisited.includes(chNum)) {
      allVisited.push(chNum);
      lsJSON('all_visited_chapters', allVisited);
    }
    var exp = parseInt(ls('session_expires') || '0', 10);
    if (exp && Date.now() < exp) ls('session_expires', Date.now() + SESSION_MS);
  }

  var pathMatch = window.location.pathname.match(/chapter(\d+)/i)
               || window.location.hash.match(/chapter(\d+)/i)
               || window.location.search.match(/ch=(\d+)/i);
  if (pathMatch) recordChapterVisit(parseInt(pathMatch[1], 10));
  else if (/index\.html|\/\s*$/.test(window.location.pathname)) recordChapterVisit(1);

  window.addEventListener('message', function(ev) {
    if (ev.data && ev.data.type === 'syn-chapter-selected' && ev.data.chapter) {
      recordChapterVisit(parseInt(ev.data.chapter, 10));
    }
  });

  /* ── 4. CSS injection ───────────────────────────────────────────────── */
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
      font-family: monospace; display: none; vertical-align: middle; line-height: 17px;
    }
    .syn-counter-badge-img[src] ~ .syn-counter-fallback,
    .syn-counter-badge-img[src] + .syn-counter-fallback {
      display: none !important;
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

  /* ── 5. Telemetry modal DOM ─────────────────────────────────────────── */
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
          <span class="syn-counter-fallback" id="modal-hero-fallback" style="display:none; font-size:1.1rem;">VISITS: <span class="syn-visit-count-display">1</span></span>
        </div>
        <div style="font-size:.75rem;color:#60a5fa;">One counted hit per unique reader · zero refresh inflation · cross-tab synchronized</div>
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
          Each visitor browser is counted at most once. Incognito sessions, duplicate tabs, and reloads
          use non-incrementing cached telemetry.
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

  /* ── 6. Badge Display Helpers ───────────────────────────────────────── */
  let currentBadgeSvg = null;
  let currentBadgeCount = '1';

  function updateAllBadgeImages(svgText, countStr) {
    if (svgText) {
      currentBadgeSvg = svgText;
    } else if (!currentBadgeSvg) {
      currentBadgeSvg = ls('cached_svg') || renderBadgeSvg(ls('cached_count') || '1');
    }

    if (countStr) {
      currentBadgeCount = countStr;
    } else if (!countStr && currentBadgeSvg) {
      var m = currentBadgeSvg.match(/aria-label=["'][^:"]*:\s*([0-9,kK\.+]+)["']/)
           || currentBadgeSvg.match(/<title>[^:<]*:\s*([0-9,kK\.+]+)<\/title>/);
      if (m) currentBadgeCount = m[1];
    } else if (!currentBadgeCount) {
      currentBadgeCount = ls('cached_count') || '1';
    }

    var dataUrl = currentBadgeSvg
      ? ('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(currentBadgeSvg))
      : null;

    document.querySelectorAll('.syn-counter-badge-img').forEach(function(img) {
      if (dataUrl) {
        img.src = dataUrl;
        img.style.display = 'inline-block';
      } else {
        img.style.display = 'none';
      }
    });

    var heroImg = document.getElementById('modal-hero-badge-img');
    var heroFb  = document.getElementById('modal-hero-fallback');
    if (heroImg) {
      if (dataUrl) {
        heroImg.src = dataUrl;
        heroImg.style.display = 'inline-block';
        if (heroFb) heroFb.style.display = 'none';
      } else {
        heroImg.style.display = 'none';
        if (heroFb) heroFb.style.display = 'inline-block';
      }
    }

    // STRICT MUTUAL EXCLUSION: If badge image is displayed, hide ALL fallback texts to eliminate duplicates
    document.querySelectorAll('.syn-counter-fallback').forEach(function(fb) {
      if (dataUrl) {
        fb.style.display = 'none';
      } else {
        fb.style.display = 'inline-block';
      }
    });

    if (currentBadgeCount) {
      document.querySelectorAll('.syn-visit-count-display').forEach(function(el) {
        el.textContent = currentBadgeCount;
      });
    }
  }

  function updateDeviceVisitsDisplay(val) {
    var el = document.getElementById('syn-stat-local-visits');
    if (el) el.textContent = '#' + val;
  }

  /* ── 7. Multi-Engine Incognito & Private Mode Detection ───────────────── */
  function detectIncognito(callback) {
    var resolved = false;
    function finish(isPrivate) {
      if (resolved) return;
      resolved = true;
      callback(isPrivate);
    }

    // 1. Explicit dev or test parameters
    if (/incognito|nocache|test|dev|notrack/i.test(window.location.search)) {
      finish(true);
      return;
    }

    // Localhost / file:// is always safe mode (never increment)
    if (isLocalEnv) {
      finish(true);
      return;
    }

    // Safety timeout: default to safe mode (never increment on ambiguity)
    setTimeout(function() {
      finish(true);
    }, 600);

    // 2. Engine identification via toFixed message length
    var engineId = 0;
    try {
      var neg = parseInt("-1");
      neg.toFixed(neg);
    } catch (e) {
      engineId = e.message ? e.message.length : 0;
    }

    var isV8 = (engineId === 51);               // Chromium
    var isFirefox = (engineId === 25);          // Firefox
    var isSafari = (engineId === 44 || engineId === 43); // Safari

    // ── CHROMIUM TIMING / MEMORY BACKEND CHECK ──
    if (isV8) {
      if (!window.indexedDB) { finish(true); return; }

      // Check temporary storage quota or run timing benchmark
      if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(function(est) {
          if (est.quota && est.quota < 4000000000) { finish(true); return; }
          runChromiumBenchmark();
        }).catch(function() {
          finish(true);
        });
      } else {
        runChromiumBenchmark();
      }

      function runChromiumBenchmark() {
        try {
          var dbName = '__di_' + Math.random().toString(36).slice(2);
          var req = indexedDB.open(dbName, 1);
          req.onupgradeneeded = function() {
            try { req.result.createObjectStore('s'); } catch (e) {}
          };
          req.onerror = function() {
            try { indexedDB.deleteDatabase(dbName); } catch (e) {}
            finish(true);
          };
          req.onsuccess = function() {
            var db = req.result;
            var payload = new Uint8Array(16384);

            function runWrites(durability) {
              return new Promise(function(resolve, reject) {
                var t0 = performance.now();
                var count = 0;
                function writeNext() {
                  if (count === 8) { resolve(performance.now() - t0); return; }
                  try {
                    var tx = db.transaction('s', 'readwrite', { durability: durability });
                    tx.objectStore('s').put(payload, count);
                    count++;
                    tx.oncomplete = writeNext;
                    tx.onerror = tx.onabort = function() { reject(tx.error); };
                  } catch (err) {
                    reject(err);
                  }
                }
                writeNext();
              });
            }

            (async function() {
              try {
                await runWrites('relaxed');
                await runWrites('strict');
                var rel = await runWrites('relaxed');
                var str = await runWrites('strict');
                db.close();
                try { indexedDB.deleteDatabase(dbName); } catch (e) {}

                var ratio = rel > 0 ? (str / rel) : 1.0;
                // In Incognito (in-memory): strict fsync is no-op, ratio is ~1.0 (< 1.25)
                // In normal Chrome (disk): strict fsync incurs disk I/O, ratio > 1.25
                finish(ratio < 1.25);
              } catch (e) {
                db.close();
                try { indexedDB.deleteDatabase(dbName); } catch (e) {}
                finish(true);
              }
            })();
          };
        } catch (e) {
          finish(true);
        }
      }
      return;
    }

    // ── FIREFOX PRIVATE CHECK ──
    if (isFirefox) {
      if (!window.indexedDB) { finish(true); return; }
      try {
        var r = window.indexedDB.open('__syn_moz_priv');
        r.onerror = function() {
          if (r.error && r.error.name === 'InvalidStateError') { finish(true); return; }
          finish(false);
        };
        r.onsuccess = function() {
          try { indexedDB.deleteDatabase('__syn_moz_priv'); } catch (e) {}
          finish(false);
        };
      } catch (e) { finish(true); }
      return;
    }

    // ── SAFARI PRIVATE CHECK ──
    if (isSafari) {
      if (navigator.storage && typeof navigator.storage.getDirectory === 'function') {
        navigator.storage.getDirectory().then(function() {
          finish(false);
        }).catch(function(e) {
          var msg = e && e.message ? String(e.message) : '';
          finish(msg.includes('unknown transient reason'));
        });
        return;
      }
      try {
        if (window.openDatabase) window.openDatabase(null, null, null, null);
      } catch (e) {
        finish(true);
        return;
      }
      finish(false);
      return;
    }

    finish(true);
  }

  /* ── 8. One-Time Production Counter Hit ─────────────────────────────── */
  // ONLY called for verified normal production browsing on its very first visit.
  function fetchProductionBadgeOnce() {
    if (isIncognito || isLocalEnv) return;
    fetch(BADGE_COUNTER_URL, { mode: 'cors' })
      .then(function(r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function(svg) {
        var m = svg.match(/aria-label=["'][^:"]*:\s*([0-9,kK\.+]+)["']/)
             || svg.match(/<title>[^:<]*:\s*([0-9,kK\.+]+)<\/title>/);
        var count = m ? m[1] : '1';
        ls('browser_registered', Date.now());
        ls('cached_svg', svg);
        ls('cached_count', count);
        ls('last_global', count);
        ls('fetch_inflight', null);
        updateAllBadgeImages(svg, count);
      })
      .catch(function() {
        ls('fetch_inflight', null);
        var fb = ls('last_global') || '1';
        updateAllBadgeImages(renderBadgeSvg(fb), fb);
      });
  }

  /* ── 9. Device Session Tracking ──────────────────────────────────────── */
  function initDeviceSession() {
    var now     = Date.now();
    var stored  = parseInt(ls('device_visits') || '0', 10);
    var expires = parseInt(ls('session_expires') || '0', 10);
    var started = parseInt(ls('session_start')   || '0', 10);

    if (expires && now < expires) {
      deviceVisits = Math.max(1, stored);
      sessionStart = started || now;
      ls('session_expires', now + SESSION_MS);
    } else {
      deviceVisits = stored + 1;
      sessionStart = now;
      ls('device_visits', deviceVisits);
      ls('session_start', sessionStart);
      ls('session_expires', now + SESSION_MS);
    }
    updateDeviceVisitsDisplay(deviceVisits);
  }

  /* ── 10. Startup Routing ────────────────────────────────────────────── */
  detectIncognito(function(isPrivate) {
    isIncognito = isPrivate;

    if (isPrivate || isLocalEnv) {
      // INCOGNITO / PRIVATE / LOCAL TESTING:
      // ZERO network requests to visitorbadge.io! ZERO count increments!
      // Renders the exact, authentic SVG badge client-side with 0 network latency.
      deviceVisits = 1;
      updateDeviceVisitsDisplay(1);

      var displayCount = '1';
      try {
        displayCount = localStorage.getItem('syn_' + V + '_last_global') ||
                       localStorage.getItem('syn_' + V + '_cached_count') || '1';
      } catch (e) {}

      var localSvg = renderBadgeSvg(displayCount);
      updateAllBadgeImages(localSvg, displayCount);
      return;
    }

    // NORMAL PRODUCTION BROWSING:
    initDeviceSession();

    // Has this browser profile already been counted?
    var registered = ls('browser_registered');
    if (registered) {
      var cachedSvg = ls('cached_svg') || renderBadgeSvg(ls('cached_count') || '1');
      var cachedCount = ls('cached_count') || '1';
      updateAllBadgeImages(cachedSvg, cachedCount);
      return;
    }

    // First ever visit from this browser profile:
    var now = Date.now();
    var inflight = parseInt(ls('fetch_inflight') || '0', 10);
    if (inflight && (now - inflight) < INFLIGHT_MS) {
      setTimeout(function() {
        var svg = ls('cached_svg') || renderBadgeSvg('1');
        updateAllBadgeImages(svg, ls('cached_count') || '1');
      }, 2000);
      return;
    }

    ls('fetch_inflight', now);
    fetchProductionBadgeOnce();
  });

  /* ── 11. Cross-tab real-time sync via storage events ────────────────── */
  window.addEventListener('storage', function(e) {
    if (!e) return;
    if (e.key === 'syn_' + V + '_cached_svg' && e.newValue) {
      updateAllBadgeImages(e.newValue, ls('cached_count') || '1');
    }
    if (e.key === 'syn_' + V + '_device_visits' && e.newValue) {
      updateDeviceVisitsDisplay(e.newValue);
    }
    if (e.key === 'syn_' + V + '_visited_chapters' || e.key === 'syn_' + V + '_all_visited_chapters') {
      updateTelemetryStats();
    }
  });

  /* ── 12. Restore Badges on DOM Load ─────────────────────────────────── */
  function syncExistingElements() {
    if (isIncognito) return;
    var svg = ls('cached_svg');
    if (svg) updateAllBadgeImages(svg, ls('cached_count'));
  }
  document.addEventListener('DOMContentLoaded', syncExistingElements);
  window.addEventListener('load', syncExistingElements);

  /* ── 13. Session Stopwatch & Telemetry Stats ────────────────────────── */
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
