export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }
  // --- 1. MOSTRAR / OCULTAR ERRORES EN INPUTS ---

  // Muestra el mensaje de error debajo del input no válido
  _showInputError(inputElement) {
    const formError = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ); // Ej: .name-error

    inputElement.classList.add(this._config.inputErrorClass); // Agrega clase para bordes rojos, etc.
    formError.textContent = inputElement.validationMessage; // Mensaje del navegador (validity.message)
    formError.classList.add(this._config.errorClass); // Lo hace visible
  }

  // Oculta el mensaje de error cuando el campo vuelve a ser válido
  _hideInputError(inputElement) {
    const formError = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    formError.classList.remove(this._config.errorClass);
    formError.textContent = ""; // Borra el mensaje
  }

  // Verifica si un input es válido y decide si mostrar u ocultar error
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // --- 2. CONTROL DEL BOTÓN DE ENVÍO ---

  // Verifica si algún input es inválido (al menos uno), some devuelve true si encuantra un campo invalido
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Activa o desactiva el botón dependiendo del estado de validez de los inputs
  _toggleButtonState(inputList, buttonElement) {
    // Si hay al menos una entrada que no es válida
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass); // Desactiva visualmente
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // --- 3. EVENTOS EN CADA FORMULARIO (inputs + botón) ---

  //Añadir controladores a todos los campos del formulario
  _setEventListeners() {
    // Lista de inputs
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    ); // Botón del form

    // Inicializa el estado del botón en función de los campos
    this._toggleButtonState(inputList, buttonElement);

    // Itera sobre el array obtenido
    inputList.forEach((inputElement) => {
      // agregamos el controlador de eventos de entrada a cada campo
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement); // Verifica todo el form
      });
    });
  }

  // Activa la validación y previene el envío tradicional del formulario
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
