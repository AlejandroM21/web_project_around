// Clase encargada de renderizar elementos en el DOM
// Separa la lógica de creación de elementos (Card) de la lógica de dónde se colocan (Section)

export class Section {
  // El constructor recibe un objeto con el array de datos y el renderizador,
  // y un selector del contenedor donde se insertarán los elementos .
  constructor({ items, renderer }, containerSelector) {
    this._initialArrayCards = items; // Datos iniciales
    this._renderer = renderer; //función que crea el elemento (una tarjeta)
    this._container = document.querySelector(containerSelector);
  }

  //añade nuevos elementos (crea nuevas tarjetas )después de la carga inicial
  addItem(element) {
    this._container.append(element);
  }

  // Añade un nuevo elemento al INICIO del contenedor, ideal para las nuevas tarjetas agregadas por el usuario
  prependItem(element) {
    this._container.prepend(element);
  }

  // itera sobre los datos iniciales y llama a la función renderer para cada elemento,
  // cargando los elementos iniciales de la página

  renderItems() {
    this._initialArrayCards.forEach((card) => {
      this._renderer(card);
    });
  }
}
