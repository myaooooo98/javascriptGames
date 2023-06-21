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
const content = document.querySelector('.content');
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

    moves++
    display(movesDisplay, moves);

    if (cardsChosen[0].name === cardsChosen[1].name) {
        soundEffect.play();
        cards[cardsChosen[0].cardId].style['animation-name'] = 'match';
        cards[cardsChosen[1].cardId].style['animation-name'] = 'match';
        cards[cardsChosen[0].cardId].classList.add('disabled');
        cards[cardsChosen[1].cardId].classList.add('disabled');
        cards[cardsChosen[0].cardId].removeEventListener('click', flipCard);
        cards[cardsChosen[1].cardId].removeEventListener('click', flipCard);
        match++;
    } else {
        cards[cardsChosen[0].cardId].setAttribute('src', 'images/blank.jpg');
        cards[cardsChosen[1].cardId].setAttribute('src', 'images/blank.jpg');
    }

    if (match === 6) {
        clearInterval(time);
        setTimeout(function() {
            end.classList.toggle('show');
            winnerSound.play();
        }, 1500);

        const record = {
            name,
            moves,
            totalTime,
        };
        records.push(record);
        let sortedRecords = records.sort((a, b) => {
            if (a.moves > b.moves) return 1;
            if (a.moves < b.moves) return -1;
            if (a.moves === b.moves) {
                return (a.totalTime > b.totalTime) ? 1 : (a.totalTime < b.totalTime) ? -1 : 0;
            }
        });
        console.log(sortedRecords);
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
        display(timerDisplay, totalTime);
    }, 1000);
}

function display(ele, i) {
    if (ele === movesDisplay) {
        ele.textContent = `${i} moves`;
    } else if (ele === timerDisplay) {
        ele.textContent = `Time: ${i} sec`;
    }
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
    name = prompt("Enter you name!", "player");
    content.classList.toggle('show');
    e.target.closest('.play').style.display = 'none';
    movesDisplay.textContent = `${moves} moves`;
    timerDisplay.textContent = `Time: ${totalTime} sec`;
    createBoard();
    timer();
});

restart.addEventListener('click', () => {
    location.reload();
});