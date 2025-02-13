class MapService {
  constructor(latitude, longitude) {
    // Initialisation de la carte
    this.map = L.map("map");
    this.map.setView([latitude, longitude], 13);

    // Ajout de la couche de tuiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.layers = [];
  }

  /**
   * Dessiner un itinéraire sur la carte.
   * @param {Array} coordinates - Liste des coordonnées [longitude, latitude].
   */
  drawRoute(coordinates) {
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      console.error("Les coordonnées fournies sont invalides.");
      return;
    }

    // Inverser les coordonnées pour correspondre à Leaflet ([lat, lng])
    const leafletCoordinates = coordinates.map((coordinate) => [
      coordinate[1],
      coordinate[0],
    ]);

    // Ajouter la ligne à la carte
    const routeLine = L.polyline(leafletCoordinates, { color: "blue" }).addTo(
      this.map
    );

    // Ajouter la ligne à la liste des couches de la carte
    this.layers.push(routeLine);

    // Ajuster la vue pour afficher toute la route
    this.map.fitBounds(routeLine.getBounds());
  }

  /**
   * Ajouter un marqueur à une position donnée.
   * @param {Array} coordinate - Coordonnée unique [longitude, latitude].
   * @param {String} message - Message du popup.
   */
  addMarker(coordinate, message, icon) {
    if (
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      typeof coordinate[0] !== "number" ||
      typeof coordinate[1] !== "number"
    ) {
      console.error(
        "Coordonnée invalide. Utilisez le format [latitude, longitude]."
      );
      return;
    }

    // Inverser les coordonnées pour correspondre à Leaflet ([lat, lng])
    const leafletCoordinate = [coordinate[1], coordinate[0]];
    const marker = L.marker(leafletCoordinate, { icon: icon })
      .addTo(this.map)
      .bindPopup(message)
      .openPopup();

    // Ajouter à la liste des couches
    this.layers.push(marker);
  }

  /**
   * Centrer la carte sur une position donnée.
   * @param {Array} coordinate - Coordonnée unique [longitude, latitude].
   */
  centerMap(coordinate) {
    if (
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      typeof coordinate[0] !== "number" ||
      typeof coordinate[1] !== "number"
    ) {
      console.error(
        "Coordonnée invalide. Utilisez le format [latitude, longitude]."
      );
      return;
    }

    // Inverser les coordonnées pour correspondre à Leaflet ([lat, lng])
    const leafletCoordinate = [coordinate[1], coordinate[0]];

    this.map.setView(leafletCoordinate);
  }

  /**
   * Effacer tous les éléments ajoutés à la carte.
   */
  clear() {
    // Parcourir et supprimer chaque couche de la carte
    this.layers.forEach((layer) => {
      this.map.removeLayer(layer);
    });

    // Vider la liste des couches
    this.layers = [];
  }
}

export default MapService;
