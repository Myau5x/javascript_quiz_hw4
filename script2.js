var mainEl = document.querySelector("main");
var quizBtn = document.querySelector("#quiz");
var clearBtn = document.querySelector("#clear");

let highScores = [];
function initHigh() {
    // Get stored highScores from localStorage
    // Parsing the JSON string to an object
    var storedHigh = JSON.parse(localStorage.getItem("highScores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedHigh !== null) {
      highScores = storedHigh;
    }
  
    // Render todos to the DOM
    renderHigh();
  }

function renderHigh(){
    mainEl.innerHTML = "";
    var ulEL = document.createElement("ul");
    
    var h2 = document.createElement("h2");
    h2.textContent = "Highscores";
    mainEl.appendChild(h2);
    mainEl.appendChild(ulEL);
    for (var i=0;i<highScores.length;i++){
        let li = document.createElement("li");
        li.textContent = highScores[i].name +' '+highScores[i].score;
        ulEL.appendChild(li);
    }
}

initHigh();

quizBtn.addEventListener("click",function(){
    window.location.href = "./index.html"
})

clearBtn.addEventListener("click",function(){
    localStorage.removeItem('highScores');
    mainEl.innerHTML = "";
    
    var h2 = document.createElement("h2");
    h2.textContent = "Highscores";
    mainEl.appendChild(h2);
    
})