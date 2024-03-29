'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores , currentScore , activePlayer , playing;



// Starting Conditions

const init = function (){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function ()  {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
};


// Rolling Dice


btnRoll.addEventListener('click',function(){
    // 1. Genarate a random dice roll
    if(playing){
        const dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the dice roll

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if(dice !== 1){

            // Add Dice Score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
            // return;
        }else{
            // Switch to next player
            switchPlayer();
        } 
    }
});

// Holding Dice

btnHold.addEventListener('click',function(){
    // 1. Add current score to total score
    if(playing){
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check If current score is greater than 100 Finish Game
        if(scores[activePlayer] >= 100){
            playing = false;
            document.querySelector('.dice').classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    
        }else{
            // 3. Switch to next player
            switchPlayer();
        }
    }
    
});

// New Game
btnNew.addEventListener('click',init);