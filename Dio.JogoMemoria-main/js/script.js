
(function(){

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const arrayPersonagens = ["mario", "mario", "toad", "toad", "luigi", "luigi", "peach", "peach", "bowser", "bowser", "yoshi", "yoshi"];
const game = document.querySelector("#game");

// Cria um novo array randomico para gerar os cards como "componente"
const personagens =  arrayPersonagens.sort(() => Math.random() - 0.5);
personagens.forEach(function(personagem){
    renderCard(personagem, game);
});


const cards = document.querySelectorAll('.card');
shuffle(cards);

function createCard(personagem) {
    return (`
    <div class="card" data-card="${personagem}">
        <img class="card-front" src="./img/${personagem}.png" alt="Face da carta">
        <img class="card-back" src="./img/box.png" alt="Verso da carta">
    </div> 
    `);
}

function renderCard(data, element) {
    const markup = createCard(data);
    element.innerHTML += markup;
};

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
function shuffle(cards) {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;

        //adiciona evento de clique na carta
        card.addEventListener('click', flipCard)
    });

}

})();