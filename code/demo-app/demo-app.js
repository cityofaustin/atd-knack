/********************************************/
/*************** Big Buttons ****************/
/********************************************/

//Create Big Button nested in a block
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
    var disabledClass = is_disabled ? " big-button-disabled'" : "'";
    var newTab = target_blank ? " target='_blank'" : "" ;
      $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + "'"
        + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
    if (callback) callback();
  }  
  
  // create large TABLE button on the Home page
  $(document).on("knack-view-render.view_106", function(event, page) {
      bigButton("tables", "view_106", "https://atd.knack.com/kda#tables", "table", "Tables & Related Tables");
  });
  
  // create large WORKSHEET button on the Home page
  $(document).on("knack-view-render.view_107", function(event, page) {
      bigButton("worksheet", "view_107", "https://atd.knack.com/kda#worksheet", "edit", "Worksheet Inline Editing");
  });
  
  // create large FORM button on the Home page
  $(document).on("knack-view-render.view_108", function(event, page) {
      bigButton("forms", "view_108", "https://atd.knack.com/kda#forms", "file-o", "Form Intake");
  });
  
  // create large TRACKING CHANGES button on the Home page
  $(document).on("knack-view-render.view_109", function(event, page) {
      bigButton("trigger-buttons", "view_109", "https://atd.knack.com/kda#trigger-buttons", "tasks", "Tracking Changes");
  });
  
  // create large INFO PAGE - IMAGE button on the Home page
  $(document).on("knack-view-render.view_114", function(event, page) {
      bigButton("informational-pages", "view_114", "https://atd.knack.com/kda#informational-pages", "info-circle", "Info. Pages (Image embed)");
  });
  
  // create large FORM button on the Home page
  $(document).on("knack-view-render.view_115", function(event, page) {
      bigButton("email-alert", "view_115", "https://atd.knack.com/kda#email-alert", "exclamation-circle", "Email Alert Functions");
  });
  
  // Other Features  page
  // create large SEARCHING button on the Home page
  $(document).on("knack-view-render.view_125", function(event, page) {
      bigButton("search", "view_125", "https://atd.knack.com/kdap#search/", "search", "Dynamic Searching");
  });
  
  // create large APPROVAL WORKFLOW button on the Home page
  $(document).on("knack-view-render.view_123", function(event, page) {
      bigButton("approval", "view_123", "https://atd.knack.com/kda#approval", "check-circle", "Approval Workflow");
  });
  
  // create large REPORTING button on the Home page
  $(document).on("knack-view-render.view_124", function(event, page) {
      bigButton("reports", "view_124", "https://atd.knack.com/kda#reports", "pie-chart", "Reporting Functions");
  });
  
  // create large CALENDAR button on the Home page
  $(document).on("knack-view-render.view_122", function(event, page) {
      bigButton("calendar", "view_122", "https://atd.knack.com/kda#calendar/", "calendar", "Calendar Views ");
  });