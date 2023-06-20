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
const start = document.getElementById('start');
const content = document.querySelector('.content');
const end = document.querySelector('.end');
const restart = document.getElementById('restart');
let cardsChosen = [];
let score = 0;

//shuffle the card
cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function flipCard(e) {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push({
        name: cardArray[cardId].name,
        cardId: cardId,
    });
    // change the image
    this.setAttribute('src', cardArray[cardId].img);

    // check the identical image
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');
    let soundEffect = new sound('./sound/correct.mp3');
    let winnerSound = new sound('./sound/won.mp3');

    if (cardsChosen[0].name === cardsChosen[1].name) {
        soundEffect.play();
        cards[cardsChosen[0].cardId].style['animation-name'] = 'match';
        cards[cardsChosen[1].cardId].style['animation-name'] = 'match';
        cards[cardsChosen[0].cardId].removeEventListener('click', flipCard);
        cards[cardsChosen[1].cardId].removeEventListener('click', flipCard);
        score++;
    } else {
        cards[cardsChosen[0].cardId].setAttribute('src', 'images/blank.jpg');
        cards[cardsChosen[1].cardId].setAttribute('src', 'images/blank.jpg');
    }

    resultDisplay.textContent = score;

    if (score === 6) {
        setTimeout(function() {
            end.classList.toggle('show');
            winnerSound.play();
        }, 1500);
        return;
    }
    cardsChosen = [];
}

function sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.pause = function() {
        this.sound.pause();
    }
}

start.addEventListener('click', (e) => {
    content.classList.toggle('show');
    e.target.closest('.play').style.display = 'none';
    resultDisplay.textContent = '0';
    createBoard();
});

restart.addEventListener('click', () => {
    location.reload();
});