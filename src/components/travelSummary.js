import { ORSGetRouteSummary } from "../services/api";
class TravelSummaryService {
  constructor(domElement) {
    this.domElement = domElement;
  }

  async run(start, end) {
    this.hide();
    const travelSummary = await ORSGetRouteSummary(start, end);
    const travelDatas = travelSummary.data;
    this.display(travelDatas);
    this.show();
  }

  display(datas) {
    datas.duration = Math.floor(datas.duration / 60);
    const h = Math.floor(datas.duration / 60);
    const m = datas.duration % 60;
    datas.duration = `${h} h ${m} min`;
    datas.distance = Math.floor(datas.distance / 1000) + " km";

    this.domElement.textContent = "";
    this.domElement.innerHTML = `<h2>${datas.duration}</h2>`;
    this.domElement.innerHTML += `<h2>${datas.distance}</h2>`;
  }

  hide() {
    this.domElement.classList.add("hide");
  }

  show() {
    this.domElement.classList.remove("hide");
  }
}

export default TravelSummaryService;
