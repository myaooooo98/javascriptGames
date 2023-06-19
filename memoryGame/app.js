const cardArray = [
    {
        name: 'elephant',
        img: 'images/elephant.jpg',
    },
    {
        name: 'giraffe',
        img: 'images/giraffe.jpg',
    },
    {
        name: 'koala',
        img: 'images/koala.jpg',
    },
    {
        name: 'monkey',
        img: 'images/monkey.jpg',
    },
    {
        name: 'rhino',
        img: 'images/rhino.jpg',
    },
    {
        name: 'tiger',
        img: 'images/tiger.jpg',
    },
    {
        name: 'elephant',
        img: 'images/elephant.jpg',
    },
    {
        name: 'giraffe',
        img: 'images/giraffe.jpg',
    },
    {
        name: 'koala',
        img: 'images/koala.jpg',
    },
    {
        name: 'monkey',
        img: 'images/monkey.jpg',
    },
    {
        name: 'rhino',
        img: 'images/rhino.jpg',
    },
    {
        name: 'tiger',
        img: 'images/tiger.jpg',
    },
];

const grid = document.getElementById('grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let score = 0;

//shuffle the card
cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.jpg');
        card.setAttribute('data-id', i);
        grid.appendChild(card);
    }
    grid.addEventListener('click', flipCard);
}

function flipCard(e) {
    if (!e.target.matches('img')) return;

    let cardId = e.target.getAttribute('data-id');
    cardsChosen.push({
        name: cardArray[cardId].name,
        cardId: cardId,
    });
    // change the image
    e.target.setAttribute('src', cardArray[cardId].img);

    // check the identical image
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');
    if (cardsChosen[0].name === cardsChosen[1].name) {
        cards[cardsChosen[0].cardId].style.filter = 'brightness(50%)';
        cards[cardsChosen[1].cardId].style.filter = 'brightness(50%)';
        cards[cardsChosen[0].cardId].removeEventListener('click', flipCard);
        cards[cardsChosen[1].cardId].removeEventListener('click', flipCard);
        score++;
    } else {
        cards[cardsChosen[0].cardId].setAttribute('src', 'images/blank.jpg');
        cards[cardsChosen[1].cardId].setAttribute('src', 'images/blank.jpg');
    }

    resultDisplay.textContent = score;
    cardsChosen = [];

    if (score === 6) {
        console.log('You found all match!');
        return;
    }
}

createBoard();