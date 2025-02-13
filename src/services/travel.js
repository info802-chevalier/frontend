import { ORSGetRouteCoordinates, CTNearestStation } from "./api";

import IconService from "../components/icon";

class TravelService {
  constructor(map, vehicle, start, end) {
    this.map = map;
    this.vehicle = vehicle;
    this.start = start;
    this.end = end;
    this.iconService = new IconService();
  }

  // Privates methods
  async #getOriginalTravel() {
    const coordinatesResponse = await ORSGetRouteCoordinates(
      this.start,
      this.end
    );
    const coordinates = coordinatesResponse.data;
    return coordinates;
  }

  async #getMainWaypointsWithVehiculeRange(coordinates, vehicleRange) {
    // Fonction pour calculer la distance entre deux points (Haversine)
    const haversine = (coord1, coord2) => {
      const R = 6371; // Rayon de la Terre en km
      const [lon1, lat1] = coord1;
      const [lon2, lat2] = coord2;

      const toRad = (deg) => (deg * Math.PI) / 180;

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

      return 2 * R * Math.asin(Math.sqrt(a));
    };
    let filteredPoints = []; // Points sélectionnés
    let cumulativeDistance = 0;

    // Parcours des points de l'itinéraire
    for (let i = 1; i < coordinates.length; i++) {
      const distanceToNext = haversine(coordinates[i - 1], coordinates[i]);
      cumulativeDistance += distanceToNext;
      if (cumulativeDistance > vehicleRange * 0.8) {
        filteredPoints.push(coordinates[i]);
        cumulativeDistance = 0;
      }
    }

    return filteredPoints;
  }

  async #getClosestChargingStation(coordinate) {
    const longitude = coordinate[0];
    const latitude = coordinate[1];
    const response = await CTNearestStation(longitude, latitude);
    return response.data;
  }

  async run() {
    // Appels de l’API
    const coordinates = await this.#getOriginalTravel();

    const waypoints = await this.#getMainWaypointsWithVehiculeRange(
      coordinates,
      this.vehicle.range.chargetrip_range.worst
    );
    waypoints.forEach(async (coordinate) => {
      const stations = await this.#getClosestChargingStation(coordinate);
      const station = stations[0];
      this.map.addMarker(
        station.location.coordinates,
        "Station",
        this.iconService.getGreenIcon()
      );
    });

    // Dessin
    this.map.addMarker(coordinates[0], "Start", this.iconService.getBlueIcon());
    this.map.addMarker(
      coordinates[coordinates.length - 1],
      "End",
      this.iconService.getRedIcon()
    );
    this.map.drawRoute(coordinates);
  }
}

export default TravelService;
