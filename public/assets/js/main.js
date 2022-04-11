'use strict';

//
// ELEMENTOS DEL HTML.
//
// Input de búsqueda
const inputSearch = document.querySelector('.js_input_search');

// Botones "Buscar" y "Reset".
const btnSearch = document.querySelector('.js_btn_search');
const btnReset = document.querySelector('.js_btn_reset');

// Listados de HTML donde se pintan las listas de cócteles "Buscados" y "Favoritos".
const listSearchCKT = document.querySelector('.js_list_search_CKT');
const listFavoritesCKT = document.querySelector('.js_list_favorites_CKT');
const listDrinkedCKT = document.querySelector('.js_list_drinked_CKT');

// Títulos
const counterFav = document.querySelector('.js_counter_fav');
const counterDri = document.querySelector('.js_counter_dri');

// Body. Sí, "body".
const bodyJs = document.querySelector('.js_body');

//
// CONSTANTES Y VARIABLES.
//

// URLS.
const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const nonAlcoholicURL =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
const margaritaURL =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const mojitoURL =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito';
const ginURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin';
const randonURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

// Generador de URL.
let callApiUrl = '';

// Arrays con las listas de cócteles "Buscados" y "Favoritos".
let cocktails = [];
let cocktailsFavorites = [];
let cocktailsDrinked = [];

// Número de elementos "randon" que aparecen al pintar la primera vez.
let randonIni = 6;

// Creo un conmutador para decidir en qué lista hay que pintar.
let swt = 0;

// Contadores:
let countCktFav = 0;
let countCktDri = 0;

//
// FUNCIONES.
//

//
// Añade la lista de favoritos a localStorage.
//
function setLocalStorage() {
  // console.log('Entra en setLocalStorage');
  // Convierto a "string" el array de objetos de con los cócteles favoritos.
  const locStoCocktailsFavorites = JSON.stringify(cocktailsFavorites);
  const locStoCocktailsDrinked = JSON.stringify(cocktailsDrinked);

  localStorage.setItem('localFavoritesList', locStoCocktailsFavorites);
  localStorage.setItem('localDrinkedList', locStoCocktailsDrinked);
}

//
// Obtiene la lista de favoritos de localStorage y la comprueba.
//
function getLocalStorage() {
  // console.log('Entra en gelLocalStorage');

  // Variables del localStorage (así se llaman en la memoria del navegador).

  // 1.- Meto en una variable lo que hay en localStorage.
  let locStoCocktailsFavorites = localStorage.getItem('localFavoritesList');
  let locStoCocktailsDrinked = localStorage.getItem('localDrinkedList');

  if (
    locStoCocktailsFavorites === '[null]' ||
    locStoCocktailsFavorites === [null] ||
    locStoCocktailsFavorites === 'null' ||
    locStoCocktailsFavorites === null ||
    locStoCocktailsFavorites === [] ||
    locStoCocktailsFavorites === '[]'
  ) {
    locStoCocktailsFavorites = [];
  } else {
    const parseLocStoCocFav = JSON.parse(locStoCocktailsFavorites);
    cocktailsFavorites = parseLocStoCocFav;
    paintFun(cocktailsFavorites, 1);
  }

  if (
    locStoCocktailsDrinked === '[null]' ||
    locStoCocktailsDrinked === [null] ||
    locStoCocktailsDrinked === 'null' ||
    locStoCocktailsDrinked === null ||
    locStoCocktailsDrinked === [] ||
    locStoCocktailsDrinked === '[]'
  ) {
    locStoCocktailsDrinked = [];
  } else {
    const parseLocStoCocDri = JSON.parse(locStoCocktailsDrinked);
    cocktailsDrinked = parseLocStoCocDri;
    paintFun(cocktailsDrinked, 2);
  }
}

//
// Añade o elimina elementos de la lista de favoritos.
//
function addRemoveFavorites(event) {
  // console.log('Entra en addRemoveFavorites');

  // Identifico qué elemento de favoritos ha sido clickado mediante su "id".
  const cardClickedId = event.currentTarget.id;

  // Recojo en una variable el elemento cuyo id coincide con el pinchado.
  const cocktailClicked = cocktails.find((element) => {
    return element.idDrink === cardClickedId;
  });

  // Compruebo si el objeto está ya en el array de "favoritos".
  const itsFavoriteCkt = cocktailsFavorites.findIndex((elementFav) => {
    return elementFav.idDrink === cardClickedId;
  });

  // Averiguo si el objeto clickado ya estaba en favoritos.
  // En caso negativo, lo añado con ".push" (if).
  // En caso afirmativo, lo elimino con ".splice" (else).
  if (itsFavoriteCkt === -1) {
    cocktailsFavorites.push(cocktailClicked);
  } else {
    cocktailsFavorites.splice(itsFavoriteCkt, 1);
  }

  setLocalStorage();

  paintFun(cocktails, 0);
  paintFun(cocktailsFavorites, 1);
  paintFun(cocktailsDrinked, 2);
}

//
// Añade o elimina elementos de la lista de bebidos.
//
function addRemoveDrinked(event) {
  // console.log('Entra en addRemoveDrinked');

  // Recojo el Id de la copita.
  const cardClickedId = event.currentTarget.id;

  // Recojo en una variable el elemento de "buscados" cuyo id coincide con el pinchado.
  const cocktailClicked = cocktails.find((element) => {
    return element.idDrink === cardClickedId;
  });

  // Compruebo si el elemento pinchado está ya en la lista de cócteles bebidos.
  const itsDrinkedCkt = cocktailsDrinked.findIndex((elementDrink) => {
    return elementDrink.idDrink === cardClickedId;
  });

  if (itsDrinkedCkt === -1) {
    cocktailsDrinked.push(cocktailClicked);
  } else {
    cocktailsDrinked.splice(itsDrinkedCkt, 1);
  }

  setLocalStorage();

  paintFun(cocktails, 0);
  paintFun(cocktailsFavorites, 1);
  paintFun(cocktailsDrinked, 2);
}

//
// Escucha la lista de iconos de favorito de los cóctles (Los corazoncitos).
//
function listenCocktails() {
  // console.log('Entra en listenCocktails');

  // Escucho todos los iconos de corazón de las tarjetas pintadas.
  const listHearts = document.querySelectorAll('.js_icon_favorite');

  for (const heartElement of listHearts) {
    heartElement.addEventListener('click', addRemoveFavorites);
  }
}

//
// Escucha la lista de iconos de cóctel de los cóctles (Las copitas).
//
function listenDrinked() {
  // console.log('Entra en listenDrinked');
  // Escucho todos los iconos de copita de las tarjetas pintadas.
  const listGlasses = document.querySelectorAll('.js_icon_glass');

  for (const glassElement of listGlasses) {
    glassElement.addEventListener('click', addRemoveDrinked);
  }
}

//
// Genera la URL para las búsquedas predefindas.
//
function ApiUrlGenerator(event) {
  // console.log('Entra en ApiUrlGenerator');

  // Identifico qué elemento de los "li" ha sido clickado mediante su "id".
  const liClickedId = event.currentTarget.id;

  if (liClickedId === 'nonAlc') {
    callApiUrl = nonAlcoholicURL;
  }
  if (liClickedId === 'mar') {
    callApiUrl = margaritaURL;
  }
  if (liClickedId === 'moj') {
    callApiUrl = mojitoURL;
  }
  if (liClickedId === 'gin') {
    callApiUrl = ginURL;
  }
  if (liClickedId === 'ran') {
    callApiUrl = randonURL;
  }
  callApi(callApiUrl);
}

//
// Escucha la lista de "li" con búsquedas predefinidas.
//
function listenPredefinedList() {
  // console.log('Entra en listenPredefinedList');
  // Escucho todos los "li" de búsquedas predefinidas.
  const listPredefined = document.querySelectorAll('.js_header_link');

  for (const liElement of listPredefined) {
    liElement.addEventListener('click', ApiUrlGenerator);
  }
}

//
// Pintar en pantalla.
//
function paintFun(ckt, swt) {
  // console.log('Entra en paintFun');
  // ckt --> Array con los objetos a pintar.
  // swt --> Conmutador que indica en qué lista se pinta:
  // swt = 0 --> Buscados.
  // swt = 1 --> Favoritos.
  // swt = 2 --> Bebidos.
  // swt = 3 --> Randon.

  // Qué versión de las tarjetas pinta.
  let way = '';
  if (swt === 0 || swt === 3) {
    way = 'seaRan';
  } else {
    way = 'favDri';
  }

  let htmlToPaint = '';
  let addAlcCon = '';

  for (let i = 0; i < ckt.length; i++) {
    // htmlToPaint = '';

    const drink = ckt[i];

    // Compruebo si el objeto está ya en el array de "favoritos".
    const itsFavoriteCkt = cocktailsFavorites.findIndex((elementFav) => {
      return elementFav.idDrink === ckt[i].idDrink;
    });

    // Compruebo si el objeto está ya en el array de "bebidos".
    const itsDrinkedCkt = cocktailsDrinked.findIndex((elementDrink) => {
      return elementDrink.idDrink === ckt[i].idDrink;
    });

    let addFavoriteClass = '';
    let addDrinkedClass = '';
    let addAlcoholicClass = '';
    let addMaybeAlcoholicClass = '';
    let addNonAlcoholicClass = '';

    if (itsFavoriteCkt !== -1) {
      addFavoriteClass = 'favoriteClass';
    }

    if (itsDrinkedCkt !== -1) {
      addDrinkedClass = 'drinkedClass';
    }

    // Comprobación del tipo de cóctel, para añadir una clase que le de color a su "label" en función de si es alcohólico, no, o puede.
    if (ckt[i].strAlcoholic === 'Alcoholic') {
      addAlcoholicClass = 'alcoholicClass';
      addAlcCon = 'Alcoholic';
    } else if (ckt[i].strAlcoholic === 'Optional alcohol') {
      addMaybeAlcoholicClass = 'maybeAlcoholicClass';
    } else {
      addNonAlcoholicClass = 'nonAlcoholicClass';
    }

    // Imagen por defecto.
    const imgDrink = ckt[i].strDrinkThumb;
    if (ckt[i].strDrinkThumb === '') {
      const imgDrink = '../assets/images/grog001.jpg';
    }

    htmlToPaint += `<div class="constructor--${way}__card" id="${ckt[i].idDrink}">`;
    htmlToPaint += `<div class="constructor--${way}__card__img" style="background-image: url(${imgDrink})">`;
    htmlToPaint += `<div class="constructor--${way}__card__img__iconFav js_icon_favorite ${addFavoriteClass}" id="${ckt[i].idDrink}">`;
    htmlToPaint += `</div>`;
    htmlToPaint += `<div class="constructor--${way}__card__img__iconDri js_icon_glass ${addDrinkedClass}" id="${ckt[i].idDrink}">`;
    htmlToPaint += `</div>`;
    htmlToPaint += `</div>`;
    htmlToPaint += `<h5 class="constructor--${way}__card__title title--h5">${ckt[i].strDrink}</h5>`;

    // Pinto los ingredientes de cada cóctel, pero solo si "swt" es "0" o "3" (Buscados o Aleatorios).
    if (swt === 0 || swt === 3) {
      htmlToPaint += ` <p class="constructor--${way}__card__ingredients-text">Ingredientes:</p>`;
      htmlToPaint += `<ul class="constructor--${way}__card__ingredients-ul">`;

      for (let index = 1; index < 16; index++) {
        const ingredient = 'strIngredient'.concat(index);
        // Compruebo que el valor devuelto por el ingrediente no sea "null" ni vacio.
        if (
          drink[ingredient] !== null &&
          drink[ingredient] !== '' &&
          drink[ingredient] !== undefined
        ) {
          // console.log('DRINK INGREDIENT: ', drink[ingredient]);
          htmlToPaint += `<li class="constructor--${way}__card__ingredients-li">${drink[ingredient]}</li>`;
        }
      }
      htmlToPaint += `</ul>`;
    }

    htmlToPaint += `<div class="constructor--${way}__card__cont-label">`;
    htmlToPaint += `<p class="constructor--${way}__card__cont-label__label ${addAlcoholicClass} ${addMaybeAlcoholicClass} ${addNonAlcoholicClass}">${ckt[i].strAlcoholic}</p>`;
    htmlToPaint += `</div>`;
    htmlToPaint += `</div>`;
  }

  // En qué lista pinto las listas de cócteles.
  if (swt === 0 || swt === 3) {
    // console.log('Entra en pintar cocktails buscados');
    listSearchCKT.innerHTML = '';
    listSearchCKT.innerHTML += htmlToPaint;
  } else if (swt === 1) {
    // console.log('Entra en pintar cocktails favorites');
    listFavoritesCKT.innerHTML = '';
    listFavoritesCKT.innerHTML += htmlToPaint;
  } else {
    // console.log('Entra en pintar cocktails bebidos');
    listDrinkedCKT.innerHTML = '';
    listDrinkedCKT.innerHTML += htmlToPaint;
  }

  // Contadores para pasar como parámetro a la función "drunkennessFun".
  countCktFav = cocktailsFavorites.length;
  countCktDri = cocktailsDrinked.length;

  drunkennessFun(countCktFav, countCktDri, addAlcCon);

  // Después de pintar, escucho de nuevo las listas.
  listenCocktails();
  listenDrinked();
}

//
// Llama a la API y recoge los datos devueltos por la misma.
//
function callApi(callApiUrl) {
  // console.log('Entra en callApiUrl');
  // Hago la llamada a la API:
  fetch(callApiUrl)
    .then((response) => response.json())
    .then((data) => {
      cocktails = data.drinks;

      // Llamo a la función que pinta las tarjetas.
      paintFun(cocktails, 0);
    });
}

//
//
//
function drunkennessFun(countCktFav, countCktDri, addAlcCon) {
  counterFav.innerHTML = 'Mis favoritos (' + countCktFav + ')';
  counterDri.innerHTML = '';

  const drunkenness = [
    ':)',
    'Voy bien',
    'Sin problema',
    'El puntito',
    '¡¡Otra!!',
    '¡Tía!, ¡¡Te quiero1!',
    'Tranquiihh... ¡Que yo controlo!',
    '¿Ehhh...? ¡XD XD XD!',
    'Z... z... z...',
    'Ale, ya debe ser el día siguiente :)',
  ];

  // Array con las "class" que añaden el efecto blur en función de los cócteles bebidos.
  const drunkCss = [
    'drunkenness1',
    'drunkenness2',
    'drunkenness3',
    'drunkenness4',
    'drunkenness5',
    'drunkenness6',
    'drunkenness7',
    'drunkenness8',
    'drunkenness9',
  ];

  for (let i = 0; i < drunkenness.length; i++) {
    if (i === countCktDri) {
      counterDri.innerHTML =
        'Los que he bebido (' + countCktDri + ') - ' + drunkenness[i];
    }
  }

  let addAlc = -1;
  for (let j = 0; j < drunkCss.length; j++) {
    bodyJs.classList.remove(`drunkenness${j}`);
    if (j === countCktDri) {
      bodyJs.classList.add(`drunkenness${j}`);
    }
  }
}

//
//
//
function getRandonCocktails() {
  // console.log('Entra en getRandonCocktails');

  for (let i = 0; i < randonIni; i++) {
    // Hago la llamada a la API:
    fetch(randonURL)
      .then((response) => response.json())
      .then((data) => {
        // Hay queponer el índice cero [0] siempre, porque la URL de randon solo devuelve un valor, el de la posición cero [0].
        cocktails.push(data.drinks[0]);

        if (cocktails.length === randonIni) {
          paintFun(cocktails, 0);
        }
      });

    // Llamo a la función que pinta las tarjetas.
  }
}

//
// Funciones manejadoras:
//

//
// Crea la URL de búsqueda para la llamada a la API, con el valor del input.
//
function handleClickSearch(event) {
  // console.log('Entra en handleClickSearch');
  event.preventDefault();

  // Creo una variable y en ella meto el valor del input de búsqueda.
  let inputSearchValue = '';
  inputSearchValue = inputSearch.value;

  callApiUrl = searchURL + inputSearchValue;

  if (inputSearchValue === '') {
    inputSearch.placeholder = 'Tienes que decirme qué buscar ahora ;)';
    return;
  }
  // Si quiero meter otra URL tiene que llegar aquí ;)
  // callApi('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
  callApi(callApiUrl);
}

//
// Resetea la búsqueda.
// Borra las listas de cócteles.
// Borra la lista de favoritos de localStorage.
// Pinta de nuevo los cócteles aleatorios.
//
function handleClickReset() {
  cocktails = [];
  cocktailsFavorites = [];
  cocktailsDrinked = [];

  setLocalStorage();
  paintFun(cocktails, 0);
  paintFun(cocktailsFavorites, 1);
  paintFun(cocktailsDrinked, 2);
  getRandonCocktails();

  listFavoritesCKT.innerHTML = `
   <div class="constructorEmpty">
      <p class="constructorEmpty__p title--h4">
        Aún no has añadido níngun cóctel
      </p>
      <p class="constructorEmpty__p title--h5">
        Prueba a pinchar su corazón ;)
      </p>
      <div class="constructorEmpty__imgFav"></div>
    </div>`;

  listDrinkedCKT.innerHTML = `
   <div class="constructorEmpty">
      <p class="constructorEmpty__p title--h4">
        Aún no te has bebido níngun cóctel
      </p>
      <p class="constructorEmpty__p title--h5">
        Prueba a pinchar su coctelera ;)
      </p>
      <div class="constructorEmpty__imgDri"></div>
    </div>`;
}

//
// EVENTOS.
//
btnSearch.addEventListener('click', handleClickSearch);
btnReset.addEventListener('click', handleClickReset);

// Realiza la búsqueda de los cócteles por nombre mientras se escribe.
inputSearch.addEventListener('keyup', handleClickSearch);

// Previene el comportamiento por defecto de la tecla "Intro".
inputSearch.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    inputSearch.value = '';
  }
});

//
// AL CARGAR LA PÁGINA:
//
getLocalStorage();
getRandonCocktails();
listenPredefinedList();

//# sourceMappingURL=main.js.map
