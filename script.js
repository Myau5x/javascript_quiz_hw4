var questions = [{question: "Q1" , answers :["q1a1","q1a2","q1a3","q1a4"], correct: 3},{question: "Q2" , answers :["q2a1","q2a2","q2a3","q2a4"], correct: 2},{question: "Q3" , answers :["q3a1","q3a2","q3a3","q3a4"], correct: 1},{question: "Q4" , answers :["q4a1","q4a2","q4a3","q4a4"], correct: 3},{question: "Q5" , answers :["q5a1","q5a2","q5a3","q5a4"], correct: 0}];
var timer = 75;
var startBtn = document.querySelector("#start");
var mainEl = document.querySelector("main");
var commentEl = document.querySelector("#comment");

var qNumber = 0;




function start(event){
    event.preventDefault();
    console.log("start from 1st question")
    renderQuestions(qNumber);
}

function renderQuestions(j){

    mainEl.innerHTML = "";
    let q = questions[j];
    let ans = q.answers;
    var h2 = document.createElement("h2");
    var ulEL = document.createElement("ul");
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
    }
    else{
        commentEl.textContent = "Wrong"
    }
}

function finish(){
    /// have to call after timer too
    /// show form to submit initials
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
        }
    }
}

startBtn.addEventListener("click", start);

mainEl.addEventListener("click",nextQuestion);