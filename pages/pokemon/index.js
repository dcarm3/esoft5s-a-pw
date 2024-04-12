function changePageTitle(title) {
    document.title = title;
}

function generateInfoSection(src, pokemonName) {
    const h2 = document.createElement('h2');
    h2.id = "info-pokemon-label";
    h2.textContent = `Informações sobre ${pokemonName}`;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Imagem do Pokémon ${pokemonName}`;

    const section = document.querySelector('#info-pokemon');
    section.appendChild(h2);
    section.appendChild(img);
}

function spritesToArray(sprites) {
    const spriteValues = Object.values(sprites);
    const imageLinks = spriteValues.filter(value => typeof value === 'string');
    return imageLinks;
}

function showPokemonImages(sprites) {
    const imageLinks = spritesToArray(sprites);
    const pokemonImage = document.querySelector('#info-pokemon img');
    pokemonImage.src = imageLinks[0];

    pokemonImage.addEventListener('click', function () {
        const nextIndex = (imageLinks.indexOf(pokemonImage.src) + 1) % imageLinks.length;
        pokemonImage.src = imageLinks[nextIndex];
    });
}

function generateInfoSectionWithSprites(sprites, pokemonName) {
    const section = document.querySelector('#info-pokemon');
    section.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.id = "info-pokemon-label";
    h2.textContent = `Informações sobre ${pokemonName}`;
    section.appendChild(h2);

    const img = document.createElement('img');
    img.src = sprites.front_default;
    img.alt = `Imagem do Pokémon ${pokemonName}`;
    section.appendChild(img);

    showPokemonImages(sprites);
}


async function getPokemonData(name) {
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const jsonData = await data.json();
        changePageTitle(`Página do ${name}`);
        generateInfoSectionWithSprites(jsonData.sprites, name);
    } catch (error) {
        console.error(error);
    }
}

function getSearchParams() {
    const urlSearchParams = new URLSearchParams(location.search);
    const pokemonName = urlSearchParams.get('name');
    getPokemonData(pokemonName);
}

document.addEventListener('DOMContentLoaded', getSearchParams);
