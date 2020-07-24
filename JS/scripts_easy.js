//variables for the two players
let humanPlayer;
let computerPlayer;

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

comparing = (a, b, c, player) =>{
  if(a == b && b == c && a == player){
  	return true;
  }
};

compare_easy = (board,a,b,c,bool_board) =>{
  if((board[a] == board[b]) && board[a]!="a"){
    if(bool_board[c]==true){
      return c;
    }
  }
  else if((board[b] == board[c]) && board[b]!="b"){
    if(bool_board[a]==true){
      return a;
    }
  }
  else if((board[c] == board[a]) && board[c]!="c"){
    if(bool_board[b]==true){
      return b;
    }
  }
    return -1;
}

checkwin = (board) =>{
  const availableSquares = board.filter(s => s !== "X" && s !== "O");
  let move={};

  let bool_board=[];
  for(let i=0;i<9;i++){
    bool_board[i]=false;
  }

  for(let i=0;i<availableSquares.length;i++){
    bool_board[availableSquares[i]]=true;
  }

  let temp=0;
  let i=0;

//horizontal check
for(i=0;i<7;i=i+3){
 temp = compare_easy(board,i,i+1,i+2,bool_board);
  if(temp!=-1) {
if(bool_board[temp]==true){
    move.index = board[temp];
    return move;
  }
  } 
}

//vertical check
for(i=0;i<3;i++){
 temp = compare_easy(board,i,i+3,i+6,bool_board);
  if(temp!=-1) {
    if(bool_board[temp]==true){
    move.index = board[temp];
    return move;
  }
  } 
}

//diagonal check
    temp = compare_easy(board,0,4,8,bool_board);
  if(temp!=-1){
    if(bool_board[temp]==true){
    move.index = board[temp];
    return move;
  }
}

    temp = compare_easy(board,2,4,6,bool_board);
  if(temp!=-1){
    if(bool_board[temp]==true){
    move.index = board[temp];
    return move;
  }
}

return -1;
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

//EASY MODE SETUP//
easy_setup = () => {
  // change info banner and button text
  info.textContent = "Who will go first?";
  xBtn.textContent = "You";
  oBtn.textContent = "Computer";
  console.log("setup_easy");

  // remove listeners for x/o selection
  xBtn.removeEventListener("click", easy_handle);
  oBtn.removeEventListener("click", easy_handle);

  // add new listeners to buttons
  xBtn.addEventListener("click", easy_handleFirstTurn);
  oBtn.addEventListener("click", easy_handleFirstTurn);
};

easy_handleFirstTurn = e => {
    console.log("handlefirst_easy");
  xBtn.classList.add("hide");
  oBtn.classList.add("hide");
  xBtn.removeEventListener("click", easy_handleFirstTurn);
  oBtn.removeEventListener("click", easy_handleFirstTurn);
  info.textContent = "Get Set Go!!";
  e.target.id === "xBtn" ? easy_humanTurn() : easy_aiTurn();
};

easy_handle = e => {
    console.log("handleseclection_easy");

  if (e.target.id === "xBtn") {
    humanPlayer = "X";
    computerPlayer = "O";
  } else {
    humanPlayer = "O";
    computerPlayer = "X";
  }
  easy_setup();
};


easy_initialSetup = () => {
  console.log("in ai_easy");
  playerone.textContent ="You";
  playertwo.textContent = "Computer";
    playerone.textContent ="";
  playertwo.textContent = "";
  xBtn.addEventListener("click", easy_handle);
  oBtn.addEventListener("click", easy_handle);
};

easy_playAgain = () => {
  console.log("playagain_easy");
    squares.forEach(s => (s.textContent = ""));
  playAgainBtn.classList.add("hide");
  xBtn.classList.remove("hide");
  xBtn.textContent = "X";
  oBtn.classList.remove("hide");
  oBtn.textContent = "O";
  info.textContent = "Select!!!";
  easy_initialSetup();
};

easy_gameEnded = player => {
console.log("gameendned_easy");
  if (player === humanPlayer){
    info.textContent = "You Won!!";
    score1+=10;
}
  else if (player === computerPlayer){ 
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
  playAgainBtn.addEventListener("click", easy_playAgain);
    playerone.textContent ="You : "+ score1;
  playertwo.textContent = "Computer : " + score2;

};

easy = (board, player) => {
  // find squares that are blank
  const availableSquares = board.filter(s => s !== "X" && s !== "O");
  let move = {};
  let temp = checkwin(board);
   if(temp!=-1){
    return temp;
   }

   //if no square found through which we can win, we choose the square randomly //
  move.index = board[availableSquares[Math.floor(Math.random()*availableSquares.length)]]
  return move;
};

easy_executeMove = e => {
    console.log("executeMove_easy");
  if (e.target.textContent === "") {
    e.target.textContent = humanPlayer;
    if (checkWin(humanPlayer, board())){easy_gameEnded(humanPlayer);}
    else if (checkDraw(board())){easy_gameEnded();}
    else {easy_aiTurn();}
  }
};

//human turn//
easy_humanTurn = () => {
  // add event listener for each square
  console.log("easy_humanturn");
  squares.forEach(s => s.addEventListener("click", easy_executeMove));
};

// ai turn//
easy_aiTurn = () => {
  console.log("easy_aiturn");
  let aiMove = easy(board(), computerPlayer).index;
  squares[aiMove].textContent = computerPlayer;
  if (checkWin(computerPlayer, board())){easy_gameEnded(computerPlayer);} 
  else if (checkDraw(board())){easy_gameEnded();}
  else{easy_humanTurn();}
};

easy_initialSetup();