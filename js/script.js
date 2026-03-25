// ============================================
// SignBridge+ — Main JavaScript
// ============================================

// ===== GLOBAL STATE =====
let dictionary = {};
let selectedGestures = [];
let currentPage = '';
let isHighContrast = false;
let isLargeText = false;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  currentPage = document.body.dataset.page || '';

  // Load dictionary
  await loadDictionary();

  // Init common components
  initNavbar();
  initAccessibility();

  // Init page-specific features
  if (currentPage === 'home') initHomePage();
  if (currentPage === 'translate') initTranslatePage();
  if (currentPage === 'kamus') initKamusPage();
  if (currentPage === 'edukasi') initEdukasiPage();
  if (currentPage === 'about') initAboutPage();
  if (currentPage === 'contact') initContactPage();
});

// ===== LOAD DICTIONARY =====
async function loadDictionary() {
  try {
    const res = await fetch('data/dictionary.json');
    dictionary = await res.json();
  } catch (e) {
    // Fallback inline dictionary
    dictionary = {
      "saya": { arti: "Kata ganti orang pertama tunggal", emoji: "🫵", kategori: "Kata Ganti" },
      "kamu": { arti: "Kata ganti orang kedua", emoji: "👉", kategori: "Kata Ganti" },
      "makan": { arti: "Memasukkan makanan ke dalam mulut", emoji: "🍽️", kategori: "Aktivitas" },
      "minum": { arti: "Memasukkan cairan ke dalam mulut", emoji: "🥤", kategori: "Aktivitas" },
      "tidur": { arti: "Keadaan istirahat dengan mata tertutup", emoji: "😴", kategori: "Aktivitas" },
      "halo": { arti: "Salam pembuka", emoji: "👋", kategori: "Salam" },
      "terima kasih": { arti: "Ungkapan rasa syukur", emoji: "🙏", kategori: "Salam" },
      "maaf": { arti: "Permohonan ampun", emoji: "😔", kategori: "Salam" },
      "ya": { arti: "Kata menyatakan persetujuan", emoji: "✅", kategori: "Respons" },
      "tidak": { arti: "Kata menyatakan penolakan", emoji: "❌", kategori: "Respons" },
      "tolong": { arti: "Permohonan bantuan", emoji: "🆘", kategori: "Respons" },
      "senang": { arti: "Perasaan bahagia", emoji: "😄", kategori: "Perasaan" },
      "sedih": { arti: "Perasaan tidak bahagia", emoji: "😢", kategori: "Perasaan" },
      "sakit": { arti: "Kondisi tidak sehat", emoji: "🤒", kategori: "Kondisi" },
      "lapar": { arti: "Perut kosong memerlukan makanan", emoji: "🤤", kategori: "Kondisi" },
      "rumah": { arti: "Tempat tinggal", emoji: "🏠", kategori: "Tempat" },
      "sekolah": { arti: "Lembaga pendidikan", emoji: "🏫", kategori: "Tempat" },
      "pergi": { arti: "Berangkat atau meninggalkan tempat", emoji: "🏃", kategori: "Aktivitas" },
      "datang": { arti: "Tiba di suatu tempat", emoji: "🤗", kategori: "Aktivitas" },
      "air": { arti: "Cairan bening untuk kehidupan", emoji: "💧", kategori: "Benda" },
      "nasi": { arti: "Makanan pokok dari beras", emoji: "🍚", kategori: "Makanan" },
      "besar": { arti: "Ukuran melebihi rata-rata", emoji: "🐘", kategori: "Kata Sifat" },
      "kecil": { arti: "Ukuran kurang dari rata-rata", emoji: "🐜", kategori: "Kata Sifat" }
    };
  }
}

// ===== NAVBAR =====
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu?.classList.toggle('open');
      mobileOverlay?.classList.toggle('open');
    });
    mobileOverlay?.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      mobileOverlay?.classList.remove('open');
    });
  }

  // Mark active nav link
  const links = document.querySelectorAll('.nav-link, .mobile-menu .nav-link');
  links.forEach(link => {
    if (link.href === window.location.href ||
        link.href.includes(currentPage || 'index')) {
      link.classList.add('active');
    }
  });
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
  const contrastBtn = document.getElementById('btn-contrast');
  const textBtn = document.getElementById('btn-large-text');

  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      isHighContrast = !isHighContrast;
      document.body.classList.toggle('high-contrast', isHighContrast);
      contrastBtn.classList.toggle('active', isHighContrast);
      contrastBtn.title = isHighContrast ? 'Matikan Kontras Tinggi' : 'Aktifkan Kontras Tinggi';
      showToast(isHighContrast ? '🎨 Kontras tinggi aktif' : '🎨 Kontras normal', 'success');
    });
  }

  if (textBtn) {
    textBtn.addEventListener('click', () => {
      isLargeText = !isLargeText;
      document.body.classList.toggle('large-text', isLargeText);
      textBtn.classList.toggle('active', isLargeText);
      textBtn.title = isLargeText ? 'Ukuran Normal' : 'Ukuran Teks Besar';
      showToast(isLargeText ? '🔍 Teks diperbesar' : '🔍 Teks normal', 'success');
    });
  }
}

// ===== HOME PAGE =====
function initHomePage() {
  // Animate stats counter
  const stats = document.querySelectorAll('.stat-num[data-target]');
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      stat.textContent = current + (stat.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

// ===== TRANSLATE PAGE =====
function initTranslatePage() {
  initTabSwitcher();
  initIndonesiaToBisindo();
  initBisindoToIndonesia();
}

function initTabSwitcher() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

function initIndonesiaToBisindo() {
  const textarea = document.getElementById('input-text');
  const charCount = document.getElementById('char-count');
  const translateBtn = document.getElementById('btn-do-translate');
  const clearBtn = document.getElementById('btn-clear');

  if (!textarea) return;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    if (charCount) charCount.textContent = `${len}/200`;
    if (len > 200) textarea.value = textarea.value.slice(0, 200);
  });

  translateBtn?.addEventListener('click', () => doTranslate());
  clearBtn?.addEventListener('click', () => {
    textarea.value = '';
    if (charCount) charCount.textContent = '0/200';
    clearResult();
  });

  // Enter to translate
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doTranslate();
    }
  });

  // Example chips
  document.querySelectorAll('.example-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      textarea.value = chip.dataset.text;
      if (charCount) charCount.textContent = `${chip.dataset.text.length}/200`;
    });
  });
}

function doTranslate() {
  const textarea = document.getElementById('input-text');
  const resultGrid = document.getElementById('gesture-result');
  const resultSection = document.getElementById('result-section');

  if (!textarea || !resultGrid) return;

  const text = textarea.value.trim();
  if (!text) {
    showToast('⚠️ Masukkan teks dulu ya!', 'error');
    return;
  }

  const words = text.toLowerCase()
    .replace(/[^a-zA-Z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);

  resultGrid.innerHTML = '';

  if (resultSection) {
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  words.forEach((word, i) => {
    const entry = dictionary[word];
    const card = document.createElement('div');
    card.className = 'gesture-card';
    card.style.animationDelay = `${i * 0.08}s`;

    if (entry) {
      card.innerHTML = `
        <span class="gesture-emoji">${entry.emoji}</span>
        <span class="gesture-word">${word}</span>
        <span class="gesture-num">${i + 1}</span>
      `;
    } else {
      card.innerHTML = `
        <span class="gesture-emoji">❓</span>
        <span class="gesture-word">${word}</span>
        <span class="not-found-badge">belum ada</span>
      `;
    }

    resultGrid.appendChild(card);
  });

  showToast(`✅ ${words.length} kata diterjemahkan`, 'success');
}

function clearResult() {
  const resultSection = document.getElementById('result-section');
  const resultGrid = document.getElementById('gesture-result');
  if (resultSection) resultSection.style.display = 'none';
  if (resultGrid) resultGrid.innerHTML = '';
}

function initBisindoToIndonesia() {
  const gestureBtns = document.querySelectorAll('.gesture-btn');
  const sentenceBuilder = document.getElementById('sentence-builder');
  const translationOutput = document.getElementById('translation-output');
  const outputText = document.getElementById('output-text');
  const clearSentenceBtn = document.getElementById('btn-clear-sentence');

  if (!sentenceBuilder) return;

  selectedGestures = [];

  gestureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const word = btn.dataset.word;
      const emoji = btn.querySelector('.gesture-btn-emoji')?.textContent;

      selectedGestures.push({ word, emoji });
      renderSentence();
    });
  });

  clearSentenceBtn?.addEventListener('click', () => {
    selectedGestures = [];
    renderSentence();
  });
}

function renderSentence() {
  const sentenceBuilder = document.getElementById('sentence-builder');
  const translationOutput = document.getElementById('translation-output');
  const outputText = document.getElementById('output-text');

  if (!sentenceBuilder) return;

  if (selectedGestures.length === 0) {
    sentenceBuilder.innerHTML = '<span class="sentence-placeholder">Klik gesture di atas untuk membangun kalimat...</span>';
    if (translationOutput) translationOutput.style.display = 'none';
    return;
  }

  sentenceBuilder.innerHTML = selectedGestures.map((g, i) => `
    <span class="sentence-word">
      ${g.emoji} ${g.word}
      <span class="remove-word" onclick="removeGesture(${i})">✕</span>
    </span>
  `).join('');

  const sentence = selectedGestures.map(g => {
    const w = g.word.charAt(0).toUpperCase() + g.word.slice(1);
    return w;
  }).join(' ');

  if (outputText) outputText.textContent = sentence;
  if (translationOutput) translationOutput.style.display = 'block';
}

function removeGesture(index) {
  selectedGestures.splice(index, 1);
  renderSentence();
}

// ===== KAMUS PAGE =====
function initKamusPage() {
  const searchInput = document.getElementById('search-kamus');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const kamusGrid = document.getElementById('kamus-grid');
  const modal = document.getElementById('kamus-modal');
  const modalClose = document.getElementById('modal-close');

  if (!kamusGrid) return;

  let activeCategory = 'semua';
  let searchQuery = '';

  // Render initial grid
  renderKamus();

  // Search
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderKamus();
  });

  // Filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderKamus();
    });
  });

  // Modal close
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function renderKamus() {
    kamusGrid.innerHTML = '';
    const entries = Object.entries(dictionary);
    const filtered = entries.filter(([word, data]) => {
      const matchesSearch = word.includes(searchQuery) || data.arti?.toLowerCase().includes(searchQuery);
      const matchesCategory = activeCategory === 'semua' || data.kategori === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
      kamusGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1">
          <span class="no-icon">🔍</span>
          <h3>Tidak ditemukan</h3>
          <p>Kata "<strong>${searchQuery}</strong>" belum ada di kamus kami</p>
        </div>
      `;
      return;
    }

    filtered.forEach(([word, data], i) => {
      const card = document.createElement('div');
      card.className = 'kamus-card';
      card.style.animationDelay = `${i * 0.04}s`;
      card.innerHTML = `
        <span class="kamus-emoji">${data.emoji || '🤟'}</span>
        <div class="kamus-word">${word.charAt(0).toUpperCase() + word.slice(1)}</div>
        <span class="kamus-category">${data.kategori || 'Umum'}</span>
        <p class="kamus-arti">${data.arti}</p>
      `;
      card.addEventListener('click', () => openModal(word, data));
      kamusGrid.appendChild(card);
    });
  }

  function openModal(word, data) {
    if (!modal) return;
    document.getElementById('modal-emoji').textContent = data.emoji || '🤟';
    document.getElementById('modal-word').textContent = word.charAt(0).toUpperCase() + word.slice(1);
    document.getElementById('modal-arti').textContent = data.arti;
    document.getElementById('modal-category').textContent = data.kategori || 'Umum';

    const contoh = document.getElementById('modal-contoh');
    if (contoh) contoh.textContent = data.contoh || '-';
    const gerakan = document.getElementById('modal-gerakan');
    if (gerakan) gerakan.textContent = data.deskripsi_gerakan || 'Lihat panduan gerakan BISINDO';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('kamus-modal');
  modal?.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== EDUKASI PAGE =====
function initEdukasiPage() {
  // Animate on scroll (simple IntersectionObserver)
  const cards = document.querySelectorAll('.edu-card, .tip-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(card);
  });
}

// ===== ABOUT PAGE =====
function initAboutPage() {
  // Simple entry animation
  const table = document.querySelector('.innovate-table');
  if (table) {
    table.querySelectorAll('tr').forEach((row, i) => {
      row.style.opacity = '0';
      row.style.transition = `opacity 0.4s ease ${i * 0.06}s`;
      setTimeout(() => row.style.opacity = '1', 100);
    });
  }
}

// ===== CONTACT PAGE =====
function initContactPage() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('field-name')?.value;
    showToast(`📨 Pesan dari ${name} terkirim! Terima kasih 🙏`, 'success');
    form.reset();
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.textContent = message;

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ===== SMOOTH NAV SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});
