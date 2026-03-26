// ============================================
// SignBridge+ — Enhanced JavaScript
// Scroll reveals, onboarding, translate, kamus, accessibility
// ============================================

let dictionary = {};
let currentPage = "";

// ===== INIT =====
document.addEventListener("DOMContentLoaded", async () => {
  currentPage = document.body.dataset.page || "";
  await loadDictionary();
  initNavbar();
  initAccessibility();
  initScrollReveal();
  initScrolledNav();

  if (currentPage === "home") {
    initHomePage();
    initOnboarding();
  }
  if (currentPage === "translate") initTranslatePage();
  if (currentPage === "kamus") initKamusPage();
  if (currentPage === "contact") initContactPage();
});

// ===== LOAD DICTIONARY =====
async function loadDictionary() {
  try {
    const res = await fetch("/data/dictionary.json");
    dictionary = await res.json();
  } catch (e) {
    dictionary = {
      saya: {
        arti: "Kata ganti orang pertama tunggal",
        emoji: "🫵",
        kategori: "Kata Ganti",
        deskripsi_gerakan: "Tunjuk dada dengan jari telunjuk",
      },
      kamu: {
        arti: "Kata ganti orang kedua",
        emoji: "👉",
        kategori: "Kata Ganti",
        deskripsi_gerakan: "Tunjuk ke arah lawan bicara",
      },
      makan: {
        arti: "Memasukkan makanan ke dalam mulut",
        emoji: "🍽️",
        kategori: "Aktivitas",
        deskripsi_gerakan: "Buka-tutup tangan di depan mulut",
      },
      minum: {
        arti: "Memasukkan cairan ke dalam mulut",
        emoji: "🥤",
        kategori: "Aktivitas",
        deskripsi_gerakan: "Angkat tangan seperti memegang gelas ke mulut",
      },
      halo: {
        arti: "Salam pembuka",
        emoji: "👋",
        kategori: "Salam",
        deskripsi_gerakan: "Lambaikan tangan ke depan",
      },
      "terima kasih": {
        arti: "Ungkapan rasa syukur",
        emoji: "🙏",
        kategori: "Salam",
        deskripsi_gerakan: "Satukan kedua telapak tangan di depan dada",
      },
      nasi: {
        arti: "Makanan pokok dari beras",
        emoji: "🍚",
        kategori: "Makanan",
        deskripsi_gerakan: "Gerakan tangan menggulung",
      },
      tidur: {
        arti: "Keadaan istirahat",
        emoji: "😴",
        kategori: "Aktivitas",
        deskripsi_gerakan: "Miringkan kepala, tempelkan telapak tangan di pipi",
      },
    };
  }
}

// ===== SCROLLED NAV =====
function initScrolledNav() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ===== NAVBAR =====
function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-nav-overlay");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      overlay.classList.toggle("open", isOpen);
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });
    overlay?.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  }
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
  const contrastBtn = document.getElementById("btn-contrast");
  const textBtn = document.getElementById("btn-large-text");

  // Restore saved state
  if (localStorage.getItem("sb-high-contrast") === "1") {
    document.body.classList.add("high-contrast");
    contrastBtn?.classList.add("active");
  }
  if (localStorage.getItem("sb-large-text") === "1") {
    document.body.classList.add("large-text");
    textBtn?.classList.add("active");
  }

  contrastBtn?.addEventListener("click", () => {
    const active = document.body.classList.toggle("high-contrast");
    contrastBtn.classList.toggle("active", active);
    localStorage.setItem("sb-high-contrast", active ? "1" : "0");
    showToast(
      active ? "🎨 Kontras tinggi aktif" : "🎨 Kontras normal",
      "success",
    );
  });

  textBtn?.addEventListener("click", () => {
    const active = document.body.classList.toggle("large-text");
    textBtn.classList.toggle("active", active);
    localStorage.setItem("sb-large-text", active ? "1" : "0");
    showToast(active ? "🔍 Teks diperbesar" : "🔍 Teks normal", "success");
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "-40px" },
  );

  reveals.forEach((el) => observer.observe(el));
}

// ===== TOAST =====
function showToast(message, type = "info") {
  let toast = document.getElementById("sb-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "sb-toast";
    toast.className = "sb-toast";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `sb-toast sb-toast-${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== ONBOARDING =====
function initOnboarding() {
  if (localStorage.getItem("sb-onboarding-seen")) return;

  const steps = [
    {
      icon: "🤟",
      title: "Selamat Datang di SignBridge+",
      desc: "Platform penerjemah BISINDO pertama yang aksesibel dan inklusif. Mari kenali fitur utamanya!",
    },
    {
      icon: "🔄",
      title: "Terjemahkan Teks ke BISINDO",
      desc: "Ketik kalimat Bahasa Indonesia dan lihat terjemahan gesturenya secara real-time lengkap dengan video.",
    },
    {
      icon: "📚",
      title: "Jelajahi Kamus & Edukasi",
      desc: "Pelajari 30+ kata BISINDO dengan filter kategori, deskripsi gerakan, dan konten yang memperkaya pemahaman.",
    },
  ];
  let step = 0;

  const overlay = document.getElementById("onboarding-overlay");
  if (!overlay) return;

  const render = () => {
    const s = steps[step];
    document.getElementById("onboarding-icon").textContent = s.icon;
    document.getElementById("onboarding-title").textContent = s.title;
    document.getElementById("onboarding-desc").textContent = s.desc;

    // Dots
    document.querySelectorAll(".onboarding-dot").forEach((d, i) => {
      d.classList.toggle("active", i === step);
    });

    // Buttons
    const prevBtn = document.getElementById("onboarding-prev");
    const nextBtn = document.getElementById("onboarding-next");
    prevBtn.style.display = step > 0 ? "" : "none";
    if (step < steps.length - 1) {
      nextBtn.textContent = "Lanjut";
      nextBtn.onclick = () => {
        step++;
        render();
      };
    } else {
      nextBtn.textContent = "Coba Translate Sekarang";
      nextBtn.onclick = () => {
        close();
        window.location.href = "/site/translate.html";
      };
    }
    prevBtn.onclick = () => {
      step--;
      render();
    };
  };

  const close = () => {
    overlay.classList.remove("open");
    localStorage.setItem("sb-onboarding-seen", "1");
  };

  overlay.classList.add("open");
  document.getElementById("onboarding-close").onclick = close;
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  // Init dots
  const dotsContainer = document.querySelector(".onboarding-dots");
  steps.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "onboarding-dot";
    dot.setAttribute("aria-label", `Langkah ${i + 1}`);
    dot.onclick = () => {
      step = i;
      render();
    };
    dotsContainer.appendChild(dot);
  });

  render();
}

// ===== HOME PAGE =====
function initHomePage() {
  // Counter animation
  const stats = document.querySelectorAll(".stat-num[data-target]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
          }, 40);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );
  stats.forEach((s) => observer.observe(s));
}

// ===== TRANSLATE PAGE =====
const videoMap = {
  saya: "/videos/saya.mp4",
  halo: "/videos/halo.mp4",
  "terima kasih": "/videos/terima kasih.mp4",
  "saya makan nasi": "/videos/Saya makan nasi.mp4",
};

function initTranslatePage() {
  const textarea = document.getElementById("input-text");
  const charCount = document.getElementById("char-count");
  const translateBtn = document.getElementById("btn-translate");
  const clearBtn = document.getElementById("btn-clear");
  const suggestionsEl = document.getElementById("suggestions");
  const resultSection = document.getElementById("result-section");
  const gestureGrid = document.getElementById("gesture-grid");
  const videoOverlay = document.getElementById("video-overlay");

  if (!textarea) return;

  // Char count & auto-suggest
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    if (charCount) charCount.textContent = `${len}/200`;
    if (len > 200) textarea.value = textarea.value.slice(0, 200);
    updateSuggestions();
  });

  // Enter to translate
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doTranslate();
    }
  });

  translateBtn?.addEventListener("click", doTranslate);
  clearBtn?.addEventListener("click", () => {
    textarea.value = "";
    charCount.textContent = "0/200";
    resultSection?.classList.remove("visible");
    suggestionsEl.innerHTML = "";
  });

  // Example chips
  document.querySelectorAll(".example-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      textarea.value = chip.dataset.text;
      charCount.textContent = `${chip.dataset.text.length}/200`;
      updateSuggestions();
    });
  });

  // Close video modal
  videoOverlay?.addEventListener("click", (e) => {
    if (e.target === videoOverlay || e.target.closest(".video-close-btn")) {
      closeVideoModal();
    }
  });

  function updateSuggestions() {
    if (!suggestionsEl) return;
    const text = textarea.value.trim();
    if (!text) {
      suggestionsEl.innerHTML = "";
      return;
    }

    const lastWord = text.toLowerCase().split(/\s+/).pop() || "";
    if (lastWord.length < 2) {
      suggestionsEl.innerHTML = "";
      return;
    }

    const matches = Object.keys(dictionary)
      .filter((k) => k.startsWith(lastWord) && k !== lastWord)
      .slice(0, 5);

    if (!matches.length) {
      suggestionsEl.innerHTML = "";
      return;
    }

    suggestionsEl.innerHTML = `
      <div class="suggestion-row">
        <span class="suggestion-label">Saran:</span>
        ${matches.map((m) => `<button class="suggestion-chip" data-word="${m}">${m}</button>`).join("")}
      </div>
    `;
    suggestionsEl.querySelectorAll(".suggestion-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const parts = textarea.value.split(/\s+/);
        parts[parts.length - 1] = chip.dataset.word;
        textarea.value = parts.join(" ") + " ";
        charCount.textContent = `${textarea.value.length}/200`;
        suggestionsEl.innerHTML = "";
        textarea.focus();
      });
    });
  }

  function doTranslate() {
    const text = textarea.value.trim();
    if (!text) {
      showToast("⚠️ Masukkan teks dulu ya!", "error");
      return;
    }

    // Show loading
    translateBtn.disabled = true;
    translateBtn.innerHTML = '<span class="spinner"></span> Menerjemahkan...';

    setTimeout(() => {
      const words = text
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      gestureGrid.innerHTML = "";
      words.forEach((word, i) => {
        const entry = dictionary[word];
        const hasVideo = !!videoMap[word];
        const card = document.createElement("div");
        card.className = `gesture-card ${entry ? "" : "not-found"}`;
        card.style.animationDelay = `${i * 0.06}s`;
        card.style.animation = "fadeInUp 0.4s ease both";

        card.innerHTML = `
          <div class="gesture-emoji-area" style="background: ${entry ? "var(--primary-light)" : "var(--surface-dim)"}">
            ${entry ? entry.emoji : "❓"}
          </div>
          <div class="gesture-info">
            <div class="gesture-word">${word}</div>
            ${
              entry
                ? `<div class="gesture-desc">${entry.deskripsi_gerakan}</div>`
                : `<div class="gesture-unavailable">Belum tersedia</div>`
            }
          </div>
          ${hasVideo ? '<div class="gesture-play-badge">▶</div>' : ""}
        `;

        if (entry) {
          card.addEventListener("click", () => openVideoModal(word, entry));
          card.setAttribute("tabindex", "0");
          card.setAttribute("role", "button");
          card.setAttribute("aria-label", `Lihat gesture ${word}`);
          card.addEventListener("keydown", (e) => {
            if (e.key === "Enter") openVideoModal(word, entry);
          });
        }

        gestureGrid.appendChild(card);
      });

      resultSection.classList.add("visible");
      resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });

      translateBtn.disabled = false;
      translateBtn.innerHTML = "Translate";
      showToast("✅ Terjemahan selesai!", "success");

      // Auto-show video popup for the translated text
      if (words.length > 0) {
        // Always show a video from the available videos, regardless of the text
        const availableVideos = Object.keys(videoMap);
        if (availableVideos.length > 0) {
          // Pick the first available video
          const videoWord = availableVideos[0];
          const entry = dictionary[videoWord] || {
            kategori: "BISINDO",
            emoji: "🤟",
            arti: "Gerakan BISINDO",
            deskripsi_gerakan: "Gerakan tangan untuk komunikasi",
          };
          openVideoModal(videoWord, entry);
        }
      }
    }, 500);
  }

  function openVideoModal(word, entry) {
    const videoSrc = videoMap[word];
    const screenEl = videoOverlay.querySelector(".video-screen");
    videoOverlay.querySelector(".video-category").textContent = entry.kategori;
    videoOverlay.querySelector(".video-word").textContent = word;
    videoOverlay.querySelector(".video-detail-arti").textContent = entry.arti;
    videoOverlay.querySelector(".video-detail-gerakan").textContent =
      entry.deskripsi_gerakan;

    if (videoSrc) {
      screenEl.innerHTML = `<video src="${videoSrc}" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;"></video>`;
    } else {
      screenEl.innerHTML = `
        <div class="video-fallback">
          <div class="video-fallback-emoji">${entry.emoji}</div>
          <div class="video-fallback-word">${word}</div>
          <div class="video-fallback-desc">${entry.deskripsi_gerakan}</div>
        </div>
      `;
    }

    videoOverlay.classList.add("open");
  }

  function closeVideoModal() {
    videoOverlay.classList.remove("open");
    const video = videoOverlay.querySelector("video");
    if (video) video.pause();
  }
}

// ===== KAMUS PAGE =====
function initKamusPage() {
  const grid = document.getElementById("kamus-grid");
  const searchInput = document.getElementById("search-kamus");
  const countEl = document.getElementById("results-count");
  const modalOverlay = document.getElementById("kamus-modal");
  let activeCategory = "semua";

  function renderGrid(filter = "", category = "semua") {
    const entries = Object.entries(dictionary);
    const filtered = entries.filter(([word, data]) => {
      const matchSearch =
        !filter ||
        word.includes(filter.toLowerCase()) ||
        data.arti.toLowerCase().includes(filter.toLowerCase());
      const matchCat = category === "semua" || data.kategori === category;
      return matchSearch && matchCat;
    });

    if (countEl) countEl.textContent = `${filtered.length} kata ditemukan`;

    grid.innerHTML = "";
    if (!filtered.length) {
      grid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)"><div style="font-size:2rem;margin-bottom:0.5rem">🔍</div>Tidak ada kata yang cocok</div>';
      return;
    }

    filtered.forEach(([word, data], i) => {
      const card = document.createElement("div");
      card.className = "sb-card kamus-card";
      card.setAttribute("role", "listitem");
      card.setAttribute("tabindex", "0");
      card.style.animation = `fadeInUp 0.3s ease ${i * 0.03}s both`;

      card.innerHTML = `
        <span class="kamus-card-emoji" aria-hidden="true">${data.emoji}</span>
        <div class="kamus-card-word">${word}</div>
        <div class="kamus-card-arti">${data.arti}</div>
        <div class="kamus-card-meta">
          <span class="kamus-card-tag">${data.kategori}</span>
        </div>
      `;

      card.addEventListener("click", () => openKamusModal(word, data));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openKamusModal(word, data);
      });
      grid.appendChild(card);
    });
  }

  function openKamusModal(word, data) {
    document.getElementById("modal-category-label").textContent = data.kategori;
    document.getElementById("modal-word").textContent = word;
    document.getElementById("modal-emoji").textContent = data.emoji;
    document.getElementById("modal-arti").textContent = data.arti;
    document.getElementById("modal-contoh").textContent =
      data.contoh ||
      `Contoh: "${word}" digunakan dalam percakapan sehari-hari.`;
    document.getElementById("modal-gerakan").textContent =
      data.deskripsi_gerakan;
    document.getElementById("modal-category").textContent = data.kategori;
    modalOverlay.classList.add("open");
  }

  // Close modal
  modalOverlay?.addEventListener("click", (e) => {
    if (e.target === modalOverlay || e.target.id === "modal-close") {
      modalOverlay.classList.remove("open");
    }
  });
  document.getElementById("modal-close")?.addEventListener("click", () => {
    modalOverlay.classList.remove("open");
  });

  // Search
  searchInput?.addEventListener("input", () => {
    renderGrid(searchInput.value, activeCategory);
  });

  // Filter tabs
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      renderGrid(searchInput?.value || "", activeCategory);
    });
  });

  renderGrid();
}

// ===== CONTACT PAGE =====
function initContactPage() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("field-name")?.value.trim();
    const email = document.getElementById("field-email")?.value.trim();
    const message = document.getElementById("field-message")?.value.trim();

    if (!name || !email || !message) {
      showToast("⚠️ Mohon isi semua field yang diperlukan", "error");
      return;
    }

    // Simulate send
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Mengirim...';

    setTimeout(() => {
      showToast("✅ Pesan berhasil dikirim! Terima kasih.", "success");
      form.reset();
      btn.disabled = false;
      btn.textContent = "Kirim Pesan";
    }, 1000);
  });
}
