let scores, roundScore, activePlayer, gamePlaying;

   
    
    const playerScore0 = document.getElementById('score-0');
    const playerScore1 = document.getElementById('score-1');

    const diceDOM = document.querySelector('.dice');
    const oneDice = document.querySelector('.oneDice');

    const currentPlayer0 = document.getElementById('current-0');
    const currentPlayer1 = document.getElementById('current-1');


    const activeShow0 = document.querySelector(`.player-0-panel`);
    const activeShow1 = document.querySelector(`.player-1-panel`);


    let dicePrevNumber = 0;
    init(); 
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        let dice = Math.floor(Math.random() * 6) + 1;
        
        console.log(dice);
        winNumber = document.getElementById('input-num').value;
        if(winNumber === '' || winNumber <= 0){
            winNumber = 50;
        }else{
            winNumber = document.getElementById('input-num').value;
        }
        document.getElementById(`input-num`).disabled = true;
        

        //display the result
        diceDOM.style.display= `block`;
        const currentPlayer = document.getElementById(`current-${activePlayer}`);        
        diceDOM.src = `img/dice-${dice}.png`;
        
        if(dice !== 1){//update if not 1    
             //if 2 numbers are equal 6    
            if(dice === 6 && dicePrevNumber === 6){                
                scores[activePlayer] = 0;//обнуляем очки                
                document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];                
                currentPlayer.textContent = 0;                
                nextPlayer();
            }else{
            //add score  
                roundScore += dice;
                currentPlayer.textContent = roundScore;
            }
        }else {//enxt player  
            oneDice.style.display = 'block';
            nextPlayer();
        }
        dicePrevNumber = dice;
    } 
})

document.querySelector('.btn-hold').addEventListener('click', function(){   
    if(gamePlaying){
    //add current score to global score
    scores[activePlayer] += roundScore;
    //update the ui
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    //check if the won
    if(scores[activePlayer] >= winNumber){
        document.getElementById(`name-${activePlayer}`).textContent = 'Winner';
        diceDOM.style.display= `none`;
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
        gamePlaying = false;
        
        // scores = [0, 0];
        // roundScore = 0;
        // activePlayer = 0;
        // currentPlayer0.textContent = '0';
        // currentPlayer1.textContent = '0';
        // playerScore0.textContent = '0';
        // playerScore1.textContent = '0';
        
    } else{
        
        nextPlayer();
    }
    //next player
    
}

});

function nextPlayer(){
    //next player
    setTimeout(() => {
        oneDice.style.display = 'none';
    }, 1000);
    
    currentPlayer0.textContent = '0';
    currentPlayer1.textContent = '0';
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dicePrevNumber = 0; //что бы не было 2 раза подряд 6 6

    activeShow0.classList.toggle('active');
    activeShow1.classList.toggle('active');

    //activeShow.classList.remove('active');
    diceDOM.style.display= `none`;
        
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    
    scores = [0, 0];//лучше сделать одну переменную, что бы обращаться по индексу массива
    roundScore = 0;//счет в раунде
    activePlayer = 0;
    gamePlaying = true;// состояние всего приложения
    document.getElementById(`input-num`).disabled = false;
    diceDOM.style.display= `none`;
    //изначальное состояние
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';

    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    
}


