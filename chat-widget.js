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
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    /* Hover effect for chat bubble */
    #chat-bubble:hover {
      background-color: #d24c60; /* Slightly lighter secondary color */
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
      background: linear-gradient(to right, #bb162b, #d24c60);
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
      border-image: linear-gradient(to right, #bb162b, #d24c60);
      border-image-slice: 1;
      padding: 15px;
      border-radius: 8px;
      margin: 15px;
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-y: auto; /* Added to handle overflow */
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
      background-color: #bb162b;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-family: 'Helvetica', 'Arial', sans-serif;
    }

    /* Send button hover effect */
    #chat-form button:hover {
      background-color: #d24c60;
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

    /* Form footer */
    #form-footer {
      font-size: 10px;
      text-align: center;
      padding: 8px;
      color: #555;
    }

    /* Powered by VisQuanta footer */
    #powered-by {
      font-size: 10px;
      text-align: center;
      margin: 10px 0;
      margin-top: auto; /* Added to push the footer to the bottom */
      flex-shrink: 0;   /* Prevents the footer from shrinking */
    }

    #powered-by a {
      color: #001D6E;
      text-decoration: none;
    }

    #powered-by a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

<!-- Chat bubble button -->
<div id="chat-bubble">
  💬
</div>

<!-- Chat form container -->
<div id="chat-form-container">
  <div id="chat-header">
    How Can We Help You?
    <button id="close-chat">×</button>
  </div>
  
  <!-- Text bubble below the header -->
  <div id="text-bubble">
    Enter your info below and any information regarding your vehicle choice and a representative will be right with you.
  </div>
  
  <!-- Form centered within the container and with a gradient border -->
  <form id="chat-form">
    <input type="text" id="name" name="name" placeholder="Your Name" required>
    <input type="email" id="email" name="email" placeholder="Your Email" required>
    <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\+?[1-9]\d{1,14}$" title="Please enter a valid phone number.">
    
    <!-- Hidden identifier field -->
    <input type="hidden" id="identifier" name="identifier" value="999999999999999999999999">
    
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

  <!-- Powered by VisQuanta footer -->
  <div id="powered-by">
    Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank">VisQuanta</a>
  </div>
</div>

<script>
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

    // Send the POST request without authorization
    fetch('https://api.visquanta.com/webhook/chat-widget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // No Authorization header
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json();
    })
    .then(data => {
      // Reset the form
      chatForm.reset();
      // Hide form and text bubble
      chatForm.style.display = 'none';
      textBubble.style.display = 'none';
      // Show the confirmation bubble
      confirmationBubble.style.display = 'block';
      // Change the header text
      chatHeader.textContent = "All Done! 🏆";
    })
    .catch((error) => {
      console.error('Error:', error);
      // Re-enable the submit button and reset its text
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      // Display error message within the widget
      confirmationBubble.style.display = 'block';
      confirmationBubble.textContent = 'There was an error submitting the form. Please try again later.';
    });
  });
</script>

</body>
</html>


