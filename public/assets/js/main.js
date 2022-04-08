'use strict';

//
// Recoger elementos del HTML.
//
// Input de búsqueda
const inputSearch = document.querySelector('.js_input_search');

// Botones "Buscar" y "Reset".
const btnSearch = document.querySelector('.js_btn_search');
const btnReset = document.querySelector('.js_btn_reset');

// Listados de HTML donde se pintan las listas de cócteles "Buscados" y "Favoritos".
const listSearchCKT = document.querySelector('.js_list_search_CKT');
const listFavoritesCKT = document.querySelector('.js_list_favorites_CKT');

//
// Constantes y variables.
//

const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// Arrays con las listas de cócteles "Buscados" y "Favoritos".
let cocktails = [];
let cocktailsFavorites = [];

// Creo un conmutador para decidir en qué lista hay que pintar.
// swt = 0 --> Buscados.
// swt = 1 --> Favoritos.
let swt = 0;

//
// Funciones.
//

//
//
//
function setLocalStorage() {
  // Convierto a "string" el array de objetos de con los cócteles favoritos.
  const locStoCocktailsFavorites = JSON.stringify(cocktailsFavorites);

  // Lo guardo en localStorage.
  localStorage.setItem('localFavoritesList', locStoCocktailsFavorites);
}

//
//
//
function getLocalStorage() {
  console.log('Entro en gelLocalStorage');
  // 1.- Meto en una variable lo que hay en localStorage.
  let localFavoritesList = '';
  const locStoCocktailsFavorites = localStorage.getItem('localFavoritesList');
  console.log('Llego a locStoCocktailsFavorites');
  console.log('Valor de locStoCocktailsFavorites: ', locStoCocktailsFavorites);

  // 2.- Compruebo si había datos guardados.
  // Si no los había, la información devuelta por "localStorage.getItem()" será "null".
  if (locStoCocktailsFavorites !== null) {
    // Si el valor devuelto no es "null", pinto las tarjetas de cócteles favoritos.
    // Parseo la información recogida de localStorage y la guardo en una constante.
    // Asigno esa constante a la variable "cocktailsFavorites".
    // Llamo a la función que pinta la información y le paso la variable "cocktailsFavorites" como parámetro.
    const parseLocStoCocFav = JSON.parse(locStoCocktailsFavorites);
    cocktailsFavorites = parseLocStoCocFav;
    paintFun(cocktailsFavorites, 1);
  }
}

//
//
//
function addRemoveFavorites(event) {
  console.log('Entra en addRemoveFavorites');

  // Identifico qué elemento de favoritos ha sido clickado mediante su "id".
  const cardClickedId = event.currentTarget.id;
  console.log('ID: ', cardClickedId);

  // Creo una constante donde almacenar el objeto que me devolverá ".find".
  // Busco ese objeto en el array de elementos buscados, mediante su "id".
  // Hago esto para poderlo añadir en caso de que no esté en la lista de favoritos ya.

  // En caso de que el objeto no esté en la lista de favoritos, hay que meterlo, y en caso contrario, sacarlo.
  // Para eso, primero hay que comprobar si está.
  // Después, cogerlo en una variable

  const cocktailClicked = cocktails.find((element) => {
    return element.idDrink === cardClickedId;
  });
  // Ya tengo guardado en "cocktailClicked" el objeto (cóctel) sobre el que he pinchado (en su corazón de favorio).
  console.log('Objeto (cóctel) clickado: ', cocktailClicked);

  // Compruebo si el objeto está ya en el array de "favoritos".
  const itsFavoriteCkt = cocktailsFavorites.findIndex((elementFav) => {
    return elementFav.idDrink === cardClickedId;
  });
  // Ya tengo guardado en "itsFavoriteCkt" el índice del objeto (cóctel) que se corresponde con el que hemos pinchado.
  // Esto sirve para poderlo borrar en caso de que ya esté en el array de "favoritos".
  console.log('Indice del elemento clickado: ', itsFavoriteCkt);

  // Averiguo si el objeto clickado ya estaba en favoritos.
  // En caso negativo, lo añado con ".push" (if).
  // En caso afirmativo, lo elimino con ".splice" (else).
  if (itsFavoriteCkt === -1) {
    console.log('No estaba, ¡LO PONGO!');
    cocktailsFavorites.push(cocktailClicked);
  } else {
    console.log('Estaba, ¡LO QUITO!');
    cocktailsFavorites.splice(itsFavoriteCkt, 1);
  }

  setLocalStorage();

  paintFun(cocktailsFavorites, 1);
  paintFun(cocktails, 0);
  console.log(cocktailsFavorites);
}

//
//
//
function listenCocktails() {
  console.log('Entra en listenCocktails');
  // Escucho todos los iconos de corazón de las tarjetas pintadas.
  const listHearts = document.querySelectorAll('.js_icon_favorite');

  for (const heartElement of listHearts) {
    heartElement.addEventListener('click', addRemoveFavorites);
  }
}

//
//
//
function paintFun(ckt, swt) {
  console.log('Entra en paintFun');
  // console.log(ckt.length);
  console.log(ckt);

  let htmlToPaint = '';

  for (let i = 0; i < ckt.length; i++) {
    const dataStr = 'ckt';
    const drink = ckt[i];
    // console.log('-->', ckt[i]);

    const esta = ckt[i].id;

    // Añado al "li" y al "i" el "id" del elemento (cóctel) del array, para poderlo identifcar y usar para su búsqueda posterior, y así comprobar si está en favoritos o no.
    // (id="${ckt[i].idDrink}").

    // Compruebo si el objeto está ya en el array de "favoritos".
    const itsFavoriteCkt = cocktailsFavorites.findIndex((elementFav) => {
      return elementFav.idDrink === ckt[i].idDrink;
    });

    let addFavoriteClass = '';
    let heartStyle = 'fa-regular';

    if (itsFavoriteCkt !== -1) {
      addFavoriteClass = 'favorite';
      heartStyle = 'fa-solid';
    }

    htmlToPaint += `
      <li class="cocktailCard js_cocktail_card ${addFavoriteClass}" id="${ckt[i].idDrink}">
         <i class="cocktailCard__icon-favourite js_icon_favorite ${heartStyle} fa-heart" id="${ckt[i].idDrink}"></i>
           <h3 class="cocktailCard__title">${ckt[i].strDrink}</h3>
           <img
             src="${ckt[i].strDrinkThumb}"
             alt="${ckt[i].strDrink}"
             class="cocktailCard__img"
           />
           <p class="cocktailCard__alcoholic">${ckt[i].strAlcoholic}</p>

           <p class="cocktailCard__ingredients">Ingredientes:</p>

           <ol class="cocktailCard__list-ingredients">`;

    // Pinto los ingredientes de cada cóctel.
    for (let index = 1; index < 16; index++) {
      const ingredient = 'strIngredient'.concat(index);
      // Compruebo que el valor devuelto por el ingrediente no sea "null" ni vacio.
      if (drink[ingredient] !== null && drink[ingredient] !== '') {
        // console.log('DRINK INGREDIENT: ', drink[ingredient]);
        htmlToPaint += `<li class="cocktailCard__list-ingredients__li">${drink[ingredient]}</li>`;
      }
    }
    htmlToPaint += `</ol></li>`;
  }

  if (swt === 0) {
    console.log('Entra en pintar cocktails buscados');
    listSearchCKT.innerHTML = 'Buscados';
    listSearchCKT.innerHTML += htmlToPaint;
  } else {
    console.log('Entra en pintar cocktails favorites');
    listFavoritesCKT.innerHTML = 'Favoritos';
    listFavoritesCKT.innerHTML += htmlToPaint;
  }

  // Después de pintar, escucho de nuevo las listas.
  listenCocktails();
}

//
//
//
function handleClickSearch(event) {
  console.log('Entra en handleClickSearch');
  event.preventDefault();

  // Creo una variable y en ella meto el valor del input de búsqueda.
  let inputSearchValue = '';
  inputSearchValue = inputSearch.value;

  // Hago la llamada a la API:
  fetch(searchURL + inputSearchValue)
    .then((response) => response.json())
    .then((data) => {
      cocktails = data.drinks;

      // ¡HAY QUE BORRAR ESTA LÍNEA!
      // cocktailsFavorites = data.drinks;
      // ¡HAY QUE BORRAR ESTA LÍNEA!

      // Conmutador.
      // swt = 0 --> Buscados.
      // swt = 1 --> Favoritos.

      // console.log('FAVORITOS', data.drinks[0]);

      // Llamo a la función que pinta las tarjetas.
      // Le paso por parámetro el array del resultado de cócteles de la búsqueda de le usuarie.
      paintFun(cocktails, 0);
    });
}
//
//

//
// Eventos.
//
btnSearch.addEventListener('click', handleClickSearch);

//
// AL CARGAR LA PÁGINA:
//
getLocalStorage();

//
// Pruebas.
//

//
// No sé cómo llamar con un bucle a "data.drinks[2].strIngredientX", donde X es un número variable e incremental entre el 1 y el 15.
//
// let index = 2;
// let varPrueba = `.strIngredient${index}`;

// for (let index = 1; index < 4; index++) {
//   console.log(data.drinks[2].strIngredient + '' + index);
//   console.log(data.drinks[2]);

// listSearchCKT.innerHTML += data.drinks[2].strIngredient + index;
// }
//
//
//

//# sourceMappingURL=main.js.map
