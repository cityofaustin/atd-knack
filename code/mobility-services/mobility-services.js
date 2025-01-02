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
  // create large SIGN UP or Log-In button on the PORTAL page
    bigButton('sign-up', 'view_41', "https://atd.knack.com/mobility-services#sign-up", "sign-in", "Sign up or Log In ");
});
$(document).on('knack-view-render.view_57', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_57', "https://atd.knack.com/mobility-services#portal/", "arrow-right", "Mobility Services Portal");
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

/***************************************************************************
 ********************************* QUIZ ************************************
 ***************************************************************************/

 $(document).on('knack-view-render.view_584', function(event, view, data) {
  console.log("Quiz manager script is running!");

  const headers = {
    'X-Knack-Application-Id': Knack.application_id,
    'Authorization': Knack.getUserToken(),
    'Content-Type': 'application/json'
  };

  // Global state variables
  let currentQuiz = null;
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let totalQuestions = 0;

  /***************************************************************************
   * CSS STYLES
   * Defines all styling for quiz components including:
   * - Container layout
   * - Quiz selector styling
   * - Answer button appearance
   * - Progress bar
   * - Score display
   ***************************************************************************/
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      #quiz-container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
      #quiz-container h2 { color: #333; }
      #quiz-container h3 { color: #2c3e50; margin-bottom: 20px; }
      #quiz-selector { margin-bottom: 20px; }
      #quiz-selector select { 
        width: 100%; 
        padding: 10px; 
        margin-bottom: 10px;
        border-radius: 5px;
      }
      #answers button { 
        display: block; width: 100%; padding: 10px; margin-bottom: 10px; 
        background-color: #3498db; color: white; border: none; 
        border-radius: 5px; cursor: pointer; transition: background-color 0.3s;
        text-align: left;
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
      .score-details {
        margin-top: 15px;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 5px;
        font-size: 16px;
      }
      .score-details p {
        margin: 5px 0;
      }
    `)
    .appendTo('head');

  /***************************************************************************
   * QUIZ DATA FETCHING
   * Functions to retrieve quiz data from Knack API:
   * - fetchQuizzes: Gets list of available quizzes
   * - fetchQuestions: Gets questions for selected quiz
   * - Includes pagination handling for large question sets
   ***************************************************************************/
  function fetchQuizzes() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://api.knack.com/v1/objects/object_19/records',
        type: 'GET',
        headers: headers,
        success: function(response) {
          console.log('Available quizzes:', response);
          resolve(response.records);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Failed to fetch quizzes:', { status: jqXHR.status, textStatus, errorThrown });
          reject(new Error(`Failed to fetch quizzes: ${textStatus}`));
        }
      });
    });
  }

  function fetchQuestions(quizId) {
    return new Promise((resolve, reject) => {
      function fetchPage(page = 1, accumulator = []) {
        $.ajax({
          url: `https://api.knack.com/v1/objects/object_21/records?filters=[{"field":"field_331","operator":"is","value":"${quizId}"}]&page=${page}&rows_per_page=1000`,
          type: 'GET',
          headers: headers,
          success: function(response) {
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
            console.error('API Error:', { status: jqXHR.status, textStatus, errorThrown });
            reject(new Error(`Failed to fetch questions: ${textStatus}`));
          }
        });
      }

      function processQuestions(records) {
        const mappedQuestions = records.map(record => {
          const answers = [
            record.field_323, // A
            record.field_324, // B
            record.field_325, // C
            record.field_326, // D
            record.field_327, // E
            record.field_328, // F
            record.field_329  // G
          ].filter(answer => answer);

          const correctAnswer = record.field_330;
          if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(correctAnswer)) {
            console.warn('Warning: Invalid correct answer', correctAnswer);
            return null;
          }

          return {
            id: record.id,
            questionNumber: record.field_321,
            question: record.field_322,
            answers: answers,
            correctAnswer: correctAnswer,
            quizId: record.field_331
          };
        }).filter(q => q !== null);

        console.log('Mapped questions for quiz:', mappedQuestions);
        resolve(mappedQuestions);
      }

      fetchPage();
    });
  }

  /***************************************************************************
   * QUIZ RESULTS HANDLING
   * Manages saving quiz results to Knack:
   * - Saves score, timestamp (UTC-6), and attempt information
   * - Handles API response and error states
   ***************************************************************************/
  function saveQuizResults(correctAnswers, totalQuestions) {
    const userId = Knack.getUserAttributes().id;
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    // Subtract 6 hours from the current time
    const now = new Date();
    const sixHoursInMs = 6 * 60 * 60 * 1000;
    const adjustedTime = new Date(now.getTime() - sixHoursInMs);
    
    const data = {
      field_332: [userId],                    // Quiz Taker connection
      field_333: adjustedTime.toISOString(),  // Date/Time minus 6 hours
      field_334: percentage,                  // Score percentage
      field_335: correctAnswers.toString(),   // Correct Answers
      field_336: totalQuestions.toString(),   // Total Questions
      field_337: [currentQuiz.id]            // Quiz-Parent connection
    };

    $.ajax({
      url: 'https://api.knack.com/v1/objects/object_22/records',
      type: 'POST',
      headers: headers,
      data: JSON.stringify(data),
      success: function(response) {
        console.log('Quiz results saved successfully:', response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Failed to save quiz results:', {
          status: jqXHR.status,
          textStatus: textStatus,
          error: errorThrown,
          responseText: jqXHR.responseText,
          sentData: data
        });
        alert('Failed to save quiz results. Check browser console for details.');
      }
    });
  }

  /***************************************************************************
   * QUIZ DISPLAY AND INTERACTION
   * Core quiz functionality including:
   * - Question display and randomization
   * - Answer handling
   * - Progress tracking
   * - Score calculation
   ***************************************************************************/
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    
    $('#quiz-container').html(`
      <div id="progress">Question ${currentQuestionIndex + 1} of ${questions.length}</div>
      <div id="progress-bar">
        <div id="progress-bar-inner" style="width: ${progressPercent}%"></div>
      </div>
      <h3>${question.question}</h3>
      <div id="answers"></div>
    `);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    question.answers.forEach((answer, index) => {
      $('#answers').append(`
        <button data-answer="${letters[index]}">${letters[index]}. ${answer}</button>
      `);
    });

    $('#answers button').click(function() {
      const selectedAnswer = $(this).data('answer');
      checkAnswer(selectedAnswer);
    });
  }

  function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  /***************************************************************************
   * QUIZ COMPLETION AND RESULTS
   * Handles end-of-quiz operations:
   * - Final score calculation
   * - Results display
   * - Attempt tracking
   * - Return to quiz selection
   ***************************************************************************/
  async function endQuiz() {
    const percentage = (score / questions.length) * 100;
    const userId = Knack.getUserAttributes().id;
    
    // Get current attempts
    const attemptsResponse = await 
    $.ajax({
      url: `https://api.knack.com/v1/objects/object_22/records?filters=[{"field":"field_332","operator":"is","value":"${userId}"}]`,
      type: 'GET',
      headers: headers
    });

    const attempts = attemptsResponse.records.filter(record => 
      record.field_337_raw && record.field_337_raw.length && 
      record.field_337_raw[0].id === currentQuiz.id
    );

    const remainingAttempts = 3 - attempts.length;
    const attemptsMessage = percentage < 72 ? 
      `<p class="attempts-remaining">You have ${remainingAttempts - 1} attempts remaining for this quiz.</p>` : '';

    $('#quiz-container').html(`
      <h2>Quiz Complete!</h2>
      <div class="score-details">
        <p>Quiz: ${currentQuiz.field_319}</p>
        <p>Correct Answers: ${score} out of ${questions.length}</p>
        <p>Score: ${percentage.toFixed(1)}%</p>
        ${attemptsMessage}
      </div>
      <button id="return-button" style="margin-top: 20px;">Back to Quiz Home</button>
    `);

    saveQuizResults(score, questions.length);

    $('#return-button').click(function() {
      initializeQuiz();
    });
  }

  /***************************************************************************
   * QUIZ INITIALIZATION AND STATE MANAGEMENT
   * Main control flow for quiz system:
   * - Initial setup and quiz selection
   * - Attempt validation
   * - 24-hour waiting period enforcement
   * - Maximum attempts (3) enforcement
   * - Error handling
   ***************************************************************************/
  async function initializeQuiz() {
    try {
      // Show loading state immediately
      $('#quiz-container').html(`
        <div style="text-align: center; padding: 20px;">
          <h2>Loading quizzes...</h2>
        </div>
      `);

      const userId = Knack.getUserAttributes().id;
      const selectedQuiz = new URLSearchParams(window.location.search).get('quiz');
      
      // Run API calls in parallel
      const [attemptsResponse, quizzes] = await Promise.all([
        $.ajax({
          url: `https://api.knack.com/v1/objects/object_22/records?filters=[{"field":"field_332","operator":"is","value":"${userId}"}]`,
          type: 'GET',
          headers: headers
        }),
        fetchQuizzes()
      ]);
      
      // Render quiz selector
      $('#quiz-container').html(`
        <div id="quiz-selector">
          <h2>Select a Quiz</h2>
          <select id="quiz-select">
            <option value="">Choose a quiz...</option>
            ${quizzes.map(quiz => `
              <option value="${quiz.id}" ${selectedQuiz === quiz.id ? 'selected' : ''}>${quiz.field_319}</option>
            `).join('')}
          </select>
        </div>
      `);

      $('#quiz-select').change(async function() {
        const selectedQuizId = $(this).val();
        if (selectedQuizId) {
          // Check attempts for selected quiz
          const attempts = attemptsResponse.records.filter(record => 
            record.field_337_raw && record.field_337_raw.length && 
            record.field_337_raw[0].id === selectedQuizId
          );

          // Get most recent attempt with UTC-6 time comparison
          const sortedAttempts = attempts.sort((a, b) => 
            new Date(b.field_333) - new Date(a.field_333)
          );

          if (sortedAttempts.length > 0) {
            const lastAttemptTime = new Date(sortedAttempts[0].field_333).getTime();
            const currentTime = new Date().getTime();
            const hoursSinceLastAttempt = (currentTime - lastAttemptTime) / (1000 * 60 * 60);

            console.log('Last attempt:', new Date(lastAttemptTime).toLocaleString());
            console.log('Current time:', new Date(currentTime).toLocaleString());
            console.log('Hours since last attempt:', hoursSinceLastAttempt);

            if (hoursSinceLastAttempt < 24) {
              const hoursRemaining = Math.ceil(24 - hoursSinceLastAttempt);
              const attemptsRemaining = 3 - attempts.length;
              $('#quiz-container').html(`
                <div class="error">
                  <h2>Waiting Period Required</h2>
                  <p>Please wait ${hoursRemaining} more hours before attempting this quiz again.</p>
                  <p>You have ${attemptsRemaining} attempt${attemptsRemaining !== 1 ? 's' : ''} remaining for this quiz.</p>
                  <button id="return-button" style="margin-top: 20px;">Back to Quiz Home</button>
                </div>
              `);
              $('#return-button').click(function() {
                initializeQuiz();
              });
              return;
            }
          }

          if (attempts.length >= 3) {
            $('#quiz-container').html(`
              <div class="error">
                <h2>Maximum Attempts Reached</h2>
                <p>You have already attempted this quiz 3 times.</p>
                <p>Please contact staff for instructions on retesting at a later date.</p>
                <button id="return-button" style="margin-top: 20px;">Back to Quiz Home</button>
              </div>
            `);
            $('#return-button').click(function() {
              initializeQuiz();
            });
            return;
          }
          
          currentQuiz = quizzes.find(q => q.id === selectedQuizId);
          questions = await fetchQuestions(selectedQuizId);
          questions = shuffleArray(questions);
          currentQuestionIndex = 0;
          score = 0;
          displayQuestion();
        }
      });

      // Auto-select quiz if passed in URL
      if (selectedQuiz) {
        $('#quiz-select').val(selectedQuiz).trigger('change');
      }

    } catch (error) {
      console.error('Failed to initialize quiz:', error);
      $('#quiz-container').html(`
        <div class="error">
          Failed to load quiz. Please try again later.
        </div>
      `);
    }
  }

  // Initialize the quiz when the view loads
  initializeQuiz();
});