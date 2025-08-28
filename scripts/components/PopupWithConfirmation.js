import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirmation }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._handleConfirmation = handleConfirmation;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleConfirmation) {
        this._handleConfirmation();
      }
      super.close();
    });
  }
  open() {
    super.open();
  }
}
