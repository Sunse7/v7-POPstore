const API_URL = 'products.json';
const cardContainer = document.querySelector('.card-container');
const shoppingCartContainer = document.querySelector('.cart-items');
let popcornsArray = []

getLocalStorage();
fetchData();

function getLocalStorage() {
    let currentPopcorn = JSON.parse(localStorage.getItem('popcornsInfo'));
    if (currentPopcorn) {
        currentPopcorn.forEach(element => {
            popcornsArray.push(element);
            console.log(popcornsArray, 'still arr?');
        });
    }
}

async function fetchData() {
    let data = await fetch(API_URL);
    response = await data.json();
    
    if (cardContainer === null) {
        renderCardsToUI(popcornsArray);
    } else {
        renderCardsToUI(response);
    }
}

function renderCardsToUI(popcorns) {
    popcorns.forEach(popcorn => {
        let newCard = document.createElement('article');
        let buyButton = document.createElement('button');
        buyButton.classList.add('buy-btn');
        buyButton.innerHTML = 'Buy!';
        newCard.classList.add('card');
        newCard.innerHTML = `
            <img class="card__image" src="img/${popcorn.img}">
            <h3 class="card__name">${popcorn.name}</h3>
            <p class="card__price">${popcorn.pricePerHekto} kr/hg</p>
        `;

        if (shoppingCartContainer) {            
            shoppingCartContainer.appendChild(newCard);
        } else {
            cardContainer.appendChild(newCard);
            newCard.appendChild(buyButton);

            buyButton.addEventListener('click', () => {   
                popcornsArray.push(popcorn);             
                console.log(popcornsArray, 'arr');
            });
            cartRedirect(popcornsArray);
        }
    });
}

function cartRedirect(array) {
    let cartButton = document.querySelector('.cart-btn');
    cartButton.addEventListener('click', () => {
        localStorage.setItem('popcornsInfo', JSON.stringify(array));
        window.location.href = 'cart.html';
    })
}