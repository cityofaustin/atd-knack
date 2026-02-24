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
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

// create large Task Board button on the Home page
$(document).on("knack-view-render.view_612", function(event, page) {
  bigButton("task-board", "view_612", "https://atd.knack.com/traffic-register#task-board/my-tasks/", "tasks", "My Task Board");
});

// create large Search Approved Regulations button on the Home page
$(document).on("knack-view-render.view_613", function(event, page) {
  bigButton("search-regulations", "view_613", "https://atd.knack.com/traffic-register#approved-regulations/", "search", "Search for Approved Regulations");
});

// create large Search Regulation Documents button on the Home page
$(document).on("knack-view-render.view_614", function(event, page) {
  bigButton("search-documents", "view_614", "https://atd.knack.com/traffic-register#regulation-documents/", "search", "Search for Regulation Documents");
});

// create large PDF Search button on the Home page
$(document).on("knack-view-render.view_615", function(event, page) {
  bigButton("pdf-search", "view_615", "https://atd.knack.com/traffic-register#pdf-search/", "red fa-file-pdf-o", "PDF Search");
});

/*
// create large Usability Survey button on the Usability Sign Up page
$(document).on("knack-view-render.view_1130", function(event, page) {
  bigButton("usability-survey", "view_1130", "https://forms.office.com/g/C1sagRCRtk", "flask", "Usability Survey", true);
});
*/

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

/********************************************/
/************* Trigger Buttons **************/
/********************************************/
function triggerButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " trigger-button'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
    $( "<a id='" + id + "' class='trigger-button" + disabledClass + " href='" + url + "'" 
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

/******************************************/
/*** Convert Field Inputs to UPPERCASE  ***/
/******************************************/
/*Canvas Regulation object - Sign Type*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_392").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Approved Regulation object - Sign Type*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_100").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Street object - Street Name*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_14").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Regulation Type object - Reg Type Code*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_85").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Regulation Type object - Code Section*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_87").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});

/****************************************************/
/*** Disable Breadcrumb Navigation Links Function ***/
/****************************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

/*************************************************************/
/*** Disable Breadcrumb Navigation Links for Draft Builder ***/
/*************************************************************/
/*Drafting Page*/
$(document).on("knack-scene-render.scene_698", function () {
  disableBreadCrumbsNonAdmin();
});

/*Add Regulations Page*/
$(document).on("knack-scene-render.scene_699", function () {
  disableBreadCrumbsNonAdmin();
});

/*Save Draft Page*/
$(document).on("knack-scene-render.scene_707", function () {
  disableBreadCrumbsNonAdmin();
});

/*Submit Draft Page*/
$(document).on("knack-scene-render.scene_708", function () {
  disableBreadCrumbsNonAdmin();
});

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/
$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("Attachment");
});

/*************************************************************************************/
/** Disable the ability to Click/Touch outside a Modal Page (accidentally close it) **/
/*************************************************************************************/
$(document).on("knack-scene-render.any", function () {
  $(".kn-modal-bg").off("click");
});

/*************************************/
/*** Redirect from Blank Nav Pages ***/
/*************************************/
/*Task Board Page*/
$(document).on('knack-scene-render.scene_435', function(event, scene) { 
window.location.href = "https://atd.knack.com/traffic-register#task-board/my-tasks/";
});

/******************************/
/**** Auto Refresh Browser ****/
/******************************/
/* 1st Page of Draft Builder */
(function() {
    // Store interval IDs and state
    let pageReloadInterval = null;
    let countdownInterval = null;
    let submitCheckInterval = null;
    let isSubmitting = false;
    let timeLeft = 20;
    let isInDisabledPeriod = false;
    let isOnCorrectScene = false;
    let clickHandlerAttached = false;
    
    // Function to clear all intervals
    function clearAllIntervals() {
        if (pageReloadInterval) {
            clearInterval(pageReloadInterval);
            pageReloadInterval = null;
        }
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        if (submitCheckInterval) {
            clearInterval(submitCheckInterval);
            submitCheckInterval = null;
        }
        $('#refresh-warning').remove();
    }
    
    // Navigation click handler (defined once, reused)
    function handleNavigationClick(e) {
        const $target = $(e.target).closest('a, .kn-link, .kn-menu-item');
        
        // Don't process clicks on form elements
        if ($(e.target).closest('form, .kn-form, select, input, textarea, button[type="submit"]').length > 0) {
            return;
        }
        
        const href = $target.attr('href');
        
        // If this is a navigation link away from scene_697
        if (href && href !== '#' && !href.includes('scene_697')) {
            isOnCorrectScene = false;
            clearAllIntervals();
        }
    }
    
    // Function to attach click handler (only when on scene_697)
    function attachClickHandler() {
        if (!clickHandlerAttached) {
            // Use mousedown instead of click to catch navigation earlier
            // But exclude form elements
            $(document).on("mousedown.scene697nav", "a:not(form a), .kn-link:not(form .kn-link), .kn-menu-item", handleNavigationClick);
            clickHandlerAttached = true;
        }
    }
    
    // Function to detach click handler (when leaving scene_697)
    function detachClickHandler() {
        if (clickHandlerAttached) {
            $(document).off("mousedown.scene697nav");
            clickHandlerAttached = false;
        }
    }
    
    // Function to start the countdown and refresh logic
    function startCountdown() {
        // Clear any existing intervals first
        clearAllIntervals();
        
        // Mark that we're on the correct scene
        isOnCorrectScene = true;
        
        // Attach click handler only when on this scene
        attachClickHandler();
        
        // Reset state
        isSubmitting = false;
        timeLeft = 20;
        isInDisabledPeriod = false;
        
        const timeDisplay = document.getElementById("displayTime");
        const submitButton = $('.kn-button.is-primary');
        
        // Set up countdown display
        if (timeDisplay) {
            timeDisplay.innerHTML = `<strong>${timeLeft}</strong>`;
        }
        
        // Re-enable submit button
        if (submitButton.length > 0) {
            submitButton.prop('disabled', false);
            submitButton.css({
                'opacity': '1',
                'cursor': 'pointer'
            });
        }
        
        // Combined countdown and reload logic
        countdownInterval = setInterval(function() {
            // Don't refresh if user is submitting or not on correct scene
            if (isSubmitting || !isOnCorrectScene) {
                clearAllIntervals();
                return;
            }
            
            timeLeft--;
            
            if (timeDisplay) {
                timeDisplay.innerHTML = `<strong>${timeLeft}</strong>`;
            }
            
            // When we hit 0, enter disabled period
            if (timeLeft === 0) {
                isInDisabledPeriod = true;
                
                // Disable submit button
                if (submitButton.length > 0) {
                    submitButton.prop('disabled', true);
                    submitButton.css({
                        'opacity': '0.5',
                        'cursor': 'not-allowed'
                    });
                    
                    // Add warning message
                    if ($('#refresh-warning').length === 0) {
                        submitButton.before('<div id="refresh-warning" style="color: #d9534f; font-weight: bold; margin-bottom: 10px;">⚠️ Refreshing selection, please wait...</div>');
                    }
                }
                
                // Wait 3 seconds, then reload (only if still on correct scene)
                setTimeout(function() {
                    if (!isSubmitting && isOnCorrectScene) {
                        location.reload();
                    }
                }, 3000);
                
                // Clear the countdown interval since we're done counting
                clearInterval(countdownInterval);
            }
        }, 1000);
        
        // Backup timer (total 23 seconds: 20 countdown + 3 disabled period)
        pageReloadInterval = setInterval(function() {
            if (!isSubmitting && isOnCorrectScene) {
                location.reload();
            } else if (!isOnCorrectScene) {
                clearAllIntervals();
            }
        }, 23000);
        
        // Monitor submit button state - only run when near the end
        if (submitButton.length > 0) {
            submitCheckInterval = setInterval(function() {
                // If not on correct scene, stop monitoring
                if (!isOnCorrectScene) {
                    clearAllIntervals();
                    return;
                }
                
                // Only check when we're in disabled period or close to it
                if (timeLeft <= 5) {
                    if (isInDisabledPeriod) {
                        submitButton.prop('disabled', true);
                        submitButton.css({
                            'opacity': '0.5',
                            'cursor': 'not-allowed'
                        });
                    } else {
                        submitButton.prop('disabled', false);
                        submitButton.css({
                            'opacity': '1',
                            'cursor': 'pointer'
                        });
                    }
                }
            }, 500);
        }
    }
    
    // Start countdown when scene renders
    $(document).on("knack-scene-render.scene_697", function () {
        setTimeout(function() {
            startCountdown();
        }, 50);
    });
    
    // Intercept form submission to prevent refresh during submit
    $(document).on("knack-form-submit.view_1421", function(event, view, record) {
        isSubmitting = true;
        isOnCorrectScene = false;
        detachClickHandler();
        clearAllIntervals();
    });
    
    // Clean up intervals when scene is destroyed
    $(document).on("knack-scene-destroy.scene_697", function () {
        isOnCorrectScene = false;
        detachClickHandler();
        clearAllIntervals();
    });
    
    // Clear intervals BEFORE any navigation occurs
    $(document).on("knack-route-change", function() {
        isOnCorrectScene = false;
        detachClickHandler();
        clearAllIntervals();
    });
    
    // Hash change listener (lightweight detection)
    $(window).on('hashchange', function() {
        if (!window.location.hash.includes('scene_697')) {
            isOnCorrectScene = false;
            detachClickHandler();
            clearAllIntervals();
        }
    });
    
    // Additional cleanup for page unload
    $(window).on('beforeunload', function() {
        isOnCorrectScene = false;
        detachClickHandler();
        clearAllIntervals();
    });
})();

/*************************/
/*** Auto Submit Forms ***/
/*************************/
/* Auto Submit Page 2 of Draft Builder */
$(document).on('knack-scene-render.scene_698', function(event, scene) {
    $('button[type=submit]').submit();
});

/* Auto Submit TE Approve Modal of Draft Review */
$(document).on('knack-scene-render.scene_681', function(event, scene) {
    $('button[type=submit]').submit();
});

/* Auto Submit CTE Approve Modal of Draft Review */
$(document).on('knack-scene-render.scene_682', function(event, scene) {
    $('button[type=submit]').submit();
});

/*********************************************/
/*** Hide Top Navigation for Draft Builder ***/
/*********************************************/
/*Drafting*/
$(document).on('knack-scene-render.scene_698', function(event, scene) {
    $('#kn-app-menu').hide()
});
/*Add Regulations*/
$(document).on('knack-scene-render.scene_699', function(event, scene) {
    $('#kn-app-menu').hide()
});
/*Submit Draft*/
$(document).on('knack-scene-render.scene_707', function(event, scene) {
    $('#kn-app-menu').hide()
});
/*Save Draft*/
$(document).on('knack-scene-render.scene_708', function(event, scene) {
    $('#kn-app-menu').hide()
});

/*********************************************/
/************** PDF Button link **************/
/*********************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
  $(".kn-detail.field_1729 a").addClass("pbi-link");                      /*Add CSS Class pbi-link to child anchor*/
  $(".kn-detail.field_1729").wrap("<div class='pbi-link-button'></div>"); /*Wrap the div with div class pbi-link-button*/
  $(".pbi-link-button").click(function(){                                 /*Add click event to the new div*/
	  window.open($(this).find("a").attr("href"), '_blank');                /*Click event uses link from child anchor & opens in new tab*/
		return false;
	});
});

$(document).on('knack-scene-render.any', function(event, scene) {
  $(".kn-detail.field_1778 a").addClass("sp-link");                      /*Add CSS Class sp-link to child anchor*/
  $(".kn-detail.field_1778").wrap("<div class='sp-link-button'></div>"); /*Wrap the div with div class sp-link-button*/
  $(".sp-link-button").click(function(){                                 /*Add click event to the new div*/
	  window.open($(this).find("a").attr("href"), '_blank');               /*Click event uses link from child anchor & opens in new tab*/
		return false;
	});
});

/********************************************************************/
/* Generates a Strong Random Password for Internal Account Creation */
/********************************************************************/
function generatePassword() {
  const PASSWORD_LENGTH = 20;
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SPECIAL = "!@#$%&*^"; //  `(` and `)` are not special chars according to Knack
  const ALL_CHARS = LOWER + UPPER + NUMBERS + SPECIAL;
  /*
   * Generates a cryptographically secure random integer between 0 and max (inclusive) using rejection sampling to avoid modulo bias.
   * Must be between 0 and 255 since this uses Uint8Array with 255 as the max value and excludes integers greater than max
   */
  function getRandomInt(max) {
    let int = null;
    do {
      const randomIntArray = new Uint8Array(1);
      crypto.getRandomValues(randomIntArray);
      int = randomIntArray[0];
    } while (int !== null && int > max);
    return int;
  }
  // Make sure password contains all required character types
  function hasAllCharacterTypes(password) {
    const pwArray = password.split("");
    const hasLower = pwArray.some((char) => LOWER.includes(char));
    const hasUpper = pwArray.some((char) => UPPER.includes(char));
    const hasNumber = pwArray.some((char) => NUMBERS.includes(char));
    const hasSpecial = pwArray.some((char) => SPECIAL.includes(char));
    return hasLower && hasUpper && hasNumber && hasSpecial;
  }
  // Loop until a valid password is generated
  let password = "";
  do {
    password = "";
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      password += ALL_CHARS[getRandomInt(ALL_CHARS.length - 1)];
    }
  } while (!hasAllCharacterTypes(password));
  return password;
}

// Load Password for Internal Account Creation form
$(document).on("knack-view-render.view_654", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});

