import axios from "axios";
axios.defaults.withCredentials = false;

let server = "https://zcmc-referral.online/api/";
// let server = "http://192.168.3.135/zcmc_referral_api/api/";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,
  baseURL: server,
  headers: {
    Authorization: `${JSON.parse(sessionStorage.getItem("sessionId"))}`,
  },
});

export default api;
