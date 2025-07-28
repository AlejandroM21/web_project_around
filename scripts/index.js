// Seleccionamos el popup y los botones
const popup = document.querySelector(".popup");
const openButton = document.querySelector(".profile__button-edit");
const closeButton = document.querySelector(".popup__button-close");
const form = document.querySelector(".popup__container");
const formInput = form.querySelector(".popup__text");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");

// Seleccionamos los elementos relacionados con el formulario clonado
const btnAddForm = document.querySelector(".profile__button-add");
const contentFormClone = document.querySelector("#form-clone");

//Seleccionamos el template y el contenedor de tarjetas
const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#elements-template").content;

//Seleccionamos abrir imagen
const imagePopup = document.querySelector(".card-popup");
const popupImage = document.querySelector(".card-popup__image");
const popupCaption = document.querySelector(".card-popup__caption");
const closeButtonCardPopup = document.querySelector(
  ".card-popup__button-close"
);

//Función para abrir imagen
function openImagePopup(imageSrc, title) {
  popupImage.src = imageSrc;
  popupImage.alt = `fotografía de: ${title}`;
  popupCaption.textContent = title;
  imagePopup.classList.add("card-popup_opened");
}

closeButtonCardPopup.addEventListener("click", () => {
  imagePopup.classList.remove("card-popup_opened");
});

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

  //Abrir Card
  const image = cardElement.querySelector(".elements__card-image");
  image.src = cardImage;
  image.alt = `fotografía de: ${cardTitle}`;

  // Escucha el clic en la imagen
  image.addEventListener("click", () => {
    openImagePopup(cardImage, cardTitle);
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
    inputs[0].value = "";
    inputs[1].value = "";
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

//validación

//función mostrar error
const showInputError = (formElement, inputElement, errorMessage) => {
  // Selecciona cada elemento del mensaje de error utilizando su nombre de clase único con plantillas literales
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__text_type-error");
  formError.textContent = errorMessage;
  formError.classList.add("popup__text-error_active");
};

//función ocultar error
const hideInputError = (formElement, inputElement) => {
  // Selecciona cada elemento del mensaje de error utilizando su nombre de clase único con plantillas literales
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("popup__text_type-error");
  formError.classList.remove("popup__text-error_active");
  formError.textContent = "";
};

//función Añadir controladores a todos los campos del formulario
const setEventListeners = (formElement) => {
  // crea un array con todos los campos dentro del formulario
  const inputList = Array.from(formElement.querySelectorAll(".popup__text"));
  // Encuentra el botón de envío en el formulario actual
  const buttonElement = formElement.querySelector(".popup__save");

  // Itera sobre el array obtenido
  inputList.forEach((inputElement) => {
    // agregamos el controlador de eventos de entrada a cada campo
    inputElement.addEventListener("input", () => {
      // Llamamos a la función isValid() dentro del callback
      // y pásamos el formulario y el elemento a comprobar
      isValid(formElement, inputElement);
      // Llama a toggleButtonState() y pásale un array de campos y el botón
      toggleButtonState(inputList, buttonElement);
    });
  });
  // toggleButtonState(inputList, formElement.querySelector(".popup__save"));
};

//función Agregar controladores a todos los formularios
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Llama a la función setEventListeners() para cada formulario
    // tomando un elemento del formulario como argumento
    setEventListeners(formElement);
  });
};
enableValidation();

//fiunción para validar si hay entradas validas en los campos iterando, some devuelve true si encuantra un campo vacio o error (false)

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// función para controlar el botón de envío
const toggleButtonState = (inputList, buttonElement) => {
  // Si hay al menos una entrada que no es válida
  if (hasInvalidInput(inputList)) {
    // hace que el botón esté inactivo
    buttonElement.classList.add("popup__submit_inactive");
  } else {
    buttonElement.classList.remove("popup__submit_inactive");
  }
};

//función comprobar campos validos y llamar a las funciónes de mostrar u ocultar
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// //cerrar popups con Escape o clic fuera
// document.addEventListener("keydown", (evt) => {
//   if (evt.key === "Escape") {
//     document
//       .querySelectorAll(".popup_opened, .card-popup_opened")
//       .forEach((popup) => {
//         popup.classList.remove("popup_opened", "card-popup_opened");
//       });
//   }
// });
// //cerrar al hacer clic fuera
// document.addEventListener("click", (evt) => {
//   if (
//     evt.target.classList.contains("popup_opened") ||
//     evt.target.classList.contains("card-popup_opened")
//   ) {
//     evt.target.classList.remove("popup_opened", "card-popup_opened");
//   }
// });
