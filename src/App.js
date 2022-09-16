import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
