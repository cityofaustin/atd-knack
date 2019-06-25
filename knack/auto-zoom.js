(function() {
  var startingTime = new Date().getTime();
  // Import jQuery into this file from CDN
  // https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
  var script = document.createElement("SCRIPT");
  script.src =
    "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);

  // Create polling function for made sure jQuery is loaded and ready...
  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function() {
        checkReady(callback);
      }, 20);
    }
  };

  function AutozoomSendMessageToApp(message) {
    var iframe = document.getElementById("mapIFrame").contentWindow;
    const stringifiedMessage = JSON.stringify(message);
    console.log("inside API", stringifiedMessage);
    iframe.postMessage(stringifiedMessage, "*");
  }

  // Start polling...
  checkReady(function($) {
    $(function() {
      // Get the current location from browser.
      // TODO: we might need to wrap this in try/catch check
      navigator.geolocation.getCurrentPosition(function(position) {
        // create message object for React App
        const geolocationMessage = {
          message: "KNACK_GEOLOCATION",
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };

        // envoke message
        AutozoomSendMessageToApp(geolocationMessage);
      });
    });
  });
})();
