// Injecting the chat widget HTML and CSS into the page
const widgetHTML = `
  <style>
    /* Styles from your original HTML */
    body, input, textarea, button { font-family: 'Helvetica', 'Arial', sans-serif; }
    #chat-bubble { position: fixed; bottom: 20px; right: 20px; background-color: #bb162b; color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 30px; font-weight: bold; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); z-index: 1000; transition: transform 0.3s ease, background-color 0.3s ease; }
    #chat-bubble:hover { background-color: #d24c60; transform: scale(1.1); }
    #chat-form-container { display: none; position: fixed; bottom: 100px; right: 20px; width: 300px; height: 600px; background-color: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); z-index: 1000; flex-direction: column; overflow: hidden; }
    #chat-header { background: linear-gradient(to right, #bb162b, #d24c60); color: white; font-size: 16px; padding: 17px 12px; border-radius: 10px 10px 0 0; text-align: center; position: relative; }
    #close-chat { background: none; border: none; color: white; font-size: 20px; font-weight: bold; position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer; }
    #text-bubble { background-color: #f2f4f7; padding: 15px; margin: 15px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    #chat-form { border: 2px solid; border-image: linear-gradient(to right, #bb162b, #d24c60); border-image-slice: 1; padding: 15px; border-radius: 8px; margin: 15px; text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; }
    #chat-form input, #chat-form textarea { width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 12px; box-sizing: border-box; font-family: 'Helvetica', 'Arial', sans-serif; }
    #chat-form button { width: 100%; padding: 8px; margin: 8px 0; background-color: #bb162b; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif; }
    #chat-form button:hover { background-color: #d24c60; }
    #confirmation-bubble { background-color: #f2f4f7; padding: 15px; margin: 10px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); display: none; }
    #powered-by { font-size: 10px; text-align: center; margin: 10px 0; margin-top: auto; flex-shrink: 0; }
    #powered-by a { color: #001D6E; text-decoration: none; }
    #powered-by a:hover { text-decoration: underline; }
  </style>

  <!-- Chat bubble button -->
  <div id="chat-bubble">💬</div>

  <!-- Chat form container -->
  <div id="chat-form-container">
    <div id="chat-header">How Can We Help You? <button id="close-chat">×</button></div>
    <div id="text-bubble">Enter your info below and any information regarding your vehicle choice and a representative will be right with you.</div>
    <form id="chat-form">
      <input type="text" id="name" name="name" placeholder="Your Name" required>
      <input type="email" id="email" name="email" placeholder="Your Email" required>
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required>
      <input type="hidden" id="identifier" name="identifier" value="999999999999999999999999">
      <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required></textarea>
      <button type="submit">Send Message 👉🏼</button>
      <div id="form-footer">By submitting, you agree to receive SMS or emails. Rates may apply.</div>
    </form>
    <div id="confirmation-bubble">Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️</div>
    <div id="powered-by">Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">VisQuanta</a></div>
  </div>
`;

// Injecting the widget HTML into the document
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// Script to handle chat form toggle and form submission
const chatBubble = document.getElementById('chat-bubble');
const chatFormContainer = document.getElementById('chat-form-container');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const textBubble = document.getElementById('text-bubble');
const confirmationBubble = document.getElementById('confirmation-bubble');
const chatHeader = document.getElementById('chat-header');

// Toggle chat form visibility
chatBubble.addEventListener('click', () => {
  chatFormContainer.style.display = chatFormContainer.style.display === 'flex' ? 'none' : 'flex';
});

// Close chat form
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
    headers: { 'Content-Type': 'application/json' },
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

