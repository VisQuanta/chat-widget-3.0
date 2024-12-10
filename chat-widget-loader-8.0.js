(function() {
  try {
    // Prevent duplicate execution
    if (window.middleLoaderInitialized) return;
    window.middleLoaderInitialized = true;

    // Get the script tag that loaded this file
    const scriptTag = document.currentScript;

    // Extract widgetId and locationId from the script's data attributes
    const widgetId = scriptTag.getAttribute('data-widget-id');
    const locationId = scriptTag.getAttribute('data-location-id');

    // Ensure both widgetId and locationId are provided
    if (widgetId && locationId) {
      console.log('Middle Loader Initialized');

      // Add a lightweight div container
      const widgetDiv = document.createElement('div');
      widgetDiv.setAttribute('data-chat-widget', '');
      widgetDiv.setAttribute('data-widget-id', widgetId);
      widgetDiv.setAttribute('data-location-id', locationId);
      document.body.appendChild(widgetDiv);

      // Add GHL widget script
      const ghlScript = document.createElement('script');
      ghlScript.src = "https://widgets.leadconnectorhq.com/loader.js";
      ghlScript.setAttribute('data-resources-url', "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
      ghlScript.setAttribute('data-widget-id', widgetId);
      document.body.appendChild(ghlScript);

      // Lazy load ReCaptcha only after user interaction
      document.addEventListener('click', () => {
        if (!document.getElementById('recaptcha-script')) {
          const recaptchaScript = document.createElement('script');
          recaptchaScript.id = 'recaptcha-script';
          recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
          document.body.appendChild(recaptchaScript);
          console.log('ReCaptcha Loaded');
        }
      }, { once: true });

      // Optimize image loading by deferring or converting to WebP
      const optimizeImage = () => {
        const imageElements = document.querySelectorAll('img[data-src]');
        imageElements.forEach((img) => {
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
        });
      };
      document.addEventListener('DOMContentLoaded', optimizeImage);
    } else {
      console.error('Error: Missing data-widget-id or data-location-id attributes.');
    }
  } catch (error) {
    console.error('Error initializing the middle loader:', error);
  }
})();
