import axios from "axios";
// axios.defaults.withCredentials = true;

let serverUrl = "http://localhost/referral_local_backend/api/";

//Custom API to fetch data from the server using axios
const localApi = axios.create({
  // withCredentials: true,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  baseURL: serverUrl,
});

export default localApi;
