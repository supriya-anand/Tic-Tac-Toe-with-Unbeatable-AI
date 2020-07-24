//variables for the two players
let humanPlayer1;
let humanPlayer2;

//the score for each player initiated zero
let score1=0;
let score2=0;

// Our tic-toc grid
const squares = document.querySelectorAll(".grid");

// each tic-toc square
const squareOne = document.querySelector("squareOne");
const squareTwo = document.querySelector("squareTwo");
const squareThree = document.querySelector("squareThree");
const squareFour = document.querySelector("squareFour");
const squareFive = document.querySelector("squareFive");
const squareSix = document.querySelector("squareSix");
const squareSeven = document.querySelector("squareSeven");
const squareEight = document.querySelector("squareEight");
const squareNine = document.querySelector("squareNine");

//players who are playing
const playerone = document.querySelector("#playerone");
const playertwo = document.querySelector("#playertwo");

// banner for providing information
const info = document.querySelector("#info");

// Selecting X or O
const xBtn = document.querySelector("#xBtn");
const oBtn = document.querySelector("#oBtn");

//suggestions for next
const playerSuggestion = document.querySelector("#playerSuggestion");

//Option to play again
const playAgainBtn = document.querySelector("#playAgain");

//Common Functions//
comparing = (a, b, c, player) =>{
  if(a === player && b === player && c === player){
  	return true;
  }
};

checkWin = (player, board) => {
  if (
    //horizontal checks
    (comparing(board[0],board[1],board[2],player)) || (comparing(board[3],board[4],board[5],player)) ||
      (comparing(board[6],board[7],board[8],player)) ||
    // vertical checks
     (comparing(board[0],board[3],board[6],player)) ||
      (comparing(board[1],board[4],board[7],player)) || (comparing(board[2],board[5],board[8],player)) ||
    // diagonal checks
     (comparing(board[0],board[4],board[8],player)) ||
      (comparing(board[2],board[4],board[6],player))
  ) {
    return true;
  }
};

checkDraw = board => {
  // find squares that are blank
  const availableSquares = board.filter(s => s !== "X" && s !== "O");
  if (availableSquares.length === 0){
    return true;
  }
};

// turn current play squares into an array of board values
board = () => {
  let board = [...squares];
  for (let i = 0; i < board.length; i++) {
    // if the value is not x or o, give index value
    if (board[i].textContent === "") {
      board[i] = i;
    } else {
      board[i] = board[i].textContent;
    }
  }
  return board;
};

// HUMAN VS HUMAN//
handleFirstTurn = e => {
  xBtn.classList.add("hide");
  oBtn.classList.add("hide");
  xBtn.removeEventListener("click", handleFirstTurn);
  oBtn.removeEventListener("click", handleFirstTurn);
  info.textContent = "Get Set Go!!!";
  e.target.id === "xBtn" ? humanTurn1() : humanTurn2();
};

setup = () => {
  // remove listeners for x/o selection
  xBtn.removeEventListener("click", handleSelection);
  oBtn.removeEventListener("click", handleSelection);
  // change info banner and button text
  info.textContent = "Who will go first??";
  xBtn.textContent = "Player 1";
  oBtn.textContent = "Player 2";
  // add new listeners to buttons
  xBtn.addEventListener("click", handleFirstTurn);
  oBtn.addEventListener("click", handleFirstTurn);
};

handleSelection = e => {
  if (e.target.id === "xBtn") {
    humanPlayer1 = "X";
    humanPlayer2 = "O";
  } else {
    humanPlayer1 = "O";
    humanPlayer2 = "X";
  }
  setup();
};

initialSetup = () => {
  console.log("in human");
  info.textContent = "Select!!!";
  xBtn.textContent = "X";
  oBtn.textContent = "O";
  squares.forEach(s => (s.textContent = ""));
  xBtn.classList.remove("hide");
  oBtn.classList.remove("hide");
  playerone.textContent ="";
  playertwo.textContent = "";
  xBtn.addEventListener("click", handleSelection);
  oBtn.addEventListener("click", handleSelection);
};

playAgain = () => {
  playAgainBtn.classList.add("hide");
  initialSetup();
};

gameEnded = player => {
  console.log("fuck human");
  if (player ===  humanPlayer1){
  	info.textContent = "You Won!";
  	score1+=10;
}
  else if (player === humanPlayer2){ 
  	info.textContent = "You Lost!";
  	 	score2+=10;
}
  else {
  	info.textContent = "Tie!!!";
  	 	score1+=5;
  	 	score2+=5;
}
  playerSuggestion.textContent="";
  playAgainBtn.classList.remove("hide");
  playAgainBtn.addEventListener("click", playAgain);
  playerone.textContent ="Player 1 : "+ score1;
  playertwo.textContent = "Player 2 : " + score2;

};

minimax_Algo_humanPlayer1 = (board,player) =>{
  const availableSquares = board.filter(s => s !== "X" && s !== "O");

  if (checkWin(humanPlayer1, board)) return 10;
  if (checkWin(humanPlayer2, board)) return -10;
  if (checkDraw(board)) return 0;

  if(player == humanPlayer1){
    let bestScore = -Infinity;
    for(let i=0;i<availableSquares.length;i++){
      let temp = board[availableSquares[i]];
      board[availableSquares[i]]=player;
      let score = minimax_Algo_humanPlayer1(board,humanPlayer2);
      board[availableSquares[i]]=temp;
      if(score>bestScore){
        bestScore=score;
      }
    }
    return bestScore;
  }

  else{
    let bestScore = Infinity;
    for(let i=0;i<availableSquares.length;i++){
      let temp = board[availableSquares[i]];
      board[availableSquares[i]]=player;
      let score = minimax_Algo_humanPlayer1(board,humanPlayer1);
      board[availableSquares[i]]=temp;
      if(score<bestScore){
        bestScore=score;
      }
    }
    return bestScore;
  }
  };

miniMax_humanPlayer1 = (board, player) => {
 const availableSquares = board.filter(s => s !== "X" && s !== "O");

 let bestScore = -Infinity;
 let bestMove={};
 
for(let i=0;i<availableSquares.length;i++){
   let temp = board[availableSquares[i]];
    board[availableSquares[i]] = player;
    let score = minimax_Algo_humanPlayer1(board,humanPlayer2);
    board[availableSquares[i]] = temp;
    if(score>bestScore){
      bestScore=score;
      bestMove.index = board[availableSquares[i]];
    }
  }
  return bestMove;
};

minimax_Algo_humanPlayer2 = (board,player) => {
  const availableSquares = board.filter(s => s !== "X" && s !== "O");

  if (checkWin(humanPlayer2, board)) return 10;
  if (checkWin(humanPlayer1, board)) return -10;
  if (checkDraw(board)) return 0;

  if(player==humanPlayer2){
    let bestScore = -Infinity;
    for(let i=0;i<availableSquares.length;i++){
      let temp = board[availableSquares[i]];
      board[availableSquares[i]]=player;
      let score = minimax_Algo_humanPlayer2(board,humanPlayer1);
      board[availableSquares[i]]=temp;
      if(score>bestScore){
        bestScore=score;
      }
    }
    return bestScore;
  }

  else{
    let bestScore = Infinity;
    for(let i=0;i<availableSquares.length;i++){
      let temp = board[availableSquares[i]];
      board[availableSquares[i]]=player;
      let score = minimax_Algo_humanPlayer2(board,humanPlayer2);
      board[availableSquares[i]]=temp;
      if(score<bestScore){
        bestScore=score;
      }
    }
    return bestScore;
  }
  };

miniMax_humanPlayer2 = (board, player) => {
 const availableSquares = board.filter(s => s !== "X" && s !== "O");

 let bestScore = -Infinity;
 let bestMove={};
 
for(let i=0;i<availableSquares.length;i++){
   let temp = board[availableSquares[i]];
    board[availableSquares[i]] = player;
    let score = minimax_Algo_humanPlayer2(board,humanPlayer1);
    board[availableSquares[i]] = temp;
    if(score>bestScore){
      bestScore=score;
      bestMove.index = board[availableSquares[i]];
    }
  }
  return bestMove;
};

executeMove1 = e => {
  if (e.target.textContent === "") {
    e.target.textContent =  humanPlayer1;
    if (checkWin( humanPlayer1, board())) gameEnded( humanPlayer1);
    else if (checkDraw(board())) gameEnded();
    else {
      squares.forEach(s => s.removeEventListener("click", executeMove1));
      humanTurn2();
    }
  }
};

executeMove2 = e => {
  if (e.target.textContent === "") {
    e.target.textContent = humanPlayer2;
    if (checkWin(humanPlayer2, board())) gameEnded(humanPlayer2);
    else if (checkDraw(board())) gameEnded();
    else {
      squares.forEach(s => s.removeEventListener("click", executeMove2));
      humanTurn1();
    }
  }
};

humanTurn1 = () => {
  // add event listener for each square
  let aiMove = miniMax_humanPlayer1(board(), humanPlayer1).index;

  playerSuggestion.textContent = 'Suggestion for Player 1: Click ' + ' box number ' + aiMove;
  squares.forEach(s => s.addEventListener("click", executeMove1)); 
};

humanTurn2 = () => {
  // add event listener for each square
  let aiMove = miniMax_humanPlayer2(board(), humanPlayer2).index;
  playerSuggestion.textContent = 'Suggestion for Player 2: Click '  + ' box number ' + aiMove;
  squares.forEach(s => s.addEventListener("click", executeMove2));
};

initialSetup();