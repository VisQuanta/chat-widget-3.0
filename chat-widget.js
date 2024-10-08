const scriptTag = document.currentScript;
const primaryColor = scriptTag.dataset.primaryColor || '#bb162b';
const secondaryColor = scriptTag.dataset.secondaryColor || '#ff4500';
const clientName = scriptTag.dataset.clientName || 'Client';

const widgetHTML = `
  <style>
    #chat-bubble { position: fixed; bottom: 20px; right: 20px; background-color: ${primaryColor}; color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 30px; font-weight: bold; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); z-index: 1000; }
    #chat-bubble:hover { background-color: ${secondaryColor}; transform: scale(1.1); }
    #chat-form-container { display: none; position: fixed; bottom: 100px; right: 20px; width: 350px; background-color: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); z-index: 1000; }
    #chat-header { background-color: ${primaryColor}; color: white; padding: 15px; border-radius: 10px 10px 0 0; text-align: center; position: relative; font-size: 16px; }
    #close-chat { background: none; border: none; color: white; font-size: 20px; font-weight: bold; position: absolute; top: 10px; right: 10px; cursor: pointer; }
    #chat-form { padding: 15px; }
    #chat-form input, #chat-form textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px; }
    #chat-form button { width: 100%; padding: 10px; background-color: ${primaryColor}; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
    #chat-form button:hover { background-color: ${secondaryColor}; }
    #powered-by { font-size: 10px; text-align: center; padding: 8px; color: #555; }
    #powered-by a { color: ${primaryColor}; text-decoration: none; }
    #powered-by a:hover { text-decoration: underline; }
  </style>

  <!-- Chat bubble -->
  <div id="chat-bubble">💬</div>

  <!-- Chat form -->
  <div id="chat-form-container">
    <div id="chat-header">
      Chat with ${clientName}
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

document.body.insertAdjacentHTML('beforeend', widgetHTML);

// Toggle chat form visibility
document.getElementById('chat-bubble').addEventListener('click', function () {
  const formContainer = document.getElementById('chat-form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Close chat form
document.getElementById('close-chat').addEventListener('click', function () {
  document.getElementById('chat-form-container').style.display = 'none';
});
