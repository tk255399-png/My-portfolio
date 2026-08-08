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
