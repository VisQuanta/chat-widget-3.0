<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Widget Loader</title>
  <script>
    // Extract widgetId and locationId from URL parameters
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param) || '';
    }

    document.addEventListener('DOMContentLoaded', () => {
      const widgetId = getQueryParam('widgetId');
      const locationId = getQueryParam('locationId');

      // Only load the widget if both parameters are present
      if (widgetId && locationId) {
        const placeholder = document.getElementById('chat-widget-placeholder');
        placeholder.outerHTML = `
          <div 
            data-chat-widget 
            data-widget-id="${widgetId}" 
            data-location-id="${locationId}">
          </div>
          <script 
            src="https://widgets.leadconnectorhq.com/loader.js"  
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
            data-widget-id="${widgetId}">
          </script>`;
      } else {
        document.body.innerHTML = `<p>Error: Missing widgetId or locationId parameters.</p>`;
      }
    });
  </script>
</head>
<body>
  <div id="chat-widget-placeholder">Loading Chat Widget...</div>
</body>
</html>
