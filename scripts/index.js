// ======== SECCIÓN: Selección de elementos del DOM ==========

// Popup de editar perfil
const popup = document.querySelector(".popup");
const openButton = document.querySelector(".profile__button-edit");
const closeButton = document.querySelector(".popup__button-close");

// Formulario y campos del popup original
const form = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
// const formInput = form.querySelector(".popup__input");

// Campos de perfil (los que se actualizan)
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");

// Botón para agregar nuevas tarjetas y contenedor para formularios clonados
const btnAddForm = document.querySelector(".profile__button-add");
const contentFormClone = document.querySelector("#form-clone");

// Template y contenedor de tarjetas
const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#elements-template").content;

// Popup de imagen ampliada
const imagePopup = document.querySelector(".card-popup");
const popupImage = document.querySelector(".card-popup__image");
const popupCaption = document.querySelector(".card-popup__caption");
const closeButtonCardPopup = document.querySelector(
  ".card-popup__button-close"
);

// ========= SECCIÓN: Funciones de tarjetas ==========

// Abre el popup con la imagen ampliada
function openImagePopup(imageSrc, title) {
  popupImage.src = imageSrc;
  popupImage.alt = `fotografía de: ${title}`;
  popupCaption.textContent = title;
  imagePopup.classList.add("card-popup_opened");
}

// Cierra el popup de imagen ampliada
closeButtonCardPopup.addEventListener("click", () => {
  imagePopup.classList.remove("card-popup_opened");
});

// Crea y añade una tarjeta al DOM
function addCard(cardTitle, cardImage) {
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true); // Clonamos el template

  // Asignamos la imagen y el texto
  cardElement.querySelector(".elements__card-title").textContent = cardTitle;
  const image = cardElement.querySelector(".elements__card-image");
  image.src = cardImage;
  image.alt = `fotografía de: ${cardTitle}`;

  // Evento: abrir imagen ampliada
  image.addEventListener("click", () => {
    openImagePopup(cardImage, cardTitle);
  });

  // Evento: toggle de "like"
  cardElement
    .querySelector(".elements__card-favorite")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__card-favorite_active");
    });

  // Evento: eliminar tarjeta
  cardElement
    .querySelector(".elements__trash")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  // Inserta al principio
  cards.prepend(cardElement);
}

// ======== SECCIÓN: Tarjetas iniciales =========

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

// Agregar tarjetas iniciales con el Array initialCards
initialCards.forEach((card) => {
  addCard(card.name, card.link);
});

// ======== SECCIÓN: Lógica para formulario clonado =========

// Evento para clonar y abrir el formulario nuevo

//Encapsular el código del clonador de formularios en una función
function createFormClone() {
  const formClone = popup.cloneNode(true); // Clonamos el popup original

  // Modificamos textos del formulario clonado
  formClone.querySelector(".popup__title").textContent = "Nuevo Lugar";
  formClone.querySelector(".popup__button").textContent = "Crear";

  // Configuramos los inputs del formulario clonado
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
    const cardTitle = inputs[0].value;
    const cardImage = inputs[1].value;

    // Crea la tarjeta
    addCard(cardTitle, cardImage);

    // Cierra y elimina el formulario
    formClone.remove();
  });

  // Mostramos el formulario clonado
  formClone.classList.add("popup_opened");
  contentFormClone.append(formClone);
  document.addEventListener("keydown", handleEscape); //cuando este abierto el formulario, aplica el evento de cerrar con Ecp

  // Habilitamos la validación en el nuevo formulario clonado
  enableValidation(validationConfig);

  return formClone;
}

btnAddForm.addEventListener("click", createFormClone);

// ======== SECCIÓN: Popup de perfil =========

// Abre el popup original de editar perfil y carga datos actuales
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape); // Agrega el evento de la tecla Esc
}

// Cierra el popup
function closePopup() {
  //Busca todos los popups abiertos iterando y los cierra
  document
    .querySelectorAll(".popup_opened, .card-popup_opened")
    .forEach((popup) => {
      popup.classList.remove("popup_opened", "card-popup_opened");
    });
  document.removeEventListener("keydown", handleEscape); // Elimina el evento de la tecla Esc
}

// Maneja el envío del formulario de perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Previene el envío del form
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}

// ======== SECCIÓN: Eventos =========

openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", handleProfileFormSubmit);

// --- CERRAR TODOS LOS POPUPS CON ESCAPE ---

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

// --- CERRAR POPUPS HACIENDO CLIC EN EL FONDO OSCURO ---

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("card-popup_opened")
  ) {
    closePopup();
  }
});
