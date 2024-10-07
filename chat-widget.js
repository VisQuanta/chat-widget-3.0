// Access the script's custom attributes
const scriptTag = document.currentScript;

const primaryColor = scriptTag.dataset.primaryColor || '#bb162b';
const secondaryColor = scriptTag.dataset.secondaryColor || '#ff4500';
const clientName = scriptTag.dataset.clientName || 'Client';
const identifier = scriptTag.dataset.identifier || 'default123';
const headerText = scriptTag.dataset.headerText || 'How Can We Help You?';

// Inject the chat widget HTML and CSS into the page
const widgetHTML = `
  <style>
    /* Apply Helvetica to specific elements */
    #chat-bubble, #chat-form-container, #chat-header, #text-bubble, #chat-form input, #chat-form textarea, #chat-form button, #powered-by {
      font-family: 'Helvetica', 'Arial', sans-serif;
    }

    /* Chat Bubble */
    #chat-bubble {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: ${primaryColor};
      color: white;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 30px;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      z-index: 1000;
    }

    /* Hover Effect */
    #chat-bubble:hover {
      background-color: ${secondaryColor};
      transform: scale(1.1);
    }

    /* Chat Form */
    #chat-form-container {
      display: none;
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 300px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      flex-direction: column;
    }

    #chat-header {
      background-color: ${primaryColor};
      color: white;
      padding: 15px;
      border-radius: 10px 10px 0 0;
      text-align: center;
      position: relative;
      font-size: 16px;
    }

    #close-chat {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      font-weight: bold;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    #text-bubble {
      padding: 10px;
      font-size: 13px;
      color: #111;
      text-align: center;
      margin-bottom: 10px;
    }

    #chat-form {
      padding: 10px;
    }

    #chat-form input, #chat-form textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
    }

    #chat-form button {
      width: 100%;
      padding: 10px;
      background-color: ${primaryColor};
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }

    #chat-form button:hover {
      background-color: ${secondaryColor};
    }

    #powered-by {
      font-size: 10px;
      text-align: center;
      padding: 10px;
      color: #555;
    }

    #powered-by a {
      color: ${primaryColor};
      text-decoration: none;
    }

    #powered-by a:hover {
      text-decoration: underline;
    }
  </style>

  <!-- Chat bubble -->
  <div id="chat-bubble">💬</div>

  <!-- Chat form -->
  <div id="chat-form-container">
    <div id="chat-header">
      ${headerText}
      <button id="close-chat">×</button>
    </div>
    <div id="text-bubble">
      Chat with ${clientName}, a representative will be with you shortly.
    </div>
    <form id="chat-form">
      <input type="text" id="name" name="name" placeholder="Your Name" required>
      <input type="email" id="email" name="email" placeholder="Your Email" required>
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required>
      <textarea id="message" name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
    <div id="powered-by">Powered by <a href="https://visquanta.com" target="_blank">${clientName}</a></div>
  </div>
`;

// Inject the widget HTML into the body of the page
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// Toggle chat form visibility
document.getElementById('chat-bubble').addEventListener('click', function () {
  const formContainer = document.getElementById('chat-form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'flex' : 'none';
});

// Close chat form
document.getElementById('close-chat').addEventListener('click', function () {
  document.getElementById('chat-form-container').style.display = 'none';
});

// Handle form submission
document.getElementById('chat-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const submitButton = this.querySelector('button');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  // Collect form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
    identifier: identifier
  };

  // Send the POST request
  fetch('https://api.visquanta.com/webhook/chat-widget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Server error');
      return response.json();
    })
    .then(() => {
      submitButton.textContent = 'Message Sent!';
    })
    .catch((error) => {
      console.error('Error:', error);
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
});
