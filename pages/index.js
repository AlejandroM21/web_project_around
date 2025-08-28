// Aquí es donde se inicializan las clases, se importan los módulos necesarios y
// se añaden los "escuchadores de eventos" (event listeners) para que la página cobre vida.

// ===============================
// IMPORTS: Clases y datos iniciales
// ===============================
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { api } from "../scripts/components/Api.js";
import {
  btnOpenEdit,
  editForm,
  profileAvatar,
  btnOpenAdd,
  addForm,
  cardListSection,
  btnOpenAvatar,
  avatarForm,
} from "../scripts/utils/constants.js";

// ===============================
// SECCIÓN: Carga inicial de datos
// ===============================

// Esta función se utiliza en (Section y addCardPopup)) para crear nuevas tarjetas.
//Hace una instancia de Card y configura sus callbacks.
function createCard(cardData) {
  const cardInstance = new Card(
    cardData, // Datos de la tarjeta
    "#elements-template",
    // Callback handleCardClick para abrir la imagen ampliada
    (image, title) => {
      popupImage.open(image, title);
    },
    currentUserId,
    // Callbacks handleLikeClick para manejar "like"
    (cardId, updateLikesCallback) => {
      // Si ya está "likeado", llamamos a unlike
      const promise = cardInstance._isLiked
        ? api.unlikeCard(cardId)
        : api.likeCard(cardId);

      promise // Llamada a la API para actualizar el estado del "like"
        .then((updatedCard) => updateLikesCallback(updatedCard.isLiked)) // Actualiza el estado del "like" en la tarjeta
        .catch((err) => {
          console.error("Error al actualizar los likes:", err);
        });
    },
    // Callback handleDeleteClick eliminar la tarjeta
    (cardId, cardElement) => {
      deleteConfirmationPopup._handleConfirmation = () => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
          })
          .catch((err) => {
            console.error("Error al eliminar la tarjeta:", err);
          });
      };
      deleteConfirmationPopup.open();
    }
  );
  return cardInstance.generateCard(); // Devuelve el elemento de la tarjeta generado
}

// // Instanciamos la clase con los selectores de los elementos del perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me",
  avatarSelector: ".profile__avatar-image",
});

// Instancia la clase Section para renderizar las tarjetas iniciales.
const cardList = new Section(
  {
    // El renderer define cómo se renderiza cada tarjeta individualmente
    renderer: (cardData) => {
      // Crea una nueva instancia de Card
      const cardElement = createCard(cardData); // Crear el elemento de la tarjeta
      cardList.addItem(cardElement);
    },
  },
  cardListSection // ".elements"
);

let currentUserId; // Variable para almacenar el ID del usuario actual

//inicializamos la API y obtenemos los datos del usuario y las tarjetas
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id; // Guardamos el ID del usuario actual

    // Actualizamos la información del usuario en la interfaz
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    // Renderizamos las tarjetas obtenidas desde la API
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.error("Error al cargar los datos iniciales:", err);
  });

// ===============================
// SECCIÓN: Instancias de Popups
// ===============================

// Instancia de edición de perfil
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (formData) => {
    // Mostrar indicador de carga
    profilePopup.renderLoading(true, "Guardando...");
    // Llamada a la API para actualizar la información del usuario
    api
      .updateUserInfo(formData)
      .then((updatedUserData) => {
        // Actualiza la información del usuario en la interfaz
        userInfo.setUserInfo({
          name: updatedUserData.name,
          job: updatedUserData.about,
        });
        profilePopup.close(); // Cierra el popup después de actualizar
      })
      .catch((err) => {
        console.error("Error al actualizar la información del usuario:", err);
      })
      .finally(() => {
        // Ocultar indicador de carga
        profilePopup.renderLoading(false, "Guardar");
      });
  },
});

// Instancia Popup para actualizar avatar del usuario
const profileAvatarPopup = new PopupWithForm({
  popupSelector: ".popup__avatar",
  handleFormSubmit: (formData) => {
    // Mostrar indicador de carga
    profileAvatarPopup.renderLoading(true, "Guardando..."); //
    // Llamada a la API para actualizar el avatar del usuario
    api
      .updateAvatar(formData.avatar)
      .then((updatedUserData) => {
        // Actualiza la imagen del avatar en la interfaz
        profileAvatar.src = updatedUserData.avatar;
        profileAvatar.alt = `Avatar de ${updatedUserData.name}`;
        profileAvatarPopup.close(); // Cierra el popup después
      })
      .catch((err) => {
        console.error("Error al actualizar el avatar del usuario:", err);
      })
      .finally(() => {
        // Ocultar indicador de carga
        profileAvatarPopup.renderLoading(false);
      });
  },
});

// Instancia para agregar nueva tarjeta
const addCardPopup = new PopupWithForm({
  popupSelector: ".popup__add",
  handleFormSubmit: (formData) => {
    // Mostrar indicador de carga
    addCardPopup.renderLoading(true, "Creando...");
    // Llamada a la API para agregar la nueva tarjeta
    api
      .addCard({
        cardTitle: formData["place-name"],
        cardImage: formData["place-link"],
      })
      .then((newCardData) => {
        const cardElement = createCard(newCardData); // Crear el elemento de la tarjeta
        cardList.prependItem(cardElement); // Añadir la nueva tarjeta al inicio de la lista
        addCardPopup.close(); // Cerrar el popup después de agregar la tarjeta
      })
      .catch((err) => {
        console.error("Error al agregar la tarjeta:", err);
      })
      .finally(() => {
        // Ocultar indicador de carga
        addCardPopup.renderLoading(false, "Crear");
      });
  },
});

// Instancia Popup de confirmación de eliminación
const deleteConfirmationPopup = new PopupWithConfirmation({
  popupSelector: ".popup__trash",
  handleConfirmation: null,
});
deleteConfirmationPopup.setEventListeners();

// instancia Popup para ver imágenes en grande
const popupImage = new PopupWithImage(".card-popup");

// Habilita los "escuchadores de eventos" para cada popup.
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupImage.setEventListeners();
profileAvatarPopup.setEventListeners();

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

//Instanciación y Validación para el formulario de editar perfil
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

// =======================================
// SECCIÓN: Eventos de apertura de popups
// =======================================

btnOpenEdit.addEventListener("click", () => {
  // Obtener info actual del usuario
  const currentUser = userInfo.getUserInfo(); // Antes de abrir, rellenamos el formulario con los datos actuales del usuario
  profilePopup.setInputValue(currentUser);
  profilePopup.open();
});

btnOpenAdd.addEventListener("click", () => {
  addCardPopup.open();
});

btnOpenAvatar.addEventListener("click", () => {
  profileAvatarPopup.open();
});
