import { useEffect, useState } from "react";
import MobileView from "./MobileView";
import Home from "./Home";

const Main = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
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
