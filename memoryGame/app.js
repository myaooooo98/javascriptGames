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
const start = document.getElementById('start');
const end = document.querySelector('.end');
const restart = document.getElementById('restart');
const movesDisplay = document.querySelector('.moves');
const timerDisplay = document.querySelector('.timer');
const recordList = document.getElementById('recordList');
const records = JSON.parse(localStorage.getItem('records')) || [];

let cardsChosen = [];
let moves = 0;
let match = 0;
let time;
let totalTime = 0;
let name;

//shuffle the card
cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
    movesDisplay.textContent = `Moves: ${moves} moves`;
    timerDisplay.textContent = `Time: ${totalTime} sec`;
}

function flipCard(e) {
    const cardId = this.getAttribute('data-id');
    const card = cardArray[cardId];

    if (card && !this.classList.contains('disabled') && cardsChosen.length < 2) {
        // change the image
        this.setAttribute('src', card.img);
        cardsChosen.push({
            name: card.name,
            cardId: cardId,
        });
        this.classList.add('disabled');

    }
    // check the identical image
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');

    moves++
    movesDisplay.textContent = `Moves: ${moves} moves`;

    const firstCard = cardsChosen[0];
    const secondCard = cardsChosen[1];

    if (firstCard.name === secondCard.name) {
        playSound('./sound/correct.mp3')
        cards[firstCard.cardId].style['animation-name'] = 'match';
        cards[secondCard.cardId].style['animation-name'] = 'match';
        cards[firstCard.cardId].removeEventListener('click', flipCard);
        cards[secondCard.cardId].removeEventListener('click', flipCard);
        match++;
    } else {
        cards[firstCard.cardId].setAttribute('src', 'images/blank.jpg');
        cards[secondCard.cardId].setAttribute('src', 'images/blank.jpg');
        cards[firstCard.cardId].classList.remove('disabled');
        cards[secondCard.cardId].classList.remove('disabled');
    }

    if (match === 6) {
        clearInterval(time);
        setTimeout(function() {
            end.classList.toggle('show');
            playSound('./sound/won.mp3')
        }, 1500);

        const record = {
            name,
            moves,
            totalTime,
        };
        records.push(record);
        const sortedRecords = records.sort((a, b) => a.moves - b.moves || a.totalTime - b.totalTime);
        populateList(sortedRecords, recordList);
        localStorage.setItem('records', JSON.stringify(records));
        return;
    }
    cardsChosen = [];
}

function populateList(plates = [], plateList) {
    plateList.innerHTML = plates.map((plate, i) => {
        return `
            <tr>
                <td>${i + 1}</td>
                <td>${plate.name}</td>
                <td>${plate.moves}</td>
                <td>${plate.totalTime}</td>
            </tr>
        `;
    }).join('');
}

function timer() {
    clearInterval(time);
    time = setInterval(() => {
        totalTime++
        timerDisplay.textContent = `Time: ${totalTime} sec`;
    }, 1000);
}

function playSound(src) {
   const sound = new Audio(src);
   sound.play();
}

start.addEventListener('click', (e) => {
    name = prompt("Enter you name!", "player");
    grid.classList.remove('disabled');
    start.classList.add('disabled');
    timer();
});

restart.addEventListener('click', () => {
    location.reload();
});

createBoard();