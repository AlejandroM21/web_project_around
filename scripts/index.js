import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  closeImagePopup,
  closePopup,
  enableGlobalPopupClose,
  enableOverlayClose,
  openPopup,
} from "./utils.js";

// ======== SECCIÓN: Selección y referencia de elementos del DOM ========

// Popup para edición de perfil
export const popup = document.querySelector(".popup");
const openButton = document.querySelector(".profile__button-edit");
const closeButton = document.querySelector(".popup__button-close");

// Formulario y campos de entrada del popup de edición
const form = document.querySelector(".popup__form");
export const nameInput = document.querySelector("#name");
export const jobInput = document.querySelector("#about-me");

// Elementos de perfil que serán actualizados
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about-me");

// Botón para agregar nuevas tarjetas y contenedor para formularios clonados
const btnAddForm = document.querySelector(".profile__button-add");
const contentFormClone = document.querySelector("#form-clone");

// Contenedor principal de tarjetas y plantilla (template) para clonación
const cardsContainer = document.querySelector(".elements");
// const closeButtonCardPopup = document.querySelector(
//   ".card-popup__button-close"
// );

// ---  CONFIGURACIÓN DE CLASES Y SELECTORES ---

const validationConfig = {
  formSelector: ".popup__form", // Selector para el formulario
  inputSelector: ".popup__input", // Selector para los inputs dentro del formulario
  submitButtonSelector: ".popup__button", // Selector para el botón submit
  inactiveButtonClass: "popup__button_disabled", // Clase que desactiva botón
  inputErrorClass: "popup__input_type_error", // Clase de borde rojo o similar
  errorClass: "popup__error_visible", // Clase que hace visible el mensaje de error
};

// --- APLICAR VALIDACIÓN A TODOS LOS FORMULARIOS DE LA PÁGINA ---

// Instanciación y activación de validación por cada formulario
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
); //Todos los <form>
formList.forEach((formElement) => {
  const validador = new FormValidator(validationConfig, formElement);
  validador.enableValidation();
});

// ======== SECCIÓN: Datos iniciales para tarjetas ========

const initialCards = [
  {
    cardTitle: "Valle de Yosemite",
    cardImage: "./images/card__image_yosemite.jpg",
  },
  {
    cardTitle: "Lago Louise",
    cardImage:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    cardTitle: "Montañas Calvas",
    cardImage:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    cardTitle: "Latemar",
    cardImage:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    cardTitle: "Parque Nacional de la Vanoise",
    cardImage:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    cardTitle: "Lago di Braies",
    cardImage:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Inserta tarjetas iniciales en el contenedor principal, se una instancia de la clase y se muestra
initialCards.forEach((card) => {
  const cardInstance = new Card(card, "#elements-template");
  const cardElement = cardInstance.addCard();
  cardsContainer.prepend(cardElement);
});

// ======== SECCIÓN: Gestión del formulario clonado para nuevas tarjetas ========

//Encapsular el código del clonador de formularios en una función
function createFormClone() {
  const formClone = popup.cloneNode(true); // Clonamos el popup original, para crear un formulario independiente

  // Cambia el título y texto del botón del formulario clonado
  formClone.querySelector(".popup__title").textContent = "Nuevo Lugar";
  formClone.querySelector(".popup__button").textContent = "Crear";

  // Configura los inputs del formulario clonado para título e imagen
  const inputs = formClone.querySelectorAll("input");
  const [titleInput, urlInput] = inputs;

  titleInput.value = "";
  titleInput.placeholder = "Titulo";
  titleInput.setAttribute("maxlength", 30);

  urlInput.value = "";
  urlInput.placeholder = "Enlace a la Imagen";
  urlInput.type = "url";
  urlInput.removeAttribute("minlength");
  urlInput.removeAttribute("maxlength");

  // Evento: cerrar el formulario clonado
  const closeBtnClon = formClone.querySelector(".popup__button-close");
  closeBtnClon.addEventListener("click", () => {
    formClone.remove();
  });

  // Evento: envío del formulario clonado
  const formInClone = formClone.querySelector("form");
  formInClone.addEventListener("submit", (e) => {
    e.preventDefault();

    //Obtiene los valores ingresados al momento de enviar
    const cardTitle = titleInput.value;
    const cardImage = urlInput.value;

    // Crea una nueva tarjeta y la inserta al principio del contenedor
    const newCard = new Card({ cardTitle, cardImage }, "#elements-template");
    const cardElement = newCard.addCard();
    cardsContainer.prepend(cardElement);

    // Remueve el formulario clonado después de crear la tarjeta
    formClone.remove();
  });

  // Muestra el formulario clonado
  formClone.classList.add("popup_opened");
  contentFormClone.append(formClone);

  // Inicializa la validación en el formulario clonado
  const cloneValidator = new FormValidator(validationConfig, formInClone);
  cloneValidator.enableValidation();
}
// Evento para mostrar el formulario clonado al pulsar botón "Agregar nuevo"
btnAddForm.addEventListener("click", createFormClone);

// Maneja el envío del formulario de edición de perfil: actualiza datos y cierra popup
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}

// ======== SECCIÓN: Eventos globales para apertura y cierre de popups ========

openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", handleProfileFormSubmit);

// Popup imagen ampliada
const closeButtonCardPopup = document.querySelector(
  ".card-popup__button-close"
);
closeButtonCardPopup.addEventListener("click", closeImagePopup);

// Habilitar cierre global y overlay
enableGlobalPopupClose();
enableOverlayClose();
