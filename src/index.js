// Import
import { CTVehicleList } from "./services/api";
import MapService from "./services/map";
import SearchService from "./services/search";
import TravelService from "./services/travel";
import VehiclesService from "./components/vehicles";
import TravelSummaryService from "./components/travelSummary";
import CarouselService from "./components/carousel";

document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;

  if (path === "/") {
    // -- DOM ELEMENTS --
    const startInput = document.getElementById("start");
    const startLatitudeInput = document.getElementById("start-gps-latitude");
    const startLongitudeInput = document.getElementById("start-gps-longitude");
    const endInput = document.getElementById("end");
    const endLatitudeInput = document.getElementById("end-gps-latitude");
    const endLongitudeInput = document.getElementById("end-gps-longitude");
    const suggestions = document.getElementById("suggestions");
    const submitButton = document.getElementById("submit");
    const switchImg = document.getElementById("switch-icon");
    const toogleOptionList = document.getElementsByClassName("toogle-option");
    const trajetSummary = document.getElementById("trajet-summary");

    // -- VARIABLES --

    const vehiclesService = new VehiclesService();
    const carouselService = new CarouselService();
    const travelSummaryService = new TravelSummaryService(trajetSummary);
    let map = new MapService(48.866667, 2.333333);
    let searchStart = new SearchService(
      startInput,
      startLatitudeInput,
      startLongitudeInput,
      suggestions
    );
    searchStart.addListener();
    let searchEnd = new SearchService(
      endInput,
      endLatitudeInput,
      endLongitudeInput,
      suggestions
    );
    searchEnd.addListener();

    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();
      // Réinitialisation de la carte
      map.clear();
      // Récupération des coordonnées via le formulaire
      const startCoordinates =
        startLongitudeInput.value + "," + startLatitudeInput.value;
      const endCoordinates =
        endLongitudeInput.value + "," + endLatitudeInput.value;
      // Récupération du véhicule via le formulaire
      const vehicle =
        vehiclesService.getVehicles()[carouselService.getCurrentIndex()];
      const travel = new TravelService(
        map,
        vehicle,
        startCoordinates,
        endCoordinates
      );
      travel.run();
      travelSummaryService.run(startCoordinates, endCoordinates);
    });

    switchImg.addEventListener("click", () => {
      const startInputValue = searchStart.getValue();
      const startLatitudeInputValue = searchStart.getLatitudeValue();
      const startLongitudeInputValue = searchStart.getLongitudeValue();
      searchStart.setValue(searchEnd.getValue());
      searchStart.setLatitudeValue(searchEnd.getLatitudeValue());
      searchStart.setLongitudeValue(searchEnd.getLongitudeValue());
      searchEnd.setValue(startInputValue);
      searchEnd.setLatitudeValue(startLatitudeInputValue);
      searchEnd.setLongitudeValue(startLongitudeInputValue);
    });

    window.addEventListener("load", async (e) => {
      const vehiclesListResponse = await CTVehicleList();
      const vehiclesList = vehiclesListResponse.data;
      vehiclesService.setVehicles(vehiclesList);
      vehiclesService.buildDivs();
      carouselService.setContainerId("carousel");
      carouselService.setElements(vehiclesService.getVehiclesDiv());
      carouselService.init();
    });

    for (let i = 0; i < toogleOptionList.length; i++) {
      let option = toogleOptionList[i];
      option.addEventListener("click", () => {
        let optionParent = option.parentElement;
        optionParent.classList.toggle("hide");
      });
    }
  } else {
    window.location.href = "/";
  }
});
