/* ==========================================================================
   PRINCE SINGH - CONTACT MODULE
   Contact form validation, submission simulation, success feedback message
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please complete all form fields before sending your message.');
        return;
      }

      // Animated button loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'SENDING MESSAGE...';

      setTimeout(() => {
        submitBtn.innerHTML = '✓ MESSAGE SENT';
        submitBtn.style.background = '#00ff66';
        submitBtn.style.color = '#000';
        submitBtn.style.borderColor = '#00ff66';

        if (statusMsg) {
          statusMsg.classList.add('success');
          statusMsg.textContent = '✓ Thank you! Your message has been received. I will get back to you shortly.';
        }

        contactForm.reset();

        // Reset button after 4 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.style.borderColor = '';
          if (statusMsg) statusMsg.classList.remove('success');
        }, 5000);
      }, 1200);
    });
  }
});
