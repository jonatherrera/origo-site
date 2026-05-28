/* =========================================================
   Origo Client Portal: 360 Collision
   Client side login, session, jump nav, reveal on scroll.

   IMPORTANT, please read.
   This is client side convenience security, not real protection.
   Anything in these files is visible in the browser source, so a
   determined visitor could inspect the page. That is acceptable for
   a private client review that we only share the URL and password for.
   Do not put anything truly sensitive in this page.
   ========================================================= */


/* ---------------------------------------------------------
   1) AUTH CONFIG
   Set the username and the SHA-256 hash of the password below.
   The password itself is never stored, only its hash.

   How to generate the hash:
   Open any browser, press F12 to open DevTools, click Console,
   then paste the snippet below with your real password and press Enter.
   Copy the printed hash and put it in passwordHash.

   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD'))
     .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')));
   --------------------------------------------------------- */

const AUTH = {
  username: "kelly",            // change me before deploying
  passwordHash: "6f46d1cd598f85cb6856d93f0957e699eb7d32fc46a7f87d26ecd4d92a6103f4"
};

/* Session key (stays valid until the browser tab is closed). */
const SESSION_KEY = "origo-360collision-auth-v1";


/* ---------------------------------------------------------
   2) Hashing helper (SubtleCrypto, available in all modern browsers)
   --------------------------------------------------------- */

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}


/* ---------------------------------------------------------
   3) State: show login vs. show report
   --------------------------------------------------------- */

function setAuthState(isAuthed) {
  document.body.dataset.auth = isAuthed ? "true" : "false";
  const report = document.querySelector(".report");
  if (report) report.setAttribute("aria-hidden", isAuthed ? "false" : "true");

  if (isAuthed) {
    sessionStorage.setItem(SESSION_KEY, "1");
    initReportBehaviors();
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}


/* ---------------------------------------------------------
   4) Login form
   --------------------------------------------------------- */

function showLoginError(form, errorEl, message) {
  errorEl.textContent = message;
  form.classList.remove("is-shake");
  // Reflow so the animation can restart if the user submits twice in a row.
  void form.offsetWidth;
  form.classList.add("is-shake");
}

function clearLoginError(errorEl) {
  errorEl.textContent = "";
}

async function attemptLogin(rawUsername, rawPassword) {
  const usernameOk =
    rawUsername.trim().toLowerCase() === AUTH.username.trim().toLowerCase();
  const hashed = await sha256Hex(rawPassword);
  const passwordOk = hashed === AUTH.passwordHash.toLowerCase();
  return usernameOk && passwordOk;
}

function wireLogin() {
  const form = document.getElementById("login-form");
  const errorEl = document.getElementById("login-error");
  if (!form || !errorEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearLoginError(errorEl);

    const username = form.username.value || "";
    const password = form.password.value || "";

    if (!username || !password) {
      showLoginError(form, errorEl, "Please enter your username and password.");
      return;
    }

    try {
      const ok = await attemptLogin(username, password);
      if (ok) {
        setAuthState(true);
        // Clear the password field for safety.
        form.password.value = "";
        // Scroll back to the top of the report.
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        showLoginError(
          form,
          errorEl,
          "That username or password did not match. Please try again."
        );
      }
    } catch (err) {
      showLoginError(
        form,
        errorEl,
        "Something went wrong checking your login. Please try again."
      );
    }
  });
}


/* ---------------------------------------------------------
   5) Top bar buttons (print, log out)
   --------------------------------------------------------- */

function wireTopbar() {
  const printBtn = document.getElementById("print-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setAuthState(false);
      // Reset login form fields for a clean re-login.
      const form = document.getElementById("login-form");
      if (form) {
        form.username.value = "";
        form.password.value = "";
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }
}


/* ---------------------------------------------------------
   6) Report behaviors: active nav highlighting and reveal on scroll.
   Initialized once after login (or on load if a session exists).
   --------------------------------------------------------- */

let reportInitialized = false;

function initReportBehaviors() {
  if (reportInitialized) return;
  reportInitialized = true;

  initActiveNav();
  initRevealOnScroll();
  initSmoothJumpClicks();
}

function initActiveNav() {
  const links = Array.from(document.querySelectorAll(".jumpnav-link"));
  if (!links.length) return;

  const linkById = new Map();
  links.forEach(l => {
    const id = l.getAttribute("href").replace("#", "");
    linkById.set(id, l);
  });

  const sections = links
    .map(l => document.getElementById(l.getAttribute("href").replace("#", "")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      // Find the entry with the largest intersection ratio that is intersecting.
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const activeId = visible[0].target.id;
      links.forEach(l => l.classList.remove("is-active"));
      const activeLink = linkById.get(activeId);
      if (activeLink) activeLink.classList.add("is-active");
    },
    {
      // Trigger when a section is roughly centered in the viewport.
      rootMargin: "-40% 0px -50% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }
  );

  sections.forEach(s => observer.observe(s));
}

function initRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  targets.forEach(t => observer.observe(t));
}

function initSmoothJumpClicks() {
  // CSS scroll-behavior handles most of this. We just close any focus rings
  // and account for the sticky top bar offset (handled via scroll-margin in CSS).
  document.querySelectorAll(".jumpnav-link").forEach(link => {
    link.addEventListener("click", () => {
      // No-op, but kept here in case we add custom offset logic later.
    });
  });
}


/* ---------------------------------------------------------
   7) Boot
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  wireLogin();
  wireTopbar();

  const alreadyAuthed = sessionStorage.getItem(SESSION_KEY) === "1";
  setAuthState(alreadyAuthed);
});
