document.addEventListener("DOMContentLoaded", function () {
  const chatBubble = document.getElementById('chat-bubble');
  const chatFormContainer = document.getElementById('chat-form-container');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const textBubble = document.getElementById('text-bubble');
  const confirmationBubble = document.getElementById('confirmation-bubble');
  const chatHeader = document.getElementById('chat-header');

  // Show chat form when bubble is clicked
  chatBubble.addEventListener('click', () => {
    chatFormContainer.style.display = 'flex';
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


