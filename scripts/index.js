// Seleccionamos el popup y los botones
let popup = document.querySelector(".popup");
let openButton = document.querySelector(".profile__button-edit");
let closeButton = document.querySelector(".popup__button-close");
let form = document.querySelector(".popup__container");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#about-me");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about-me");

// Seleccionamos los elementos relacionados con el formulario clonado
let btnAddForm = document.querySelector(".profile__button-add");
let contentFormClone = document.querySelector("#form-clone");

//Seleccionamos el template y el contenedor de tarjetas
let cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#elements-template").content;

// Función para crear una tarjeta
function addCard(cardTitle, cardImage) {
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true); // Clonamos el template

  // Asignamos la imagen y el texto
  cardElement.querySelector(".elements__card-title").textContent = cardTitle;

  cardElement
    .querySelector(".elements__card-image")
    .setAttribute("src", cardImage);

  cardElement
    .querySelector(".elements__card-image")
    .setAttribute("alt", `fotografia de: ${cardTitle}`);

  // Evento para dar like
  cardElement
    .querySelector(".elements__card-favorite")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__card-favorite_active");
    });

  cardElement
    .querySelector(".elements__trash")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  cards.prepend(cardElement);
}

// tarjetas iniciales

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/card__image_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Agregar tarjetas iniciales
initialCards.forEach((card) => {
  addCard(card.name, card.link);
});

// Evento para clonar y abrir formulario nuevo
btnAddForm.addEventListener("click", () => {
  const formClone = popup.cloneNode(true);

  // Cambiamos el texto del popup
  formClone.querySelector(".popup__title").textContent = "Nuevo Lugar";
  formClone.querySelector(".popup__save").textContent = "Crear";

  // Limpiamos los inputs y cambiamos placeholders
  const inputs = formClone.querySelectorAll("input");
  inputs.forEach((input) => {
    inputs.value = "";
    inputs[0].placeholder = "Titulo";
    inputs[1].placeholder = "Enlace a la Imagen";
  });

  // Botón cerrar del formulario clonado
  const closeBtnClon = formClone.querySelector(".popup__button-close");
  closeBtnClon.addEventListener("click", () => {
    formClone.remove();
  });

  // Evento submit del formulario clonado
  const formInClone = formClone.querySelector("form");
  formInClone.addEventListener("submit", (e) => {
    e.preventDefault();

    //Obtenemos los valores ingresados al momento del submit
    const cardTitle = inputs[0].value;
    const cardImage = inputs[1].value;

    // Creamos la tarjeta
    addCard(cardTitle, cardImage);

    // Cerramos y eliminamos el formulario
    formClone.remove();
  });

  // Mostramos el formulario clonado
  formClone.classList.add("popup_opened");
  contentFormClone.append(formClone);
});

// Función para abrir popup
function openPopup() {
  // Carga los datos actuales en los inputs
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;

  popup.classList.add("popup_opened");
}

// Función para cerrar popup
function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Previene el envío del form
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}

// Asociamos eventos

openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", handleProfileFormSubmit);
