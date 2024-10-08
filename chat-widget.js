document.addEventListener("DOMContentLoaded", function () {
  const chatBubble = document.getElementById('chat-bubble');
  const chatFormContainer = document.getElementById('chat-form-container');
  const closeChat = document.createElement('button');
  const chatForm = document.createElement('form');
  const textBubble = document.createElement('div');
  const confirmationBubble = document.createElement('div');
  const chatHeader = document.createElement('div');

  // Create Header
  chatHeader.id = 'chat-header';
  chatHeader.textContent = 'How Can We Help You?';
  closeChat.id = 'close-chat';
  closeChat.innerHTML = '&times;';
  closeChat.style.background = 'none';
  closeChat.style.border = 'none';
  closeChat.style.color = 'white';
  closeChat.style.fontSize = '20px';
  closeChat.style.position = 'absolute';
  closeChat.style.top = '10px';
  closeChat.style.right = '10px';
  closeChat.style.cursor = 'pointer';
  chatHeader.appendChild(closeChat);
  chatFormContainer.appendChild(chatHeader);

  // Create Initial Text Bubble
  textBubble.id = 'text-bubble';
  textBubble.textContent = 'Enter your info below and any information regarding your vehicle choice, and a representative will be right with you.';
  chatFormContainer.appendChild(textBubble);

  // Create Form Elements
  chatForm.id = 'chat-form';
  chatForm.innerHTML = `
    <input type="text" id="name" name="name" placeholder="Your Name" required>
    <input type="email" id="email" name="email" placeholder="Your Email" required>
    <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\\+?[1-9]\\d{1,14}$" title="Please enter a valid phone number.">
    <input type="hidden" id="identifier" name="identifier" value="999999999999999999999999">
    <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="height: 100px;"></textarea>
    <button type="submit">Send Message 👉🏼</button>
    <div id="form-footer">By submitting, you agree to receive SMS or emails. Rates may apply.</div>
  `;
  chatFormContainer.appendChild(chatForm);

  // Create Confirmation Bubble
  confirmationBubble.id = 'confirmation-bubble';
  confirmationBubble.textContent = 'Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️';
  confirmationBubble.style.display = 'none';
  chatFormContainer.appendChild(confirmationBubble);

  // Powered By Footer
  const poweredBy = document.createElement('div');
  poweredBy.id = 'powered-by';
  poweredBy.innerHTML = 'Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">VisQuanta</a>';
  chatFormContainer.appendChild(poweredBy);

  // Style Elements
  chatFormContainer.style.display = 'none';
  chatFormContainer.style.position = 'fixed';
  chatFormContainer.style.bottom = '100px';
  chatFormContainer.style.right = '20px';
  chatFormContainer.style.width = '300px';
  chatFormContainer.style.height = '600px';
  chatFormContainer.style.backgroundColor = 'white';
  chatFormContainer.style.borderRadius = '10px';
  chatFormContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  chatFormContainer.style.zIndex = '1000';

  // Toggle chat form when bubble is clicked
  chatBubble.addEventListener('click', () => {
    chatFormContainer.style.display = chatFormContainer.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close chat form when close button is clicked
  closeChat.addEventListener('click', () => {
    chatFormContainer.style.display = 'none';
  });

  // Handle form submission
  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Disable the submit button and show loading text
    const submitButton = chatForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim(),
      identifier: document.getElementById('identifier').value
    };

    // Send the POST request to n8n webhook
    fetch('https://api.visquanta.com/webhook/chat-widget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json();
    })
    .then(data => {
      // Reset the form
      chatForm.reset();
      // Hide form and text bubble
      chatForm.style.display = 'none';
      textBubble.style.display = 'none';
      // Show the confirmation bubble
      confirmationBubble.style.display = 'block';
      // Change the header text
      chatHeader.textContent = "All Done! 🏆";
    })
    .catch((error) => {
      console.error('Error:', error);
      // Re-enable the submit button and reset its text
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      // Display error message within the widget
      confirmationBubble.style.display = 'block';
      confirmationBubble.textContent = 'There was an error submitting the form. Please try again later.';
    });
  });
});
