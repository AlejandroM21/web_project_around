import {
  nameInput,
  jobInput,
  profileName,
  profileAbout,
  popup,
} from "./index.js";

// ======== SECCIÓN: Popup de imagen ampliada ========

// Abre el popup mostrando la imagen y su título ampliado
export function openImagePopup(imageSrc, title) {
  // Selección Popup para imagen ampliada con sus elementos internos
  const imagePopup = document.querySelector(".card-popup");
  const popupImage = document.querySelector(".card-popup__image");
  const popupCaption = document.querySelector(".card-popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = `fotografía de: ${title}`;
  popupCaption.textContent = title;
  imagePopup.classList.add("card-popup_opened");
}

// Cierra el popup de imagen ampliada
export function closeImagePopup() {
  const imagePopup = document.querySelector(".card-popup");
  imagePopup.classList.remove("card-popup_opened");
}

// ======== SECCIÓN: Popup de edición de perfil ========

// Abre el popup original de editar perfil y carga datos actuales
export function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popup.classList.add("popup_opened");
}

// Cierra el popup de edición de perfil
export function closePopup() {
  popup.classList.remove("popup_opened");
}

// --- CERRAR TODOS LOS POPUPS CON ESCAPE ---

export function enableGlobalPopupClose() {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      //Busca todos los popups abiertos
      document
        .querySelectorAll(".popup_opened, .card-popup_opened")
        .forEach((popup) => {
          popup.classList.remove("popup_opened", "card-popup_opened");
        });
    }
  });
}

// --- CERRAR POPUPS HACIENDO CLIC EN EL FONDO OSCURO ---

export function enableOverlayClose() {
  document.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("card-popup_opened")
    ) {
      evt.target.classList.remove("popup_opened", "card-popup_opened");
    }
  });
}
