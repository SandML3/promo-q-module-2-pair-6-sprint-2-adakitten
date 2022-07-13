'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');
const GITHUB_USER = 'Csuau';
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

//Objetos con cada gatito
const kittenData_1 = {
    image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
    name: "Anastacio",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_2 = {
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
    name: "Fiona",
    desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_3 = {
    image: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
    name: "Cielo",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};

//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

let kittenDataList = [];

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

const apiCallGET = () => {
    fetch(SERVER_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
          // kittenDatalist.push(data.results[0], data.results[1], data.results[2]);
          data.results.forEach(kitten => {
              kittenDataList.push(kitten);
          });
          localStorage.setItem('kittensList',JSON.stringify(kittenDataList));
          renderKittenList(kittenDataList)

        .catch((error) => console.error(error));
      });  
  }
  

if (kittenListStored === null) {
    apiCallGET();
}   else {
    const kittenLS = JSON.parse(localStorage.getItem('kittensList'));
    renderKittenList(kittenLS);
}



/* 
fetch(SERVER_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
}).then(response => response.json())
    .then(data => {
        // kittenDatalist.push(data.results[0], data.results[1], data.results[2]);
        data.results.forEach(kitten => {
            kittenDataList.push(kitten);
        });
        renderKittenList(kittenDataList)
    }); */

//Funciones
function renderKitten (kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.url}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList (kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm () {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm () {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm (event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
const resetKittenForm = () => {
    inputDesc.value = '';
    inputPhoto.value = '';
    inputName.value = '';
    inputRace.value = '';
}

const apiCallPost = (newKittenDataObject) => {
    fetch(SERVER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json,;charset=utf-8'},
        body: JSON.stringify(newKittenDataObject),
      })
      .then((response) => response.json())
      .then(data => console.log(data))
      /* .then((data) => {
        if (data.success) {
          //Completa y/o modifica el código:
          //Agrega el nuevo gatito al listado
          //Guarda el listado actualizado en el local stoarge
          //Visualiza nuevamente el listado de gatitos
          //Limpia los valores de cada input
        } else {
          //muestra un mensaje de error.
        } */
      //})
}




function addNewKitten (event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;

    const newKittenDataObject = {
        image: valuePhoto,
        name: valueName,
        desc: valueDesc,
        race: valueRace
    }

    kittenDataList.push(newKittenDataObject);
    renderKittenList(kittenDataList);

    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = "";
        }
    }

    apiCallPost(newKittenDataObject);
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten (event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
/*function filterKitten (event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    }
}*/

//filtrar con filter
function filterKitten (ev) {
    ev.preventDefault();
    const descrSearchText = input_search_desc.value;
    const descrSearchRace = input_search_race.value;
    listElement.innerHTML = "";

    const kittenListFiltered = kittenDataList
        .filter((kitten) => kitten.desc.toLowerCase().includes(descrSearchText.toLowerCase()))
        .filter(kitten => kitten.race.toLowerCase().includes(descrSearchRace.toLowerCase()));
    console.log(kittenListFiltered);

    renderKittenList(kittenListFiltered);



    //Modifica el código:
    //Haz un filter sobre el listado de gatitos
    //Vuelve a pintar el listado de gatitos filtrados en el HTML.
}
searchButton.addEventListener('click', filterKitten);
//Mostrar el litado de gatitos en ell HTML
// renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);







