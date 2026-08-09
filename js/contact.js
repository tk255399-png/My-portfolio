/* ==========================================================================
   THARANI K - EMAIL CONTACT MODULE
   Delivers user contact form messages directly to tharanikanniyappan123@gmail.com
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

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields before sending your message.');
        return;
      }

      // Animated button loading state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>SENDING TO GMAIL...</span>';

      const formData = new FormData(contactForm);

      fetch('https://formsubmit.co/ajax/tharanikanniyappan123@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.innerHTML = '<span>✓ MESSAGE DELIVERED!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #ff3300 0%, #ff6600 100%)';
        submitBtn.style.color = '#ffffff';
        submitBtn.style.borderColor = '#ff3300';
        submitBtn.style.boxShadow = '0 0 25px rgba(255, 51, 0, 0.6)';

        if (statusMsg) {
          statusMsg.classList.add('success');
          statusMsg.innerHTML = `✓ Message sent to <strong>tharanikanniyappan123@gmail.com</strong>!<br><small style="color: #cbd5e1; font-size: 0.78rem; font-weight: normal; margin-top: 4px; display: block;">⚡ Check your Gmail Inbox or Spam folder for the 1-click FormSubmit activation email!</small>`;
        }

        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.boxShadow = '';
          if (statusMsg) statusMsg.classList.remove('success');
        }, 8000);
      })
      .catch(error => {
        // Fallback form submit
        contactForm.submit();
      });
    });
  }
});
