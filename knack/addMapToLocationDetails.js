// Knack custom JS
// Add React map to Location Details
function addMapToLocationDetails() {
  // Remove map from Location Details
  console.log("in view_2733");
  window.viewIdsArray.push("#view_2733");
  loadIframeMapMessenger("view_2733");
  $("#kn-map-field_3300").hide();
}

$(document).on("knack-view-render.view_2733", function(event, scene) {
  addMapToLocationDetails();
});
