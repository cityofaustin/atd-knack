var script = document.createElement("script");
script.src = "http://code.jquery.com/jquery-1.11.0.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

$(document).on("knack-view-render.view_2587", function(event, scene) {
  console.log("auto-zooom script loaded");
});
