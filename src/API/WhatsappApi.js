import axios from "axios";
// axios.defaults.withCredentials = false;

const url = "https://graph.facebook.com/v14.0/104467502454016";
const token =
  "EAAQ91VTb0v0BAJNez4G8ka6PZCmFkLOTW0ETpTaPZBH9yZCDJveyg4ZB8kkMzKFwT9okmjRYswKSVdaHZCoB7SPIL7pSOnZBkpdOIjhl26YZCBudoRLFuNEx7TwiGBktprx8VnaXdV5Lkwg3f95LLg2KxmFVS5Maty614AROHfJTmJhDjtLZAZBo6kuEtb8X20ZCDUvvTSvMWN8tdCjmLZBfEAV";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
