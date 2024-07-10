/***************************************/
/***** Print Menu Button ************/
/***************************************/
function printMenuButton(view_id) {
  $(document).on('knack-view-render.' + view_id, function(event, view, data) {
      $('#' + view_id + ' .knMenuLink').click(function(e) {
        window.print();
      });
  });
}

printMenuButton('view_227'); // Print 3 pages
printMenuButton('view_228'); // Print 4 pages

/***************************************/
/**** Input Mask number for SSN ********/
/***************************************/

$(document).on('knack-view-render.any', function (event, view, data) {
  $('input#field_33').keyup(function(event) { // validates typing
    this.value = this.value.replace(/[-]/g, ''); // replace hyphens with nothing

    if (event.key === 'Backspace') { // ignore if backspace
      return;
    } else if (event.key === ' ') { // reject " "
      this.value = this.value.replace(/[\s]/g, ''); // replace space with nothing
    } else if (isNaN(Number(event.key))) { // if not number
      this.value = this.value.replace(/[^0-9\s-]+/g, '');
    }
    if (this.value.charAt(3) != " "){
      this.value = this.value.replace(/^(.{3})(.*)$/, "$1 $2"); // replace if no space at 4th position
    }
    if (this.value.charAt(6) != " "){ // replace if no spaces at 7th position
      this.value = this.value.replace(/^(.{6})(.*)$/, "$1 $2");
    }

  });
  // Validation
  $("input#field_33").attr('maxlength', 11);
  $("input#field_33").attr('placeholder',"___ __ ____");

});

/********************************************************/
/********** Show character limit on text type ***********/
/********************************************************/
function showCharacterLimit(view_id, field_id, charLimit) {
  // Function returns list as message string and css dictionary based on the input length and character limit
  function showMessage(inputField) {
    const fieldLength = inputField.val().length;
    var inputLength = Math.abs(charLimit - fieldLength); // No negative numbers 
    var fieldText = fieldLength == 0 ? "allowed" : "left";
    var cssField = {"color": "#4a4a4a", "font-weight": "normal"};
    if (fieldLength > charLimit) { // if the length is over the character limit change the CSS and text
      cssField = {"color": "#ff0000", "font-weight": "bold"}; // make text red and bold instead
      fieldText = "over limit"; // Will say "XXX characters over limit" instead
    }
    return [inputLength + " characters " + fieldText,cssField]; // returns list as [str message, dict css]
  }

  // Shows the message after field input based on character limit and length
  $(document).on("knack-view-render." + view_id, function(event, view, data) {
    // When first viewing the field input
    const formViewFieldID = ".kn-form.kn-view."+ view_id + " form #" + field_id;
    const fieldMessage = showMessage($(formViewFieldID))[0]; 
    $(formViewFieldID).after(`<p class='typed-chars'>${fieldMessage}</p>`);
    
    // When user is typing in the input field change the text and CSS
    $(document).ready(function() { 
      $(formViewFieldID).on('input',function(e){
        const $input = $(this);
        const inputMessage = showMessage($input)[0];
        const cssField = showMessage($input)[1];
        $input.siblings('.typed-chars').text(inputMessage); // Set text message of field
        $input.siblings('.typed-chars').css(cssField); // Set CSS of typed-chars class
      });
    });
  });
};

const textBoxFieldIDs = [48, 49, 52, 53, 76, 86, 56]; // lists paragraph fields
// Character limit 
for (let i = 0; i < textBoxFieldIDs.length; i++) {
  showCharacterLimit('view_83','field_'+ textBoxFieldIDs[i],500); // background info page view
  showCharacterLimit('view_155','field_'+ textBoxFieldIDs[i],500); // edit application page view
}

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/
$(document).on('knack-view-render.any', function(event, view, data) {
 $("a.kn-view-asset").html("View"); 
});

/****************************************************/
/*** Disable Trigger buttons from being Clickable ***/
/****************************************************/
$(document).on('knack-scene-render.any', function(event, view) {
  var $disabledTriggerButton = $(".trigger-button-large-disabled").parent();
  $disabledTriggerButton.removeClass("kn-action-link");
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
	//>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_11', function(event, page) {
  // create large AVAILABLE SERVICES button on the PORTAL page
    bigButton('available-services', 'view_11', "https://atd.knack.com/mobility-services#available-services/", "list-ul", "Available Services");
});
$(document).on('knack-view-render.view_16', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_16', "https://atd.knack.com/mobility-services#portal/", "child", "Customer Portal");
});
$(document).on('knack-view-render.view_34', function(event, page) {
  // create large REQUIRED DOCUMENTS button on the CHAUFFEUR page
    bigButton('required-documents-chauffeur', 'view_34', "https://atd.knack.com/mobility-services#chauffeur-permit/required-documents-chauffeur/", "files-o", "Required Documents");
});
$(document).on('knack-view-render.view_36', function(event, page) {
  // create large START APPLICATION button on the CHAUFFEUR page
    bigButton('start-application', 'view_36', "https://atd.knack.com/mobility-services#application-chauffeur/", "arrow-right", "Start Chauffeur Application");
});
$(document).on('knack-view-render.view_41', function(event, page) {
  // create large START APPLICATION button on the CHAUFFEUR page
    bigButton('sign-up', 'view_41', "https://atd.knack.com/mobility-services#sign-up", "sign-in", "Sign up or Log In ");
});
$(document).on('knack-view-render.view_57', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_57', "https://atd.knack.com/mobility-services#portal/", "arrow-right", "Mobility Services Portal");
});
