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
  constructor(
    data,
    cardSelector,
    handleCardClick,
    currentUserId,
    handleLikeClick,
    handleDeleteClick
  ) {
    // Datos desde la API
    this._cardId = data._id; // ID de la tarjeta
    this._ownerId = data.owner; // ID del propietario de la tarjeta
    this._isLiked = data.isLiked; // Si el usuario actual ha dado "like"
    this._cardTitle = data.name;
    this._cardImage = data.link;

    // Callbacks y datos externos
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //callback para abrir la imagen ampliada
    this._currentUserId = currentUserId; // ID del usuario actual
    this._handleLikeClick = handleLikeClick; //callback para manejar el "like"
    this._handleDeleteClick = handleDeleteClick; //callback para manejar la eliminación de la tarjeta
  }

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
    const cardImageElement = this._element.querySelector(
      ".elements__card-image"
    );
    cardImageElement.src = this._cardImage;
    cardImageElement.alt = this._cardTitle;

    // Guarda referencias a elementos que se actualizarán dinámicamente.
    this._likeButton = this._element.querySelector(".elements__card-favorite");
    this._deleteButton = this._element.querySelector(".elements__trash");

    // Configura los event listeners para esta tarjeta
    this._setEventListeners();

    // Estado inicial del like
    this._updateLikesView();

    return this._element;
  }

  //// Recibe el nuevo array de likes desde la API
  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this._updateLikesView();
  }

  // Actualiza la vista del botón de "like" según el estado actual
  _updateLikesView() {
    if (this._isLiked) {
      this._likeButton.classList.add("elements__card-favorite_active");
    } else {
      this._likeButton.classList.remove("elements__card-favorite_active");
    }
  }

  // ======== SECCIÓN: Eventos ========
  _setEventListeners() {
    this._updateLikesView(); // Actualiza el estado visual del "like"

    // Evento: abrir imagen ampliada
    this._element
      .querySelector(".elements__card-image")
      .addEventListener("click", () => {
        // Llama al callback con la información de la tarjeta
        this._handleCardClick(this._cardImage, this._cardTitle);
      });

    // Evento: toggle de "like"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._cardId, (isLiked) => {
        this.updateLikes(isLiked);
      });
    });

    // Evento: eliminar tarjeta
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId, this._element);
    });

    // Si el usuario actual no es el propietario, oculta el botón de eliminar
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.style.display = "none";
    }
  }
}
