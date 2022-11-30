const idPokemon = new URLSearchParams(window.location.search).get("id");
const urlDetalhes = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
const imagemPokemon =   (document.querySelector('#imgPokemon')
                        .src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`);

const detalhesPokemon = document.querySelector("#pokemonDetalhes");

function criaPokemonLi(nome, exp, peso, altura, habilidades) {
    return `
            <li class="detalhe">
                <span>Nome: ${nome}</span>
            </li>
            <li class="detalhe">
                <span>Exp: ${exp}</span>
            </li>
            <li class="detalhe">
                <span>Peso: ${peso}</span>
            </li>
            <li class="detalhe">
                <span>Altura: ${altura}</span>
            </li>
            <li class="detalhe">
                <span>Habilidades: ${habilidades}</span>
            </li>
    `
}

async function getPokemon() {
    const jsonDetalhes = fetch(urlDetalhes).then((response) => {
        return response.json();
    });

    const nome = (await jsonDetalhes).name;
    const exp = (await jsonDetalhes).base_experience;
    const altura = (await jsonDetalhes).height;
    const peso = (await jsonDetalhes).weight;
    const habilidades = (await jsonDetalhes).abilities.map(function(e) {
        return e.ability.name;
    }).join(', ');

    detalhesPokemon.innerHTML = criaPokemonLi(nome, exp, peso, altura, habilidades);
}

getPokemon();