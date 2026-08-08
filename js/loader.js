/* ==========================================================================
   PRINCE SINGH - LOADER MODULE
   Handles preloader progress bar, counter, and intro reveal transition
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('loader-progress-bar');
  const counterText = document.getElementById('loader-counter');
  const body = document.body;

  let progress = 0;
  const interval = setInterval(() => {
    // Increment progress dynamically
    progress += Math.floor(Math.random() * 12) + 5;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (progressBar) progressBar.style.width = '100%';
      if (counterText) counterText.textContent = '100%';

      // Smooth delay before triggering intro reveal
      setTimeout(() => {
        body.classList.add('loaded');
        // Trigger initial hero animations after loader disappears
        if (window.initHeroAnimations) {
          window.initHeroAnimations();
        }
      }, 500);
    } else {
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (counterText) counterText.textContent = `${progress}%`;
    }
  }, 60);
});
