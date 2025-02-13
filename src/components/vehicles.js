class VehiclesService {
  constructor(vehicles) {
    this.vehicles = vehicles;
    this.vehiclesDivs = [];
  }
  // Get the json
  getVehicles() {
    return this.vehicles;
  }

  getVehiclesDiv() {
    return this.vehiclesDivs;
  }

  // Set json
  setVehicles(vehicles) {
    this.vehicles = vehicles;
  }

  setVehiclesDiv(vehiclesDiv) {
    this.vehiclesDivs = vehiclesDiv;
  }

  // -- Methods --
  buildDivs() {
    const vehiclesData = this.vehicles;
    vehiclesData.forEach((vehicle) => {
      const vehicleDiv = `
      <div class="vehicle">
        <img src="${vehicle.media.image.url}" alt="image-${
        vehicle.naming.make
      }-${vehicle.naming.model}-${vehicle.naming.version}">
        <div class="vehicle-info">
          <h3>${vehicle.naming.make} ${vehicle.naming.model}</h3>
          <p>Version: ${vehicle.naming.version || "N/A"}</p>
          <p>Range: ${
            vehicle.range?.chargetrip_range?.worst || "Unknown"
          } km</p>
        </div>
      </div>
      `;
      const container = document.createElement("div");
      container.innerHTML = vehicleDiv;

      // Récupérer le nœud DOM correspondant au véhicule
      const vehicleNode = container.firstElementChild;
      this.vehiclesDivs.push(vehicleNode);
    });
  }
}

export default VehiclesService;
