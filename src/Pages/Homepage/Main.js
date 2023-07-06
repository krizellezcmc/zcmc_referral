import { useEffect, useState } from "react";
import MobileView from "./MobileView";
import Home from "./Home";
import useAuth from "../../Hooks/useAuth";

const Main = () => {
  const { user } = useAuth();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (user) {
      window.location.href = "/login";
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
