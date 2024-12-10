(function() {
  // Prevent multiple executions
  if (window.middleLoaderInitialized) return;
  window.middleLoaderInitialized = true;

  try {
    // Get the script tag that loaded this file
    const scriptTag = document.currentScript;

    // Extract widgetId and locationId from the script tag attributes
    const widgetId = scriptTag.getAttribute('data-widget-id');
    const locationId = scriptTag.getAttribute('data-location-id');

    // Ensure both widgetId and locationId are provided
    if (widgetId && locationId) {
      console.log('Middle Loader Initialized');

      // Create the widget container
      const widgetDiv = document.createElement('div');
      widgetDiv.setAttribute('data-chat-widget', '');
      widgetDiv.setAttribute('data-widget-id', widgetId);
      widgetDiv.setAttribute('data-location-id', locationId);
      document.body.appendChild(widgetDiv);

      // Lazy load the GHL widget script
      const ghlScript = document.createElement('script');
      ghlScript.src = 'https://widgets.leadconnectorhq.com/loader.js';
      ghlScript.setAttribute('data-widget-id', widgetId);
      ghlScript.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      document.body.appendChild(ghlScript);

      // Lazy load ReCaptcha on user interaction
      document.addEventListener(
        'click',
        () => {
          if (!document.getElementById('recaptcha-script')) {
            const recaptchaScript = document.createElement('script');
            recaptchaScript.id = 'recaptcha-script';
            recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
            document.body.appendChild(recaptchaScript);
            console.log('ReCaptcha Loaded');
          }
        },
        { once: true } // Ensures ReCaptcha loads only once
      );
    } else {
      console.error('Error: Missing data-widget-id or data-location-id attributes.');
    }
  } catch (error) {
    console.error('Error initializing the middle loader:', error);
  }
})();
