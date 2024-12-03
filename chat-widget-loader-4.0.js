(function() {
  // Get the script tag that loaded this file
  const scriptTag = document.currentScript;

  // Extract widgetId and locationId from the script attributes
  const widgetId = scriptTag.getAttribute('data-widget-id');
  const locationId = scriptTag.getAttribute('data-location-id');

  // Ensure both widgetId and locationId are provided
  if (widgetId && locationId) {
    // Create the widget container
    const widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('data-chat-widget', '');
    widgetDiv.setAttribute('data-widget-id', widgetId);
    widgetDiv.setAttribute('data-location-id', locationId);
    document.body.appendChild(widgetDiv);

    // Load the original GHL widget script
    const ghlScript = document.createElement('script');
    ghlScript.src = "https://widgets.leadconnectorhq.com/loader.js";
    ghlScript.setAttribute('data-resources-url', "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    ghlScript.setAttribute('data-widget-id', widgetId);
    document.body.appendChild(ghlScript);
  } else {
    console.error('Error: Missing data-widget-id or data-location-id attributes on the script tag.');
  }
})();
