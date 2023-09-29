import { useEffect, useState } from "react";
import MobileView from "./MobileView";
import Home from "./Home";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { user } = useAuth();
  let navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const previousPath = localStorage.getItem("previousPath");

    if (previousPath) {
      navigate(previousPath);
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobileView = windowSize.width <= 1350;

  return <div>{isMobileView ? <MobileView /> : <Home />}</div>;
};

export default Main;
