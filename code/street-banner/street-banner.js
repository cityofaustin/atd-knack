/********************************************/
/*************** Big Buttons ****************/
/********************************************/
/**
 * Template and append a button link, disable it optionally, and invoke a callback function argument
 * @parameter {string} id - id attribute of the a tag in the button link
 * @parameter {string} view_id - Knack view id to append button link to
 * @parameter {string} url - Destination to navigate to on click
 * @parameter {string} fa_icon - Icon string (https://support.knack.com/hc/en-us/articles/226165208-Working-with-Icons#2-complete-list-of-icons)
 * @parameter {bool} isDisabled - Is button disabled (defaults to false)
 * @parameter {function} callback - Function that is invoked after appending the button link
 **/
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  isDisabled = false,
  callback = null
) {
  var disabledClass = isDisabled ? " big-button-disabled'" : "'";

  $(
    "<a id='" +
      id +
      "' class='big-button-container" +
      disabledClass +
      " href='" +
      url +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a>"
  ).appendTo("#" + view_id);

  if (callback) callback();
}
	//>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_2390', function(event, page) {
  // create large button on the home page
    bigButton('contact-directory', 'view_2390', "https://atd.knack.com/street-banners#banners-contacts-organization-directory/", "phone", "Contacts & Organizations");
});
$(document).on('knack-view-render.view_2660', function(event, page) {
    // create large button on the home page
    bigButton('reservations', 'view_2660', "https://atd.knack.com/street-banners#reservations/", "pencil-square-o", "Reservations");
});

$(document).on('knack-view-render.view_2661', function(event, page) {
    // create large button on the home page
    bigButton('availability', 'view_2661', "https://atd.knack.com/street-banners#availability-search/", "calendar", "Availability Search");
});

  // $(document).on('knack-view-render.view_2662', function(event, page) {
  // create large button on the home page
  //  bigButton('work-orders', 'view_2662', "https://atd.knack.com/street-banners#work-orders/", "folder-open", "Work Orders");
// });

  // $(document).on('knack-view-render.view_2750', function(event, page) {
  // create large button on the home page
  // bigButton('schedule', 'view_2750', "https://atd.knack.com/street-banners#schedule/", "clipboard", "Schedule");
// });

  // $(document).on('knack-view-render.view_3009', function(event, page) {
  // create large button on the home page
  //  bigButton('calendar', 'view_3009', "https://atd.knack.com/street-banners#calendar/", "calendar", "Calendar");
// });

$(document).on('knack-view-render.view_3006', function(event, page) {
  // create large button on the home page
    bigButton('reports', 'view_3006', "https://atd.knack.com/street-banners#reports/", "bar-chart", "Reports");
});

$(document).on('knack-view-render.view_2663', function(event, page) {
  // create large button on the home page
    bigButton('resources', 'view_2663', "https://atd.knack.com/street-banners#resources/", "link", "Resources");
});  
	//LAMPPOST TAB BUTTONS
$(document).on('knack-view-render.view_2814', function(event, page) {
  // create large button on the home page
    bigButton('lpb-reservations', 'view_2814', "https://atd.knack.com/street-banners#lamppost-banner-reservations/", "pencil-square-o", "Lamppost | Reservations");
});
	
$(document).on('knack-view-render.view_2815', function(event, page) {
  // create large button on the home page
    bigButton('lpb-availability', 'view_2815', "https://atd.knack.com/street-banners#lpb-availability/", "calendar", "Lamppost | Availability");
});

$(document).on('knack-view-render.view_2816', function(event, page) {
  // create large button on the home page
    bigButton('lpb-work-orders', 'view_2816', "https://atd.knack.com/street-banners#lamppost-work-orders", "folder-open", "Lamppost | Work Orders");
});

$(document).on('knack-view-render.view_2817', function(event, page) {
  // create large button on the home page
    bigButton('lpb-schedule', 'view_2817', "https://atd.knack.com/street-banners#lamppost-schedule/", "clipboard", "Lamppost | Schedule");
});
	//>>>OVER-THE-STREET TAB BUTTONS
$(document).on('knack-view-render.view_2818', function(event, page) {
  // create large button on the home page
    bigButton('ots-reservations', 'view_2818', "https://atd.knack.com/street-banners#over-the-street-banner-reservations/", "pencil-square-o", "Over-the-Street | Reservations");
});

$(document).on('knack-view-render.view_2819', function(event, page) {
  // create large button on the home page
    bigButton('ots-availability', 'view_2819', "https://atd.knack.com/street-banners#ots-availability/", "calendar", "Over-the-Street | Availability");
});
$(document).on('knack-view-render.view_2820', function(event, page) {
  // create large button on the home page
    bigButton('ots-work-orders', 'view_2820', "https://atd.knack.com/street-banners#over-the-street-banner-work-orders", "folder-open", "Over-the-Street | Work Orders");
});

$(document).on('knack-view-render.view_2821', function(event, page) {
  // create large button on the home page
    bigButton('ots-schedule', 'view_2821', "https://atd.knack.com/street-banners#over-the-street-schedule/", "clipboard", "Over-the-Street | Schedule");
});

$(document).on('knack-view-render.view_2907', function(event, page) {
  // create large button on the home page
    bigButton('ots-schedule', 'view_2907', "https://atd.knack.com/street-banners#over-the-street-schedule/", "flag-checkered", "Over-the-Street | Schedule");
});
	//>>>TECHNICIAN TAB BUTTONS
$(document).on('knack-view-render.view_3046', function(event, page) {
  // create large button on the home page
    bigButton('work-orders-tech', 'view_3046', "https://atd.knack.com/street-banners#work-orders//", "folder-open", "Work Orders");
});

$(document).on('knack-view-render.view_3047', function(event, page) {
  // create large button on the home page
    bigButton('schedule', 'view_3047', "https://atd.knack.com/street-banners#schedule/", "clipboard", "Schedule");
});

$(document).on('knack-view-render.view_3048', function(event, page) {
  // create large button on the home page
    bigButton('calendar', 'view_3048', "https://atd.knack.com/street-banners#calendar/", "calendar", "Calendar");
});
	//>>>ADMIN TAB BUTTONS
$(document).on('knack-view-render.view_3012', function(event, page) {
  // create large button on the home page
    bigButton('specifications', 'view_3012', "https://atd.knack.com/street-banners#specifications//", "th-list", "Specifications");
});

$(document).on('knack-view-render.view_3013', function(event, page) {
  // create large button on the home page
    bigButton('materials', 'view_3013', "https://atd.knack.com/street-banners#materials/", "shopping-cart", "Materials");
});

$(document).on('knack-view-render.view_3032', function(event, page) {
  // create large button on the home page
    bigButton('account-management', 'view_3032', "https://atd.knack.com/street-banners#account-management/", "users", "Account Management");
});
	//***MENU - RESERVATION PAGE***
$(document).on('knack-view-render.view_2794', function(event, page) {
  // create large button on the home page
    bigButton('lpb-rsvp', 'view_2794', "https://atd.knack.com/street-banners#lamppost-banner-reservations/", "flag-o", "Lamppost | Reservations");
});

$(document).on('knack-view-render.view_2795', function(event, page) {
  // create large button on the home page
    bigButton('ots-rsvp', 'view_2795', "https://atd.knack.com/street-banners#over-the-street-banner-reservations", "flag-checkered", "Over-the-Street | Reservations");
});
	//***MENU - AVAILABILITY PAGE***
$(document).on('knack-view-render.view_2803', function(event, page) {
  // create large button on the home page
    bigButton('lpb-avail', 'view_2803', "https://atd.knack.com/street-banners#lpb-availability/", "flag", "Lamppost | Availability");
});

$(document).on('knack-view-render.view_2804', function(event, page) {
   // create large button on the home page
    bigButton('ots-avail', 'view_2804', "https://atd.knack.com/street-banners#ots-availability/", "flag-checkered", "Over-the-Street | Availability");
});	
	//***MENU - WORK ORDER PAGE***
$(document).on('knack-view-render.view_2904', function(event, page) {
  // create large button on the home page
    bigButton('lpb-work-orders', 'view_2904', "https://atd.knack.com/street-banners#lamppost-work-orders/", "flag", "Lamppost | Work Orders");
});

$(document).on('knack-view-render.view_2905', function(event, page) {
  // create large button on the home page
    bigButton('ots-work-orders', 'view_2905', "https://atd.knack.com/street-banners#over-the-street-banner-work-orders/", "flag-checkered", "Over-the-Street | Work Orders");
});

$(document).on('knack-view-render.view_2960', function(event, page) {
  // create large button on the home page
    bigButton('maint-work-orders', 'view_2960', "https://atd.knack.com/street-banners#maintenance-work-orders/", "briefcase", "Maintenance | Work Orders");
});

$(document).on('knack-view-render.view_3097', function(event, page) {
  // create large button on the home page
    bigButton('signs-work-orders', 'view_3097', "https://atd.knack.com/signs-markings#my-work-orders/", "wrench", "Signs | Work Orders");
});
	//***MENU - SCHEDULE PAGE***
$(document).on('knack-view-render.view_2906', function(event, page) {
  // create large button on the home page
    bigButton('ots-work-orders', 'view_2906', "https://atd.knack.com/street-banners#lamppost-schedule/", "flag", "Lamppost | Schedule");
});

function bigButtonNewTab(div_id, view_id, url, fa_icon, button_label, callback) {
  // create a large button and link to a new tab
  
    $("<div/>", {
      id: div_id,
    }).appendTo("#" + view_id);
    
  $("#" + div_id).append("<a class='big-button' target='_blank' href='" + url + "'><div class='big-button-container'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></div></a>");

  if(callback) callback();
}
	//***MENU - RESOURCES PAGE***
$(document).on('knack-view-render.view_2713', function(event, page) {
  // create large button on the resources page
    bigButtonNewTab('street-banners-external-site', 'view_2713', "http://austintexas.gov/page/street-banners", "external-link-square", "Street Banners (External Site)");
});

$(document).on('knack-view-render.view_2796', function(event, page) {
  // create large button on the resources page
    bigButtonNewTab('AMANDA-Users-SP', 'view_2796', "https://atd.knack.com/dts#new-service-request/", "database", "AMANDA Support");
});

$(document).on("knack-view-render.any", function (event, page) {
  // Find SSO button and existing custom button
  var $ssoButton = $(".kn-sso-container");
  var $coacdLoginDiv = $("#coacd-button-login");

  // If SSO button exists on page and there isn't already a custom button
  if ($ssoButton.length && !$coacdLoginDiv.length) {
    var $ssoView = $ssoButton.closest("[id^=view_]");
    var viewId = $ssoView.get(0).id;

    customizeLoginButton(viewId);
  }
});

/**
 * Enhance SSO button and hide/show default Knack login form with buttons
 * @parameter {string} viewId - Knack view id to append button link to
 */
function customizeLoginButton(viewId) {
  // Hide Knack default SSO button, login form, login title, and any other children
  $("#" + viewId)
    .children()
    .hide();

  var url = Knack.url_base + Knack.scene_hash + "auth/COACD";

  // Create a div for Login buttons
  var $coacdButton = $("<div/>", {
    id: "coacd-button-login",
  });
  $coacdButton.appendTo("#" + viewId);

  // Append Big SSO Login button and non-SSO Login button
  bigButton("coacd-big-button", "coacd-button-login", url, "sign-in", "Sign-In")

  $coacdButton.append(
    "<a class='small-button' href='javascript:void(0)'>" +
      "<div class='small-button-container'><span><i class='fa fa-lock'></i></span><span> Non-COA Sign-In</span></div></a>"
  );

  // On non-SSO button click, hide SSO and non-SSO buttons and show Knack Login form
  var $nonCoacdButton = $(".small-button");
  $nonCoacdButton.click(function () {
    $("#" + viewId)
      .children()
      .show();
    $(".small-button-container,.big-button-container").hide();
    $(".kn-sso-container").hide();
  });
}

// Call customizeLoginButton on any view render to customize any login page that renders in app
$(document).on("knack-view-render.any", function (event, page) {
  // Find SSO button and existing custom button
  var $ssoButton = $(".kn-sso-container");
  var $coacdLoginDiv = $("#coacd-button-login");

  // If SSO button exists on page and there isn't already a custom button
  if ($ssoButton.length && !$coacdLoginDiv.length) {
    var $ssoView = $ssoButton.closest("[id^=view_]");
    var viewId = $ssoView.get(0).id;

    customizeLoginButton(viewId);
  }
});
