# Esquema:

## VARIABLES:

let cocktails = [] <-- Array resultado de la búsqueda.
let cocktailsFavorites = [] <-- Array de favoritos.

## CARGA DE LA PÁGINA:

Al cargar --> Compruebo si en localStorage hay información guardada de las tarjetas favoritas.

    Sí --> Pinto las tarjetas favoritas.
    No --> Dejo la página vacia a la espera de una búsqueda.

No ---->

## EVENTOS:

Escucho el evento del botón "Buscar" (click).
Cojo la información del input de búsqueda y la guardo en una variable para poder realizar la búsqueda.
Recojo la información devuelta y la meto en la variable "cocktails".

Pinto la información del array de cócteles "cocktails".
Compruebo si alguno de los cócteles está en el array de favoritos "cocktailsFavorites", y en función de eso le añado o no una clase al pintarlo.
