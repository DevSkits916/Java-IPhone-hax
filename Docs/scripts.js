// Minimal client-side toolbox wiring that runs on GitHub Pages (no server)

const TOOLS = window.TOOLS || []; // if you later define tools on window, they'll render here

// Simple preferences in localStorage
const cfgKey = (window.STORAGE_KEYS && window.STORAGE_KEYS.CONFIG) ? window.STORAGE_KEYS.CONFIG : "js-toolbox-config";
let cfg = (typeof DEFAULT_CONFIG !== 'undefined') ? DEFAULT_CONFIG : { gofundmeLink: "", defaultCaption: "" };
try {
  const raw = localStorage.getItem(cfgKey);
  if (raw) cfg = { ...cfg, ...JSON.parse(raw) };
} catch { /* ignore */ }

// Tiny DOM helpers
const $ = sel => document.querySelector(sel);
function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 2000);
}

// Bind config UI
const gfmInput = $("#cfg-gfm");
const capInput = $("#cfg-cap");
if (gfmInput) gfmInput.value = cfg.gofundmeLink || "";
if (capInput) capInput.value = cfg.defaultCaption || "";

const saveBtn = $("#cfg-save");
if (saveBtn) {
  saveBtn.onclick = () => {
    cfg.gofundmeLink = (gfmInput?.value || "").trim();
    cfg.defaultCaption = (capInput?.value || "").trim();
    try { localStorage.setItem(cfgKey, JSON.stringify(cfg)); } catch {}
    toast("Saved.");
  };
}

const copyBtn = $("#cfg-copy");
if (copyBtn) {
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(cfg.gofundmeLink || "");
      toast("Link copied");
    } catch {
      toast("Clipboard failed");
    }
  };
}

// Bookmarklet that just confirms load; you can extend this to inject your heavier logic
(function () {
  const payload = encodeURIComponent("(function(){try{console.log('DataSage bookmarklet loaded')}catch(e){alert('Failed to load')}})();");
  const a = document.getElementById("bookmarklet");
  if (a) a.href = "javascript:" + payload;
})();

// Soft reset: just reload
const resetBtn = $("#btn-softreset");
if (resetBtn) resetBtn.onclick = () => location.reload();

// Tool grid rendering (expects an array like [{title, description, icon, actions:[{label, action, primary}]}])
const grid = $("#grid");
const count = $("#tool-count");
if (count) count.textContent = (TOOLS.length || 0) + " tools";

if (grid) {
  TOOLS.forEach(tool => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="icon"><i class="${tool.icon || 'fa-solid fa-wand-magic-sparkles'}"></i></span>
        <div><h3 style="margin:0 0 6px 0; font-size:16px;">${tool.title || 'Untitled Tool'}</h3>
        <p style="margin:0; color:#94a3b8; font-size:13px;">${tool.description || ''}</p></div>
      </div>
      <div class="row-btns" style="margin-top:10px;"></div>
    `;
    const btns = card.querySelector(".row-btns");
    (tool.actions || []).forEach(a => {
      const b = document.createElement("button");
      b.className = "btn" + (a.primary ? "" : "");
      b.textContent = a.label || "Run";
      b.onclick = () => {
        try {
          const fn = (window.toolbox && window.toolbox[a.action]) || window[a.action];
          if (typeof fn === "function") {
            fn(cfg);
            toast((a.label || "Run") + " OK");
          } else {
            toast("Missing action: " + (a.action || "unknown"));
          }
        } catch (e) {
          console.error(e);
          toast("Error");
        }
      };
      btns.appendChild(b);
    });
    grid.appendChild(card);
  });
}

// Optional: expose a tiny toolbox so actions can exist
window.toolbox = window.toolbox || {
  softReset: () => location.reload()
};
