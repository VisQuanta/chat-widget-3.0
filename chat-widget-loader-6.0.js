(function() {
  try {
    // Get the script tag that loaded this file
    const scriptTag = document.currentScript;

    // Extract widgetId and locationId from the script's data attributes
    const widgetId = scriptTag.getAttribute('data-widget-id');
    const locationId = scriptTag.getAttribute('data-location-id');

    // Ensure both widgetId and locationId are provided
    if (widgetId && locationId) {
      console.log('Chat Widget Loader Initialized'); // Debugging log
      console.log('widgetId:', widgetId, 'locationId:', locationId); // Debugging log

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
      // Log an error if the required attributes are missing
      console.error('Error: Missing data-widget-id or data-location-id attributes on the script tag.');
    }
  } catch (error) {
    // Log any errors encountered
    console.error('Error loading the chat widget:', error);
  }
})();
