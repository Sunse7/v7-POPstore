const API_URL = 'products.json';
const cardContainer = document.querySelector('.card-container');

async function fetchData() {
    let data = await fetch(API_URL);
    response = await data.json();
    console.log(response);
    
    renderToUI(response);
}

fetchData();

function renderToUI(popcorns) {
    popcorns.forEach(popcorn => {
        let newCard = document.createElement('article');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <img class="card__image" src="img/${popcorn.img}">
            <h3 class="card__name">${popcorn.name}</h3>
            <p class="card__price">${popcorn.pricePerHekto} kr/hg</p>
        `;
        cardContainer.appendChild(newCard);
    });
}