(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  function initWidget() {
    const scriptTags = document.getElementsByTagName('script');
    let scriptTag = null;

    for (let i = 0; i < scriptTags.length; i++) {
      if (scriptTags[i].getAttribute('data-primary-color')) {
        scriptTag = scriptTags[i];
        break;
      }
    }

    if (!scriptTag) {
      console.error('Chat widget script tag not found!');
      return;
    }

    const primaryColor = scriptTag.getAttribute('data-primary-color') || '#bb162b';
    const secondaryColor = scriptTag.getAttribute('data-secondary-color') || '#d24c60';
    const clientName = scriptTag.getAttribute('data-client-name') || 'Your Company';
    const identifier = scriptTag.getAttribute('data-identifier') || 'default123';

    // Create the chat bubble
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
    document.body.appendChild(chatBubble);

    // Create the form container
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
        <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="[0-9]{10,15}" title="Please enter a valid phone number (10 to 15 digits)" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif;">
        <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif;"></textarea>
        <button type="submit" id="submit-btn" style="width: 100%; padding: 8px; margin: 8px 0; background-color: ${primaryColor}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-family: 'Helvetica', 'Arial', sans-serif; transition: transform 0.3s ease, background-color 0.3s ease;">Send Message 👉🏼</button>
      </form>
      <div id="form-footer" style="font-size: 12px; text-align: center; padding: 8px; color: #555;">
        By submitting, you agree to receive SMS or emails. Rates may apply.
      </div>
      <div id="confirmation-bubble" style="display: none; background-color: #f2f4f7; padding: 15px; margin: 10px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️
      </div>
      <div id="powered-by" style="font-size: 12px; text-align: center; margin-top: auto; padding-bottom: 10px;">
        Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank" style="color: #001D6E;">VisQuanta</a>
      </div>
    `;

    // Handle chat bubble events
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
        identifier: identifier
      };

      fetch('https://api.visquanta.com/webhook/chat-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('chat-form').style.display = 'none';
        document.getElementById('text-bubble').style.display = 'none';
        document.getElementById('form-footer').style.display = 'none';
        document.getElementById('confirmation-bubble').style.display = 'block';
        document.getElementById('chat-header').textContent = 'All Done! 🏆';
      })
      .catch(error => {
        alert('There was an issue submitting the form. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message 👉🏼';
      });
    });

    const sendButton = document.getElementById('submit-btn');
    sendButton.addEventListener('mouseenter', () => {
      sendButton.style.transform = 'scale(1.1)';
      sendButton.style.backgroundColor = secondaryColor;
    });
    sendButton.addEventListener('mouseleave', () => {
      sendButton.style.transform = 'scale(1)';
      sendButton.style.backgroundColor = primaryColor;
    });

    // Create the text bubble with a 5-second delay
    setTimeout(() => {
      const externalTextBubble = document.createElement('div');
      externalTextBubble.id = 'external-text-bubble';
      externalTextBubble.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        background-color: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        z-index: 999;
        font-size: 14px;
        color: #111828;
      `;
      externalTextBubble.innerHTML = 'Let\'s chat and get your questions answered!';
      
      // Add a close button
      const closeButton = document.createElement('span');
      closeButton.innerHTML = '&times;';
      closeButton.style.cssText = `
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
        color: #111;
      `;
      closeButton.addEventListener('click', () => {
        externalTextBubble.style.display = 'none';
      });

      externalTextBubble.appendChild(closeButton);
      document.body.appendChild(externalTextBubble);

    }, 5000); // 5-second delay
  }
})();