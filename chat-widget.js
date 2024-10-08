// Get the script element and its attributes
const scriptElement = document.currentScript;
const primaryColor = scriptElement.getAttribute('data-primary-color') || '#bb162b';
const secondaryColor = scriptElement.getAttribute('data-secondary-color') || '#d24c60';
const clientName = scriptElement.getAttribute('data-client-name') || 'Company Name';
const identifier = scriptElement.getAttribute('data-identifier') || 'defaultIdentifier';
const headerText = scriptElement.getAttribute('data-header-text') || 'How Can We Help You?';

// Inject the chat widget HTML into the page
const widgetHTML = `
  <div id="chat-bubble">💬</div>
  <div id="chat-form-container">
    <div id="chat-header">${headerText}<button id="close-chat">×</button></div>
    <div id="text-bubble">
      Enter your info below and any information regarding your vehicle choice and a representative will be right with you.
    </div>
    <form id="chat-form">
      <input type="text" id="name" name="name" placeholder="Your Name" required>
      <input type="email" id="email" name="email" placeholder="Your Email" required>
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required>
      <input type="hidden" id="identifier" name="identifier" value="${identifier}">
      <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="height: 100px;"></textarea>
      <button type="submit">Send Message 👉🏼</button>
      <div id="form-footer">
        By submitting, you agree to receive SMS or emails. Rates may apply.
      </div>
    </form>
    <div id="confirmation-bubble" style="display:none;">
      Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️
    </div>
    <div id="powered-by">
      Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">${clientName}</a>
    </div>
  </div>
`;

// Inject the widget into the document
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// Apply dynamic styles for colors
const style = document.createElement('style');
style.textContent = `
  #chat-bubble {
    background-color: ${primaryColor};
  }
  #chat-bubble:hover {
    background-color: ${secondaryColor};
  }
  #chat-header {
    background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});
  }
  #chat-form button {
    background-color: ${primaryColor};
  }
  #chat-form button:hover {
    background-color: ${secondaryColor};
  }
`;
document.head.appendChild(style);

// Attach functionality to the chat widget
const chatBubble = document.getElementById('chat-bubble');
const chatFormContainer = document.getElementById('chat-form-container');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const textBubble = document.getElementById('text-bubble');
const confirmationBubble = document.getElementById('confirmation-bubble');
const chatHeader = document.getElementById('chat-header');

// Toggle chat form when bubble is clicked
chatBubble.addEventListener('click', () => {
  if (chatFormContainer.style.display === 'flex') {
    chatFormContainer.style.display = 'none';
  } else {
    chatFormContainer.style.display = 'flex';
  }
});

// Close chat form when close button is clicked
closeChat.addEventListener('click', () => {
  chatFormContainer.style.display = 'none';
});

// Handle form submission
chatForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const submitButton = chatForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    message: document.getElementById('message').value.trim(),
    identifier: document.getElementById('identifier').value
  };

  fetch('https://api.visquanta.com/webhook/chat-widget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (!response.ok) throw new Error('Server error');
      return response.json();
    })
    .then(() => {
      chatForm.reset();
      chatForm.style.display = 'none';
      textBubble.style.display = 'none';
      confirmationBubble.style.display = 'block';
      chatHeader.textContent = 'All Done! 🏆';
    })
    .catch((error) => {
      console.error('Error:', error);
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      confirmationBubble.style.display = 'block';
      confirmationBubble.textContent = 'There was an error submitting the form. Please try again later.';
    });
});
