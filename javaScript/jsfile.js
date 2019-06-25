var cards = [];
var matchCounter = 0;
var flipCounter = 0;
var openedCards = [];

document.body.onload = startGame(4);

function newGame() {
    // 4 should be a const. maybe NUMBER_OF_ROWS = 4
    startGame(cards.length/4);
}

function startGame(numColum) {
    matchCounter = 0;
    flipCounter = 0;
    openedCards = [];
    closeCards(cards);
    cards = [];

    setTimeout(function(){  
        removeCard();
        changeGridBoard(numColum);
    }, 380);
}

function closeCards(openCards) {
    for (var i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove('card--open');
    }
}
// What the function does instead of how it does it, so removeCard -> clearBoard
function removeCard() {
    var board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

// numColum -> numOfColumns
function changeGridBoard(numColum) {
    // no need for the if-clause. You always set --num-colum to be nymColum

    if (numColum === 6) {
        document.documentElement.style.setProperty("--num-colum", numColum);
    } else if (numColum === 5) {
        document.documentElement.style.setProperty("--num-colum", numColum);
    } else {
        document.documentElement.style.setProperty("--num-colum", numColum);
        // There's no need for this row
        document.documentElement.style.setProperty("--num-row", numColum);
    }

    buildeck(numColum);
}

// buildeck -> buildDeck (capital d)
// numColum -> numOfColumns
function buildeck(numColum) {
    var arr = [];

    // matchesLeft
    matchCounter = numColum * 2;

    for (var i = 0; i < matchCounter; i++) {
        arr[i] ='img/card-' + i + '.png';
    }

    arr = [...arr,...arr];
    shuffle(arr);

    for (var i = 0; i < matchCounter * 2; i++) {
        createCard(arr[i]);
    }
}

function createCard(src) {
    var board = document.getElementById('board');
    var card = document.createElement('div');
    var cardFront = document.createElement('div');
    // imgfront -> imgFront
    var imgfront = document.createElement('img');
    // cardback -> cardBack
    var cardback = document.createElement('div');
    // imgback -> imgBack
    var imgback = document.createElement('img');

    // switch back and front

    card.setAttribute('class', 'card');
    cardFront.setAttribute('class', 'card__side card--front');
    imgfront.setAttribute('src', 'img/card.png');
    cardback.setAttribute('class', 'card__side card--back');
    imgback.setAttribute('src', src);

    card.appendChild(cardFront);
    cardFront.appendChild(imgfront);
    card.appendChild(cardback);
    cardback.appendChild(imgback);

    card.addEventListener("click", openCard);
    cards.push(card);
    board.appendChild(card);
}

function openCard() {
    this.classList.add("card--open");
    this.removeEventListener("click", openCard);
    flipCounter ++;
    openedCards.push(this);

    if (flipCounter == 2) {
        checkIfMatch(openedCards[0], openedCards[1]);
        flipCounter = 0;
    } 
}

function checkIfMatch(card1, card2) {
    openedCards = [];

    if (card1.innerHTML == card2.innerHTML) {
        matchCounter -= 1;
        checkIfFinish(matchCounter);
    } else {
        setTimeout(function(){
            card1.classList.remove("card--open");
            card2.classList.remove("card--open"); 
            card1.addEventListener("click", openCard);
            card2.addEventListener("click", openCard);
        }, 880);
    }
}

function checkIfFinish(matchCounter) {
    if (matchCounter == 0) {
        // use timeout to wait until the card opens
        alert('win');
    }
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}