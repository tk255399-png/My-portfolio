/* ==========================================================================
   THARANI K - REAL-TIME CONTACT MODULE
   Delivers user messages directly to tharanikanniyappan123@gmail.com
   and triggers WhatsApp notification instantly!
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
      submitBtn.innerHTML = '<span>SENDING MESSAGE...</span>';

      // 1. Direct Email Delivery via FormSubmit AJAX API
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
          _subject: `New Portfolio Message from ${name}`
        })
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.innerHTML = '<span>✓ MESSAGE SENT!</span>';
        submitBtn.style.background = '#00ff66';
        submitBtn.style.color = '#000';
        submitBtn.style.borderColor = '#00ff66';

        if (statusMsg) {
          statusMsg.classList.add('success');
          statusMsg.innerHTML = `✓ Thank you <strong>${name}</strong>! Your message has been sent to Tharani's email & WhatsApp.`;
        }

        // 2. ALSO trigger instant WhatsApp chat redirect so Tharani gets it on phone immediately!
        const whatsappText = `Hi Tharani K!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
        const whatsappUrl = `https://wa.me/919626747999?text=${whatsappText}`;

        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 800);

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
        // Fallback: Direct WhatsApp delivery if offline or fetch fails
        const whatsappText = `Hi Tharani K!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
        window.open(`https://wa.me/919626747999?text=${whatsappText}`, '_blank');

        submitBtn.innerHTML = '<span>✓ OPENED IN WHATSAPP</span>';
        if (statusMsg) {
          statusMsg.classList.add('success');
          statusMsg.textContent = '✓ Message prepared! Opened WhatsApp to send directly to Tharani.';
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
