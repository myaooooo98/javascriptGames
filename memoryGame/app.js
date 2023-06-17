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

function createBoard() {
    cardArray.forEach(ele => {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.jpg');
        card.setAttribute('data-id', cardArray.indexOf(card));
        grid.appendChild(card);
    });
}

createBoard();