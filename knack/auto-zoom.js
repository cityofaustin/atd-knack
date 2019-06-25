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

  // Start polling...
  checkReady(function($) {
    $(function() {
      var endingTime = new Date().getTime();
      var tookTime = endingTime - startingTime;
      window.alert("jQuery is loaded, after " + tookTime + " milliseconds!");
    });

    // Our actual Knack custom code goes here...
    console.log("autozooom script loaded");
  });
})();
