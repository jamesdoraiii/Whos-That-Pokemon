const baseURL = "//pokeapi.salestock.net/api/v2/pokemon/";

//UI setup
const playbutton = document.getElementById("play");
const subbutton = document.getElementById("guessbtn");
const guessimg = document.getElementById("guessimg");
const answerinput = document.getElementById("answerinput");
const response = document.getElementById("gameResponse");

//difficulty settings
const difficulty1 = document.getElementById("difficulty1");
const difficulty2 = document.getElementById("difficulty2");
const difficulty3 = document.getElementById("difficulty3");


difficulty1.addEventListener("click", setdifficulty1);
difficulty2.addEventListener("click", setdifficulty2);
difficulty3.addEventListener("click", setdifficulty3);

let difficultySetting = "easy";

//sound
var cry = new Audio("cry.mp3");
var snd = new Audio("poke-who.wav");
//var opener = document.getElementById("opener");
//window.onload=function(){
  //document.getElementById("opener").load();
  //document.getElementById("opener").play();
//}



//image initial setting
guessimg.style.filter = "brightness(0.0)";


let pokeanswer = "";

//main game button setup
playbutton.addEventListener("click", fetchspace);
subbutton.addEventListener("click", gameLogic);


//initial display setup
guessimg.style.display = "none";
response.style.display = "none";
subbutton.style.display = "none";
answerinput.style.display = "none";

//RETRIEVE DATA FROM POKEMON API AND JSONIFY. Then Call retrievepokemon function giving it json as a parameter
function fetchspace(e) {

  //Beginning of round style setup
  guessimg.style.display = "none";
  response.style.display = "none";
  answerinput.style.display = "none";
  subbutton.style.display = "none";
  answerinput.value = "";
  playbutton.innerHTML = "Loading...";
  snd.play();

  guessimg.style.animation = "none";

  e.preventDefault();


  let pokeDifficulty = 0
  let difficultyURL = ["","?offset=20","?offset=40"];

  switch(difficultySetting){

    case("easy"):
      console.log("starting easy game");
      fetch(baseURL)
      .then(results => {
        return results.json();
      })
      .then(json => {
        retrievePokemon(json);
        console.log(json);
      });
      break;
    
    //--------------------------------------------
    case("medium"):
      console.log("starting medium game");
      pokeDifficulty = Math.floor(Math.random()*2);
      console.log(pokeDifficulty);


      fetch(baseURL+difficultyURL[pokeDifficulty])
      .then(results => {
        return results.json();
        })
      .then(json => {
        retrievePokemon(json);
        console.log(json);
        });
      break;
    
    //------------------------------------------------

    case("hard"):
      console.log("starting hard game");
      pokeDifficulty = Math.floor(Math.random()*3);
      console.log(pokeDifficulty);


      fetch(baseURL+difficultyURL[pokeDifficulty])
      .then(results => {
        return results.json();
        })
      .then(json => {
        retrievePokemon(json);
        console.log(json);
        });
      break;
  }
}

//SELECT A RANDOM NUMBER AND THEN USING THAT NUMBER SELECT A POKEMON FROM THE DATA WE HAVE. THEN USE THAT POKEMON NAME, APPEND THE LINK AND FETCH ONCE AGAIN FOR DETAILED DATA ON THAT SPECIFIC POKEMON.
function retrievePokemon(data) {

  let pokeNum = Math.floor(Math.random() * 18);
  let pokemon = data.results[pokeNum].name;
  pokeanswer = pokemon;
  
  fetch(baseURL + pokemon + "/")
  .then(results => {
  return results.json();
  })
  .then(json => {
    displayPokemon(json);
   });
    
}



//USING THE PREVIOUSLY SELECTED POKEMON, SEARCH THAT POKEMON IN THE API AND RETRIEVE SPRITE IMAGES TO BE USED FOR THE GAME
function displayPokemon(pokedata) {
  let pokePic = pokedata.sprites.front_default;

  guessimg.src = pokePic;

  guessimg.style.filter = "brightness(0.0)";

  guessimg.style.display = "block";
  subbutton.style.display = "block";
  answerinput.style.display = "block";
  playbutton.innerHTML = "New Game!";

}

//CARRY OUT THE LOGIC OF THE GAME INCLUDING COMPARING THE NAME SUMBITTED IN THE GUESS BOX AND DISPLAYING THE ANSWER IMG.
function gameLogic() {
  let playeranswer = answerinput.value.toLowerCase(); //you need to put a toLowercase here.

  if (playeranswer === pokeanswer) {
    guessimg.style.filter = "brightness(1.0)";
    guessimg.style.animation = "shake .5s";
    cry.play();




    response.innerText = `Correct! The pokemon was ${pokeanswer}! Good Job!`;
    response.style.display = "block";
    subbutton.style.display = "none";

  } else if (playeranswer === "") {
    response.innerText = `It would appear you have yet to enter a guess. Please guess a pokemon!`;
    response.style.display = "block";

  } else {
    guessimg.style.filter = "brightness(1.0)";
    guessimg.style.animation = "shake .5s";
    cry.play();


    response.innerText = `Sorry the pokemon was actually ${pokeanswer}. Play again you will get it next time!`;
    response.style.display = "block";
    subbutton.style.display = "none";
  }
}


//difficulty button setup functions
function setdifficulty1 (){
  difficultySetting = "easy";
}

function setdifficulty2 (){
  difficultySetting = "medium";
}

function setdifficulty3 (){
  difficultySetting = "hard";
}

