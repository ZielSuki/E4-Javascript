const input = document.getElementById("poke-id");
const resultado = document.querySelector(".resultado");
const div = document.createElement("div");
const img = document.createElement("img");
const h3PokeName = document.createElement("h3");
const pPokeTypes = document.createElement("p");
const divSpans = document.createElement("div");
const spanPokeWeight = document.createElement("span");
const spanPokeHeight = document.createElement("span");

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => createPokemon(data));
}

function clearHTML() {
  div.innerHTML = "";
  div.classList.remove("errorStyle");
  div.classList.remove("cardPoke");
}

function createPokemon(pokemon) {
  clearHTML();
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const height = (pokemon.height / 10).toString() + "m ";
  const weight = (pokemon.weight / 10).toString() + "kg ";
  const types = pokemon.types;
  let typesArray = [];
  for (let i = 0; i < types.length; i++) {
    typesArray +=
      types[i].type.name.charAt(0).toUpperCase() +
      types[i].type.name.slice(1) +
      " ";
  }

  div.classList.add("cardPoke");
  img.src = pokemon.sprites.front_default;
  h3PokeName.innerHTML = name;
  pPokeTypes.innerHTML = typesArray;
  spanPokeHeight.innerHTML = height;
  spanPokeWeight.innerHTML = weight;

  resultado.appendChild(div);
  div.appendChild(img);
  div.appendChild(h3PokeName);
  div.appendChild(pPokeTypes);
  div.appendChild(divSpans);
  divSpans.appendChild(spanPokeHeight);
  divSpans.appendChild(spanPokeWeight);
}

function isIDValid(id) {
  /*id 1018 no existe*/
  if (id == "") {
    return false;
  } else if (id > 0 && id < 1018) {
    return true;
  } else if (id <= 0 || id > 1017) {
    return;
  }
}

function showError(msg) {
  div.classList.add("errorStyle");
  div.innerHTML = `${msg}`;
  resultado.appendChild(div);
}

function send() {
  let valueInput = input.value;
  fetchPokemon(valueInput);
  if (isIDValid(valueInput) == true) {
    fetchPokemon(valueInput);
    return;
  } else if (isIDValid(valueInput) == false) {
    showError("pone algo wachin");
    return;
  } else {
    showError("no hay un pokemon valido");
    return;
  }
}
