/********************************************/
/******** COACD Single Sign On Login ********/
/********************************************/
function customizeLoginButton(viewId) {
  // Hide Knack default SSO button, login form, login title, and any other children
  $("#" + viewId)
    .children()
    .hide();

  var url = Knack.url_base + Knack.scene_hash + "auth/COACD";

  // Create a div for Login buttons
  var $coacdButton = $("<div/>", {
    id: "coacd-button-login"
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

// create large Service Requests button on the home page
$(document).on("knack-view-render.view_127", function(event, page) {
    bigButton("new-service-request", "view_127", "https://atd.knack.com/dts#new-service-request/", "phone-square", "Service Requests");
});

// create large Datasets button on the home page
$(document).on("knack-view-render.view_128", function(event, page) {
    bigButton("datasets", "view_128", "https://atd.knack.com/dts#datasets/", "database", "Datasets");
});

// create large Applications button on the home page
$(document).on("knack-view-render.view_312", function(event, page) {
    bigButton("applications", "view_312", "https://atd.knack.com/dts#applications/", "laptop", "Applications");
});

// create large Knack Directory button on the home page
$(document).on("knack-view-render.view_374", function(event, page) {
    bigButton("knack-directory", "view_374", "https://atd.knack.com/dts#knack-directory/", "asterisk", "Knack Directory");
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
function smallButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " small-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
    $( "<a id='" + id + "' class='small-button-container" + disabledClass + " href='" + url + "'" 
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

/*************************************/
/*** Redirect from Blank Nav Pages ***/
/*************************************/
//Knack Directory Pages
//AMD Data Tracker
$(document).on('knack-scene-render.scene_200', function(event, scene) { 
window.location.replace("https://atd.knack.com/amd");
});
//Bike Benefit Program
$(document).on('knack-scene-render.scene_213', function(event, scene) { 
window.location.replace("https://atd.knack.com/bike-benefit-program");
});
//Finance & Purchasing
$(document).on('knack-scene-render.scene_204', function(event, scene) { 
window.location.replace("https://atd.knack.com/finance-purchasing");
});
//Hiring Resource
$(document).on('knack-scene-render.scene_208', function(event, scene) { 
window.location.replace("https://atd.knack.com/tpw-hire");
});
//Human Resources
$(document).on('knack-scene-render.scene_203', function(event, scene) { 
window.location.replace("https://atd.knack.com/hr");
});
//Office of City Engineer
$(document).on('knack-scene-render.scene_215', function(event, scene) { 
window.location.replace("https://atd.knack.com/oce");
});
//Office of the Director
$(document).on('knack-scene-render.scene_319', function(event, scene) { 
window.location.replace("https://atd.knack.com/ood");
});
//Parking Enterprise
$(document).on('knack-scene-render.scene_212', function(event, scene) { 
window.location.replace("https://atd.knack.com/parking-enterprise");
});
//Right of Way
$(document).on('knack-scene-render.scene_205', function(event, scene) { 
window.location.replace("https://atd.knack.com/row");
});
//Shared Mobility
$(document).on('knack-scene-render.scene_209', function(event, scene) { 
window.location.replace("https://atd.knack.com/smrt");
});
//Signs & Markings
$(document).on('knack-scene-render.scene_202', function(event, scene) { 
window.location.replace("https://atd.knack.com/signs-markings");
});
//Smart Mobility
$(document).on('knack-scene-render.scene_210', function(event, scene) { 
window.location.replace("https://atd.knack.com/smart-mobility");
});
//Street Banners
$(document).on('knack-scene-render.scene_211', function(event, scene) { 
window.location.replace("https://atd.knack.com/street-banners");
});
//Street and Bridge
$(document).on('knack-scene-render.scene_216', function(event, scene) { 
window.location.replace("https://atd.knack.com/sbo");
});
//TPW Forms
$(document).on('knack-scene-render.scene_218', function(event, scene) { 
window.location.replace("https://atd.knack.com/atd-forms");
});
//Traffic Register
$(document).on('knack-scene-render.scene_207', function(event, scene) { 
window.location.replace("https://atd.knack.com/traffic-register");
});
//Transportation Development Services
$(document).on('knack-scene-render.scene_206', function(event, scene) { 
window.location.replace("https://atd.knack.com/development-services");
});
//Urban Forestry
$(document).on('knack-scene-render.scene_214', function(event, scene) { 
window.location.replace("https://atd.knack.com/urban-forestry");
});

// /*************************************/
// /****** Knack Directory Buttons ******/
// /*************************************/

// Transform kn-list-item-container items into directory-style buttons
// Only targets scene 201, view 377
$(document).ready(function() {
  
  // Function to check if we're on the target scene and view
  function isTargetSceneView() {
    // Scene 201 detection - check for #kn-scene_201 element
    const hasScene201 = $('#kn-scene_201').length > 0;
    const hasView377 = $('#view_377').length > 0;
    
    return hasScene201 && hasView377;
  }
  
  // Function to transform list item containers into directory buttons
  function transformListItemContainers() {
    // Only proceed if we're on the target scene/view
    if (!isTargetSceneView()) {
      return;
    }
    
    // Target the kn-list-item-container elements within view 377 specifically
    let $listContainers = $('#view_377 .kn-list-item-container');
    
    if ($listContainers.length === 0) {
      // Try alternative selectors within view 377 only
      const alternatives = [
        '#view_377 .kn-list-item',
        '#view_377 .kn-list-content .kn-list-item-container',
        '#view_377 [class*="kn-list-item"]',
        '#view_377 .kn-list [class*="container"]'
      ];
      
      for (let selector of alternatives) {
        const $alt = $(selector);
        if ($alt.length > 0) {
          $alt.each(function() {
            transformListItem($(this));
          });
          return;
        }
      }
      return;
    }
    
    $listContainers.each(function() {
      transformListItem($(this));
    });
  }
  
  function transformListItem($container) {
    // Skip if already transformed
    if ($container.hasClass('directory-button-transformed')) {
      return;
    }
    
    // Look for a link within this container
    const $link = $container.find('a[href]').first();
    
    if ($link.length === 0) {
      return; // No link found, skip this container
    }
    
    // Get text - try different elements that might contain the title
    let buttonText = '';
    
    // Try to find text in common Knack elements
    const $titleElements = $container.find('h1, h2, h3, h4, h5, h6, .kn-title, .kn-link-title, .field-title');
    if ($titleElements.length > 0) {
      buttonText = $titleElements.first().text().trim();
    } else {
      // Fallback to link text or container text
      buttonText = $link.text().trim() || $container.text().trim();
    }
    
    const buttonHref = $link.attr('href');
    
    if (!buttonText || !buttonHref) {
      return;
    }
    
    // Create the directory-style button
    const $buttonLink = $('<a>')
      .attr('href', buttonHref)
      .attr('target', $link.attr('target') || '_self') // Preserve original target
      .addClass('directory-button directory-button-transformed')
      .html(`
        <div class="button-content">
          <span class="button-text">${buttonText}</span>
          <div class="button-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#163f6e"/>
              <path d="M10 8L14 12L10 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      `);
    
    // Replace the container content with our button
    $container.addClass('directory-item directory-button-transformed').empty().append($buttonLink);
  }
  
  // Run transformation after DOM is ready
  setTimeout(transformListItemContainers, 1000);
  
  // Also run when Knack renders content, specifically for scene 201
  $(document).on('knack-scene-render.kn-scene_201', function() {
    setTimeout(transformListItemContainers, 500);
  });
  
  // Also listen for view 377 renders specifically
  $(document).on('knack-view-render.view_377', function() {
    setTimeout(transformListItemContainers, 500);
  });
  
  // Run on hash change (when navigating in Knack)
  $(window).on('hashchange', function() {
    setTimeout(transformListItemContainers, 500);
  });
  
  // Add hover effects
  $(document).on('mouseenter', '.directory-button', function() {
    $(this).addClass('directory-button-hover');
  });
  $(document).on('mouseleave', '.directory-button', function() {
    $(this).removeClass('directory-button-hover');
  });
  
  // Add responsive CSS for large screens only
  if (!$('#directory-button-responsive-styles').length) {
    const responsiveStyles = `
      <style id="directory-button-responsive-styles">
        /* Medium-large screens (1650px to 2079px) - H3 size text */
        @media screen and (min-width: 1650px) and (max-width: 2079px) {
          .directory-button .button-text {
            font-size: 1.5em !important;
          }
        }
        
        /* Large screens (2080px+) - H2 size text */
        @media screen and (min-width: 2080px) {
          .directory-button .button-text {
            font-size: 2em !important;
          }
        }
      </style>
    `;
    $('head').append(responsiveStyles);
    
    // Debug: Check if styles were added and screen size
    console.log('Directory button responsive styles added');
    console.log('Current screen width:', window.innerWidth);
    console.log('Media query should apply:', window.innerWidth >= 1920);
  }
  
});
