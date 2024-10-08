document.addEventListener("DOMContentLoaded", function () {
  // Getting references to all necessary DOM elements
  const chatBubble = document.getElementById('chat-bubble');
  const chatFormContainer = document.getElementById('chat-form-container');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const textBubble = document.getElementById('text-bubble');
  const confirmationBubble = document.getElementById('confirmation-bubble');
  const chatHeader = document.getElementById('chat-header');

  // Function to toggle the visibility of the chat form
  const toggleChatForm = () => {
    if (chatFormContainer.style.display === 'flex') {
      chatFormContainer.style.display = 'none';
    } else {
      chatFormContainer.style.display = 'flex';
    }
  };

  // Show/hide chat form when the chat bubble is clicked
  chatBubble.addEventListener('click', toggleChatForm);

  // Hide chat form when the close button is clicked
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


