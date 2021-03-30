function bigButton(id, view_id, url, fa_icon, button_label, is_disabled, callback) 
{
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
    $( "<a id='" + 
    id + "' class='big-button-container" + 
    disabledClass + 
    " href='" + url + 
    "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + 
    button_label + "</span></a>" 
    ).appendTo("#" + view_id);

  if (callback) callback();
}
   //HOME TAB BUTTONS - New Button Format
$(document).on("knack-view-render.view_125", function(event, page) {
    bigButton(
    "revenue-tracking", 
    "view_125", 
    "https://atd.knack.com/parking-enterprise#home/revenue-tracking/", 
    "usd", 
    "Revenue Tracking"
    );
});

$(document).on("knack-view-render.view_126", function(event, page) {
    bigButton(
    "parking-citation-tracking", 
    "view_126", 
    "https://atd.knack.com/parking-enterprise#home/parking-citation-tracking/", 
    "exclamation-triangle", 
    "Parking Citation Tracking"
    );
});

$(document).on("knack-view-render.view_127", function(event, page) {
    bigButton(
    "officer-citation-tracking", 
    "view_127", 
    "https://atd.knack.com/parking-enterprise#home/officer-citation-tracking/", 
    "exclamation-circle", 
    "Officer Citation Tracking"
   );
  
});

$(document).on("knack-scene-render.scene_113", function (event, page) {
  // CSR issue - signs details
  // update iframe src from detail field
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#csr_view").attr("src", iframe_url);
  // hide the url vield, we don't need it after extracting the value
  $("#view_194").hide();
});

function changeFieldColor(field, color_map) {
  var child_field = $(field).find(".kn-detail-body");
  var value = child_field.text();
  if (color_map[value]) {
    $(child_field).css({
      "background-color": color_map[value].background_color,
      color: color_map[value].color
    });
  }
}

// Change table data background colors My Assignments | My Status
function changeTableFieldColor(field, color_map) {
  var fields = $(field);
  fields.each(function() {
    var value = this.innerText;
    if (color_map[value]) {
      $(this).css({
        "background-color": color_map[value].background_color,
        color: color_map[value].color
      });
    }
  });
}

var colorMapOne = {
  "Available": { background_color: "#80d07e", color: "#fff" },
  "Unavailable": { background_color: "#ff9b9c", color: "#fff" }
};

// Color map for My Assignments | My Status highlighting
var colorMapServiceRequestsStatus = {
  "Unavailable": { background_color: "#ff9b9c", color: "#fff" }
};

$(document).on("knack-scene-render.any", function() {
  //  My Assignments | My Status
  changeFieldColor(".field_236", colorMapOne);

});
