import axios from "axios";

const API_URL = "https://backend-tau-plum.vercel.app/api";

// Configuration de l'instance d'axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

export const ORSGetRoute = (start, end) => {
  return api.get(`/ors/route/${start}/${end}`);
};

export const ORSGetRouteCoordinates = (start, end) => {
  return api.get(`/ors/route/coordinates/${start}/${end}`);
};

export const ORSGetRouteSummary = (start, end) => {
  return api.get(`/ors/route/summary/${start}/${end}`);
};

export const ORSGetGeocodeSearch = (text) => {
  return api.get(`/ors/geocode/search/${text}`);
};

export const OrsGetRouteDetailed = (coordinates) => {
  return api.post(`/ors/route/detailed`, { coordinates: coordinates });
};

export const CTVehicleList = () => {
  return api.get(`/ct/vehicles`);
};

export const CTNearestStation = (longitude, latitude) => {
  return api.get(`/ct/stations/nearest/${longitude}/${latitude}`);
};

export default api;
