(function () {
  // Get the script tag where this is loaded
  const scriptTag = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // Extracting data attributes for customization
  const primaryColor = scriptTag.getAttribute('data-primary-color') || '#bb162b';
  const secondaryColor = scriptTag.getAttribute('data-secondary-color') || '#d24c60';
  const clientName = scriptTag.getAttribute('data-client-name') || 'Your Company';
  const identifier = scriptTag.getAttribute('data-identifier') || 'default123';

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
  document.body.appendChild(chatBubble);

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

  // Chat widget content with added chevron for closing
  chatFormContainer.innerHTML = `
    <div id="chat-header" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor}); color: white; font-size: 16px; padding: 17px 12px; border-radius: 10px 10px 0 0; text-align: center;">
      How Can We Help You?
      <button id="close-chat" style="background: none; border: none; color: white; font-size: 20px; font-weight: bold; position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer;">&times;</button>
      <button id="chevron-close" style="background: none; border: none; color: white; font-size: 20px; font-weight: bold; position: absolute; top: 50%; left: 15px; transform: translateY(-50%); cursor: pointer;">&#x25BC;</button>
    </div>
    <div id="text-bubble" style="background-color: #f2f4f7; padding: 15px; margin: 15px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      Enter your info below and any information regarding your vehicle choice, and a representative will be right with you.
    </div>
    <form id="chat-form" style="border: 2px solid; border-image: linear-gradient(to right, ${primaryColor}, ${secondaryColor}) 1; padding: 10px; border-radius: 8px; margin: 15px; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box;">
      <input type="text" id="name" name="name" placeholder="Your Name" required style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
      <input type="email" id="email" name="email" placeholder="Your Email" required style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required pattern="^\\+?[1-9]\\d{1,14}$" title="Please enter a valid phone number." style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px;">
      <input type="hidden" id="identifier" name="identifier" value="${identifier}">
      <textarea id="message" name="message" placeholder="Your Message or Vehicle Choice" required style="width: 100%; height: 100px; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px;"></textarea>
      <button type="submit" id="submit-btn" style="width: 100%; padding: 8px; margin: 8px 0; background-color: ${primaryColor}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; transition: transform 0.3s ease;">Send Message 👉🏼</button>
    </form>
    <div id="confirmation-bubble" style="display: none; background-color: #f2f4f7; padding: 15px; margin: 10px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      Thanks for your enquiry. One of our authorized representatives will be in touch any minute now. 🏎️
    </div>
    <div id="powered-by" style="font-size: 12px; text-align: center; margin-top: auto; padding-bottom: 10px;">
      Powered by <a href="https://visquanta.com/speed-to-lead" target="_blank" style="color: #001D6E;">VisQuanta</a>
    </div>
  `;

  // Toggle chat form display on chat bubble click with animation
  chatBubble.addEventListener('click', () => {
    chatFormContainer.style.display = chatFormContainer.style.display === 'flex' ? 'none' : 'flex';
    chatFormContainer.style.flexDirection = 'column';
    chatBubble.style.transform = 'scale(1.1)';
    chatBubble.style.backgroundColor = secondaryColor;
    setTimeout(() => {
      chatBubble.style.transform = 'scale(1)';
    }, 300);
  });

  // Close chat form on chevron click
  document.getElementById('chevron-close').addEventListener('click', () => {
    chatFormContainer.style.display = 'none';
  });

  // Close chat form when close button is clicked
  document.getElementById('close-chat').addEventListener('click', () => {
    chatFormContainer.style.display = 'none';
  });

  // Handle hover animation on chat bubble
  chatBubble.addEventListener('mouseenter', () => {
    chatBubble.style.transform = 'scale(1.1)';
    chatBubble.style.backgroundColor = secondaryColor;
  });

  chatBubble.addEventListener('mouseleave', () => {
    chatBubble.style.transform = 'scale(1)';
    chatBubble.style.backgroundColor = primaryColor;
  });

  // Handle form submission with validation and animation
  document.getElementById('chat-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Disable the submit button and show loading text with animation
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.style.transform = 'scale(1.1)';
    setTimeout(() => {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      submitButton.style.transform = 'scale(1)';
    }, 300);

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate email and phone
    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      return;
    }

    if (!phonePattern.test(phone)) {
      alert('Please enter a valid phone number.');
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      return;
    }

    // Collect form data
    const formData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      identifier: document.getElementById('identifier').value
    };

    // Send the POST request
    fetch('https://api.visquanta.com/webhook/chat-widget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) throw new Error('Server error');
      return response.json();
    })
    .then(data => {
      // Reset form, hide form elements, show confirmation message
      document.getElementById('chat-form').style.display = 'none';
      document.getElementById('text-bubble').style.display = 'none';
      document.getElementById('confirmation-bubble').style.display = 'block';
      document.getElementById('chat-header').textContent = 'All Done! 🏆';
    })
    .catch(error => {
      console.error('Error:', error);
      // Re-enable the submit button and show error
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message 👉🏼';
      const confirmationBubble = document.getElementById('confirmation-bubble');
      confirmationBubble.style.display = 'block';
      confirmationBubble.textContent = 'There was an error submitting the form. Please try again later.';
    });
  });
})();
