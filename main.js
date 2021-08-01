

const player=(sign)=>{

    return {
        sign,
    }
}

const computerPlayer= (sign)=>{


    //This method returns the availables spots the computer can place their move 
    let computerChoice= ()=>{

        let choices=new Array(9);

        for(let i=0;i<gameBoard.getGameBoard().length;i++){

            if(gameBoard.getGameBoard()[i]=== undefined){
                choices[i]=i;
            }
            else{
                choices[i]=undefined;
            }

        }

        let availableChoices=choices.filter( element=>{
            return element!==undefined;
        }
        );

        return availableChoices; 
    }

    // This method chooses a random place from the available spots to place the computers choice
    let computerPlaceLocation= ()=>{

        let choiceArrayRef=computerChoice();

        let choice= Math.floor(Math.random()*choiceArrayRef.length);
        return choiceArrayRef[choice];
        //return choiceArrayRef.length;
    }

    // This object is a helper to return the scores for the minimax algorithm and dictates the optimal choice for the AI
    let _scores={
        computer:10,
        player:-10,
        tie:0
    }


    // This is the main algorithm that gives us the best choice for the AI player.
    let _miniMax=(board,depth,isMaxmizing)=>{

        if(gameController.checkPlayerWin()){

            return _scores.player;

        }
        else if(gameController.checkComputerWin()){
            
            return _scores.computer;
        }
        else if(gameController.isGameOver()){

            return _scores.tie;
        }


        if(isMaxmizing){

            let scoreBest=-Infinity;
            for(let i=0;i<gameBoard.getGameBoard().length;i++){
                if(gameBoard.getGameBoard()[i]==undefined){
                    gameBoard.setGameBoard(i,sign);
                    let score=_miniMax(gameBoard.getGameBoard(),depth+1,false);
                    score=score+depth;
                    gameBoard.setGameBoard(i,undefined);
                    if(score>scoreBest){
                        scoreBest=score;
                    }
                }
            }

            return scoreBest;


        }
        else{
            let scoreBest=Infinity;
            for(let i=0;i<gameBoard.getGameBoard().length;i++){
                if(gameBoard.getGameBoard()[i]==undefined){
                    gameBoard.setGameBoard(i,gameController.getHumanPlayer().sign);
                    let score=_miniMax(gameBoard.getGameBoard(),depth+1,true);
                     score=score-depth;
                    gameBoard.setGameBoard(i,undefined);
                    if(score<scoreBest){
                        scoreBest=score;
                    }
                }
            }

            return scoreBest;
        }


    }

    // Returns the bestmove for the ai player.
    let bestMove=()=>{

        let moveBest;
        let bestScore=-Infinity;
        for(let i=0;i<gameBoard.getGameBoard().length;i++){
            if(gameBoard.getGameBoard()[i]==undefined){
                gameBoard.setGameBoard(i,sign);
                let score=_miniMax(gameBoard.getGameBoard(),0,false);
                gameBoard.setGameBoard(i,undefined);
                if(score>bestScore){
                    bestScore=score;
                    moveBest=i;
                }
            }
        }

        return moveBest;
    }




    return {
        sign,
        computerChoice,
        computerPlaceLocation,
        bestMove,
    }

}



const gameBoard= function(){

    let _gameBoard= new Array(9);
    let _gameBoardButtons= Array.from(document.querySelectorAll('.game-box'));
    let _resetButton= document.querySelector('.reset');

    //console.log(_gameBoardButtons);
    //console.log(_gameBoard.length);
        

    // This function returns a true or false value based on whether the board spot is taken or not.
    let isTaken=(number)=>{

        return _gameBoard[number]!==undefined;
    }

    // This method returns the reset Button for the game.
    let getResetButton=()=>{
        return _resetButton;
    }

    // This method returns the current gameBoard.
    let getGameBoard=()=>{
        return _gameBoard;
    }

    // This method returns the playable boardButtons.
    let getBoardButtons=()=>{
        return _gameBoardButtons;
    }


    // This method sets a specific location of the board.
    let setGameBoard=(number,value)=>{

        _gameBoard[number]=value;

    }

    //_gameBoard[1]='navn;av';
    //console.log( 'na;nvan');

    return {
        isTaken,
        getGameBoard,
        getBoardButtons,
        setGameBoard,
        getResetButton,
        
    }

}();


const gameController= function(){

    // Do this part later. Game controller should check if someone has won a game.
    //Should contain method for AI Win or player win.


    let _human_player=player('X');
    let _ai=computerPlayer('O');


    // Returns the ai player
    let getComputerPlayer=()=>{

        return _ai;
    }

    // Returns the human player
    let getHumanPlayer=()=>{
        return _human_player;
    }

    // Returns the players sign
    let getSign=()=>{
        return _human_player.sign;
    }

    // Returns a boolean value whether the game is over or not
    let isGameOver=()=>{

        return checkPlayerWin() || checkComputerWin() || _isGridFull();
    }


    // Returns a boolean value whether the gameboard grid is full or not.
    let _isGridFull=()=>{

        for(let i=0;i<gameBoard.getGameBoard().length;i++){
            //console.log(gameBoard.getGameBoard()[i]);

            //if((typeof(gameBoard.getGameBoard()[i])==='undefined')){
                //return false;
            //}

            if(gameBoard.getGameBoard()[i]=== undefined){
                return false;
            }
        }

        return true;
    }


    // This procedure resets the entire board 
    let resetBoard=()=>{

        gameBoard.getGameBoard().fill(undefined);
    }


    // This method returns a boolean checking whether the player has a row win.
    let _checkPlayerRowWin=()=>{

        let boardRef=gameBoard.getGameBoard();

        if(boardRef[0]==='X' && boardRef[1]==='X' && boardRef[2]==='X'){
            return true;
        }
        else if(boardRef[3]==='X' && boardRef[4]==='X' && boardRef[5]==='X'){
            return true;
        }
        else if(boardRef[6]==='X' && boardRef[7]==='X' && boardRef[8]==='X'){
            return true;
        }
        
        return false;

    }


    // This method returns a boolean checking whether the player has a column win.
    let _checkPlayerColumnWin=()=>{

        let boardRef=gameBoard.getGameBoard();

        if(boardRef[0]==='X' && boardRef[3]==='X' && boardRef && boardRef[6]==='X'){
            return true;
        }
        else if(boardRef[1]==='X' && boardRef[4]==='X' && boardRef && boardRef[7]==='X'){
            return true;
        }
        else if(boardRef[2]==='X' && boardRef[5]==='X' && boardRef && boardRef[8]==='X'){
            return true;
        }

        return false;
    }


    // This method returns a boolean whether the player has a diagonal win.
    let _checkPlayerDiagonalWin=()=>{

        let boardRef=gameBoard.getGameBoard();

        if(boardRef[0]==='X' && boardRef[4]==='X' && boardRef && boardRef[8]==='X'){
            return true;
        }
        else if(boardRef[2]==='X' && boardRef[4]==='X' && boardRef && boardRef[6]==='X'){
            return true;
        }

        return false; 

    }

 
    // This method returns a boolean whether the computer has a Row win.
    let checkComputerRowWin= ()=>{

        let boardRef=gameBoard.getGameBoard();

        if(boardRef[0]==='O' && boardRef[1]==='O' && boardRef[2]==='O'){
            return true;
        }
        else if(boardRef[3]==='O' && boardRef[4]==='O' && boardRef[5]==='O'){
            return true;
        }
        else if(boardRef[6]==='O' && boardRef[7]==='O' && boardRef[8]==='O'){
            return true;
        }
        
        return false;

    }


    // This method returns a boolean whether the computer has a column win.
    let checkComputerColumnWin= ()=>{

        let boardRef=gameBoard.getGameBoard();

        if(boardRef[0]==='O' && boardRef[3]==='O' && boardRef && boardRef[6]==='O'){
            return true;
        }
        else if(boardRef[1]==='O' && boardRef[4]==='O' && boardRef && boardRef[7]==='O'){
            return true;
        }
        else if(boardRef[2]==='O' && boardRef[5]==='O' && boardRef && boardRef[8]==='O'){
            return true;
        }

        return false;


    }

    // This method returns a boolean whether the computer has a diagonal win.
    let checkComputerDiagonalWin=()=>{

        let boardRef=gameBoard.getGameBoard();

        if(boardRef[0]==='O' && boardRef[4]==='O' && boardRef && boardRef[8]==='O'){
            return true;
        }
        else if(boardRef[2]==='O' && boardRef[4]==='O' && boardRef && boardRef[6]==='O'){
            return true;
        }

        return false; 

    }

    // This method returns a boolean whether the player has won.
    let checkPlayerWin=()=>{

        return _checkPlayerRowWin() || _checkPlayerColumnWin() || _checkPlayerDiagonalWin();
    }

    // This method returns a boolean whether the computer has won.
    let checkComputerWin=()=>{

        return checkComputerRowWin() || checkComputerColumnWin() || checkComputerDiagonalWin();
    }

    

    return {
        checkPlayerWin,
        checkComputerWin,
        isGameOver,
        resetBoard,
        getSign,
        getComputerPlayer,
        getHumanPlayer,

    }


}();



const displayControllar= function(){


    // Document references.
    let winner=document.querySelector('.winner');
    let easyButton=document.querySelector('#easy');
    let mediumButton=document.querySelector('#medium');
    let hardButton=document.querySelector('#hard');
    let impossibleButton=document.querySelector('#impossible');


    // Set the difficulty
    let difficulty='easy';



    // Display the board 
    let displayBoard= ()=>{

        //console.log('here');
        //console.log(gameBoard.getGameBoard().length);
       
        for(let i=0;i<gameBoard.getGameBoard().length;i++){
            //console.log(gameBoard.isTaken(i));
            if(gameBoard.isTaken(i)){
                let current = gameBoard.getBoardButtons()[i];
                current.textContent=gameBoard.getGameBoard()[i];
            }
            else{
                gameBoard.getBoardButtons()[i].textContent=undefined;
            }
        }
    }


    // This is an event listener for the playable buttons of the board.
    let _buttonEventListenerHelper=(event)=>{
        //console.log(event.target);

        let player_sign=gameController.getSign();
        let boxClicked=event.target.getAttribute('data-value');
        event.target.setAttribute('data-isClicked','true');
        //let boxClicked=buttonClicked.attr('data-value');
        gameBoard.setGameBoard(boxClicked,player_sign);
        //gameBoard.getGameBoard()[boxClicked]=player_sign;
        displayBoard();
        
        event.target.removeEventListener('click', _buttonEventListenerHelper);

    }
        
    // This method resets the board.
    let resetBoard=()=>{
        gameController.resetBoard();
        displayBoard();
        winner.textContent="";
        winner.style.display='none';
        gameBoard.getBoardButtons().forEach(button=>{
            button.addEventListener('click',playGame);   
    
        })

    }


    // This method plays the tic-tac-toe game.
    let playGame=(event)=>{

        if(gameController.isGameOver()){
            return;
        }

        let playerPick=playerChoice(event);
        displayBoard();
        event.target.removeEventListener('click',playGame);

        if(gameController.isGameOver()){
            if(gameController.checkPlayerWin()){
                winner.style.display="inline";
                winner.textContent="Player Win";
            }
            else if(gameController.checkComputerWin()){
                winner.style.display="inline";
                winner.textContent="Computer Win"
            }
            else{
                winner.style.display='inline';
                winner.textContent="TIE";
            }

            return;
        }

        
        let computerPick=computerChoice();
        displayBoard();

        if(gameController.isGameOver()){
            if(gameController.checkPlayerWin()){
                winner.style.display="inline";
                winner.textContent="Player Win";
            }
            else if(gameController.checkComputerWin()){
                winner.style.display="inline";
                winner.textContent="Computer Win"
            }
            else{
                winner.style.display="inline";
                winner.textContent="TIE";
            }

            return;
        }

    }


    // This sets the players choice.
    let playerChoice=(e)=>{

        let trgt=e.target;
        let player_sign=gameController.getSign();
        let boxClicked=e.target.getAttribute('data-value');
        e.target.setAttribute('data-isClicked','true');
        //let boxClicked=buttonClicked.attr('data-value');
        //gameBoard.getGameBoard()[boxClicked]=player_sign;
        gameBoard.setGameBoard(boxClicked,player_sign);
        e.target.removeEventListener('click', _buttonEventListenerHelper);

    }

    // This sets the computer choice.
    let computerChoice=()=>{
        let pickLocation;
        if(difficulty==='easy'){
            //console.log('here');
            pickLocation=gameController.getComputerPlayer().computerPlaceLocation();
        }
        else if(difficulty==='medium'){
            //console.log('here2');
            let random=Math.floor(Math.random()*10);
            if(random<4){
                pickLocation=gameController.getComputerPlayer().computerPlaceLocation();
            }
            else{
                pickLocation=gameController.getComputerPlayer().bestMove();
            }
        }
        else if(difficulty==='hard'){
            //console.log('here3');
            let random=Math.floor(Math.random()*10);
            if(random<1){
                pickLocation=gameController.getComputerPlayer().computerPlaceLocation();
            }
            else{
                pickLocation=gameController.getComputerPlayer().bestMove();
            }
        }
        else if(difficulty==='impossible'){
            //console.log('here4');
            pickLocation=gameController.getComputerPlayer().bestMove();
        }
        //let pickLocation= gameController.getComputerPlayer().computerPlaceLocation();
        //let pickLocation=gameController.getComputerPlayer().bestMove();
        console.log(pickLocation);
        let comp_sign=gameController.getComputerPlayer().sign;
        let button=gameBoard.getBoardButtons()[pickLocation];
        gameBoard.getGameBoard()[pickLocation]=comp_sign;
        button.textContent=comp_sign;
        button.removeEventListener('click',playGame);
        return button;
      
    }


      // Game display Event Listener 

      gameBoard.getBoardButtons().forEach(button=>{
        button.addEventListener('click',playGame);   

    })

    easyButton.addEventListener('click', (e)=>{
        difficulty='easy';
    })

    mediumButton.addEventListener('click', (e)=>{
        difficulty='medium';
    })

    hardButton.addEventListener('click', (e)=>{
        difficulty='hard';
    })

    impossibleButton.addEventListener('click',(e)=>{
        difficulty='impossible';
    })

    gameBoard.getResetButton().addEventListener('click',resetBoard);

    return {

        displayBoard,
        resetBoard,
        computerChoice,
    }

}();

