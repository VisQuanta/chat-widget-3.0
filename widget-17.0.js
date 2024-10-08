(function () {
  // Ensure the DOM is fully loaded before execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  function initWidget() {
    console.log('Initializing chat widget...');

    // Find the correct script tag by checking for data-primary-color attribute
    const scriptTags = document.getElementsByTagName('script');
    let scriptTag = null;

    // Loop through script tags and find the one with the required data attributes
    for (let i = 0; i < scriptTags.length; i++) {
      if (scriptTags[i].getAttribute('data-primary-color')) {
        scriptTag = scriptTags[i];
        break;
      }
    }

    // If no script tag is found, log an error and stop execution
    if (!scriptTag) {
      console.error('Chat widget script tag not found!');
      return;
    }

    // Extracting data attributes for customization
    const primaryColor = scriptTag.getAttribute('data-primary-color') || '#bb162b';
    const secondaryColor = scriptTag.getAttribute('data-secondary-color') || '#d24c60';
    const clientName = scriptTag.getAttribute('data-client-name') || 'Your Company';
    const identifier = scriptTag.getAttribute('data-identifier') || 'default123';

    // Log values to the console for debugging
    console.log('Primary Color:', primaryColor);
    console.log('Secondary Color:', secondaryColor);
    console.log('Client Name:', clientName);
    console.log('Identifier:', identifier);

    // Creating chat widget HTML structure dynamically
    const chatBubble = document.createElement('div');
    chatBubble.id = 'chat-bubble';
    chatBubble.style.cssText = `
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
    `;
    chatBubble.innerHTML = '💬';

    // Append chat bubble to the body
    document.body.appendChild(chatBubble);
    console.log('Chat bubble added to the DOM');

    const chatFormContainer = document.createElement('div');
    chatFormContainer.id = 'chat-form-container';
    chatFormContainer.style.cssText = `
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
      font-family: 'Helvetica', 'Arial', sans-serif;
    `;
    document.body.appendChild(chatFormContainer);
    console.log('Chat form container added to the DOM');

    // Chat widget content with close button (X)
    chatFormContainer.innerHTML = `
      <div id="chat-header" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor}); color: white; font-size: 16px; padding: 17px 12px; border-radius: 10px 10px 0 0; text-align: center; position: relative;">
        How Can We Help You?
        <button id="close-chat" style="background: none; border: none; color: white; font-size: 20px; font-weight: bold; position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer;">&times;</button>
      </div>
      <div id="text-bubble" style="background-color: #f2f4f7; padding: 15px; margin: 15px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        Enter your info below and any information regarding your vehicle choice, and a representative will be right with you.
      </div>
      <form id="chat-form" style="border: 2px solid; border-image: linear-gradient(to right, ${primaryColor}, ${secondaryColor}) 1; padding: 10px; border-radius: 10px; margin: 15px; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box;">
        <input type="text" id="name" name="name" placeholder="Your Name" required style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif; box-sizing: border-box;">
        <input type="email" id="email" name="email" placeholder="Your Email" required style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif;">
        <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\\+?[1-9]\\d{1,14}$" title="Please enter a valid phone number." style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif;">
        <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif;"></textarea>
        <button type="submit" id="submit-btn" style="width: 100%; padding: 8px; margin: 8px 0; background-color: ${primaryColor}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif; transition: transform 0.3s ease, background-color 0.3s ease;">Send Message 👉🏼</button>
      </form>
      <div id="confirmation-bubble" style="display: none; background-color: #f2f4f7; padding: 15px; margin: 10px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️
      </div>
      <div id="powered-by" style="font-size: 12px; text-align: center; margin-top: auto; padding-bottom: 10px;">
        Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank" style="color: #001D6E;">VisQuanta</a>
      </div>
    `;

    console.log('Form and widget added to DOM');

    // Event Listeners
    chatBubble.addEventListener('mouseenter', () => {
      chatBubble.style.transform = 'scale(1.1)';
      chatBubble.style.backgroundColor = secondaryColor;
    });

    chatBubble.addEventListener('mouseleave', () => {
      chatBubble.style.transform = 'scale(1)';
      chatBubble.style.backgroundColor = primaryColor;
    });

    chatBubble.addEventListener('click', () => {
      chatFormContainer.style.display = chatFormContainer.style.display === 'flex' ? 'none' : 'flex';
      chatFormContainer.style.flexDirection = 'column';
    });

    document.getElementById('close-chat').addEventListener('click', () => {
      chatFormContainer.style.display = 'none';
    });

    // Handle form submission with logging
    document.getElementById('chat-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.style.transform = 'scale(1.1)';
      setTimeout(() => {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.style.transform = 'scale(1)';
      }, 300);

      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim(),
        identifier: identifier // Ensure this value is correctly passed in the webhook
      };

      console.log('Form Data Submitted:', formData);

      // Send the POST request
      fetch('https://api.visquanta.com/webhook/chat-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) {
          console.log(`Server error: ${response.status}`);
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        document.getElementById('chat-form').style.display = 'none';
        document.getElementById('text-bubble').style.display = 'none';
        document.getElementById('confirmation-bubble').style.display = 'block';
        document.getElementById('chat-header').textContent = 'All Done! 🏆';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an issue submitting the form. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message 👉🏼';
      });
    });

    // Hover effect for the send button
    const sendButton = document.getElementById('submit-btn');
    sendButton.addEventListener('mouseenter', () => {
      sendButton.style.transform = 'scale(1.1)';
      sendButton.style.backgroundColor = secondaryColor;
    });
    sendButton.addEventListener('mouseleave', () => {
      sendButton.style.transform = 'scale(1)';
      sendButton.style.backgroundColor = primaryColor;
    });
  }
})();

