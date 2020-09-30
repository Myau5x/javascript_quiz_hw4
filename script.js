var questions = [{question: "What operator we use in JS to check that values are equal and have equal type" , answers :["=","==","===","===="], correct: 2},{question: "What is the right way to create array " , answers :["['a','b','c']","('a','b','c')","{'a','b','c'}"], correct: 0},{question: "Which of the following is a valid type of function javascript supports?" , answers :["named function","anonymous function","Both of the above","None of the above"], correct: 2},{question: "Which built-in method sorts the elements of an array?" , answers :["changeOrder(order)","sort()","order()","None of the above."], correct: 1},{question: "Q5" , answers :["q5a1","q5a2","q5a3","q5a4"], correct: 0}];
var timer = 75;
var startBtn = document.querySelector("#start");
var mainEl = document.querySelector("main");
var commentEl = document.querySelector("#comment");
let timerEl = document.querySelector("#timer");

var qNumber = 0;
var scores = 0;
///change to []
let highScores = [];
let stopTimer = false;

  
  function storeHigh() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }



function start(event){
    event.preventDefault();
    console.log("start from 1st question");
    setTime();
    renderQuestions(qNumber);
}

function renderQuestions(j){

    mainEl.innerHTML = "";
    let q = questions[j];
    let ans = q.answers;
    var h2 = document.createElement("h2");
    var ulEL = document.createElement("ol");
    mainEl.appendChild(h2);
    h2.textContent = q.question;
    mainEl.appendChild(ulEL);
  
    // Render a new li for each answer
    for (var i = 0; i < ans.length; i++) {
      var curAns = ans[i];
  
      var li = document.createElement("li");
      li.textContent = "";
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = curAns;
  
      li.appendChild(button);
      ulEL.appendChild(li);
    }
}

function checkCorrect(event){
    let element = event.target;
    let ind = parseInt( element.parentElement.getAttribute("data-index"));
    console.log("chosen answer is "+ind);
    if (ind ===questions[qNumber].correct){
        commentEl.textContent = "Correct";
        scores+=10;

    }
    else{
        commentEl.textContent = "Wrong";
        timer-=10;
        timerEl.textContent = timer
    }
}

function finish(){
    /// have to call after timer too
    /// show form to submit initials
    mainEl.innerHTML = "";
    mainEl.innerHTML = '<form id="in-form" method="POST"> <label for="initials">Add a Initials:</label> <input type="text" placeholder="Your initials" name="initials" id="initials" /></form>'
    var inInput = document.querySelector("#initials");
    var inForm = document.querySelector("#in-form");
    var h3 = document.createElement("h3")
    scores = scores +Math.floor(timer/10);
    h3.textContent = "Your score is "+scores;
    mainEl.appendChild(h3);
    stopTimer = true;
    
    inForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var in_text = inInput.value.trim();
      
        // Return from function early if submitted todoText is blank
        /*
        if (in_text === "") {
          return;
        }
      */
        // Add new todoText to todos array, clear the input
        var storedHigh = JSON.parse(localStorage.getItem("highScores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
        if (storedHigh !== null) {
        highScores = storedHigh;
        }

        highScores.push({name:in_text.toUpperCase(), score:scores});
        ///todoInput.value = "";
      
        // Store updated todos in localStorage, re-render the list
        storeHigh();
        window.location.href = "./highscores.html";

      });


}

function setTime() {
    var timerInterval = setInterval(function() {
      timer--;
      timerEl.textContent = timer ;
  
      if(timer <= 0) {
        clearInterval(timerInterval);
        finish();
      }
      if (stopTimer){
          clearInterval(timerInterval);
      }
  
    }, 1000);
  }



function nextQuestion(event){
    event.preventDefault();
    if(event.target.matches("button")&&(event.target.textContent!=="start")){
        checkCorrect(event);
        qNumber++;
        if (qNumber < questions.length){
            console.log("render question number "+qNumber);
            renderQuestions(qNumber)}
        else{
            finish();
            ///check move this to finish
            //initHigh();
        }
    }
}
timerEl.textContent = timer;
startBtn.addEventListener("click", start);

mainEl.addEventListener("click",nextQuestion);