// ==============================================
// FormValidator.js
// Clase encargada de:
// - Validar inputs de formularios en tiempo real
// - Mostrar / ocultar mensajes de error
// - Deshabilitar / habilitar el botón de envío
// ==============================================

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    // Obtiene una lista de todos los inputs del formulario y el botón de envío
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // =====================================================
  // 1. MOSTRAR / OCULTAR ERRORES EN INPUTS
  // =====================================================

  // Muestra el mensaje de error debajo del input inválido
  _showInputError(inputElement) {
    const formError = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ); // Ej: si id="name" => busca ".name-error"

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

  // =====================================================
  // 2. CONTROL DEL BOTÓN DE ENVÍO
  // =====================================================

  // Verifica si algún input es inválido (al menos uno), some devuelve true si encuantra un campo invalido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Habilita / deshabilita el botón según la validez de todos los inputs
  _toggleButtonState() {
    // Si hay al menos una entrada que no es válida
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass); // Desactiva visualmente
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // =====================================================
  // 3. EVENTOS DE INPUTS Y BOTÓN
  // ===================================================

  //Añadir controladores a todos los campos del formulario
  _setEventListeners() {
    // Inicializa el estado del botón en función de los campos
    this._toggleButtonState();

    // Itera sobre el array obtenido, Añade un listener de "input" a cada campo
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement); // Valida campo individual
        this._toggleButtonState(); // Llama a toggleButtonState sin parámetros, ya que las listas son propiedades de la clase.
      });
    });
  }
  // =====================================================
  // 4. MÉTODO PÚBLICO: Activar validación
  // =====================================================

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Configura validación en todos los inputs
    this._setEventListeners();
  }
}
