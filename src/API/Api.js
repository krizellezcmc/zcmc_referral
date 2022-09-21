import axios from "axios";
// axios.defaults.withCredentials = true;

let serverUrl = "http://localhost/zcmc_referral_api/api/";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,
  baseURL: serverUrl,
  headers: {
    Authorization: `${JSON.parse(sessionStorage.getItem("sessionId"))}`,
  },
});

export default api;
