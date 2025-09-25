// Function to save the new order using direct Knack API calls
async function saveNewOrder(newOrder) {
    console.log('Attempting to save new order:', newOrder);
    
    // Show custom prettier spinner
    showCustomSpinner();
    
    // Use Knack's application_id instead of hardcoded value
    const appId = Knack.application_id;
    console.log('Using Knack.application_id:', Knack.application_id); // Debug the correct property
    
    const apiUrl = `https://api.knack.com/v1/objects/object_6/records`;
    
    // Hashed for security
    const apiKey = '###';
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    try {
        // Process each record update
        for (const item of newOrder) {
            const recordId = item.recordId;
            const newSortOrder = item.newSortOrder;
            
            try {
                console.log(`Updating record ${recordId} with sort order ${newSortOrder}`);
                
                const requestBody = {
                    'field_1752': newSortOrder.toString().padStart(2, '0') // Update field_1752 with zero-padded string
                };
                console.log('Request body:', requestBody);
                
                const response = await fetch(`${apiUrl}/${recordId}`, {
                    method: 'PUT',
                    headers: {
                        'X-Knack-Application-Id': appId, // Using dynamic app ID
                        'X-Knack-REST-API-Key': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                console.log('Response status:', response.status);
                
                if (response.ok) {
                    // For successful responses, try to parse JSON but don't fail if it's not JSON
                    try {
                        const result = await response.json();
                        console.log(`✅ Successfully updated record ${recordId} to sort order ${newSortOrder}`);
                        successCount++;
                    } catch (jsonError) {
                        // If response isn't JSON but status is OK, still count as success
                        console.log(`✅ Successfully updated record ${recordId} to sort order ${newSortOrder} (non-JSON response)`);
                        successCount++;
                    }
                } else {
                    // Handle error responses - get response text first
                    const responseText = await response.text();
                    console.log(`❌ Failed to update record ${recordId} (${response.status}):`, responseText);
                    
                    let errorMsg;
                    try {
                        const errorData = JSON.parse(responseText);
                        errorMsg = `Failed to update record ${recordId}: ${errorData.errors || JSON.stringify(errorData)}`;
                    } catch (jsonError) {
                        errorMsg = `Failed to update record ${recordId} (${response.status}): ${responseText}`;
                    }
                    errors.push(errorMsg);
                    errorCount++;
                }
                
                // Add a small delay to avoid rate limiting (Knack allows 10 requests/second)
                await new Promise(resolve => setTimeout(resolve, 150));
                
            } catch (error) {
                const errorMsg = `Network error updating record ${recordId}: ${error.message}`;
                console.error('❌', errorMsg);
                errors.push(errorMsg);
                errorCount++;
            }
        }
        
        // Show results
        if (errorCount === 0) {
            console.log(`✅ Successfully updated ${successCount} records`);
            
            // Show success notification with custom styling
            const notificationHtml = `
                <div class="custom-notification custom-notification-success" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #caf4bc;
                    color: black;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    z-index: 10000;
                    font-family: 'Roboto', Arial, sans-serif;
                    font-size: 14px;
                    max-width: 300px;
                    word-wrap: break-word;
                ">
                    ✅ Record order updated successfully
                </div>
            `;
            $('body').append(notificationHtml);
            
            // Auto-hide the notification after 3 seconds
            setTimeout(() => {
                $('.custom-notification-success').fadeOut(500, function() {
                    $(this).remove();
                });
            }, 3000);
            
            // Refresh all the views to show updated data
            try {
                const views = ['view_1515', 'view_1516', 'view_1537'];
                let refreshedViews = 0;
                
                views.forEach(viewId => {
                    if (Knack.views && Knack.views[viewId]) {
                        Knack.views[viewId].model.fetch();
                        setTimeout(() => {
                            if (Knack.views[viewId].render) {
                                Knack.views[viewId].render();
                            }
                            refreshedViews++;
                        }, 500);
                    }
                });
                
                // If no views were refreshed, fallback to page reload
                if (refreshedViews === 0) {
                    location.reload();
                }
            } catch (refreshError) {
                console.log('✅ Updates successful! Please refresh the page to see the new order.');
            }
        } else {
            console.warn(`Updated ${successCount} records with ${errorCount} errors`);
            console.error('Errors:', errors);
            
            // Show error notification with custom styling
            const errorMessage = `Updated ${successCount} records, but ${errorCount} failed. Check console for details.`;
            const notificationHtml = `
                <div class="custom-notification custom-notification-error" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #ff9b9c;
                    color: black;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    z-index: 10000;
                    font-family: 'Roboto', Arial, sans-serif;
                    font-size: 14px;
                    max-width: 300px;
                    word-wrap: break-word;
                ">
                    ❌ ${errorMessage}
                </div>
            `;
            $('body').append(notificationHtml);
            
            // Auto-hide the notification after 5 seconds (longer for errors)
            setTimeout(() => {
                $('.custom-notification-error').fadeOut(500, function() {
                    $(this).remove();
                });
            }, 5000);
            
            alert(`Updated ${successCount} records, but ${errorCount} failed. Check console for details.`);
        }
        
    } catch (error) {
        console.error('Unexpected error:', error);
        
        // Show error notification with custom styling for unexpected errors
        const notificationHtml = `
            <div class="custom-notification custom-notification-error" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #ff9b9c;
                color: black;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                z-index: 10000;
                font-family: 'Roboto', Arial, sans-serif;
                font-size: 14px;
                max-width: 300px;
                word-wrap: break-word;
            ">
                ❌ An unexpected error occurred. Please try again.
            </div>
        `;
        $('body').append(notificationHtml);
        
        // Auto-hide the notification after 5 seconds
        setTimeout(() => {
            $('.custom-notification-error').fadeOut(500, function() {
                $(this).remove();
            });
        }, 5000);
        
        alert('An unexpected error occurred. Please try again.');
    } finally {
        hideCustomSpinner();
    }
}

// Custom prettier spinner functions
function showCustomSpinner() {
    // Hide default Knack spinner
    Knack.hideSpinner();
    
    // Create custom spinner overlay
    const spinnerHtml = `
        <div id="custom-spinner-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(3px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            font-family: 'Roboto', Arial, sans-serif;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                text-align: center;
                min-width: 200px;
                animation: fadeInScale 0.3s ease-out;
            ">
                <div class="custom-spinner" style="
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #4CAF50;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px auto;
                "></div>
                <div style="
                    color: #333;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 8px;
                ">Updating Record Order</div>
                <div style="
                    color: #666;
                    font-size: 14px;
                ">Please wait while we save your changes...</div>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes fadeInScale {
                0% { 
                    opacity: 0; 
                    transform: scale(0.8);
                }
                100% { 
                    opacity: 1; 
                    transform: scale(1);
                }
            }
        </style>
    `;
    
    $('body').append(spinnerHtml);
}

function hideCustomSpinner() {
    $('#custom-spinner-overlay').fadeOut(300, function() {
        $(this).remove();
    });
}

// Function to run before Knack finishes loading - load external libraries
KnackInitAsync = function($, callback) {
    window.$ = $;

    const scripts = [
        {src: 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'}
    ];

    // Use existing loadScripts function if available, otherwise define inline
    if (typeof loadScripts === 'function') {
        loadScripts(
            scripts, 
            callback,
            () => {console.log('error loading scripts');}
        );
    } else {
        // Inline script loading if loadScripts doesn't exist
        let loaded = 0;
        const total = scripts.length;
        
        if (total === 0) {
            callback();
            return;
        }
        
        scripts.forEach(script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script.src;
            scriptElement.onload = () => {
                loaded++;
                if (loaded === total) {
                    callback();
                }
            };
            scriptElement.onerror = () => {
                console.error('Failed to load script:', script.src);
                console.log('error loading scripts');
            };
            document.head.appendChild(scriptElement);
        });
    }
};

// Function to initialize sortable functionality for a specific view
function initializeSortableForView(viewId) {
    const $tableElement = $(`div#${viewId} table.kn-table`);

    if ($tableElement.length > 0) {
        // Add custom CSS for drag handle styling if not already added
        if (!$('#drag-handle-styles').length) {
            $('head').append(`
                <style id="drag-handle-styles">
                    .drag-handle-header {
                        width: 50px !important;
                        min-width: 50px !important;
                        max-width: 50px !important;
                        text-align: center !important;
                        vertical-align: middle !important;
                        padding: 8px !important;
                    }
                    
                    .drag-handle {
                        width: 50px !important;
                        min-width: 50px !important;
                        max-width: 50px !important;
                        text-align: center !important;
                        vertical-align: middle !important;
                        padding: 8px !important;
                        cursor: grab !important;
                        background-color: #f8f9fa !important;
                        border-right: 1px solid #dee2e6 !important;
                    }
                    
                    .drag-handle:hover {
                        background-color: #e9ecef !important;
                    }
                    
                    .drag-handle:active {
                        cursor: grabbing !important;
                    }
                    
                    .drag-handle i.fa-reorder {
                        font-size: 18px !important;
                        color: #6c757d !important;
                        line-height: 1 !important;
                    }
                    
                    .drag-handle:hover i.fa-reorder {
                        color: #495057 !important;
                    }
                </style>
            `);
        }

        // Add the table header for the drag handle column
        const $thead = $tableElement.find('thead');
        if ($thead.length > 0) {
            const $headerRow = $thead.find('tr');
            if ($headerRow.length > 0) {
                if (!$headerRow.find('.drag-handle-header').length) {
                   $headerRow.prepend('<th class="drag-handle-header"></th>');
                }
            }
        }

        // Add the drag handle cell to each row
        $tableElement.find('tbody tr').each(function() {
            if (!$(this).find('.drag-handle').length) {
                $(this).prepend('<td class="drag-handle"><i class="fa fa-reorder"></i></td>');
            }
        });

        const tbodyElement = $tableElement.find('tbody').get(0);

        if (tbodyElement) {
            new Sortable(tbodyElement, {
                animation: 150,
                ghostClass: 'sortable-blue-background-class',
                handle: '.drag-handle',
                onEnd: function (evt) {
                    const newOrder = [];
                    $(evt.from).children().each(function(index) {
                        const recordId = $(this).attr('id');
                        if (recordId) {
                            // Extract just the record ID from the full element ID
                            const cleanRecordId = recordId.replace('kn-table-row-', '');
                            newOrder.push({
                                recordId: cleanRecordId,
                                newSortOrder: index + 1 // 1-based index for sort order
                            });
                        }
                    });

                    console.log(`New order for ${viewId}:`, newOrder);
                    saveNewOrder(newOrder);
                }
            });
        }
    }
}

// Render the SortableJS simple list component into multiple Knack views
$(document).on("knack-view-render.view_1515", function(event, page) {
    initializeSortableForView('view_1515');
});

$(document).on("knack-view-render.view_1516", function(event, page) {
    initializeSortableForView('view_1516');
});

$(document).on("knack-view-render.view_1537", function(event, page) {
    initializeSortableForView('view_1537');
});

//Generic Helper function to load scripts into a Knack app
const loadScripts = (scripts, onSuccess, onFailure) => {
    let loadedScripts = 0;
    let failedScripts = 0;

    if(typeof onSuccess !== 'function'){
        onSuccess = function(){
            console.log('Scripts loaded');
        }
    }

    if(typeof onFailure !== 'function'){
        onFailure = function(){
            console.error('Failed to load scripts');
        }
    }

    scripts.forEach(({ src, type }) => {
        const script = document.createElement('script');
        script.src = src;
        if (type) {
            script.type = type;
        }

        script.addEventListener('load', () => {
            loadedScripts++;
            if (loadedScripts === scripts.length) {
                onSuccess();
            }
        });

        script.addEventListener('error', () => {
            failedScripts++;
            onFailure();
        });

        document.body.appendChild(script);
    });
};

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

/****************************/
/*** Auto Refresh Browser ***/
/****************************/
/*1st Page of Draft Builder*/
$(document).on("knack-scene-render.scene_697", function () {
  setInterval(function() {
    location.reload();
  }, 20000); // Refreshes every 20 seconds (20000 milliseconds)
});

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



