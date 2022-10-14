import axios from "axios";
// axios.defaults.withCredentials = false;

const url = "https://graph.facebook.com/v14.0/104467502454016";
const token =
  "EAAQ91VTb0v0BAAxX5Y4wMQQk7wI0g62YXd2xEcX8kpEc0ohWlanxMsW41PjcdOz931ZBe80GOAvivzxlqdZA4bobrrtp3ROmYvuAGBdzwtfNFZArZBEX5J7jauyS14FQ1ux4nwMx7IJbGA2CLA5ArigdUMTC4jE3YZAZB12qJpM1Qs8ycR3ZBjKXObfQkoVNrORAhLbivUoFXlW6rs1Am9U";

//Custom API to fetch data from the server using axios
const api = axios.create({
  // withCredentials: true,
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
