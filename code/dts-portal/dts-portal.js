function bigButton(div_id, view_id, url, fa_icon, button_label, callback) {
  // create a large button
  
    $("<div/>", {
      id: div_id,
    }).appendTo("#" + view_id);
    
  $("#" + div_id).append("<a class='big-button' href='" + url + "'><div class='big-button-container'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></div></a>");

  if(callback) callback();
}


function customLoginButton(view_id, page_name) {
  //  special logic to generate URL and clean-up sign in page brefore creating large button
    $('.kn-sso-container').hide();
    $('.login_form').hide();

    $('h2.kn-title').hide();
    
    var url ="https://atd.knack.com/dts#" + page_name + "/auth/COACD";

    bigButton('caocd-button-login', view_id, url, 'sign-in', 'Sign-In');

    bigButton('non-coacd-button-login', view_id, "javascript:void(0)", 'sign-in', 'Sign-In (Non-COA)', function(divId='non-coacd-button-login') {
      setClickEvent(divId, showHideElements, ".login_form", ".big-button-container");
    });

}


$(document).on('knack-view-render.any', function(event, page) {
    //  wrapper to create lare sign-in buttons
    // specify "rich text" form elements here
    // the rich text is created on the login page and is a placeholder
    // for the button div, and must link to the appropriate URL name setting
    var views = {
        'view_119' : 'datasets',
        'view_120' : 'applications',
        'view_122' : 'new-service-request',
        'view_123' : 'edit-service-request',
        'view_124' : 'dts-team-portal',
        'view_125': 'admin',
        "view_300": "my-equipment"
    }

    if (page.key in views) {
        customLoginButton(page.key, views[page.key]);    
    }
    
});

$(document).on('knack-view-render.view_127', function(event, page) {
  // create large button on the home page
    bigButton('new-service-request', 'view_127', "https://atd.knack.com/dts#new-service-request/", "phone-square", "Service Requests");
});

$(document).on('knack-view-render.view_128', function(event, page) {
    // create large button on the home page
    bigButton('datasets', 'view_128', "https://atd.knack.com/dts#datasets/", "database", "Datasets");
});
$(document).on('knack-view-render.view_146', function(event, page) {
   // create large button on the home page
    bigButton('equipment', 'view_146', "https://atd.knack.com/dts#my-equipment/", "desktop", "My Equipment");
});

$(document).on('knack-view-render.view_312', function(event, page) {
   // create large button on the home page
    bigButton('applications', 'view_312', "https://atd.knack.com/dts#applications/", "laptop", "Applications");
});

function setClickEvent(divId, func, param1, param2) {
  // TODO make these args less weird
  $("#" + divId).click(function(){
    func(param1, param2);
  })
}

function showHideElements(showSelector, hideSelector) {
  $(showSelector).show();
  $(hideSelector).hide();
}


$(document).on('knack-view-render.view_176', function(event, page) {
  // create large button on the home page
    bigButton(
        "all",
        "view_176",
        "https://atd.knack.com/dts#technician-equipment-tracker/",
        "wrench",
        "Technician Equipment Tracker"

    );

});
