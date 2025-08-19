// clase base que manejará la lógica común de abrir y cerrar un popup

export class Popup {
  // El constructor recibe el selector del popup.
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Abre el popup y añade el listener de la tecla Escape.
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Cierra el popup y elimina el listener de la tecla Escape.
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Maneja el cierre del popup al presionar la tecla Escape.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //agregar los listeners al botón de cerrar y al overlay
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      // Revisa si el clic se hizo en el overlay o en cualquier botón de cierre.
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__icono-close") ||
        evt.target.classList.contains("card-popup__button-close")
      ) {
        this.close();
      }
    });
  }
}
