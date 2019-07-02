// Knack custom JS
// Add React map to Location Details

function addMapToLocationDetails() {
  // Remove map from Location Details
  console.log("in view_2609");
  $("#kn-map-field_3300").hide();
}

$(document).on("knack-view-render.view_2609", function(event, scene) {
  addMapToLocationDetails();
  window.viewIdsArray.push("#view_2609");
  loadIframeMapMessenger("view_2609");
});
