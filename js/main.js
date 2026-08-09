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

  // 4. Custom Mouse Cursor Spotlight Follower
  const spotlight = document.getElementById('cursor-spotlight');
  if (spotlight && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  // 5. Active Nav Link Scroll Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

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

  // 6. Navbar Link Cyber Flash Transition Effect
  const transitionOverlay = document.getElementById('page-transition-overlay');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();

      // Trigger Cyber Laser Flash Transition
      if (transitionOverlay) {
        transitionOverlay.classList.add('active-flash');
        setTimeout(() => {
          transitionOverlay.classList.remove('active-flash');
        }, 650);
      }

      // Smooth Scroll after short transition lead-in
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 150);
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
