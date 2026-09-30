/**
 * NEXUS Landing Page - Interactive Logic & Functionality
 * Sections: Hero, About, Features, Connect
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileDrawer();
  initScrollSpy();
  initHeroTiltEffect();
  initFeatureGlowAndFilters();
  initAboutTabs();
  initStatsCounter();
  initContactForm();
  initDemoModal();
  initClipboardHelpers();
  initBackToTop();
  initLanguageSwitcher();
});

/* ==========================================================================
   1. Navbar Scroll State
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const backdrop = document.getElementById('drawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. ScrollSpy & Navigation Active Link Highlight
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        desktopLinks.forEach(link => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Hero 3D Tilt Card Interaction
   ========================================================================== */
function initHeroTiltEffect() {
  const tiltCard = document.getElementById('heroTiltCard');
  const wrapper = document.querySelector('.hero-visual-wrapper');

  if (!tiltCard || !wrapper || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Only enable on desktop screens
  if (window.innerWidth < 992) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 14;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   5. Feature Cards: Mouse Glow & Category Filters
   ========================================================================== */
function initFeatureGlowAndFilters() {
  const cards = document.querySelectorAll('.feature-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Mouse-tracking glow inside feature cards
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInPane 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. About Section Tabs
   ========================================================================== */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      tabPanes.forEach(pane => {
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   7. Animated Stats Counters
   ========================================================================== */
function initStatsCounter() {
  const statsContainer = document.getElementById('statsGrid');
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statsContainer || !statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(el => animateNumber(el));
      }
    });
  }, { threshold: 0.35 });

  observer.observe(statsContainer);

  function animateNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const decimals = parseInt(element.getAttribute('data-decimals') || '0', 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutCubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeOut;

      element.textContent = currentVal.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(updateCounter);
  }
}

/* ==========================================================================
   8. Connect Form Validation & Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitFormBtn');
  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset previous error states
    [nameInput, emailInput, messageInput].forEach(inp => inp.classList.remove('is-invalid'));
    [nameError, emailError, messageError].forEach(err => err.classList.remove('visible'));

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      nameError.classList.add('visible');
      isValid = false;
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      emailError.classList.add('visible');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      messageError.classList.add('visible');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending with loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      form.reset();

      const lang = document.documentElement.lang;
      const successMsg = lang === 'ka' 
        ? 'შეტყობინება წარმატებით გაიგზავნა! ჩვენი გუნდი მალე დაგიკავშირდებათ.'
        : 'Message sent successfully! Our team will reach out shortly.';
      
      showToast('🎉 ' + successMsg);
    }, 1200);
  });
}

/* ==========================================================================
   9. Interactive Demo Video Modal
   ========================================================================== */
function initDemoModal() {
  const demoBtn = document.getElementById('heroDemoBtn');
  const modal = document.getElementById('demoModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!demoBtn || !modal) return;

  const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  demoBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. Clipboard Helpers (Copy Email, Phone, Code)
   ========================================================================== */
function initClipboardHelpers() {
  // Copy Code snippet
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const copyCodeText = document.getElementById('copyCodeText');

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const code = 'npm install @nexus/platform-core\nnexus init my-awesome-project --ai-enabled';
      navigator.clipboard.writeText(code).then(() => {
        copyCodeText.textContent = 'Copied!';
        showToast('📋 ბრძანება დაკოპირდა ბუფერში!');
        setTimeout(() => {
          copyCodeText.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  // Copy Email item
  const emailItem = document.getElementById('copyEmailItem');
  if (emailItem) {
    emailItem.addEventListener('click', () => {
      const email = document.getElementById('displayEmail')?.textContent || 'contact@nexus-platform.io';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`✉️ ${email} დაკოპირდა!`);
      });
    });
  }

  // Copy Phone item
  const phoneItem = document.getElementById('copyPhoneItem');
  if (phoneItem) {
    phoneItem.addEventListener('click', () => {
      const phone = document.getElementById('displayPhone')?.textContent || '+995 (32) 200 45 45';
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`📞 ${phone} დაკოპირდა!`);
      });
    });
  }
}

/* ==========================================================================
   11. Toast Notifications
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">✦</span><span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

/* ==========================================================================
   12. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   13. Bilingual Language Switcher (KA <-> EN)
   ========================================================================== */
const translations = {
  ka: {
    'nav.hero': 'მთავარი',
    'nav.about': 'ჩვენს შესახებ',
    'nav.features': 'შესაძლებლობები',
    'nav.connect': 'კონტაქტი',
    'btn.getStarted': 'დაწყება',
    'hero.badge': '✨ მომავლის პლატფორმა • ვერსია 3.0',
    'hero.titleP1': 'გადააქციე იდეები',
    'hero.titleHighlight': 'ინოვაციად',
    'hero.titleP2': 'უახლესი ტექნოლოგიით',
    'hero.desc': 'NEXUS აერთიანებს ხელოვნურ ინტელექტს, ღრუბლოვან სისწრაფესა და უმაღლესი დონის უსაფრთხოებას ერთ მძლავრ ეკოსისტემაში თქვენი ციფრული წარმატებისთვის.',
    'hero.ctaPrimary': 'დაიწყე უფასოდ',
    'hero.ctaDemo': 'ვიდეო დემო',
    'hero.metricLatency': 'რეაგირების დრო',
    'hero.metricSec': 'დაცული სისტემა',
    'hero.metricUptime': 'Uptime გარანტია',
    'hero.cardAITitle': 'AI Quantum Core',
    'hero.cardTrafficTitle': 'სისტემური დატვირთვა',

    'about.tag': '◈ ვინ ვართ ჩვენ',
    'about.titleP1': 'შექმნილი მომავლის',
    'about.titleHighlight': 'გამოწვევებისთვის',
    'about.subtitle': 'ჩვენ ვაშენებთ უახლესი თაობის ციფრულ ინფრასტრუქტურას, რომელიც აერთიანებს მაღალ წარმადობას, ხელოვნურ ინტელექტსა და ინტუიციურ ინტერფეისს.',
    'about.neuralActive': 'Neural Core: Active v4.2',
    'about.tabMission': 'ჩვენი მისია',
    'about.tabVision': 'ხედვა',
    'about.tabTech': 'ტექნოლოგია',
    'about.missionHead': 'ტექნოლოგიური სრულყოფილების მიღწევა',
    'about.missionText': 'NEXUS-ის მისიაა კომპანიებსა და დეველოპერებს მისცეს უპრეცედენტო ინსტრუმენტები, რათა რთული პროცესები გადაიქცეს მარტივ, ავტომატიზებულ და ეფექტურ გადაწყვეტებად.',
    'about.missionPoint1': 'მაღალი სიჩქარით ოპტიმიზებული არქიტექტურა',
    'about.missionPoint2': 'ინტეგრირებული AI ანალიტიკა და მოდელები',
    'about.missionPoint3': 'მონაცემთა სრული კონფიდენციალობა და უსაფრთხოება',
    'about.visionHead': 'უსაზღვრო შესაძლებლობების ეკოსისტემა',
    'about.visionText': 'ჩვენ ვხედავთ მომავალს, სადაც ნებისმიერი მასშტაბის იდეა ხორციელდება წამებში ხელოვნური ინტელექტისა და ავტონომიური ღრუბლოვანი სერვისების დახმარებით.',
    'about.visionPoint1': 'ავტონომიური სისტემური მონიტორინგი',
    'about.visionPoint2': 'გლობალური ხელმისაწვდომობა 120+ რეგიონში',
    'about.visionPoint3': 'დეველოპერზე მორგებული უნიკალური SDK და API',
    'about.techHead': 'უახლესი თაობის სტეკი',
    'about.techText': 'შექმნილია თანამედროვე სტანდარტებით: უმაღლესი სიჩქარის V8 ოპტიმიზაცია, WebAssembly მოდულები და ნეირონული ქსელების რეალურ დროში დამუშავება.',
    'about.techPoint1': 'ულტრა-დაბალი შეფერხება Edge ქსელებით',
    'about.techPoint2': 'AES-256 და Post-Quantum შიფრაცია',
    'about.techPoint3': 'მყისიერი ჰორიზონტალური მასშტაბირება',

    'stats.uptime': 'უწყვეტი მუშაობა',
    'stats.uptimeSub': 'სერვერების ხელმისაწვდომობა',
    'stats.users': 'აქტიური მომხმარებელი',
    'stats.usersSub': 'მსოფლიოს მასშტაბით',
    'stats.integrations': 'ინტეგრაცია',
    'stats.integrationsSub': 'პოპულარულ სერვისებთან',
    'stats.support': 'მუდმივი მხარდაჭერა',
    'stats.supportSub': 'სწრაფი ექსპერტული პასუხი',

    'features.tag': '⚡ შესაძლებლობები',
    'features.titleP1': 'ყველაფერი რაც გჭირდება',
    'features.titleHighlight': 'ერთ სივრცეში',
    'features.subtitle': 'გამოიკვლიეთ მძლავრი ფუნქციონალი, რომელიც შექმნილია თქვენი პროდუქტიულობის მაქსიმალურად გასაზრდელად.',
    'features.filterAll': 'ყველა',
    'features.filterPerf': 'სისწრაფე',
    'features.filterSec': 'უსაფრთხოება',
    'features.filterAI': 'AI & ღრუბელი',
    'features.codeSnippetTitle': '⚡ მყისიერი დაწყება 1 ბრძანებით',

    'feat1.title': 'ელვისებური სისწრაფე',
    'feat1.desc': 'გლობალური CDN და ოპტიმიზებული მონაცემთა ნაკადები უზრუნველყოფს 50 მილიწამზე ნაკლებ დაყოვნებას მსოფლიოს ნებისმიერ წერტილში.',
    'feat2.title': 'მაღალი უსაფრთხოება',
    'feat2.desc': 'საბანკო დონის AES-256 შიფრაცია, ორფაქტორიანი ავტორიზაცია და DDoS თავდასხმებისგან ავტომატური დაცვა.',
    'feat3.title': 'ჭკვიანი AI ანალიტიკა',
    'feat3.desc': 'ხელოვნური ინტელექტის ნეირონული მოდელები რეალურ დროში აანალიზებენ ტრენდებს და გთავაზობენ პრედიქტიულ გადაწყვეტებს.',
    'feat4.title': 'ღრუბლოვანი სინქრონიზაცია',
    'feat4.desc': 'მონაცემთა მყისიერი სინქრონიზაცია ყველა მოწყობილობას შორის WebSocket-ისა და უწყვეტი ნაკადების დახმარებით.',
    'feat5.title': 'მარტივი API ინტეგრაცია',
    'feat5.desc': 'REST და GraphQL API მხარდაჭერა, მზა SDK-ები JavaScript-ისთვის, Python-ისთვის და Go-სთვის სულ რამდენიმე ხაზში.',
    'feat6.title': 'ავტომატური აუდიტი & ლოგები',
    'feat6.desc': 'ყოველი ქმედების უსაფრთხო ჩაწერა, გაფრთხილებების მყისიერი მიღება და შესაბამისობა ISO & SOC-2 სტანდარტებთან.',

    'connect.tag': '✉ დაგვიკავშირდით',
    'connect.titleP1': 'მზად ხართ',
    'connect.titleHighlight': 'დასაწყებად?',
    'connect.subtitle': 'გაქვთ შეკითხვა ან გსურთ პარტნიორობა? მოგვწერეთ და ჩვენი გუნდი დაგიკავშირდებათ 24 საათში.',
    'connect.infoHead': 'საკონტაქტო ინფორმაცია',
    'connect.infoSub': 'ჩვენ ყოველთვის ღია ვართ ახალი იდეებისა და თანამშრომლობისთვის.',
    'connect.emailLabel': 'ელ-ფოსტა (დააჭირე დასაკოპირებლად)',
    'connect.phoneLabel': 'ტელეფონი',
    'connect.addressLabel': 'ოფისის მისამართი',
    'connect.addressVal': 'რუსთაველის გამზირი 42, თბილისი',
    'connect.followUs': 'შემოგვიერთდით:',

    'form.title': 'გამოგვიგზავნეთ შეტყობინება',
    'form.subtitle': 'შეავსეთ ფორმა და ჩვენი სპეციალისტი გიპასუხებთ მყისიერად.',
    'form.nameLabel': 'სახელი და გვარი *',
    'form.emailLabel': 'ელ-ფოსტის მისამართი *',
    'form.subjectLabel': 'თემატიკა',
    'form.msgLabel': 'შეტყობინება *',
    'form.optGeneral': 'ზოგადი შეკითხვა',
    'form.optEnterprise': 'კორპორატიული გადაწყვეტა',
    'form.optPartner': 'პარტნიორობა & თანამშრომლობა',
    'form.optSupport': 'ტექნიკური დახმარება',
    'form.submitBtn': 'გაგზავნა',
    'form.errName': 'გთხოვთ შეიყვანოთ თქვენი სახელი',
    'form.errEmail': 'გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა',
    'form.errMessage': 'გთხოვთ დაწეროთ შეტყობინება (მინ. 10 სიმბოლო)',

    'footer.tagline': 'ინოვაციური ტექნოლოგიური ეკოსისტემა, რომელიც აერთიანებს მაღალ წარმადობას, AI-ს და საიმედოობას.',
    'footer.allSystemsNominal': 'ყველა სისტემა აქტიურია (100%)',
    'footer.quickLinks': 'ნავიგაცია',
    'footer.products': 'პროდუქტები',
    'footer.legal': 'კონფიდენციალობა',
    'footer.privacyPolicy': 'უსაფრთხოების წესები',
    'footer.terms': 'პირობები',
    'footer.rights': 'ყველა უფლება დაცულია.',
    'footer.backToTop': 'ზემოთ ასვლა',

    'modal.title': 'NEXUS Core • ინტერაქტიული დემონსტრაცია',
    'modal.runningSimulation': 'სისტემის სიმულაცია ჩართულია'
  },
  en: {
    'nav.hero': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.connect': 'Connect',
    'btn.getStarted': 'Get Started',
    'hero.badge': '✨ Next-Gen Platform • v3.0 Release',
    'hero.titleP1': 'Transform Ideas Into',
    'hero.titleHighlight': 'Innovation',
    'hero.titleP2': 'With Future Tech',
    'hero.desc': 'NEXUS combines artificial intelligence, ultra-low latency, and bank-grade security into a unified powerhouse ecosystem for your digital growth.',
    'hero.ctaPrimary': 'Start Free Trial',
    'hero.ctaDemo': 'Video Demo',
    'hero.metricLatency': 'Response Latency',
    'hero.metricSec': 'Protected Stack',
    'hero.metricUptime': 'Uptime Guarantee',
    'hero.cardAITitle': 'AI Quantum Core',
    'hero.cardTrafficTitle': 'System Traffic Load',

    'about.tag': '◈ Who We Are',
    'about.titleP1': 'Engineered for',
    'about.titleHighlight': 'Tomorrow’s Scale',
    'about.subtitle': 'We craft next-generation digital infrastructure combining high performance, autonomous artificial intelligence, and intuitive experiences.',
    'about.neuralActive': 'Neural Core: Active v4.2',
    'about.tabMission': 'Our Mission',
    'about.tabVision': 'Our Vision',
    'about.tabTech': 'Technology',
    'about.missionHead': 'Pursuing Engineering Excellence',
    'about.missionText': 'NEXUS empowers builders and global enterprises with breakthrough tools that turn complex workloads into streamlined, automated workflows.',
    'about.missionPoint1': 'Speed-optimized microservices architecture',
    'about.missionPoint2': 'Integrated AI analytical neural networks',
    'about.missionPoint3': 'End-to-end data privacy & zero-trust security',
    'about.visionHead': 'A Frontier of Infinite Capabilities',
    'about.visionText': 'We envision a future where high-impact ideas scale globally in milliseconds, propelled by autonomous cloud intelligence.',
    'about.visionPoint1': 'Autonomous self-healing infrastructure',
    'about.visionPoint2': 'Global low-latency footprint in 120+ regions',
    'about.visionPoint3': 'Developer-first SDKs and GraphQL endpoints',
    'about.techHead': 'Next-Generation Stack',
    'about.techText': 'Built to modern standards: V8 engine optimizations, WebAssembly modules, and real-time neural computation.',
    'about.techPoint1': 'Sub-millisecond Edge distribution',
    'about.techPoint2': 'AES-256 and Post-Quantum cryptography',
    'about.techPoint3': 'Seamless auto-scaling container mesh',

    'stats.uptime': 'High Availability',
    'stats.uptimeSub': 'Cluster Server Uptime',
    'stats.users': 'Active Users',
    'stats.usersSub': 'Worldwide Community',
    'stats.integrations': 'Integrations',
    'stats.integrationsSub': 'Ready Native Connectors',
    'stats.support': 'Global Support',
    'stats.supportSub': '24/7 Rapid Response',

    'features.tag': '⚡ Capabilities',
    'features.titleP1': 'Everything You Need',
    'features.titleHighlight': 'Under One Roof',
    'features.subtitle': 'Explore powerful modules engineered to amplify developer velocity and elevate user engagement.',
    'features.filterAll': 'All',
    'features.filterPerf': 'Speed',
    'features.filterSec': 'Security',
    'features.filterAI': 'AI & Cloud',
    'features.codeSnippetTitle': '⚡ Quick Start in 1 Command',

    'feat1.title': 'Lightning Speed',
    'feat1.desc': 'Global edge network and optimized data streams guarantee under 50ms latency anywhere across the globe.',
    'feat2.title': 'Advanced Security',
    'feat2.desc': 'Bank-grade AES-256 encryption, multi-factor biometric authentication, and autonomous DDoS mitigation.',
    'feat3.title': 'Smart AI Analytics',
    'feat3.desc': 'Real-time neural engines synthesize data streams, providing actionable foresight and automated optimization.',
    'feat4.title': 'Realtime Cloud Sync',
    'feat4.desc': 'Instant multi-device state synchronization powered by WebSockets and durable event streaming.',
    'feat5.title': 'Seamless API Integrations',
    'feat5.desc': 'Full REST & GraphQL coverage with official SDKs for JavaScript, Python, Go, and Rust.',
    'feat6.title': 'Audit & Compliance Logs',
    'feat6.desc': 'Immutable audit logging, instant anomaly alerts, and turnkey compliance with ISO-27001 & SOC-2.',

    'connect.tag': '✉ Get in Touch',
    'connect.titleP1': 'Ready to',
    'connect.titleHighlight': 'Transform?',
    'connect.subtitle': 'Have a question or looking to build together? Reach out and our engineering team will respond within 24 hours.',
    'connect.infoHead': 'Contact Information',
    'connect.infoSub': 'We are always excited to collaborate on ambitious products.',
    'connect.emailLabel': 'Email (Click to copy)',
    'connect.phoneLabel': 'Direct Phone',
    'connect.addressLabel': 'Headquarters',
    'connect.addressVal': '42 Rustaveli Avenue, Tbilisi',
    'connect.followUs': 'Connect with us:',

    'form.title': 'Send us a Message',
    'form.subtitle': 'Fill out the form and an architect will reach out shortly.',
    'form.nameLabel': 'Full Name *',
    'form.emailLabel': 'Business Email *',
    'form.subjectLabel': 'Inquiry Type',
    'form.msgLabel': 'Project Details *',
    'form.optGeneral': 'General Inquiry',
    'form.optEnterprise': 'Enterprise Plan',
    'form.optPartner': 'Partnership & Ventures',
    'form.optSupport': 'Technical Support',
    'form.submitBtn': 'Send Message',
    'form.errName': 'Please enter your full name',
    'form.errEmail': 'Please enter a valid email address',
    'form.errMessage': 'Please provide message details (min. 10 chars)',

    'footer.tagline': 'A next-generation technology ecosystem unifying high performance, intelligence, and reliability.',
    'footer.allSystemsNominal': 'All Systems Operational (100%)',
    'footer.quickLinks': 'Navigation',
    'footer.products': 'Products',
    'footer.legal': 'Compliance',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',

    'modal.title': 'NEXUS Core • Interactive Simulation',
    'modal.runningSimulation': 'Live system telemetry active'
  }
};

function initLanguageSwitcher() {
  const langToggle = document.getElementById('langToggle');
  const langFlag = document.getElementById('langFlag');
  const langLabel = document.getElementById('langLabel');
  if (!langToggle) return;

  let currentLang = 'ka';

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ka' ? 'en' : 'ka';
    document.documentElement.lang = currentLang;

    if (currentLang === 'ka') {
      langFlag.textContent = '🇬🇪';
      langLabel.textContent = 'KA';
    } else {
      langFlag.textContent = '🇬🇧';
      langLabel.textContent = 'EN';
    }

    applyTranslations(currentLang);
    showToast(currentLang === 'ka' ? 'ენა შეიცვალა: ქართული' : 'Language switched to English');
  });

  function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update placeholders
    const nameInput = document.getElementById('userName');
    const msgInput = document.getElementById('userMessage');
    if (nameInput) {
      nameInput.placeholder = lang === 'ka' ? 'გიორგი ბერიძე' : 'Alex Morgan';
    }
    if (msgInput) {
      msgInput.placeholder = lang === 'ka' ? 'მოგვიყევით თქვენი პროექტის შესახებ...' : 'Tell us about your project or architecture...';
    }
  }
}
