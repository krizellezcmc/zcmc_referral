import axios from "axios";
// axios.defaults.withCredentials = false;

// const server = "https://onehospital.online/api/";
// const server = "http://192.168.3.135/zcmc_referral_api_hosted/api/";
// const server = "http://192.168.3.121/zcmc_referral_api/api/";
// const server = "https://zcmc-referral.herokuapp.com/api/";
const server = "https://zcmc-patientreferral.online/api/";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,s
  baseURL: server,
  headers: {
    Authorization: `${JSON.parse(sessionStorage.getItem("sessionId"))}`,
  },
});

export default api;
