var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-1.11.0.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

script.ready(function() {
  $(document).on("knack-view-render.view_2587", function(event, scene) {
    console.log("auto-zooom script loaded");
  });
});
