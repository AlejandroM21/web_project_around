//Manejar la recolección de los datos de los inputs del formulario.
// Gestionar el evento submit
// Llamar a un callback que procese los datos (por ejemplo, actualice el perfil o cree una nueva tarjeta).
//Restablecer el formulario después de enviarlo

import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector); // Llama al constructor de la clase padre para inicializar el popup
    this._handleFormSubmit = handleFormSubmit; // Callback que procesa los datos del formulario

    // Selecciona el formulario y la lista de inputs.
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  // Devuelve un objeto con  los valores de todos los inputs del formulario
  _getInputValues() {
    const formValues = {};

    // Itera sobre cada input y agrega su nombre y valor al objeto
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  //método para establecer los valores de los inputs.
  setInputValue(data) {
    this._inputList.forEach((input) => {
      // Si la data pasada tiene una propiedad con el mismo nombre que el input,
      // establece el valor del input con esa propiedad.
      if (data[input.name]) {
        input.value =
          data[input.name] !== undefined ? data[input.name] : input.value; //Esto hace que se establezca cualquier valor presente en data, incluso vacío.
      }
    });
  }

  // Maneja el evento 'submit' del formulario y llama a los listeners del padre.
  setEventListeners() {
    super.setEventListeners(); // Llama al método del padre para el cierre de popups

    // Añade un listener específico para el submit del formulario
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // Llama al callback con los datos del formulario
    });
  }

  // Sobrescribe el método 'close' del padre para resetear el formulario
  close() {
    super.close(); // Ejecuta el cierre estándar de la clase padre
    this._form.reset(); // Limpia todos los campos del formulario
  }

  renderLoading(isLoading, defaultText) {
    const submitButton = this._form.querySelector(".popup__button");
    submitButton.textContent = isLoading ? "Guardando..." : defaultText;
    submitButton.disabled = isLoading;
  }
}
