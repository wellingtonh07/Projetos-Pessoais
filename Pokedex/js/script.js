const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

// Selecionando elementos que estão no html
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let procurarPokemon = 1;


//Função assíncrona para chamar a api do pokemon
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    
}

//Função assíncrona para mostrar o pokemon na tela

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        procurarPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :c';
        pokemonNumber.innerHTML = '';
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

btnPrev.addEventListener('click', () => {
    if(procurarPokemon > 1) {
        procurarPokemon -= 1;
        renderPokemon(procurarPokemon);
    }
    
});

btnNext.addEventListener('click', () => {
   procurarPokemon += 1;
   renderPokemon(procurarPokemon);
});

renderPokemon(procurarPokemon);