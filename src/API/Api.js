import axios from "axios";
// axios.defaults.withCredentials = false;

const server = "http://onehospital.online/api/";
// const server = "http://192.168.3.135/zcmc_referral_api/api/";
// const server = "http://192.168.3.121/zcmc_referral_api/api/";
// const server = "https://zcmc-referral.herokuapp.com/api/";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,
  baseURL: server,
  headers: {
    Authorization: `${JSON.parse(sessionStorage.getItem("sessionId"))}`,
  },
});

export default api;
