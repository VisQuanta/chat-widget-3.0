<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Widget</title>
  
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
      background-color: #bb162b; /* Primary color */
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

    /* Chat form container */
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

    /* Header style */
    #chat-header {
      background-color: #bb162b;
      color: white;
      padding: 15px;
      text-align: center;
      position: relative;
      font-size: 16px;
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

    /* Text bubble */
    #text-bubble {
      padding: 10px;
      font-size: 13px;
      color: #111;
      text-align: center;
      margin-bottom: 10px;
    }

    /* Form style */
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
      background-color: #bb162b;
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
      color: #bb162b;
      text-decoration: none;
    }

    #success-message {
      display: none;
      padding: 20px;
      text-align: center;
      color: #333;
    }

    #success-message h2 {
      color: #bb162b;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

<!-- Chat bubble -->
<div id="chat-bubble">💬</div>

<!-- Chat form -->
<div id="chat-form-container">
  <div id="chat-header">
    Chat with SuperCars Ltd
    <button id="close-chat">×</button>
  </div>
  <div id="text-bubble">
    Chat with SuperCars Ltd, a representative will be with you shortly.
  </div>
  <form id="chat-form">
    <input type="text" id="name" name="name" placeholder="Your Name" required>
    <input type="email" id="email" name="email" placeholder="Your Email" required>
    <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required>
    <textarea id="message" name="message" placeholder="Your Message" required></textarea>
    <button type="submit">Send Message</button>
  </form>
  <div id="sms-consent">By submitting, you agree to receive SMS or emails. Rates may apply.</div>
  <div id="powered-by">Powered by <a href="https://supercars.ltd" target="_blank">SuperCars Ltd</a></div>
  <div id="success-message">
    <h2>All Done! 🎉</h2>
    <p>Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🚗</p>
  </div>
</div>

<script>
  const chatBubble = document.getElementById('chat-bubble');
  const chatFormContainer = document.getElementById('chat-form-container');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const successMessage = document.getElementById('success-message');

  chatBubble.addEventListener('click', () => {
    chatFormContainer.style.display = chatFormContainer.style.display === 'none' ? 'flex' : 'none';
  });

  closeChat.addEventListener('click', () => {
    chatFormContainer.style.display = 'none';
  });

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitButton = this.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value,
      identifier: 'supercar123'
    };

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
        document.getElementById('text-bubble').style.display = 'none';
        document.getElementById('sms-consent').style.display = 'none';
        successMessage.style.display = 'block';
        document.getElementById('chat-header').textContent = 'All Done! 🏆';
      })
      .catch((error) => {
        console.error('Error:', error);
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
  });
</script>

</body>
</html>
