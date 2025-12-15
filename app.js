const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

const state = {
  persona: "all",
  activeRoom: null,
  tour: {
    on: false,
    step: 0,
    steps: ["foyer", "kitchen", "lab", "study", "attic", "boardroom", "garage", "garden"],
  },
};

const ROOMS = {
  foyer: {
    name: "Foyer",
    kicker: "Start here",
    tagline: "Pick a path, get a plan, and move fast.",
    bullets: [
      "Guided tour for learners, hiring, business, or partners",
      "Clear next action per room (no clutter)",
      "Outcomes-first ecosystem map",
    ],
    proof: ["3 lanes: Self-serve / High-touch / Pipeline", "Keyboard friendly", "Mobile-first"],
    primary: { label: "Start guided tour", cta: "tour" },
    secondary: { label: "Talk to us", cta: "contact" },
    next: ["kitchen", "lab", "study"],
  },
  kitchen: {
    name: "Kitchen",
    kicker: "Learning paths",
    tagline: "Build skills with structured tracks that actually lead to outcomes.",
    bullets: [
      "Role-based paths (SOC, Pentest, Cloud, GRC)",
      "Project-first learning (portfolio ready)",
      "Bundles that ladder into labs + mentorship",
    ],
    proof: ["Clear syllabus", "Skill checkpoints", "Bundle discounts"],
    primary: { label: "Buy a learning path", cta: "pro" },
    secondary: { label: "See pricing", cta: "pricing" },
    next: ["lab", "study", "attic"],
  },
  lab: {
    name: "Lab Room",
    kicker: "Hands-on labs",
    tagline: "Learn by doing — guided labs, challenges, and sandboxes.",
    bullets: [
      "Start in minutes (beginner → advanced)",
      "Guided objectives + instant feedback",
      "Subscriptions for consistent progress",
    ],
    proof: ["Try free lab", "Progress tracking", "Certificate-ready"],
    primary: { label: "Start a free lab", cta: "free" },
    secondary: { label: "Upgrade to Pro", cta: "pro" },
    next: ["kitchen", "study", "basement"],
  },
  study: {
    name: "Study",
    kicker: "Mentorship",
    tagline: "Get unstuck fast with mentors who’ve done the work.",
    bullets: [
      "Skill-gap analysis + roadmap",
      "Project / resume / portfolio reviews",
      "Interview prep (technical + behavioral)",
    ],
    proof: ["Office hours", "1:1 sessions", "Actionable plan"],
    primary: { label: "Book a mentor session", cta: "mentor" },
    secondary: { label: "Talk to us", cta: "contact" },
    next: ["attic", "kitchen", "lab"],
  },
  living: {
    name: "Living Room",
    kicker: "Community & events",
    tagline: "Learn in public — workshops, webinars, and community momentum.",
    bullets: [
      "Monthly workshops + expert sessions",
      "Community challenges (build streaks)",
      "Partner spotlights + hiring days",
    ],
    proof: ["Live learning", "Accountability", "Network effects"],
    primary: { label: "Join next workshop", cta: "contact" },
    secondary: { label: "Explore labs", cta: "room:lab" },
    next: ["lab", "garden", "gallery"],
  },
  bathroom: {
    name: "Bathroom",
    kicker: "Security hygiene",
    tagline: "Small habits, huge impact. Start with the basics — done right.",
    bullets: [
      "Checklists, templates, and playbooks",
      "Starter policies + controls mapping",
      "Quick wins you can apply today",
    ],
    proof: ["Free toolkit", "Printable", "Beginner friendly"],
    primary: { label: "Download free toolkit", cta: "free" },
    secondary: { label: "Talk to us", cta: "contact" },
    next: ["gallery", "kitchen", "basement"],
  },
  basement: {
    name: "Basement",
    kicker: "Simulations / IR",
    tagline: "Real-world practice: tabletop exercises and incident simulations.",
    bullets: [
      "Tabletop + scenario playbooks",
      "Purple-team style drills",
      "Post-exercise report + improvements",
    ],
    proof: ["Enterprise-ready", "Measurable outcomes", "Repeatable cadence"],
    primary: { label: "Request a team simulation", cta: "teams" },
    secondary: { label: "Talk to us", cta: "contact" },
    next: ["boardroom", "garage", "gallery"],
  },
  garage: {
    name: "Garage",
    kicker: "Products & tools",
    tagline: "Try tools that ship outcomes — then scale with teams.",
    bullets: [
      "Product demos + trials",
      "Integrations + onboarding plan",
      "Productized services to accelerate adoption",
    ],
    proof: ["Trial first", "Fast onboarding", "Team-friendly"],
    primary: { label: "Start a product trial", cta: "product" },
    secondary: { label: "Talk to sales", cta: "teams" },
    next: ["basement", "boardroom", "garden"],
  },
  attic: {
    name: "Attic",
    kicker: "Careers / placements",
    tagline: "Turn skills into offers — with a structured accelerator.",
    bullets: [
      "Portfolio + capstone projects",
      "Mock interviews + hiring readiness",
      "Placement track + employer network",
    ],
    proof: ["Career ladder", "Mentor support", "Placement pipeline"],
    primary: { label: "Apply to Career Accelerator", cta: "career" },
    secondary: { label: "Book mentor", cta: "mentor" },
    next: ["study", "boardroom", "gallery"],
  },
  boardroom: {
    name: "Boardroom",
    kicker: "Hiring & assessments",
    tagline: "Assess, train, and hire — from one pipeline.",
    bullets: [
      "Role-based assessments",
      "Cohorts aligned to hiring needs",
      "Shortlist-ready candidate pipeline",
    ],
    proof: ["Reduced time-to-hire", "Higher signal", "Repeatable pipeline"],
    primary: { label: "Request candidates / run assessment", cta: "hiring" },
    secondary: { label: "See proof wall", cta: "room:gallery" },
    next: ["attic", "basement", "garden"],
  },
  gallery: {
    name: "Gallery",
    kicker: "Proof wall",
    tagline: "Credibility that converts — outcomes, case studies, and social proof.",
    bullets: [
      "Case studies (training → outcomes)",
      "Testimonials and hiring partner wins",
      "Clear ladder: free → pro → teams",
    ],
    proof: ["Outcomes > vanity metrics", "Transparent pricing", "Trust signals"],
    primary: { label: "See pricing", cta: "pricing" },
    secondary: { label: "Talk to us", cta: "contact" },
    next: ["pricing", "kitchen", "boardroom"],
  },
  garden: {
    name: "Garden",
    kicker: "Partners & brand",
    tagline: "Build the ecosystem: co-branding, distribution, and alliances.",
    bullets: [
      "Co-marketing and events",
      "Referral + reseller models",
      "Joint offerings (labs, services, products)",
    ],
    proof: ["Partner tiers", "Co-branded assets", "Shared pipeline"],
    primary: { label: "Become a partner", cta: "partner" },
    secondary: { label: "Talk to us", cta: "contact" },
    next: ["gallery", "boardroom", "living"],
  },
};

const personaRecommendations = {
  all: ["foyer", "kitchen", "lab", "study", "attic", "boardroom", "garage", "garden"],
  learner: ["foyer", "kitchen", "lab", "study", "attic", "gallery", "bathroom"],
  hiring: ["boardroom", "attic", "gallery", "basement", "garden"],
  business: ["basement", "garage", "gallery", "living", "bathroom"],
  partner: ["garden", "gallery", "living", "garage", "boardroom"],
};

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-on");
  window.clearTimeout(toast._id);
  toast._id = window.setTimeout(() => t.classList.remove("is-on"), 2500);
}

function setPersona(persona) {
  state.persona = persona;
  $$("[data-persona]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.persona === persona));
  renderRoomCards();
  highlightRecommended();
  toast(`Path set: ${persona === "all" ? "All" : persona}`);
}

function highlightRecommended() {
  $$(".room").forEach((r) => r.classList.remove("is-highlighted"));
  const rec = personaRecommendations[state.persona] || [];
  rec.forEach((id) => {
    const el = document.querySelector(`.room[data-room="${id}"]`);
    if (el) el.classList.add("is-highlighted");
  });
}

function openPanel(roomId, opts = {}) {
  const room = ROOMS[roomId];
  if (!room) return;

  state.activeRoom = roomId;
  const panel = $("#panel");
  panel.setAttribute("aria-hidden", "false");

  $("#panelKicker").textContent = room.kicker;
  $("#panelTitle").textContent = room.name;

  const bullets = room.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("");
  const proof = room.proof
    .map((p) => `<span class="bubble">${escapeHtml(p)}</span>`)
    .join("");

  const body = `
    <p class="muted">${escapeHtml(room.tagline)}</p>

    <h3 class="sectionTitle" style="font-size:16px; margin-top: 12px;">What you get</h3>
    <ul class="list" style="margin-top: 8px;">${bullets}</ul>

    <div class="badges" aria-label="Proof badges">${proof}</div>

    <div class="kpis" aria-label="Quick outcomes">
      <div class="kpi"><div class="kpi__num">1</div><div class="kpi__label">Primary action</div></div>
      <div class="kpi"><div class="kpi__num">2</div><div class="kpi__label">Steps to start</div></div>
      <div class="kpi"><div class="kpi__num">∞</div><div class="kpi__label">Rooms to explore</div></div>
    </div>
  `;

  $("#panelBody").innerHTML = body;

  const footer = $("#panelFooter");
  const primary = `<button class="btn btn--primary" data-do="${room.primary.cta}">${escapeHtml(
    room.primary.label
  )}</button>`;
  const secondary = `<button class="btn" data-do="${room.secondary.cta}">${escapeHtml(
    room.secondary.label
  )}</button>`;

  if (state.tour.on) {
    footer.innerHTML = `
      <div class="actions" aria-label="Tour actions">
        ${primary}
        ${secondary}
        <button class="btn" data-do="tour-next">Next</button>
        <button class="btn" data-do="tour-stop">Stop tour</button>
      </div>
    `;
    return;
  }

  const nextLinks = (room.next || [])
    .filter((n) => ROOMS[n] || n === "pricing")
    .slice(0, 3)
    .map((n) => {
      if (n === "pricing") return `<button class="btn" data-do="pricing">Pricing</button>`;
      return `<button class="btn" data-do="room:${n}">Next: ${escapeHtml(ROOMS[n].name)}</button>`;
    })
    .join("");

  footer.innerHTML = `
    <div class="actions" aria-label="Actions">
      ${primary}
      ${secondary}
    </div>
    <div class="actions" aria-label="Next suggestions">
      ${nextLinks}
    </div>
  `;

  if (!opts.silent) {
    const el = document.querySelector(`.room[data-room="${roomId}"]`);
    if (el) {
      $$(".room").forEach((r) => r.classList.remove("is-active"));
      el.classList.add("is-active");
    }
  }
}

function closePanel() {
  $("#panel").setAttribute("aria-hidden", "true");
  state.activeRoom = null;
  $$(".room").forEach((r) => r.classList.remove("is-active"));
}

function renderRoomCards() {
  const list = $("#roomsList");
  const rec = personaRecommendations[state.persona] || Object.keys(ROOMS);
  const ids = Array.from(new Set([...(rec || []), "foyer", "lab", "kitchen"]))
    .filter((id) => ROOMS[id])
    .slice(0, 8);

  list.innerHTML = ids
    .map((id) => {
      const r = ROOMS[id];
      return `
        <article class="roomCard">
          <div class="roomCard__title">${escapeHtml(r.name)}</div>
          <div class="roomCard__sub">${escapeHtml(r.kicker)} · ${escapeHtml(r.tagline)}</div>
          <div class="roomCard__actions">
            <button class="btn btn--primary" data-open-room="${id}" type="button">Open</button>
            <button class="btn" data-do="${r.primary.cta}" type="button">${escapeHtml(
        r.primary.label
      )}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openModal(id) {
  const el = $(id);
  el?.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const el = $(id);
  el?.setAttribute("aria-hidden", "true");
}

function enterHouse({ tour = false } = {}) {
  $("#gate").setAttribute("aria-hidden", "true");
  document.location.hash = "#house";
  openModal("#personaModal");
  if (tour) startTour();
}

function startTour() {
  state.tour.on = true;
  state.tour.step = 0;
  toast("Guided tour started. Use Next in the panel.");
  const first = state.tour.steps[0];
  if (first) openPanel(first);
  highlightTourStep();
}

function stopTour() {
  state.tour.on = false;
  state.tour.step = 0;
  highlightTourStep();
  toast("Tour stopped.");
}

function highlightTourStep() {
  $$(".room").forEach((r) => r.classList.remove("is-highlighted"));
  if (!state.tour.on) {
    highlightRecommended();
    return;
  }
  const id = state.tour.steps[state.tour.step];
  if (!id) return;
  const el = document.querySelector(`.room[data-room="${id}"]`);
  if (el) el.classList.add("is-highlighted");
}

function nextTourStep() {
  if (!state.tour.on) return;
  const next = state.tour.step + 1;
  if (next >= state.tour.steps.length) {
    stopTour();
    toast("Tour complete. Choose any room to continue.");
    return;
  }
  state.tour.step = next;
  const id = state.tour.steps[state.tour.step];
  openPanel(id);
  highlightTourStep();
}

function doCTA(kind) {
  if (!kind) return;

  if (kind.startsWith("room:")) {
    openPanel(kind.slice("room:".length));
    return;
  }

  switch (kind) {
    case "tour":
      startTour();
      return;
    case "pricing":
      document.location.hash = "#pricing";
      toast("Jumped to pricing.");
      return;
    case "contact":
      openModal("#contactModal");
      return;
    case "free":
      openModal("#contactModal");
      prefillContact("Free lab", "I want to start the free lab and see the next best upgrade path.");
      return;
    case "pro":
      openModal("#contactModal");
      prefillContact("Pro labs subscription", "I want Pro Labs. Please share onboarding steps and access details.");
      return;
    case "mentor":
      openModal("#contactModal");
      prefillContact("Mentorship", "I want to book a mentor session. Please share available slots and packages.");
      return;
    case "career":
      openModal("#contactModal");
      prefillContact("Career Accelerator", "I want to apply to the Career Accelerator. Please share eligibility and next steps.");
      return;
    case "teams":
      openModal("#contactModal");
      prefillContact("Enterprise training / services", "We want a team plan (training/simulations). Please share options and pricing.");
      return;
    case "product":
      openModal("#contactModal");
      prefillContact("Product trial", "I want a product trial. Please share a demo and trial access.");
      return;
    case "hiring":
      openModal("#contactModal");
      prefillContact("Hiring / Assessments", "We want candidates and/or assessments. Please share how your pipeline works.");
      return;
    case "partner":
      openModal("#contactModal");
      prefillContact("Partnership", "I’m interested in partnering. Please share partner tiers and collaboration models.");
      return;
    default:
      toast("Action not implemented in MVP.");
  }
}

function prefillContact(interest, message) {
  const form = $("#contactForm");
  const interestSel = form.elements.namedItem("interest");
  const msg = form.elements.namedItem("message");
  if (interestSel) interestSel.value = interest;
  if (msg && !msg.value) msg.value = message;
}

function buildEmailFromForm() {
  const form = $("#contactForm");
  const name = form.elements.namedItem("name")?.value?.trim() || "";
  const email = form.elements.namedItem("email")?.value?.trim() || "";
  const interest = form.elements.namedItem("interest")?.value || "";
  const message = form.elements.namedItem("message")?.value || "";

  const subject = `Cybersecurity House — ${interest}`;
  const body = [
    `Name: ${name || "(not provided)"}`,
    `Email: ${email || "(not provided)"}`,
    `Interest: ${interest}`,
    "",
    message,
    "",
    "Sent from the Cybersecurity House MVP.",
  ].join("\n");

  return { subject, body };
}

function wireEvents() {
  // Gate
  $("#gateEnter").addEventListener("click", () => enterHouse({ tour: false }));
  $("#gateTour").addEventListener("click", () => enterHouse({ tour: true }));
  $("#enterBtn").addEventListener("click", () => enterHouse({ tour: false }));
  $("#personaBtn").addEventListener("click", () => openModal("#personaModal"));

  // Persona
  $("#closePersona").addEventListener("click", () => closeModal("#personaModal"));
  $("#skipPersona").addEventListener("click", () => closeModal("#personaModal"));
  $$("[data-persona-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      setPersona(b.dataset.personaPick);
      closeModal("#personaModal");
    })
  );

  // Persona segmented
  $$("[data-persona]").forEach((b) => b.addEventListener("click", () => setPersona(b.dataset.persona)));

  // House rooms (SVG)
  $$(".room").forEach((el) => {
    el.addEventListener("click", () => openPanel(el.dataset.room));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPanel(el.dataset.room);
      }
    });
  });

  // Room cards (mobile)
  $("#roomsList").addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const roomId = t.getAttribute("data-open-room");
    if (roomId) openPanel(roomId);
    const act = t.getAttribute("data-do");
    if (act) doCTA(act);
  });

  // Panel buttons
  $("#closePanelBtn").addEventListener("click", closePanel);
  $("#panel").addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const act = t.getAttribute("data-do");
    if (!act) return;

    if (act === "tour-next") {
      nextTourStep();
      return;
    }

    if (act === "tour-stop") {
      stopTour();
      return;
    }

    doCTA(act);
  });

  // Tour button
  $("#tourBtn").addEventListener("click", () => {
    if (state.tour.on) stopTour();
    else startTour();
  });

  // Contact
  $("#contactBtn").addEventListener("click", () => openModal("#contactModal"));
  $("#closeContact").addEventListener("click", () => closeModal("#contactModal"));
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const { subject, body } = buildEmailFromForm();

    const to = "hello@example.com"; // replace with real email
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;

    window.location.href = mailto;
    toast("Prepared email (mailto). Replace hello@example.com with your address.");
  });

  $("#copyEmail").addEventListener("click", async () => {
    const { subject, body } = buildEmailFromForm();
    const text = `Subject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied email text.");
    } catch {
      toast("Could not copy (clipboard permission). You can still submit to open mail.");
    }
  });

  // Pricing CTAs
  $$("[data-cta]").forEach((b) =>
    b.addEventListener("click", () => {
      doCTA(b.dataset.cta);
    })
  );

  // Mini-map toggle (simple: scroll to house canvas)
  $("#mapToggle").addEventListener("click", () => {
    $("#houseCanvas").scrollIntoView({ behavior: "smooth", block: "start" });
    toast("Mini-map: house view");
  });

  // Global ESC
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closePanel();
    closeModal("#personaModal");
    closeModal("#contactModal");
  });

  // Close modals by clicking backdrop
  $$(".modal").forEach((m) =>
    m.addEventListener("click", (e) => {
      if (e.target === m) m.setAttribute("aria-hidden", "true");
    })
  );
}

function init() {
  // First render
  renderRoomCards();
  highlightRecommended();
  wireEvents();

  // Default: show foyer on load (but keep gate visible)
  openPanel("foyer", { silent: true });
}

init();
