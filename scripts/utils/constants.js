// ==============================================
// constants.js
// Contiene variables y datos constantes globales
// ==============================================

// ======== SECCIÓN: Selectores globales ========
// Selector de la sección donde se insertarán las tarjetas
const cardListSection = ".elements";

// ======== SECCIÓN: Elementos del DOM =========

// ===== Popup Edición de Perfil ====
const btnOpenEdit = document.querySelector(".profile__button-edit");
const editForm = document.querySelector(".popup__form");
const avatarForm = document.querySelector(".popup__form_avatar");
// --- Elementos de perfil que serán actualizados ---
const btnOpenAvatar = document.querySelector(".profile__button-update-avatar");
const profileAvatar = document.querySelector(".profile__avatar-image");

// ==== Popup Agregar Tarjetas Nuevas =====
const btnOpenAdd = document.querySelector(".profile__button-add");
const addForm = document.querySelector(".popup__form_add");

export {
  btnOpenEdit,
  editForm,
  profileAvatar,
  btnOpenAdd,
  addForm,
  cardListSection,
  btnOpenAvatar,
  avatarForm,
};
