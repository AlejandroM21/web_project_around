// ==============================================
// Card.js
// Clase encargada de:
// - Crear el elemento HTML de la tarjeta
// - Rellenar con datos (imagen + título)
// - Gestionar interacciones: like, eliminar, ampliar imagen
// ==============================================

export class Card {
  // El constructor recibe los datos de la tarjeta, el selector del template
  // y un callback para manejar la apertura del popup de imagen
  constructor(data, cardSelector, handleCardClick) {
    this._cardTitle = data.cardTitle;
    this._cardImage = data.cardImage;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // ======== SECCIÓN: Obtención del template ========

  // Obtiene y clona el template de la tarjeta desde el DOM.
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true); // Clonamos el template con todos sus descendientes.

    return cardElement;
  }

  // ======== SECCIÓN: Generación de tarjeta ========
  generateCard() {
    // Guarda el elemento del DOM de la tarjeta en una propiedad de la instancia.
    this._element = this._getTemplate();

    // Asigna el contenido y los atributos de la imagen.
    this._element.querySelector(".elements__card-title").textContent =
      this._cardTitle;
    const image = this._element.querySelector(".elements__card-image");
    image.src = this._cardImage;
    image.alt = `fotografía de: ${this._cardTitle}`;

    // Configura los event listeners para esta tarjeta
    this._setEventListeners();

    return this._element;
  }

  // ======== SECCIÓN: Eventos ========
  _setEventListeners() {
    const imageElement = this._element.querySelector(".elements__card-image");
    const likeButton = this._element.querySelector(".elements__card-favorite");
    const deleteButton = this._element.querySelector(".elements__trash");

    // Evento: abrir imagen ampliada
    imageElement.addEventListener("click", () => {
      // Llama al callback con la información de la tarjeta
      this._handleCardClick(this._cardImage, this._cardTitle);
    });

    // Evento: toggle de "like"
    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__card-favorite_active");
    });

    // Evento: eliminar tarjeta
    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
  }
}
