// Self-validating form
function validateForm() {

  // Get input values using getElementById
  var name  = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  // Get error message elements
  var nameError  = document.getElementById("nameError");
  var emailError = document.getElementById("emailError");
  var successMsg = document.getElementById("successMsg");

  // Clear any previous error messages
  nameError.innerHTML  = "";
  emailError.innerHTML = "";
  successMsg.innerHTML = "";

  // Track if form is valid
  var isValid = true;

  // Validate name field - mandatory
  if (name === "") {
    // Show error on page - not alert box
    nameError.innerHTML = "Full name is required.";
    isValid = false;
  }

  // Validate email field - mandatory and must contain @ and .
  if (email === "") {
    emailError.innerHTML = " Email address is required.";
    isValid = false;

  // Check for @ and . symbols
  } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    emailError.innerHTML = " Please enter a valid email containing '@' and '.'.";
    isValid = false;
  }

  // If valid show success message and reset form
  if (isValid === true) {
    successMsg.innerHTML = " Thank you, " + name + "! Your reservation request has been received. We will confirm at " + email + " shortly.";
    document.getElementById("contactForm").reset();
  }

  // Return false to prevent page reload
  return false;

}

// Correct answers stored in an array
var correctAnswers = ["b", "c", "b", "b"];

// Answer text array for showing correct answers in feedback
var answerTexts = [
  "Pork bone",
  "Battered and deep-fried food",
  "Fermented soybean paste",
  "Its highly marbled premium beef"
];


// Self-correcting quiz - checks all answers using a for loop
function checkQuiz() {

  // Count correct answers
  var score = 0;
  var total = 4;

  // Loop through all questions
  for (var i = 1; i <= total; i++) {

    var questionName = "q" + i;
    var feedback = document.getElementById(questionName + "-feedback");

    // Find selected radio button using getElementsByName
    var selected = "";
    var radios = document.getElementsByName(questionName);

    for (var j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        selected = radios[j].value;
      }
    }

    // Check answer and show feedback on page
    if (selected === "") {
      feedback.innerHTML = "Please select an answer!";
      feedback.className = "quiz-feedback incorrect";

    } else if (selected === correctAnswers[i - 1]) {
      feedback.innerHTML = " Correct!";
      feedback.className = "quiz-feedback correct";
      score++;

    } else {
      feedback.innerHTML = " Incorrect. The answer is: " + answerTexts[i - 1];
      feedback.className = "quiz-feedback incorrect";
    }

  }

  // Show final score
  var result = document.getElementById("quizResult");
  result.style.display = "block";

  // Display different message based on score
  if (score === total) {
    result.innerHTML = " Perfect! " + score + "/" + total + " You are a Japanese cuisine expert!";
    result.style.color = "#44cc77";
    result.style.background = "rgba(68,204,119,0.1)";

  } else if (score >= 2) {
    result.innerHTML = " Good job! " + score + "/" + total + " Keep exploring Japanese cuisine!";
    result.style.color = "#ffaa33";
    result.style.background = "rgba(255,170,51,0.1)";

  } else {
    result.innerHTML = " You scored " + score + "/" + total + "Visit Inferno and taste the difference!";
    result.style.color = "#ff4455";
    result.style.background = "rgba(255,68,85,0.1)";
  }

  // Show reset button and hide submit button
  document.getElementById("resetBtn").style.display = "inline-block";
  document.querySelector(".btn-quiz").style.display = "none";

}


// Reset quiz - clears all answers and feedback
function resetQuiz() {

  var total = 4;

  // Loop through questions and reset each one
  for (var i = 1; i <= total; i++) {

    var questionName = "q" + i;

    // Clear feedback
    var feedback = document.getElementById(questionName + "-feedback");
    feedback.innerHTML = "";
    feedback.className = "quiz-feedback";

    // Uncheck all radio buttons
    var radios = document.getElementsByName(questionName);
    for (var j = 0; j < radios.length; j++) {
      radios[j].checked = false;
    }

  }

  // Hide result and reset button, show submit button
  document.getElementById("quizResult").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
  document.querySelector(".btn-quiz").style.display = "inline-block";

}


// Display opening hours and open/closed status
function displayHours() {

  // Get current day and hour
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();

  // Check if today is weekday or weekend
  var hoursText = "";
  var isOpen = false;

  if (day >= 1 && day <= 5) {
    // Weekdays: open 12:00pm to 11:00pm (hour 12 to 22 inclusive)
    hoursText = "Monday – Friday: 12:00pm – 11:00pm";
    if (hour >= 12 && hour <= 22) {
      isOpen = true;
    }
  } else {
    // Weekend: open 11:00am to 12:00am midnight (hour 11 to 23 inclusive)
    hoursText = "Saturday – Sunday: 11:00am – 12:00am";
    if (hour >= 11 && hour <= 23) {
      isOpen = true;
    }
  }

  // Show hours and open/closed status using getElementById
  var hoursDisplay = document.getElementById("hoursDisplay");

  if (isOpen) {
    hoursDisplay.innerHTML = hoursText + "<br><span class='status-open'>We are Open Now</span>";
  } else {
    hoursDisplay.innerHTML = hoursText + "<br><span class='status-closed'>We are Closed Now</span>";
  }

}

// Run displayHours when page loads
window.onload = function() {
  displayHours();
};