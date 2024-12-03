(function() {
  try {
    // Get the script tag that loaded this file
    const scriptTag = document.currentScript;

    // Extract widgetId and locationId from the script attributes
    const widgetId = scriptTag.getAttribute('data-widget-id');
    const locationId = scriptTag.getAttribute('data-location-id');

    // Ensure both widgetId and locationId are provided
    if (widgetId && locationId) {
      // Create the widget container dynamically
      const widgetDiv = document.createElement('div');
      widgetDiv.setAttribute('data-chat-widget', '');
      widgetDiv.setAttribute('data-widget-id', widgetId);
      widgetDiv.setAttribute('data-location-id', locationId);

      // Append the widget container to the body
      document.body.appendChild(widgetDiv);

      // Dynamically load the GHL widget script
      const ghlScript = document.createElement('script');
      ghlScript.src = "https://widgets.leadconnectorhq.com/loader.js";
      ghlScript.setAttribute('data-resources-url', "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
      ghlScript.setAttribute('data-widget-id', widgetId);

      // Append the GHL script to the body
      document.body.appendChild(ghlScript);
    } else {
      // Error handling for missing attributes
      console.error('Error: Missing data-widget-id or data-location-id attributes on the script tag.');
    }
  } catch (error) {
    console.error('Error loading the chat widget:', error);
  }
})();
