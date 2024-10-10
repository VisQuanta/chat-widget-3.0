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
    const identifier = scriptTag.getAttribute('data-identifier') || 'default123';

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

    // --- Text Bubble ---
    const textBubble = document.createElement('div');
    textBubble.id = 'text-bubble';
    textBubble.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      padding: 10px;
      max-width: 220px;
      color: #333;
      font-size: 14px;
      font-family: 'Helvetica', 'Arial', sans-serif;
      display: none; /* Initially hidden */
      justify-content: space-between;
      align-items: center;
      z-index: 999;
    `;
    textBubble.innerHTML = `
      <span>Let's chat and get your questions answered!</span>
      <button id="close-text-bubble" style="background: none; border: none; color: #333; font-size: 16px; cursor: pointer;">&times;</button>
    `;

    document.body.appendChild(textBubble);

    // Show the text bubble after 5 seconds
    setTimeout(() => {
      textBubble.style.display = 'flex';
    }, 5000); // 5000 milliseconds = 5 seconds

    // Close text bubble when clicking the X button
    document.getElementById('close-text-bubble').addEventListener('click', () => {
      textBubble.style.display = 'none';
    });

    // Hide text bubble when chat is clicked
    chatBubble.addEventListener('click', () => {
      textBubble.style.display = 'none';
      chatFormContainer.style.display = chatFormContainer.style.display === 'flex' ? 'none' : 'flex';
      chatFormContainer.style.flexDirection = 'column';
    });

    // --- Chat Form Container ---
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
      <div id="text-bubble-message" style="background-color: #f2f4f7; padding: 15px; margin: 15px 20px; border-radius: 0 2rem 2rem 2rem; font-size: 14px; color: #111828; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
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

    chatBubble.addEventListener('mouseenter', () => {
      chatBubble.style.transform = 'scale(1.1)';
      chatBubble.style.backgroundColor = secondaryColor;
    });

    chatBubble.addEventListener('mouseleave', () => {
      chatBubble.style.transform = 'scale(1)';
      chatBubble.style.backgroundColor = primaryColor;
    });
  }
})();
