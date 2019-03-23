let scores, roundScore, activePlayer, gamePlaying;



    
    // winNumber = document.getElementById('input-num').value;
    // console.log(winNumber);
    const playerScore0 = document.getElementById('score-0');
    const playerScore1 = document.getElementById('score-1');

    const currentPlayer0 = document.getElementById('current-0');
    const currentPlayer1 = document.getElementById('current-1');


    const activeShow0 = document.querySelector(`.player-0-panel`);
    const activeShow1 = document.querySelector(`.player-1-panel`);

    const diceDOM1 = document.getElementById('dice-1');
    const diceDOM2 = document.getElementById('dice-2');

    let dicePrevNumber1 = 0;
    let dicePrevNumber2 = 0;
    init();
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        winNumber = document.getElementById('input-num').value;
        if(winNumber === '' || winNumber <= 0){
            winNumber = 100;
        }else{
            winNumber = document.getElementById('input-num').value;
        }
        document.getElementById(`input-num`).disabled = true;
        console.log(winNumber);

        //display the result
        diceDOM1.style.display= `block`;
        diceDOM2.style.display= `block`;
        const currentPlayer = document.getElementById(`current-${activePlayer}`);        
        diceDOM1.src = `img/dice-${dice1}.png`;
        diceDOM2.src = `img/dice-${dice1}.png`;
        
        console.log(`dice 1 - ${dice1}`);
        console.log(`dice 2 - ${dice2}`);
        if(dice1 === dice2 && dicePrevNumber1 === dicePrevNumber2){
            scores[activePlayer] = 0;//обнуляем очки                
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];                
            currentPlayer.textContent = 0;                
            nextPlayer();
        }  
        if(dice1 !== 1 && dice2 !== 1){
            
            roundScore += dice1 + dice2;
            currentPlayer.textContent = roundScore;
        }else {
                 
            nextPlayer();
        }
        
        console.log(`prevNumber 1-${dicePrevNumber1}`);        
        console.log(`prevNumber 1-${dicePrevNumber2}`);
        
        dicePrevNumber1 = dice1;
        dicePrevNumber2 = dice2;
        
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
        diceDOM1.style.display= `none`;
        diceDOM2.style.display= `none`;
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
    currentPlayer0.textContent = '0';
    currentPlayer1.textContent = '0';
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dicePrevNumber1 = 0; //что бы не было 2 раза подряд 6 6
    dicePrevNumber2 = 7; //что бы не было 2 раза подряд 6 6

    activeShow0.classList.toggle('active');
    activeShow1.classList.toggle('active');

    //activeShow.classList.remove('active');
    diceDOM1.style.display= `none`;
    diceDOM2.style.display= `none`;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    const diceDOM1 = document.getElementById('dice-1');
    const diceDOM2 = document.getElementById('dice-2');

    scores = [0, 0];//лучше сделать одну переменную, что бы обращаться по индексу массива
    roundScore = 0;//счет в раунде
    activePlayer = 0;
    gamePlaying = true;// состояние всего приложения
    document.getElementById(`input-num`).disabled = false;
    diceDOM1.style.display= `none`;
    diceDOM2.style.display= `none`;//изначальное состояние
    
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


