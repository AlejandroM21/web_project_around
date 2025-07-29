// ---------------------------------------------
// VALIDACIÓN DE FORMULARIOS - SPRINT 9
// ---------------------------------------------

// --- 1. MOSTRAR / OCULTAR ERRORES EN INPUTS ---

// Muestra el mensaje de error debajo del input no válido
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`); // Ej: .name-error

  inputElement.classList.add(config.inputErrorClass); // Agrega clase para bordes rojos, etc.
  formError.textContent = errorMessage; // Mensaje del navegador (validity.message)
  formError.classList.add(config.errorClass); // Lo hace visible
};

// Oculta el mensaje de error cuando el campo vuelve a ser válido
const hideInputError = (formElement, inputElement, config) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = ""; // Borra el mensaje
};

// Verifica si un input es válido y decide si mostrar u ocultar error
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// --- 2. CONTROL DEL BOTÓN DE ENVÍO ---

// Verifica si algún input es inválido (al menos uno), some devuelve true si encuantra un campo invalido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Activa o desactiva el botón dependiendo del estado de validez de los inputs
const toggleButtonState = (inputList, buttonElement, config) => {
  // Si hay al menos una entrada que no es válida
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass); // Desactiva visualmente
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// --- 3. EVENTOS EN CADA FORMULARIO (inputs + botón) ---

//Añadir controladores a todos los campos del formulario
const setEventListeners = (formElement, config) => {
  // Lista de inputs
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector); // Botón del form

  toggleButtonState(inputList, buttonElement, config); // Estado inicial del botón

  // Itera sobre el array obtenido
  inputList.forEach((inputElement) => {
    // agregamos el controlador de eventos de entrada a cada campo
    inputElement.addEventListener("input", () => {
      // Llamamos a la función isValid() dentro del callback
      // y pásamos el formulario y el elemento a comprobar
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config); // Verifica todo el form
    });
  });
};

// --- 4. APLICAR VALIDACIÓN A TODOS LOS FORMULARIOS DE LA PÁGINA ---

//Agregar controladores a todos los formularios
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); //Todos los <form>

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Bloquea envío por defecto
    });
    // Llama a la función setEventListeners() para cada formulario
    // tomando un elemento del formulario como argumento
    setEventListeners(formElement, config);
  });
};

// --- 5. CONFIGURACIÓN DE CLASES Y SELECTORES ---

const validationConfig = {
  formSelector: ".popup__form", // Selector para el formulario
  inputSelector: ".popup__input", // Selector para los inputs dentro del formulario
  submitButtonSelector: ".popup__button", // Selector para el botón submit
  inactiveButtonClass: "popup__button_disabled", // Clase que desactiva botón
  inputErrorClass: "popup__input_type_error", // Clase de borde rojo o similar
  errorClass: "popup__error_visible", // Clase que hace visible el mensaje de error
};

// Activar validación desde el inicio
enableValidation(validationConfig);

// --- 6. CERRAR TODOS LOS POPUPS CON ESCAPE ---

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

// --- 7. CERRAR POPUPS HACIENDO CLIC EN EL FONDO OSCURO ---

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("card-popup_opened")
  ) {
    evt.target.classList.remove("popup_opened", "card-popup_opened");
  }
});
