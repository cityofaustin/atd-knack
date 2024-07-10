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
  /* Validation */
  $("input#field_33").attr('maxlength', 11);
  $("input#field_33").attr('placeholder',"___ __ ____");

});

/********************************************************/
/********** Show character limit on text type ***********/
/********************************************************/
/* Function shows character limit of the text field when filling out the filed in a a form view.*/
function showCharacterLimit(view_id, field_id, charLimit) {
  /* Function returns list as message text and css based on the input length and character limit */
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

  /* Shows the message after field input based on character limit and length */
  $(document).on("knack-view-render." + view_id, function(event, view, data) {
    /* When first viewing the field input */
    const formViewFieldID = ".kn-form.kn-view."+ view_id + " form #" + field_id;
    const fieldMessage = showMessage($(formViewFieldID))[0]; 
    $(formViewFieldID).after(`<p class='typed-chars'>${fieldMessage}</p>`);
    
    /* When user is typing in the input field change the text and CSS */
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
}; // This closes the showCharacterLimit function

const textBoxFieldIDs = [48, 49, 52, 53, 76, 86, 56]; // lists paragraph fields
/* Character limit */
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

/***************************************/
/***** Print Menu Button ************/
/***************************************/
function printMenuButton(view_id) {
  $('#' + view_id + ' .knMenuLink').click(function(e) {
    window.print();
  });
}

/* Print 3 pages menu view button */
$(document).on('knack-view-render.view_227', function(event, view, data) {
  printMenuButton('view_227');
});

/* Print 4 pages menu view button */
$(document).on('knack-view-render.view_228', function(event, view, data) {
  printMenuButton('view_228');
});
