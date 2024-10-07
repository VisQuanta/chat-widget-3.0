// Access the script's custom attributes
const scriptTag = document.currentScript;

const primaryColor = scriptTag.dataset.primaryColor || '#bb162b';
const secondaryColor = scriptTag.dataset.secondaryColor || '#d24c60';
const clientName = scriptTag.dataset.clientName || 'Client';
const identifier = scriptTag.dataset.identifier || '999999999999999999999999';
const headerText = scriptTag.dataset.headerText || 'How Can We Help You?';

// Inject the chat widget HTML and CSS into the page
const widgetHTML = `
  <style>
    /* General font style */
    body, input, textarea, button {
      font-family: 'Helvetica', 'Arial', sans-serif;
    }

    /* Chat bubble style */
    #chat-bubble {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: ${primaryColor}; /* Primary color */
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

    /* Hover effect for chat bubble */
    #chat-bubble:hover {
      background-color: ${secondaryColor}; /* Secondary color */
      transform: scale(1.1);
    }

    /* Chat form container */
    #chat-form-container {
      display: none;
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 300px;
      height: 600px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      flex-direction: column;
      overflow: hidden;
    }

    /* Header with gradient style */
    #chat-header {
      background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});
      color: white;
      font-size: 16px;
      padding: 17px 12px;
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

    /* Speech bubble below the header */
    #text-bubble {
      background-color: #f2f4f7;
      padding: 15px;
      margin: 15px 20px;
      border-radius: 0 2rem 2rem 2rem;
      font-size: 14px;
      color: #111828;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Form with gradient border */
    #chat-form {
      border: 2px solid;
      border-image: linear-gradient(to right, ${primaryColor}, ${secondaryColor});
      border-image-slice: 1;
      padding: 15px;
      border-radius: 8px;
      margin: 15px;
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-y: auto;
    }

    /* Input fields */
    #chat-form input, #chat-form textarea {
      width: 100%;
      padding: 8px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 12px;
      box-sizing: border-box;
      font-family: 'Helvetica', 'Arial', sans-serif;
    }

    /* Send button */
    #chat-form button {
      width: 100%;
      padding: 8px;
      margin: 8px 0;
      background-color: ${primaryColor};
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-family: 'Helvetica', 'Arial', sans-serif;
    }

    /* Send button hover effect */
    #chat-form button:hover {
      background-color: ${secondaryColor};
    }

    /* Confirmation message bubble */
    #confirmation-bubble {
      background-color: #f2f4f7;
      padding: 15px;
      margin: 10px 20px;
      border-radius: 0 2rem 2rem 2rem;
      font-size: 14px;
      color: #111828;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: none;
    }

    /* Powered by footer */
    #powered-by {
      font-size: 10px;
      text-align: center;
      margin: 10px 0;
      flex-shrink: 0;
    }

    #powered-by a {
      color: ${primaryColor};
      text-decoration: none;
    }

    #powered-by a:hover {
      text-decoration: underline;
    }
  </style>

  <!-- Chat bubble button -->
  <div id="chat-bubble">
    💬
  </div>

  <!-- Chat form container -->
  <div id="chat-form-container">
    <div id="chat-header">
      ${headerText}
      <button id="close-chat">×</button>
    </div>
  
    <!-- Text bubble below the header -->
    <div id="text-bubble">
      Chat with ${clientName}. Enter your info below and any information regarding your vehicle choice, and a representative will be right with you.
    </div>
  
    <!-- Form centered within the container and with a gradient border -->
    <form id="chat-form">
      <input type="text" id="name" name="name" placeholder="Your Name" required>
      <input type="email" id="email" name="email" placeholder="Your Email" required>
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\+?[1-9]\d{1,14}$" title="Please enter a valid phone number.">
    
      <!-- Hidden identifier field -->
      <input type="hidden" id="identifier" name="identifier" value="${identifier}">
    
      <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="height: 100px;"></textarea>
      <button type="submit">Send Message 👉🏼</button>
      <div id="form-footer">
        By submitting, you agree to receive SMS or emails. Rates may apply.
      </div>
    </form>

    <!-- Confirmation message bubble -->
    <div id="confirmation-bubble">
      Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️
    </div>

    <!-- Powered by footer -->
    <div id="powered-by">
      Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">${clientName}</a>
    </div>
  </div>
`;

// Inject the widget HTML into the body of the page
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// Toggle chat form visibility
document.getElementById('chat-bubble').addEventListener('click', () => {
  const formContainer = document.getElementById('chat-form-container');
  formContainer.style.display = formContainer.style.display === 'flex' ? 'none' : 'flex';
});

// Close chat form when close button is clicked
document.getElementById('close-chat').addEventListener('click', () => {
  document.getElementById('chat-form-container').style.display = 'none';
});

// Handle form submission
document.getElementById('chat-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Disable the submit button and show loading text
  const submitButton = this.querySelector('button[type="submit"]');
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

  // Send the POST request without authorization
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
    // Reset the form
    document.getElementById('chat-form').reset();
    // Hide form and text bubble
    document.getElementById('chat-form').style.display = 'none';
    document.getElementById('text-bubble').style.display = 'none';
    // Show the confirmation bubble
    document.getElementById('confirmation-bubble').style.display = 'block';
    // Change the header text
    document.getElementById('chat-header').textContent = "All Done! 🏆";
  })
  .catch((error) => {
    console.error('Error:', error);
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message 👉🏼';
    document.getElementById('confirmation-bubble').textContent = 'There was an error submitting the form. Please try again later.';
  });
});

