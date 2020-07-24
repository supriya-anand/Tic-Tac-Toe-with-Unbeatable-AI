//variables for the two players
let ai_humanPlayer;
let ai_computerPlayer;

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

//Option to play again
const playAgainBtn = document.querySelector("#playAgain");

//Common Functions//
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

comparing = (a, b, c, player) =>{
  if(a == b && b == c && a == player){
  	return true;
  }
};

//DIFFICULT MODE SETUP//

difficult_setup = () => {
  console.log("setup");
  // change info banner and button text
  info.textContent = "Who will go first?";
  xBtn.textContent = "You";
  oBtn.textContent = "Computer";
  
  // remove listeners for x/o selection
  xBtn.removeEventListener("click", difficult_handleSelection);
  oBtn.removeEventListener("click", difficult_handleSelection);

  // add new listeners to buttons
  xBtn.addEventListener("click", difficult_handleFirstTurn);
  oBtn.addEventListener("click", difficult_handleFirstTurn);
};

difficult_handleFirstTurn = e => {
    console.log("handlefirstturn_ai");
  xBtn.classList.add("hide");
  oBtn.classList.add("hide");
  xBtn.removeEventListener("click", difficult_handleFirstTurn);
  oBtn.removeEventListener("click", difficult_handleFirstTurn);
  info.textContent = "Get Set Go!!";
  e.target.id === "xBtn" ? difficult_humanTurn() : difficult_aiTurn();
};

difficult_handleSelection = e => {
      console.log("handleselection_ai");
  if (e.target.id === "xBtn") {
    ai_humanPlayer = "X";
    ai_computerPlayer = "O";
  } else {
    ai_humanPlayer = "O";
    ai_computerPlayer = "X";
  }
  difficult_setup();
};

difficult_initialSetup = () => {
  console.log("in ai");
  playerone.textContent ="";
  playertwo.textContent = "";
  xBtn.addEventListener("click", difficult_handleSelection);
  oBtn.addEventListener("click", difficult_handleSelection);
};

minimax_Algo = (board,player) => {
  const availableSquares = board.filter(q => q !== "X" && q !== "O");

  if (checkWin(ai_computerPlayer, board)) return 10;
  if (checkWin(ai_humanPlayer, board)) return -10;
  if (checkDraw(board)) return 0;

  if(player === ai_computerPlayer){
    let bestScore = -Infinity;
    for(let i=0;i<availableSquares.length;i++){
      let temp = board[availableSquares[i]];
      board[availableSquares[i]]=player;
      let score = minimax_Algo(board,ai_humanPlayer);
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
      let score = minimax_Algo(board,ai_computerPlayer);
      board[availableSquares[i]]=temp;
      if(score<bestScore){
        bestScore=score;
      }
    }
    return bestScore;
  }
  };

miniMax = (board, player) => {
 const availableSquares = board.filter(q => q !== "X" && q !== "O");

 let bestScore = -Infinity;
 let bestMove={};
 
for(let i=0;i<availableSquares.length;i++){
   let temp = board[availableSquares[i]];
    board[availableSquares[i]] = player;
    let score = minimax_Algo(board,ai_humanPlayer);
    board[availableSquares[i]] = temp;
    if(score>bestScore){
      bestScore=score;
      bestMove.index = board[availableSquares[i]];
    }
  }
  return bestMove;
};

difficult_playAgain = () => {
  console.log("playagain_ai");
  squares.forEach(q => (q.textContent = ""));
  playAgainBtn.classList.add("hide");
  oBtn.textContent = "O";
  xBtn.textContent = "X";
  xBtn.classList.remove("hide");
  oBtn.classList.remove("hide");
  info.textContent = "Select!!!";
  difficult_initialSetup();
};

difficult_gameEnded = player => {
  console.log("ai gameEnded");

  if (player == ai_humanPlayer){
    info.textContent = "You Won!!";
    score1+=10;
}
  else if (player == ai_computerPlayer){ 
    info.textContent = "You Lost!!";
      score2+=10;
}
  else {
    info.textContent = "Tie!!";
      score1+=5;
      score2+=5;
}
 oBtn.classList.add("hide");
  xBtn.classList.add("hide");
  playAgainBtn.classList.remove("hide");
  playAgainBtn.addEventListener("click", difficult_playAgain);
  playerone.textContent ="You : "+ score1;
  playertwo.textContent = "Computer : " + score2;
};

difficult_executeMove = e => {
      console.log("executemove_ai");
  if (e.target.textContent === "") {
    e.target.textContent = ai_humanPlayer;
    if (checkWin(ai_humanPlayer, board())) difficult_gameEnded(ai_humanPlayer);
    else if (checkDraw(board())) difficult_gameEnded();
    else { difficult_aiTurn();}
  }
};

//human turn//
difficult_humanTurn = () => {
  console.log("humanturn_ai");
  // add event listener for each square
  squares.forEach(q => q.addEventListener("click", difficult_executeMove));
};

// ai turn //
difficult_aiTurn = () => {
  console.log("aiturn_ai");  
  let aiMove = miniMax(board(), ai_computerPlayer).index;
  squares[aiMove].textContent = ai_computerPlayer;
  if (checkWin(ai_computerPlayer, board())) difficult_gameEnded(ai_computerPlayer);
  else if (checkDraw(board())) difficult_gameEnded();
  else difficult_humanTurn();
};

difficult_initialSetup();