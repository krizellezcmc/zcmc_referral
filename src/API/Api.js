import axios from "axios";
// axios.defaults.withCredentials = true;

let serverUrl = "https://zcmc-referral-online.preview-domain.com/api/";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,
  baseURL: serverUrl,
  headers: {
    Authorization: `${JSON.parse(sessionStorage.getItem("sessionId"))}`,
  },
});

export default api;
