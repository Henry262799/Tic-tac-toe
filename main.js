

const player=(sign)=>{

    return {
        sign,
    }
}

const computerPlayer= (sign)=>{

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

    let computerPlaceLocation= ()=>{

        let choiceArrayRef=computerChoice();

        let choice= Math.floor(Math.random()*choiceArrayRef.length);
        return choiceArrayRef[choice];
        //return choiceArrayRef.length;
    }


    let scores={
        computer:10,
        player:-10,
        tie:0
    }

    let miniMax=(board,depth,isMaxmizing)=>{

        if(gameController.checkPlayerWin()){

            return scores.player;

        }
        else if(gameController.checkComputerWin()){
            
            return scores.computer;
        }
        else if(gameController.isGameOver()){

            return scores.tie;
        }


        if(isMaxmizing){

            let scoreBest=-Infinity;
            for(let i=0;i<gameBoard.getGameBoard().length;i++){
                if(gameBoard.getGameBoard()[i]==undefined){
                    gameBoard.setGameBoard(i,sign);
                    let score=miniMax(gameBoard.getGameBoard(),depth+1,false);
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
                    let score=miniMax(gameBoard.getGameBoard(),depth+1,true);
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

    let bestMove=()=>{

        let moveBest;
        let bestScore=-Infinity;
        for(let i=0;i<gameBoard.getGameBoard().length;i++){
            if(gameBoard.getGameBoard()[i]==undefined){
                gameBoard.setGameBoard(i,sign);
                let score=miniMax(gameBoard.getGameBoard(),0,false);
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
        

    let isTaken=(number)=>{

        return _gameBoard[number]!==undefined;
    }

    let getResetButton=()=>{
        return _resetButton;
    }

    let getGameBoard=()=>{
        return _gameBoard;
    }

    let getBoardButtons=()=>{
        return _gameBoardButtons;
    }

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


    let getComputerPlayer=()=>{

        return _ai;
    }

    let getHumanPlayer=()=>{
        return _human_player;
    }

    let getSign=()=>{
        return _human_player.sign;
    }

    let isGameOver=()=>{

        return checkPlayerWin() || checkComputerWin() || _isGridFull();
    }

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

    let resetBoard=()=>{

        gameBoard.getGameBoard().fill(undefined);
    }

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

    let checkPlayerWin=()=>{

        return _checkPlayerRowWin() || _checkPlayerColumnWin() || _checkPlayerDiagonalWin();
    }

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
        

    let resetBoard=()=>{
        gameController.resetBoard();
        displayBoard();
        gameBoard.getBoardButtons().forEach(button=>{
            button.addEventListener('click',playGame);   
    
        })

    }

    let playGame=(event)=>{

        if(gameController.isGameOver()){
            return;
        }

        let playerPick=playerChoice(event);
        displayBoard();
        event.target.removeEventListener('click',playGame);

        if(gameController.isGameOver()){
            return;
        }

        
        let computerPick=computerChoice();
        displayBoard();

    }

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


    let computerChoice=()=>{

        //let pickLocation= gameController.getComputerPlayer().computerPlaceLocation();
        let pickLocation=gameController.getComputerPlayer().bestMove();
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

    gameBoard.getResetButton().addEventListener('click',resetBoard);

    return {

        displayBoard,
        resetBoard,
        computerChoice,
    }

}();

