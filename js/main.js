/* ==========================================================================
   PRINCE SINGH - MAIN CORE MODULE
   Real-time clock, Navbar background shift, Mobile drawer menu, Cursor spotlight
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Real-time Digital Clock Indicator
  const clockElement = document.getElementById('digital-clock');
  
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds} IST`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Navbar Background Shift on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.contains('open');
      if (isOpen) {
        mobileOverlay.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;'; // Hamburger icon
      } else {
        mobileOverlay.classList.add('open');
        mobileToggle.innerHTML = '&#10005;'; // Close icon
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 4. Custom 3D Interactive Cyber Cursor (Replacing Browser Mouse Arrow)
  const customCursor = document.getElementById('custom-3d-cursor');
  const spotlight = document.getElementById('cursor-spotlight');

  if (customCursor) {
    window.addEventListener('mousemove', (e) => {
      customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (spotlight) {
        spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    });

    window.addEventListener('mousedown', () => {
      customCursor.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
      customCursor.classList.remove('clicking');
    });
  }

  // 5. Active Nav Link Scroll Highlight & Smart Auto-Hiding/Revealing Navbar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar3d = document.getElementById('navbar');

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Smart Hide on Scroll Down & Reveal on Scroll Up
    if (navbar3d) {
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scroll DOWN -> Hide navbar
        navbar3d.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scroll UP (even a little) -> Reveal navbar!
        navbar3d.classList.remove('nav-hidden');
      }

      if (currentScrollY > 50) {
        navbar3d.classList.add('scrolled');
      } else {
        navbar3d.classList.remove('scrolled');
      }
    }

    lastScrollY = currentScrollY;

    // Highlight Active Nav Link
    let currentSection = '';
    const scrollPos = currentScrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 6. Full-Screen 3D Transition Portal on ALL Navbar Link Clicks
  const portalContainer = document.getElementById('page-3d-portal');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();

      // Instantly reveal navbar if hidden so user sees button animation
      if (navbar3d) navbar3d.classList.remove('nav-hidden');

      // Trigger 3D Button Pulse Animation
      link.classList.remove('nav-3d-flipped');
      void link.offsetWidth;
      link.classList.add('nav-3d-flipped');
      setTimeout(() => link.classList.remove('nav-3d-flipped'), 550);

      // Select specific full-screen 3D portal effect based on target section
      let effectClass = '.portal-warp-home';
      if (targetId === '#about' || targetId === '#skills') effectClass = '.portal-matrix-about';
      else if (targetId === '#showcase' || targetId === '#experience') effectClass = '.portal-cube-projects';
      else if (targetId === '#contact') effectClass = '.portal-radar-contact';

      if (portalContainer) {
        // Reset all full-screen 3D effects
        const allEffects = portalContainer.querySelectorAll('.portal-3d-effect');
        allEffects.forEach(eff => eff.classList.remove('active-effect'));

        const targetEffect = portalContainer.querySelector(effectClass);
        if (targetEffect) targetEffect.classList.add('active-effect');

        // Activate Full-Screen 3D Transition Overlay (100vw x 100vh)
        portalContainer.classList.add('active-portal');

        setTimeout(() => {
          portalContainer.classList.remove('active-portal');
        }, 850);
      }

      // Smooth scroll to target topic right as the full-screen 3D portal animation peaks
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    });
  });

  // 7. Interactive 3D Hero Background Canvas Initialization
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    initHero3D(heroCanvas);
  }

  // 6. Direct Instant Memory-Decoded PDF Download Handler (Zero Tabs / Zero Navigation)
  const downloadBtn = document.getElementById('download-resume-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const b64 = window.THARANI_RESUME_B64;
      const filename = 'Tharani_K_Resume.pdf';

      if (b64) {
        try {
          const byteCharacters = atob(b64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          
          setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
          }, 100);
          return;
        } catch (err) {
          console.error('Base64 download error:', err);
        }
      }

      // Direct fallback
      const pdfUrl = 'assets/docs/Tharani_K_Resume.pdf';
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = pdfUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 100);
    });
  }
});

// Three.js 3D Hero Particle Constellation Grid
function initHero3D(canvas) {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, heroSection.clientWidth / heroSection.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle Grid
  const count = 350;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 8;

    colors[i] = 1.0;
    colors[i + 1] = Math.random() * 0.4;
    colors[i + 2] = 0.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Cursor 3D Tilt Interaction
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  function animate() {
    requestAnimationFrame(animate);

    particleSystem.rotation.y += 0.0015;
    particleSystem.rotation.x += 0.0008;

    camera.position.x += (mouseX - camera.position.x) * 0.04;
    camera.position.y += (-mouseY - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    if (!heroSection) return;
    camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  });
}

// 8. 3D Multi-Theme Switcher Logic with LocalStorage Persistence
(function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeContainer = document.querySelector('.theme-switcher-container');
  const themeOptions = document.querySelectorAll('.theme-option-btn');

  const savedTheme = localStorage.getItem('tharani_portfolio_theme') || 'theme-dark';
  applyTheme(savedTheme);

  if (themeToggleBtn && themeContainer) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeContainer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!themeContainer.contains(e.target)) {
        themeContainer.classList.remove('open');
      }
    });

    themeOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        applyTheme(theme);
        themeContainer.classList.remove('open');
      });
    });
  }

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('tharani_portfolio_theme', themeName);

    themeOptions.forEach(btn => {
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
})();

// 9. Hero Image-Only Mouse Hover Shake & 3D Tilt Logic
(function initHeroImageTilt() {
  const portraitCard = document.getElementById('hero-portrait-card');
  if (!portraitCard) return;

  function resetTilt() {
    portraitCard.classList.remove('mouse-over-active');
    portraitCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  }

  portraitCard.addEventListener('mouseenter', () => {
    portraitCard.classList.add('mouse-over-active');
  });

  portraitCard.addEventListener('mousemove', (e) => {
    const rect = portraitCard.getBoundingClientRect();
    
    // Strict boundary check: If cursor moves outside card bounds, reset immediately
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      resetTilt();
      return;
    }

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles relative ONLY to image boundaries
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    portraitCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale(1.02)`;
  });

  portraitCard.addEventListener('mouseleave', resetTilt);
  document.addEventListener('mouseleave', resetTilt);
})();
