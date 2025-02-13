class CarouselService {
  constructor(elements, containerId = "carousel") {
    this.elements = elements;
    this.containerId = containerId;
    this.currentIndex = 0;
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      throw new Error(`Element with id '${this.containerId}' not found.`);
    }
  }

  // Setters
  setElements(elements) {
    this.elements = elements;
  }

  setContainerId(id) {
    this.containerId = id;
  }

  // Getters
  getElements() {
    return this.elements;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  getContainerId() {
    return this.containerId;
  }

  init() {
    this.initButtons();
    this.display();
  }

  // Methods
  initButtons() {
    // Récupérer les boutons "Prev" et "Next" dans le conteneur
    this.prevButton = this.container.querySelector('[data-action="prev"]');
    this.nextButton = this.container.querySelector('[data-action="next"]');
    this.activeElementContainer = this.container.querySelector(
      '[data-active="element"]'
    );

    if (!this.prevButton || !this.nextButton || !this.activeElementContainer) {
      throw new Error(
        "Container must have children with [data-action='prev'], [data-action='next'], and [data-active='element'] attributes."
      );
    }

    // Ajouter des gestionnaires d'événements aux boutons
    this.prevButton.addEventListener("click", () => this.prev());
    this.nextButton.addEventListener("click", () => this.next());
  }

  display() {
    this.container.querySelector('[data-active="element"]').textContent = "";
    // Ajouter l'élément actif dans le conteneur
    const activeElement = this.elements[this.currentIndex];
    document.getElementById("carousel-count").textContent =
      this.currentIndex + 1 + "/" + this.elements.length;
    if (activeElement) {
      this.container
        .querySelector('[data-active="element"]')
        .appendChild(activeElement);
    }
  }

  prev() {
    // Calculer l'index précédent
    this.currentIndex =
      (this.currentIndex - 1 + this.elements.length) % this.elements.length;

    // Mettre à jour l'affichage
    this.display();
  }

  next() {
    // Calculer l'index suivant
    this.currentIndex = (this.currentIndex + 1) % this.elements.length;

    // Mettre à jour l'affichage
    this.display();
  }
}

export default CarouselService;
