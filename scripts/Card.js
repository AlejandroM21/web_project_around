import { openImagePopup } from "./utils.js";
// ======== SECCIÓN: Clase Card para crear y gestionar tarjetas ========

export class Card {
  constructor(data, cardSelector) {
    this.cardTitle = data.cardTitle;
    this.cardImage = data.cardImage;
    this._cardSelector = cardSelector;
  }

  // Método principal para crear la tarjeta y devolver el elemento DOM
  addCard() {
    this._element = this._getTemplate();

    // Asignación de contenido e imagen con sus atributos
    this._element.querySelector(".elements__card-title").textContent =
      this.cardTitle;
    const image = this._element.querySelector(".elements__card-image");
    image.src = this.cardImage;
    image.alt = `fotografía de: ${this.cardTitle}`;

    // Configura los event listeners para esta tarjeta
    this._setEventListeners();

    return this._element;
  }

  // Obtiene y clona el template de la tarjeta desde el DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true); // Clonamos el template

    return cardElement;
  }

  // Añade eventos para interacción con la tarjeta
  _setEventListeners() {
    const imageElement = this._element.querySelector(".elements__card-image");

    // Evento: abrir imagen ampliada
    imageElement.addEventListener("click", () => {
      openImagePopup(this.cardImage, this.cardTitle);
    });

    // Evento: toggle de "like"
    this._element
      .querySelector(".elements__card-favorite")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("elements__card-favorite_active");
      });

    // Evento: eliminar tarjeta
    this._element
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }
}
