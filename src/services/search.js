import { ORSGetGeocodeSearch } from "./api";

class SearchService {
  // Get the dom element corresponding of the input
  constructor(input, latitudeInput, longitudeInput, suggestionDiv) {
    this.input = input;
    this.latitudeInput = latitudeInput;
    this.longitudeInput = longitudeInput;
    this.suggestionDiv = suggestionDiv;
  }

  // Get the value of the input
  getValue() {
    return this.input.value;
  }

  // Set the value of the input
  setValue(value) {
    this.input.value = value;
  }

  // Get the value of the latitude input
  getLatitudeValue() {
    return this.latitudeInput.value;
  }

  // Get the value of the longitude input
  getLongitudeValue() {
    return this.longitudeInput.value;
  }

  // Set the value of the latitude input
  setLatitudeValue(value) {
    this.latitudeInput.value = value;
  }

  // Set the value of the longitude input
  setLongitudeValue(value) {
    this.longitudeInput.value = value;
  }

  // Clear the value of the input
  clear() {
    this.input.value = "";
    this.latitudeInput.value = "";
    this.longitudeInput.value = "";
  }

  // Set the focus on the input
  focus() {
    this.input.focus();
  }

  // Unset the focus on the input
  blur() {
    this.input.blur();
  }

  // Add an event listener to the input to call the search api when input change
  addListener() {
    this.input.addEventListener("input", async () => {
      if (this.getValue() == "") {
        this.hideResults();
      } else {
        const response = await ORSGetGeocodeSearch(this.getValue());
        const data = response.data;
        this.displayResults(data);
      }
    });
  }

  hideResults() {
    this.suggestionDiv.classList.add("hide");
  }

  showResults() {
    this.suggestionDiv.classList.remove("hide");
  }

  // Display the results of the search
  displayResults(results) {
    this.suggestionDiv.innerHTML = "";
    results.forEach((result) => {
      const suggestion = this.displayResult(result);
      this.suggestionDiv.appendChild(suggestion);
    });
    this.showResults();
  }

  displayResult(result) {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion");
    suggestion.innerHTML = result.properties.label;

    suggestion.addEventListener("click", () => {
      this.input.value = result.properties.label;
      this.latitudeInput.value = result.geometry.coordinates[1];
      this.longitudeInput.value = result.geometry.coordinates[0];
      this.hideResults();
    });
    return suggestion;
  }
}

export default SearchService;
