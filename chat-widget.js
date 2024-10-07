// Get the script tag that includes the data attributes
const scriptTag = document.currentScript;

// Access each custom attribute from the data attributes
const primaryColor = scriptTag.dataset.primaryColor || '#1e90ff'; // Default color if none provided
const secondaryColor = scriptTag.dataset.secondaryColor || '#ff4500';
const clientName = scriptTag.dataset.clientName || 'Client';
const identifier = scriptTag.dataset.identifier || 'default123';
const headerText = scriptTag.dataset.headerText || 'Chat with us!';

// Create the chat widget HTML
const widgetHTML = `
  <div id="chat-bubble">
    💬
  </div>
  <div id="chat-form-container" style="display: none;">
    <div id="chat-header">
      ${headerText}
      <button id="close-chat">×</button>
    </div>
    <div id="text-bubble">
      Enter your info below and a representative will be right with you.
    </div>
    <form id="chat-form">
      <input type="text" id="name" name="name" placeholder="Your Name" required>
      <input type="email" id="email" name="email" placeholder="Your Email" required>
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\\+?[1-9]\\d{1,14}$" title="Please enter a valid phone number.">
      <input type="hidden" id="identifier" name="identifier" value="${identifier}">
      <textarea id="message" name="message" placeholder="Your Message" required style="height: 100px;"></textarea>
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

// Apply the primary color to the chat bubble background
document.getElementById('chat-bubble').style.backgroundColor = primaryColor;

// Apply the secondary color to the hover effect
document.getElementById('chat-bubble').addEventListener('mouseover', function() {
  this.style.backgroundColor = secondaryColor;
});
document.getElementById('chat-bubble').addEventListener('mouseout', function() {
  this.style.backgroundColor = primaryColor;
});

// Toggle chat form when the bubble is clicked
document.getElementById('chat-bubble').addEventListener('click', function() {
  const formContainer = document.getElementById('chat-form-container');
  if (formContainer.style.display === 'flex') {
    formContainer.style.display = 'none';
  } else {
    formContainer.style.display = 'flex';
  }
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

  // Collect form data
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
