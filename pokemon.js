const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const evolucao = urlParams.get('evolucao');

const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${evolucao}`;

fetch(pokeApiUrl)
    .then((response) => response.json())
    .then((data) => {
        const img = document.createElement('img');
        img.src = data.sprites.front_default;
        img.alt = `Imagem do Pokémon ${evolucao}`;
        img.setAttribute('aria-label', `Imagem do Pokémon ${evolucao}`);

        document.querySelector('main').appendChild(img);

        const title = document.querySelector('title');
        title.textContent = `Página do ${evolucao}`;

        const infor = document.getElementById("infor");
        infor.innerText = `Informações sobre ${evolucao}`
    });

