// Aquí es donde se inicializan las clases, se importan los módulos necesarios y
// se añaden los "escuchadores de eventos" (event listeners) para que la página cobre vida.

// ===============================
// IMPORTS: Clases y datos iniciales
// ===============================
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, cardListSection } from "../utils/constants.js";

// ===============================
// SECCIÓN: Elementos del DOM
// ===============================

//------------------------------------
// ===== Popup Edición de Perfil ====
//------------------------------------
// --- Botón para abrir popup ---
const openButton = document.querySelector(".profile__button-edit");
// --- Elementos de perfil que serán actualizados ---
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");
// --- Formulario ---
const editForm = document.querySelector(".popup__form");

//------------------------------------------
// ==== Popup Agregar Tarjetas Nuevas =====
//------------------------------------------
// --- Botón para abrir popup ---
const btnOpenAdd = document.querySelector(".profile__button-add");
// --- Formulario ---
const addForm = document.querySelector(".popup__form_add");

// ===============================
// SECCIÓN: Instancias de Popups
// ===============================

// Instancia Popup de edición de perfil
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

// Instanciamos la clase con los selectores de los elementos del perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me",
});

// Instancia Popup para agregar nueva tarjeta, con su callback de envío
const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    // Crea una instancia de la clase Card para la nueva tarjeta.
    const newCardInstance = new Card(
      {
        cardTitle: formData["place-name"],
        cardImage: formData["place-link"],
      },
      "#elements-template",
      (image, title) => {
        popupImage.open(image, title);
      }
    );
    //Genera el elemento DOM de la tarjeta
    const newCardElement = newCardInstance.generateCard();
    // Insertar la nueva tarjeta en la lista
    cardList.prependItem(newCardElement);
    addCardPopup.close();
  },
});

// instancia Popup para ver imágenes en grande
const popupImage = new PopupWithImage(".card-popup");

// Habilita los "escuchadores de eventos" para cada popup.
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupImage.setEventListeners();

// ===============================
// SECCIÓN: Listado de tarjetas iniciales
// ===============================

// Instancia la clase Section para renderizar las tarjetas iniciales.
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardInstance = new Card(
        cardItem,
        "#elements-template",
        (image, title) => {
          popupImage.open(image, title);
        }
      );
      const cardElement = cardInstance.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardListSection
);

// Renderizar las tarjetas iniciales en la página
cardList.renderItems();

// ===============================
// SECCIÓN: Validación de formularios
// ===============================

const validationConfig = {
  formSelector: ".popup__form", // Selector para el formulario
  inputSelector: ".popup__input", // Selector para los inputs dentro del formulario
  submitButtonSelector: ".popup__button", // Selector para el botón submit
  inactiveButtonClass: "popup__button_disabled", // Clase que desactiva botón
  inputErrorClass: "popup__input_type_error", // Clase de borde rojo o similar
  errorClass: "popup__error_visible", // Clase que hace visible el mensaje de error
};

// Instanciación y Validación para el formulario de añadir tarjeta
const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

//Instanciación y Validación para el formulario de editar perfil
const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

// =======================================
// SECCIÓN: Eventos de apertura de popups
// =======================================

openButton.addEventListener("click", () => {
  // Obtener info actual del usuario
  const currentUser = userInfo.getUserInfo(); // Antes de abrir, rellenamos el formulario con los datos actuales del usuario
  profilePopup.setInputValue(currentUser);
  profilePopup.open();
});

btnOpenAdd.addEventListener("click", () => {
  addCardPopup.open();
});
