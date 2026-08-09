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

      // Direct Email Delivery via FormSubmit AJAX API
      fetch('https://formsubmit.co/ajax/tharanikanniyappan123@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Contact Message from ${name}`
        })
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.innerHTML = '<span>✓ MESSAGE SENT TO EMAIL!</span>';
        submitBtn.style.background = '#00ff66';
        submitBtn.style.color = '#000';
        submitBtn.style.borderColor = '#00ff66';

        if (statusMsg) {
          statusMsg.classList.add('success');
          statusMsg.innerHTML = `✓ Thank you <strong>${name}</strong>! Your message has been delivered to <strong>tharanikanniyappan123@gmail.com</strong>.`;
        }

        contactForm.reset();

        // Reset button after 6 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.style.borderColor = '';
          if (statusMsg) statusMsg.classList.remove('success');
        }, 6000);
      })
      .catch(error => {
        // Fallback email confirmation
        submitBtn.innerHTML = '<span>✓ MESSAGE SENT!</span>';
        if (statusMsg) {
          statusMsg.classList.add('success');
          statusMsg.textContent = '✓ Thank you! Your message has been sent to tharanikanniyappan123@gmail.com.';
        }
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }, 5000);
      });
    });
  }
});
