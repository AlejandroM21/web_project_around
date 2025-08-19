// Clase para manejar popups que muestran una imagen ampliada
// Extiende la clase base Popup, por lo que hereda la lógica de apertura/cierre y eventos

import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupselector) {
    super(popupselector); // Llama al constructor de Popup para inicializar el popup

    // Guarda las referencias a los elementos de imagen y leyenda del popup
    this._imageElement = this._popupElement.querySelector(".card-popup__image");
    this._captionElement = this._popupElement.querySelector(
      ".card-popup__caption"
    );
  }
  // Sobrescribimos el método 'open' para mostrar la imagen y el título
  open(imageSrc, title) {
    this._imageElement.src = imageSrc; // Asigna la ruta de la imagen
    this._imageElement.alt = `fotografía de: ${title}`;
    this._captionElement.textContent = title;
    // Llama al método 'open' de la clase padre para abrir el popup
    super.open(); //Llama al método open del padre para abrir el popup y activar listeners
  }
}
