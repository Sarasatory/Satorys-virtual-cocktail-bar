// 'use strict';

// //
// // ELEMENTOS DEL HTML.
// //
// // Input de búsqueda
// const inputSearch = document.querySelector('.js_input_search');

// // Botones "Buscar" y "Reset".
// const btnSearch = document.querySelector('.js_btn_search');
// const btnReset = document.querySelector('.js_btn_reset');

// // Listados de HTML donde se pintan las listas de cócteles "Buscados" y "Favoritos".
// const listSearchCKT = document.querySelector('.js_list_search_CKT');
// const listFavoritesCKT = document.querySelector('.js_list_favorites_CKT');
// const listDrinkedCKT = document.querySelector('.js_list_drinked_CKT');

// //
// // CONSTANTES Y VARIABLES.
// //

// // URLS.
// const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// const nonAlcoholicURL =
//   'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
// const margaritaURL =
//   'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
// const mojitoURL =
//   'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito';
// const ginURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin';
// const randonURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
// // const grogURL = 'https://sarasatory.github.io/json-experiments/';

// // Generador de URL.
// let callApiUrl = '';

// // Número de elementos "randon" que aparecen al pintar la primera vez.
// let randonIni = 2;

// // Arrays con las listas de cócteles "Buscados" y "Favoritos".
// let cocktails = [];
// let cocktailsFavorites = [];
// let cocktailsDrinked = [];

// // Creo un conmutador para decidir en qué lista hay que pintar.
// // swt = 0 --> Buscados.
// // swt = 1 --> Favoritos.
// // swt = 2 --> Bebidos.
// let swt = 0;

// //
// // FUNCIONES.
// //

// //
// // Añade la lista de favoritos a localStorage.
// //
// function setLocalStorage() {
//   console.log('Entro en setLocalStorage');
//   // Convierto a "string" el array de objetos de con los cócteles favoritos.
//   const locStoCocktailsFavorites = JSON.stringify(cocktailsFavorites);
//   const locStoCocktailsDrinked = JSON.stringify(cocktailsDrinked);

//   localStorage.setItem('localFavoritesList', locStoCocktailsFavorites);
//   // if (locStoCocktailsFavorites === '[null') {
//   //   locStoCocktailsFavorites = '';
//   // } else {
//   //   // Lo guardo en localStorage.
//   //   localStorage.setItem('localFavoritesList', locStoCocktailsFavorites);
//   // }

//   localStorage.setItem('localDrinkedList', locStoCocktailsDrinked);
//   // if (locStoCocktailsDrinked === '[null') {
//   //   locStoCocktailsDrinked = '';
//   // } else {
//   //   // Lo guardo en localStorage.
//   //   localStorage.setItem('localDrinkedList', locStoCocktailsDrinked);
//   // }
// }

// //
// // Obtiene la lista de favoritos de localStorage y la comprueba.
// //
// function getLocalStorage() {
//   console.log('Entro en gelLocalStorage');
//   console.log('AQUI');

//   // Variables del localStorage (así se llaman en la memoria del navegador).

//   // 1.- Meto en una variable lo que hay en localStorage.
//   let locStoCocktailsFavorites = localStorage.getItem('localFavoritesList');
//   let locStoCocktailsDrinked = localStorage.getItem('localDrinkedList');

//   if (locStoCocktailsFavorites !== null && locStoCocktailsFavorites !== []) {
//     console.log('Entra en !== null');

//     const parseLocStoCocFav = JSON.parse(locStoCocktailsFavorites);
//     cocktailsFavorites = parseLocStoCocFav;
//     paintFun(cocktailsFavorites, 1);
//   }

//   if (locStoCocktailsDrinked !== null && locStoCocktailsDrinked !== []) {
//     console.log('Entra en !== null');

//     const parseLocStoCocDri = JSON.parse(locStoCocktailsDrinked);
//     cocktailsDrinked = parseLocStoCocDri;
//     paintFun(cocktailsDrinked, 2);
//   }

//   // if (
//   //   locStoCocktailsFavorites === '[null]' ||
//   //   locStoCocktailsFavorites === [null] ||
//   //   locStoCocktailsFavorites === 'null' ||
//   //   locStoCocktailsFavorites === null ||
//   //   locStoCocktailsFavorites === [] ||
//   //   locStoCocktailsFavorites === '[]'
//   // ) {
//   //   console.log('NULO - FAVORITES 1', locStoCocktailsFavorites);
//   //   locStoCocktailsFavorites = [];
//   //   console.log('NULO - FAVORITES 2', locStoCocktailsFavorites);
//   // } else {
//   //   console.log('DISTINTO DE NULO - FAVORITES', locStoCocktailsFavorites);

//   //   const parseLocStoCocFav = JSON.parse(locStoCocktailsFavorites);
//   //   cocktailsFavorites = parseLocStoCocFav;
//   //   paintFun(cocktailsFavorites, 1);
//   // }

//   // if (
//   //   locStoCocktailsDrinked === '[null]' ||
//   //   locStoCocktailsDrinked === [null] ||
//   //   locStoCocktailsDrinked === 'null' ||
//   //   locStoCocktailsDrinked === null ||
//   //   locStoCocktailsDrinked === [] ||
//   //   locStoCocktailsDrinked === '[]'
//   // ) {
//   //   console.log('NULO - DRINKED 1', locStoCocktailsDrinked);
//   //   locStoCocktailsDrinked = [];
//   //   console.log('NULO - DRINKED 2', locStoCocktailsDrinked);
//   // } else {
//   //   console.log('DISTINTO DE NULO - DRINKED', locStoCocktailsDrinked);

//   //   const parseLocStoCocDri = JSON.parse(locStoCocktailsDrinked);
//   //   cocktailsDrinked = parseLocStoCocDri;
//   //   paintFun(cocktailsDrinked, 2);
//   // }
// }

// //
// // Añade o elimina elementos de la lista de favoritos.
// //
// function addRemoveFavorites(event) {
//   console.log('Entra en addRemoveFavorites');

//   // Identifico qué elemento de favoritos ha sido clickado mediante su "id".
//   const cardClickedId = event.currentTarget.id;

//   const cocktailClicked = cocktails.find((element) => {
//     return element.idDrink === cardClickedId;
//   });

//   // Compruebo si el objeto está ya en el array de "favoritos".
//   const itsFavoriteCkt = cocktailsFavorites.findIndex((elementFav) => {
//     return elementFav.idDrink === cardClickedId;
//   });

//   // Ya tengo guardado en "itsFavoriteCkt" el índice del objeto (cóctel) que se corresponde con el que hemos pinchado.
//   // Esto sirve para poderlo borrar en caso de que ya esté en el array de "favoritos".

//   // Averiguo si el objeto clickado ya estaba en favoritos.
//   // En caso negativo, lo añado con ".push" (if).
//   // En caso afirmativo, lo elimino con ".splice" (else).
//   if (itsFavoriteCkt === -1) {
//     // console.log('No estaba, ¡LO PONGO!');
//     cocktailsFavorites.push(cocktailClicked);
//     console.log('PUSH: ', cocktailClicked);
//     console.log('Cocktails Favorites: ', cocktailsFavorites);
//   } else {
//     // console.log('Estaba, ¡LO QUITO!');
//     cocktailsFavorites.splice(itsFavoriteCkt, 1);
//   }

//   setLocalStorage();

//   paintFun(cocktails, 0);
//   paintFun(cocktailsFavorites, 1);
//   paintFun(cocktailsDrinked, 2);
// }

// //
// // Añade o elimina elementos de la lista de bebidos.
// //
// function addRemoveDrinked(event) {
//   console.log('Entra en addRemoveDrinked');

//   // Recojo el Id de la copita.
//   const cardClickedId = event.currentTarget.id;

//   // Recojo en una variable el elemento de "buscados" cuyo id coincide con el pinchado.
//   const cocktailClicked = cocktails.find((element) => {
//     return element.idDrink === cardClickedId;
//   });

//   // Compruebo si el elemento pinchado está ya en la lista de cócteles bebidos.
//   const itsDrinkedCkt = cocktailsDrinked.findIndex((elementDrink) => {
//     return elementDrink.idDrink === cardClickedId;
//   });
//   console.log('¡AQUÍ!');
//   console.log('¡AQUÍ!');
//   console.log(itsDrinkedCkt);

//   if (itsDrinkedCkt === -1) {
//     cocktailsDrinked.push(cocktailClicked);
//   } else {
//     cocktailsDrinked.splice(itsDrinkedCkt, 1);
//   }

//   setLocalStorage();

//   paintFun(cocktails, 0);
//   paintFun(cocktailsFavorites, 1);
//   paintFun(cocktailsDrinked, 2);
// }

// //
// // Escucha la lista de iconos de favorito de los cóctles (Los corazoncitos).
// //
// function listenCocktails() {
//   console.log('Entra en listenCocktails');

//   // Escucho todos los iconos de corazón de las tarjetas pintadas.
//   const listHearts = document.querySelectorAll('.js_icon_favorite');

//   for (const heartElement of listHearts) {
//     heartElement.addEventListener('click', addRemoveFavorites);
//   }
// }

// //
// // Escucha la lista de iconos de cóctel de los cóctles (Las copitas).
// //
// function listenDrinked() {
//   console.log('Entra en listenDrinked');
//   // Escucho todos los iconos de copita de las tarjetas pintadas.
//   const listGlasses = document.querySelectorAll('.js_icon_glass');

//   for (const glassElement of listGlasses) {
//     glassElement.addEventListener('click', addRemoveDrinked);
//   }
// }

// //
// // Genera la URL para las búsquedas predefindas.
// //
// function ApiUrlGenerator(event) {
//   console.log('Entra en ApiUrlGenerator');

//   // Identifico qué elemento de los "li" ha sido clickado mediante su "id".
//   const liClickedId = event.currentTarget.id;
//   // console.log('ID: ', liClickedId);

//   if (liClickedId === 'nonAlc') {
//     callApiUrl = nonAlcoholicURL;
//   }
//   if (liClickedId === 'mar') {
//     callApiUrl = margaritaURL;
//   }
//   if (liClickedId === 'moj') {
//     callApiUrl = mojitoURL;
//   }
//   if (liClickedId === 'gin') {
//     callApiUrl = ginURL;
//   }
//   if (liClickedId === 'ran') {
//     callApiUrl = randonURL;
//   }
//   callApi(callApiUrl);
// }

// //
// // Escucha la lista de "li" con búsquedas predefinidas.
// //
// function listenPredefinedList() {
//   console.log('Entra en listenPredefinedList');
//   // Escucho todos los "li" de búsquedas predefinidas.
//   const listPredefined = document.querySelectorAll('.js_header_link');
//   // console.log('listPredefined: ', listPredefined);

//   for (const liElement of listPredefined) {
//     liElement.addEventListener('click', ApiUrlGenerator);
//   }
// }

// //
// // Pintar en pantalla.
// //
// function paintFun(ckt, swt) {
//   // ckt --> Array con los objetos a pintar.
//   // swt --> Conmutador que indica en qué lista se pinta:
//   // swt = 0 --> Buscados.
//   // swt = 1 --> Favoritos.
//   // swt = 2 --> Bebidos.
//   // swt = 3 --> Randon.

//   let htmlToPaint = '';

//   for (let i = 0; i < ckt.length; i++) {
//     const drink = ckt[i];

//     // Compruebo si el objeto está ya en el array de "favoritos".
//     const itsFavoriteCkt = cocktailsFavorites.findIndex((elementFav) => {
//       return elementFav.idDrink === ckt[i].idDrink;
//     });

//     // Compruebo si el objeto está ya en el array de "bebidos".
//     const itsDrinkedCkt = cocktailsDrinked.findIndex((elementDrink) => {
//       return elementDrink.idDrink === ckt[i].idDrink;
//     });

//     let addFavoriteClass = '';
//     let addDrinkedClass = '';
//     let heartStyle = 'fa-regular';
//     let glassStyle = 'fa-martini-glass-citrus';

//     if (itsFavoriteCkt !== -1) {
//       addFavoriteClass = 'favorite';
//       heartStyle = 'fa-solid';
//     }

//     if (itsDrinkedCkt !== -1) {
//       addDrinkedClass = 'drinked';
//       glassStyle = 'fa-martini-glass-empty';
//     }

//     // Imagen por defecto.
//     const imgDrink = ckt[i].strDrinkThumb;
//     if (ckt[i].strDrinkThumb === '') {
//       const imgDrink = '../assets/images/grog001.jpg';
//     }

//     // if (swt === 0) {}else{} ^^
//     //
//     // PUEDO HACER UN CONDICIONAL CON "swt" QUE AÑADA O QUITE CLASES A LA HORA DE PINTAR PARA DETERMINAR EL TIPO DE TARJETA Y SU APARIENCIA.
//     //
//     htmlToPaint += `
//         <li class="cocktailCard js_cocktail_card ${addFavoriteClass} ${addDrinkedClass}" id="${ckt[i].idDrink}">

//            <i class="cocktailCard__icon-favourite js_icon_favorite ${heartStyle} fa-heart" id="${ckt[i].idDrink}"></i>

//            <i class="cocktailCard__icon-glass js_icon_glass fa-solid ${glassStyle}" id="${ckt[i].idDrink}"></i>

//              <h3 class="cocktailCard__title">${ckt[i].strDrink} - ${ckt[i].idDrink}</h3>
//              <img
//                src="${imgDrink}"
//                alt="${ckt[i].strDrink}"
//                class="cocktailCard__img"
//              />
//              <p class="cocktailCard__alcoholic">${ckt[i].strAlcoholic}</p>

//              <p class="cocktailCard__ingredients">Ingredientes:</p>

//              <ol class="cocktailCard__list-ingredients">`;

//     // Pinto los ingredientes de cada cóctel.
//     for (let index = 1; index < 16; index++) {
//       const ingredient = 'strIngredient'.concat(index);
//       // Compruebo que el valor devuelto por el ingrediente no sea "null" ni vacio.
//       if (
//         drink[ingredient] !== null &&
//         drink[ingredient] !== '' &&
//         drink[ingredient] !== undefined
//       ) {
//         // console.log('DRINK INGREDIENT: ', drink[ingredient]);
//         htmlToPaint += `<li class="cocktailCard__list-ingredients__li">${drink[ingredient]}</li>`;
//       }
//     }

//     htmlToPaint += `</ol></li>`;
//   }

//   if (swt === 0 || swt === 3) {
//     console.log('Entra en pintar cocktails buscados');
//     listSearchCKT.innerHTML = 'Buscados';
//     listSearchCKT.innerHTML += htmlToPaint;
//   } else if (swt === 1) {
//     console.log('Entra en pintar cocktails favorites');
//     listFavoritesCKT.innerHTML = 'Favoritos';
//     listFavoritesCKT.innerHTML += htmlToPaint;
//   } else {
//     console.log('Entra en pintar cocktails bebidos');
//     listDrinkedCKT.innerHTML = 'Bebidos';
//     listDrinkedCKT.innerHTML += htmlToPaint;
//   }

//   // Después de pintar, escucho de nuevo las listas.
//   listenCocktails();
//   listenDrinked();
// }

// //
// // Llama a la API y recoge los datos devueltos por la misma.
// //
// function callApi(callApiUrl) {
//   // Hago la llamada a la API:
//   fetch(callApiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       cocktails = data.drinks;

//       // Llamo a la función que pinta las tarjetas.
//       paintFun(cocktails, 0);
//     });
// }

// //
// //
// //
// function getRandonCocktails() {
//   console.log('Entra en getRandonCocktails');

//   for (let i = 0; i < randonIni; i++) {
//     // Hago la llamada a la API:
//     fetch(randonURL)
//       .then((response) => response.json())
//       .then((data) => {
//         // Hay queponer el índice cero [0] siempre, porque la URL de randon solo devuelve un valor, el de la posición cero [0].
//         cocktails.push(data.drinks[0]);

//         // Llamo a la función que pinta las tarjetas.
//         paintFun(cocktails, 3);
//         // console.log('data.drinks[0] MMMM--->', data.drinks[0]);
//       });
//   }
// }

// //
// // Funciones manejadoras:
// //

// //
// // Crea la URL de búsqueda para la llamada a la API, con el valor del input.
// //
// function handleClickSearch(event) {
//   // console.log('Entra en handleClickSearch');
//   event.preventDefault();

//   // Creo una variable y en ella meto el valor del input de búsqueda.
//   let inputSearchValue = '';
//   inputSearchValue = inputSearch.value;

//   callApiUrl = searchURL + inputSearchValue;

//   // Si quiero meter otra URL tiene que llegar aquí ;)
//   // callApi('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
//   callApi(callApiUrl);
// }

// //
// // Resetea la búsqueda.
// // Borra las listas de cócteles.
// // Borra la lista de favoritos de localStorage.
// // Pinta de nuevo los cócteles aleatorios.
// //
// function handleClickReset() {
//   cocktails = [];
//   cocktailsFavorites = [];
//   cocktailsDrinked = [];

//   setLocalStorage();
//   paintFun(cocktails, 0);
//   paintFun(cocktailsFavorites, 1);
//   paintFun(cocktailsDrinked, 2);
//   getRandonCocktails();
// }

// //
// // EVENTOS.
// //
// btnSearch.addEventListener('click', handleClickSearch);
// btnReset.addEventListener('click', handleClickReset);

// // Realiza la búsqueda de los cócteles por nombre mientras se escribe.
// inputSearch.addEventListener('keyup', handleClickSearch);

// // Previene el comportamiento por defecto de la tecla "Intro".
// inputSearch.addEventListener('keypress', (e) => {
//   if (e.keyCode == 13) {
//     e.preventDefault();
//   }
// });

// //
// // AL CARGAR LA PÁGINA:
// //
// getLocalStorage();
// getRandonCocktails();
// listenPredefinedList();
