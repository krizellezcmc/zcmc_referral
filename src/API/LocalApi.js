import axios from "axios";
// axios.defaults.withCredentials = true;

const serverUrl = "https://192.168.8.219:81/referral_local_backend/api/";

//Custom API to fetch data from the server using axios
const localApi = axios.create({
  // withCredentials: true,
  baseURL: serverUrl,
});

export default localApi;
