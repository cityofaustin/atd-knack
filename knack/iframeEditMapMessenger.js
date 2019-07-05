(function() {
  var myView = window.viewIdsArray.shift(0);

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
    var $viewSelector = $(myView);

    // Add React app as iframe if iframe doesn't already exist
    if ($("#mapIFrame").length === 0) {
      $(
        '<iframe src="https://localhost:9001" frameborder="0" scrolling="yes" id="mapIFrame" \
        style="width: 100%;height: 523px;"></iframe>'
      ).appendTo($viewSelector);
    }

    // Listen for lat/lon changes
    window.addEventListener("message", function(event) {
      console.log("message received:  " + event.data, event);
      var data = event.data;
      if (data.message === "LAT_LON_FIELDS") {
        var $latLonFields = $("#kn-input-field_3300");

        $latLonFields.find("#latitude").val(data.lat);
        $latLonFields.find("[name='longitude']").val(data.lng);
      }
    });

    function sendMessageToApp(message) {
      var iframe = document.getElementById("mapIFrame").contentWindow;
      var stringifiedMessage = JSON.stringify(message);
      console.log("inside API", stringifiedMessage);
      iframe.postMessage(stringifiedMessage, "*");
    }

    $("#mapIFrame").on("load", function() {
      var urlArray = window.location.href.split("/");
      var recordId = urlArray[urlArray.length - 2];

      var crumbtrailArray = $(".kn-crumbtrail")
        .children()
        .last()
        .attr("href")
        .split("/");
      var recordId2 = crumbtrailArray[crumbtrailArray.length - 1].split("?")[0];

      console.log(recordId);
      console.log(recordId2);

      debugger;

      var markerMessage = {
        message: "EDIT_SIGNS_API_REQUEST",
        scene: "scene_1061",
        view: "view_2682",
        token: Knack.getUserToken(),
        app_id: Knack.application_id,
        id: recordId
      };

      sendMessageToApp(markerMessage);
    });
  });
})();
