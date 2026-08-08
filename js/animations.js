/* ==========================================================================
   THARANI K - ANIMATIONS MODULE
   Scroll reveal observers, mouse parallax, Float Mode Toggle & Draggable Physics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. IntersectionObserver for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Mouse Parallax Effect on Hero Elements
  const heroSection = document.querySelector('.hero-section');
  const heroPortrait = document.querySelector('.hero-portrait-frame');
  const heroTitle = document.querySelector('.hero-big-title');
  const heroRightCol = document.querySelector('.hero-right-col');

  if (heroSection && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      if (heroPortrait) {
        heroPortrait.style.transform = `translate(${xPos * 0.8}px, ${yPos * 0.8}px)`;
      }
      if (heroTitle) {
        heroTitle.style.transform = `translate(${xPos * -0.3}px, ${yPos * -0.3}px)`;
      }
      if (heroRightCol) {
        heroRightCol.style.transform = `translate(${xPos * 0.4}px, ${yPos * 0.4}px)`;
      }
    });
  }

  // 3. Hanging Lanyard ID Card & Float Mode State Machine
  const lanyardContainer = document.getElementById('lanyard-container');
  const card = document.getElementById('draggable-card');
  const toggleBtn = document.getElementById('toggle-card-btn');
  const toggleText = document.getElementById('toggle-card-text');

  // Initial State: Button says HIDE CARD, float mode is OFF (card locked)
  let isFloatMode = false;
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let prevX = 0;

  if (card && lanyardContainer) {
    // Pointer / Touch Down
    const onStart = (e) => {
      // NOTHING happens if float mode is OFF (when button says HIDE CARD)
      if (!isFloatMode) return;

      isDragging = true;
      card.classList.add('dragging');
      lanyardContainer.style.transition = 'none';

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const cardRect = card.getBoundingClientRect();
      offsetX = clientX - cardRect.left;
      offsetY = clientY - cardRect.top;
      prevX = clientX;
    };

    // Pointer / Touch Move
    const onMove = (e) => {
      if (!isDragging || !isFloatMode) return;
      e.preventDefault();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const parentRect = lanyardContainer.parentElement.getBoundingClientRect();

      // Compute exact 1-to-1 position under mouse cursor
      const x = clientX - parentRect.left - offsetX;
      const y = clientY - parentRect.top - offsetY;

      // Calculate tilt angle based on drag velocity
      const deltaX = clientX - prevX;
      prevX = clientX;
      const tiltAngle = Math.min(Math.max(deltaX * 1.5, -20), 20);

      lanyardContainer.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tiltAngle}deg)`;
    };

    // Pointer / Touch End -> Spring Rebound Back to Home Spot
    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove('dragging');

      // Elastic spring rebound back to original hanging position
      lanyardContainer.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.27)';
      lanyardContainer.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';

      setTimeout(() => {
        if (!isDragging) {
          lanyardContainer.style.transition = '';
        }
      }, 600);
    };

    card.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    card.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  // 4. Button Mode Toggle Handler: HIDE CARD <-> FLOAT CARD
  if (toggleBtn && lanyardContainer) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isFloatMode = !isFloatMode;

      if (isFloatMode) {
        // ENTERS FLOAT CARD MODE: Button text becomes FLOAT CARD, card unlocks interactivity!
        if (toggleText) toggleText.textContent = 'FLOAT CARD';
        toggleBtn.classList.add('active-float');
        lanyardContainer.classList.remove('card-locked');
      } else {
        // RETURNS TO NORMAL MODE: Button text becomes HIDE CARD, card locks!
        if (toggleText) toggleText.textContent = 'HIDE CARD';
        toggleBtn.classList.remove('active-float');
        lanyardContainer.classList.add('card-locked');

        // Spring return to original position when exiting float mode
        lanyardContainer.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.27)';
        lanyardContainer.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
    });
  }
});

// Window helper function called by loader
window.initHeroAnimations = function() {
  const heroElements = document.querySelectorAll('#home .reveal');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('active');
    }, index * 150);
  });
};
