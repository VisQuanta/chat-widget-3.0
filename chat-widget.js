// Function to initialize the chat widget
function initChatWidget() {
  // Get script element and its data attributes
  const scriptElement = document.currentScript;
  const primaryColor = scriptElement.getAttribute('data-primary-color') || '#bb162b';
  const secondaryColor = scriptElement.getAttribute('data-secondary-color') || '#ff4500';
  const clientName = scriptElement.getAttribute('data-client-name') || 'Our Company';
  const identifier = scriptElement.getAttribute('data-identifier') || 'defaultIdentifier';
  const headerText = scriptElement.getAttribute('data-header-text') || `Chat with ${clientName}`;

  // Create the HTML structure
  const widgetHTML = `
    <div id="chat-bubble">💬</div>
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
      <div id="sms-consent">By submitting, you agree to receive SMS or emails. Rates may apply.</div>
      <div id="powered-by">Powered by <a href="https://supercars.ltd" target="_blank">${clientName}</a></div>
    </div>
  `;

  // Create a style element
  const style = document.createElement('style');
  style.textContent = `
    #chat-bubble, #chat-form-container, #chat-header, #text-bubble, #chat-form input, #chat-form textarea, #chat-form button, #powered-by {
      font-family: 'Helvetica', 'Arial', sans-serif;
    }
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
    #chat-form-container {
      display: none;
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 300px;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      flex-direction: column;
    }
    #chat-header {
      background-color: ${primaryColor};
      color: white;
      padding: 15px;
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
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      cursor: pointer;
    }
    #text-bubble {
      background-color: #f0f0f0;
      padding: 10px;
      margin: 10px;
      border-radius: 0 15px 15px 15px;
      font-size: 13px;
      color: #111;
    }
    #chat-form {
      padding: 10px;
    }
    #chat-form input, #chat-form textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 14px;
      box-sizing: border-box;
    }
    #chat-form button {
      width: 100%;
      padding: 10px;
      background-color: ${primaryColor};
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }
    #sms-consent {
      font-size: 10px;
      text-align: center;
      padding: 5px 10px;
      color: #555;
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
  `;

  // Inject HTML and CSS into the document
  document.body.insertAdjacentHTML('beforeend', widgetHTML);
  document.head.appendChild(style);

  // Get DOM elements
  const chatBubble = document.getElementById('chat-bubble');
  const chatFormContainer = document.getElementById('chat-form-container');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');

  // Toggle chat form visibility
  chatBubble.addEventListener('click', () => {
    chatFormContainer.style.display = chatFormContainer.style.display === 'none' ? 'flex' : 'none';
  });

  // Close chat form
  closeChat.addEventListener('click', () => {
    chatFormContainer.style.display = 'none';
  });

  // Handle form submission
  chatForm.addEventListener('submit', function (e) {
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
      identifier: identifier // Dynamically set identifier
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
        chatForm.style.display = 'none';
        document.getElementById('text-bubble').textContent = 'Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🚗';
        document.getElementById('chat-header').textContent = 'All Done! 🏆';
      })
      .catch((error) => {
        console.error('Error:', error);
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        document.getElementById('text-bubble').textContent = 'There was an error submitting the form. Please try again later.';
      });
  });
}

// Initialize the chat widget when the page loads
window.addEventListener('load', initChatWidget);

