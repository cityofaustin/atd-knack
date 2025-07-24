/********************************************/
/*************** Big Buttons ****************/
/********************************************/
const appURL = "test-91724-msp-mobility-services";
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
    bigButton('available-services', 'view_11', `https://atd.knack.com/${appURL}#available-services/`, "list-ul", "Available Services");
});
$(document).on('knack-view-render.view_16', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_16', `https://atd.knack.com/${appURL}#portal/`, "child", "Customer Portal");
});
$(document).on('knack-view-render.view_34', function(event, page) {
  // create large REQUIRED DOCUMENTS button on the CHAUFFEUR page
    bigButton('required-documents-chauffeur', 'view_34', `https://atd.knack.com/${appURL}#chauffeur-permit/required-documents-chauffeur/`, "files-o", "Required Documents");
});
$(document).on('knack-view-render.view_36', function(event, page) {
  // create large START APPLICATION button on the CHAUFFEUR page
    bigButton('start-application', 'view_36', `https://atd.knack.com/${appURL}#application-chauffeur/`, "arrow-right", "Start Chauffeur Application");
});
$(document).on('knack-view-render.view_41', function(event, page) {
  // create large SIGN UP or Log-In button on the PORTAL page
    bigButton('sign-up', 'view_41', `https://atd.knack.com/${appURL}#sign-up`, "sign-in", "Sign up or Log In ");
});
$(document).on('knack-view-render.view_57', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_57', `https://atd.knack.com/${appURL}#portal/`, "arrow-right", "Mobility Services Portal");
});

/***************************************/
/**** Input validation for SSN ********/
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
  });
  $("input#field_33").attr('maxlength', 4); // only max is 4 length
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
$(document).on('knack-view-render.view_227', function(event, view, data) { // Customer Print
  printMenuButton('view_227');
});

$(document).on('knack-view-render.view_315', function(event, view, data) { // Reviewer Print
  printMenuButton('view_315');
});

/* Print 4 pages menu view button */
$(document).on('knack-view-render.view_228', function(event, view, data) { // Customer Print
  printMenuButton('view_228');
});

$(document).on('knack-view-render.view_304', function(event, view, data) { // Reviewer Print
  printMenuButton('view_304'); 
});

/***************************************
 * Enhance SSO button and hide/show default Knack login form with buttons
 * @parameter {string} viewId - Knack view id to append button link to
/***************************************/
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

/********************************************/
/**************** Quiz App ******************/
/********************************************/

$(document).on('knack-view-render.view_363', function(event, view, data) {
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  // Add CSS styles
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      #quiz-container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
      #quiz-container h2 { color: #333; }
      #quiz-container h3 { color: #2c3e50; margin-bottom: 20px; }
      #answers button { 
        display: block; width: 100%; padding: 10px; margin-bottom: 10px; 
        background-color: #3498db; color: white; border: none; 
        border-radius: 5px; cursor: pointer; transition: background-color 0.3s;
        text-align: left; /* Left-justify text */
      }
      #answers button:hover { background-color: #2980b9; }
      #answers button:disabled { background-color: #bdc3c7; cursor: not-allowed; }
      #result { margin-top: 20px; font-weight: bold; }
      #progress { margin-bottom: 20px; }
      #progress-bar { 
        width: 100%; background-color: #f3f3f3; 
        border-radius: 13px; padding: 3px;
      }
      #progress-bar-inner { 
        height: 20px; background-color: #4CAF50; 
        border-radius: 10px; transition: width 0.5s;
      }
    `)
    .appendTo('head');

  function log(message, data) {
    console.log(message, JSON.stringify(data, null, 2));
  }

  // This code does not work currently due to headers 
  function fetchQuestions() {
    return new Promise((resolve, reject) => {
      function fetchPage(page = 1, accumulator = []) {
        $.ajax({
          url: `https://api.knack.com/v1/objects/object_14/records?page=${page}&rows_per_page=1000`,
          type: 'GET',
          headers: {
            'X-Knack-Application-Id': 'XXXXXXXXXXXXXXXXXXXXX', 
            'X-Knack-REST-API-KEY': 'XXXXXXXXXXXXXXXXXXXXXXX' 
          },
          success: function(response) {
            log(`API Response (Page ${page}):`, response);
            if (response && response.records) {
              const newAccumulator = accumulator.concat(response.records);
              if (response.current_page < response.total_pages) {
                fetchPage(page + 1, newAccumulator);
              } else {
                processQuestions(newAccumulator);
              }
            } else {
              reject(new Error('Invalid response format'));
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            log('API Error:', { status: jqXHR.status, textStatus, errorThrown });
            reject(new Error(`Failed to fetch questions: ${textStatus}`));
          }
        });
      }

      function processQuestions(records) {
        const mappedQuestions = records.map(record => {
          log('Processing record:', record);
          const answers = [
            record.field_196, // A
            record.field_197, // B
            record.field_198, // C
            record.field_199, // D
            record.field_200, // E
            record.field_201, // F
            record.field_202  // G
          ].filter(answer => answer); // Remove empty answers

          const correctAnswer = record.field_203;
          if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(correctAnswer)) {
            log('Warning: Invalid correct answer', correctAnswer);
            return null; // Skip this question
          }

          return {
            question: record.field_195,
            answers: answers,
            correctAnswer: correctAnswer
          };
        }).filter(q => q !== null); // Remove any skipped questions

        log('Total mapped questions:', mappedQuestions.length);
        log('Mapped questions:', mappedQuestions);
        
        if (mappedQuestions.length !== 25) {
          log('Warning: Expected 25 questions, but got', mappedQuestions.length);
        }
        resolve(mappedQuestions);
      }

      fetchPage();
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      log('Displaying question:', question);
      const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
      $('#quiz-container').html(`
        <div id="progress">
          Question ${currentQuestionIndex + 1} of ${questions.length}
          <div id="progress-bar">
            <div id="progress-bar-inner" style="width: ${progress}%;"></div>
          </div>
        </div>
        <h3>${question.question}</h3>
        <div id="answers"></div>
        <div id="result"></div>
      `);
      const $answersContainer = $('#answers');
      question.answers.forEach((answer, index) => {
        $('<button>')
          .text(answer)
          .on('click', () => checkAnswer(index))
          .appendTo($answersContainer);
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    log('Checking answer:', { question, selectedIndex });
    const correctAnswerIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].indexOf(question.correctAnswer);
    log('Correct answer index:', correctAnswerIndex);
    
    if (correctAnswerIndex === -1) {
      log('Error: Invalid correct answer', question.correctAnswer);
      $('#result').html('<p style="color: red;">Error: Unable to determine correct answer</p>');
    } else if (selectedIndex === correctAnswerIndex) {
      score++;
      $('#result').html('<p style="color: green;">Correct!</p>');
    } else {
      $('#result').html(`
        <p style="color: red;">Incorrect</p>
        <p>The correct answer is: ${question.answers[correctAnswerIndex]}</p>
      `);
    }
    $('#answers button').prop('disabled', true);
    setTimeout(() => {
      currentQuestionIndex++;
      displayQuestion();
    }, 1000); // 1 seconds delay
  }

  function endQuiz() {
    const percentage = (score / questions.length) * 100;
    $('#quiz-container').html(`
      <h2>Quiz Complete!</h2>
      <p>You scored ${score} out of ${questions.length} (${percentage.toFixed(2)}%)</p>
      <button id="restart-quiz">Restart Quiz</button>
    `);
    $('#restart-quiz').on('click', initializeQuiz);
  }

  function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    $('#quiz-container').html('<p>Loading quiz...</p>');
    fetchQuestions()
      .then(function(fetchedQuestions) {
        questions = fetchedQuestions;
        log('Fetched questions:', questions);
        if (questions.length === 0) {
          throw new Error('No questions fetched');
        }
        if (questions.length !== 25) {
          log('Warning: Expected 25 questions, but got ' + questions.length);
        }
        shuffleArray(questions);
        displayQuestion();
      })
      .catch(function(error) {
        console.error('Error initializing quiz:', error);
        $('#quiz-container').html(`<p>Error loading quiz: ${error.message}. Please try again later.</p>`);
      });
  }

  initializeQuiz();
});