// Get the script tag that includes the data attributes
const scriptTag = document.currentScript;

// Access each custom attribute from the data attributes
const primaryColor = scriptTag.dataset.primaryColor || '#bb162b'; // Default color if none provided
const secondaryColor = scriptTag.dataset.secondaryColor || '#ff4500';
const clientName = scriptTag.dataset.clientName || 'Client';
const identifier = scriptTag.dataset.identifier || 'default123';
const headerText = scriptTag.dataset.headerText || 'How Can We Help You?';

// Create the chat widget HTML
const widgetHTML = `
  <style>
    /* Widget container */
    #chat-form-container {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 320px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      display: none;
      z-index: 1000;
      flex-direction: column;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    /* Chat bubble */
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
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    #chat-bubble:hover {
      background-color: ${secondaryColor};
      transform: scale(1.1);
    }

    /* Header with gradient style */
    #chat-header {
      background: ${primaryColor};
      color: white;
      font-size: 16px;
      padding: 15px 12px;
      border-radius: 10px 10px 0 0;
      text-align: center;
      position: relative;
    }

    /* Close button */
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

    /* Speech bubble */
    #text-bubble {
      background-color: #f2f4f7;
      padding: 15px;
      margin: 15px;
      border-radius: 15px;
      font-size: 14px;
      color: #111828;
      text-align: center;
    }

    /* Chat form */
    #chat-form {
      padding: 15px;
      text-align: center;
    }

    #chat-form input, #chat-form textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }

    #chat-form button {
      width: 100%;
      padding: 10px;
      background-color: ${primaryColor};
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    #chat-form button:hover {
      background-color: ${secondaryColor};
    }

    #powered-by {
      font-size: 10px;
      text-align: center;
      padding: 8px;
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

  <div id="chat-bubble">
    💬
  </div>
  <div id="chat-form-container">
    <div id="chat-header">
      ${headerText}
      <button id="close-chat">×</button>
    </div>
    <div id="text-bubble">
      Enter your info below and any information regarding your vehicle choice and a representative will be right with you.
    </div>
    <form id="chat-form">
      <input type="text" id="name" name="name" placeholder="Your Name" required>
      <input type="email" id="email" name="email" placeholder="Your Email" required>
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\\+?[1-9]\\d{1,14}$" title="Please enter a valid phone number.">
      <input type="hidden" id="identifier" name="identifier" value="${identifier}">
      <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="height: 100px;"></textarea>
      <button type="submit">Send Message 👉🏼</button>
      <div id="form-footer">
        By submitting, you agree to receive SMS or emails. Rates may apply.
      </div>
    </form>
    <div id="confirmation-bubble" style="display: none;">
      Thanks for your enquiry. A representative will be in touch soon. 🏎️
    </div>
    <div id="powered-by">
      Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">${clientName}</a>
    </div>
  </div>
`;

// Inject the widget HTML into the body of the page
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// Toggle chat form when the bubble is clicked
document.getElementById('chat-bubble').addEventListener('click', function() {
  const formContainer = document.getElementById('chat-form-container');
  formContainer.style.display = formContainer.style.display === 'flex' ? 'none' : 'flex';
  formContainer.style.flexDirection = 'column';  // Ensures column layout when form opens
});

// Close chat form when the close button is clicked
document.getElementById('close-chat').addEventListener('click', function() {
  document.getElementById('chat-form-container').style.display = 'none';
});

// Handle form submission
document.getElementById('chat-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    message: document.getElementById('message').value.trim(),
    identifier: document.getElementById('identifier').value
  };

  // Send the POST request (example URL)
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
    document.getElementById('chat-form').style.display = 'none';
    document.getElementById('text-bubble').style.display = 'none';
    document.getElementById('confirmation-bubble').style.display = 'block';
    document.getElementById('chat-header').textContent = "All Done! 🏆";
  })
  .catch(() => {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message 👉🏼';
    document.getElementById('confirmation-bubble').style.display = 'block';
    document.getElementById('confirmation-bubble').textContent = 'There was an error submitting the form. Please try again later.';
  });
});
