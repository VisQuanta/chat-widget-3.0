(function() {
  // Prevent duplicate execution
  if (window.widgetLoaderInitialized) return;
  window.widgetLoaderInitialized = true;

  try {
    const scriptTag = document.currentScript;

    const widgetId = scriptTag.getAttribute('data-widget-id');
    const locationId = scriptTag.getAttribute('data-location-id');

    if (widgetId && locationId) {
      console.log('Chat Widget Loader Initialized');

      const widgetDiv = document.createElement('div');
      widgetDiv.setAttribute('data-chat-widget', '');
      widgetDiv.setAttribute('data-widget-id', widgetId);
      widgetDiv.setAttribute('data-location-id', locationId);

      document.body.appendChild(widgetDiv);

      const ghlScript = document.createElement('script');
      ghlScript.src = "https://widgets.leadconnectorhq.com/loader.js";
      ghlScript.setAttribute('data-resources-url', "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
      ghlScript.setAttribute('data-widget-id', widgetId);

      document.body.appendChild(ghlScript);
    } else {
      console.error('Error: Missing data-widget-id or data-location-id attributes.');
    }
  } catch (error) {
    console.error('Error loading the chat widget:', error);
  }
})();
