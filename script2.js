var mainEl = document.querySelector("main");


let highScores = [{name:'OI', score:'50'}];
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