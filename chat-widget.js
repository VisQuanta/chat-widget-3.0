document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  const chatBubble = document.getElementById('chat-bubble');
  const chatFormContainer = document.getElementById('chat-form-container');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const textBubble = document.getElementById('text-bubble');
  const confirmationBubble = document.getElementById('confirmation-bubble');
  const chatHeader = document.getElementById('chat-header');

  // Load data attributes from the script tag
  const scriptTag = document.currentScript;
  const primaryColor = scriptTag.getAttribute('data-primary-color') || '#bb162b';
  const secondaryColor = scriptTag.getAttribute('data-secondary-color') || '#d24c60';
  const clientName = scriptTag.getAttribute('data-client-name') || 'Our Team';

  // Apply colors dynamically
  chatBubble.style.backgroundColor = primaryColor;
  chatHeader.style.background = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`;
  chatForm.querySelector('button[type="submit"]').style.backgroundColor = primaryColor;

  // Set client-specific text
  textBubble.textContent = `Enter your info below and any information regarding your vehicle choice and a representative will be right with you.`;
  document.getElementById('powered-by').innerHTML = `Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">${clientName}</a>`;

  // Toggle chat form visibility
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

    // Send the POST request
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
    .then(() => {
      // Reset the form and update UI
      chatForm.reset();
      chatForm.style.display = 'none';
      textBubble.style.display = 'none';
      confirmationBubble.style.display = 'block';
      chatHeader.textContent = "All Done! 🏆";
    })
    .catch((error) => {
      console.error('Error:', error);
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      confirmationBubble.style.display = 'block';
      confirmationBubble.textContent = 'There was an error submitting the form. Please try again later.';
    });
  });
});


