// Seleccionamos el popup y los botones
let popup = document.querySelector(".popup");
let openButton = document.querySelector(".profile__button-edit");
let closeButton = document.querySelector(".popup__button-close");
let form = document.querySelector(".popup__container");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#about-me");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about-me");

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
