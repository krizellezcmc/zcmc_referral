import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [cookies, setCookie] = useCookies(["sessionId"]);

  const fetchUser = async () => {
    try {
      const response = await JSON.parse(localStorage.getItem("user"));

      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSessionId = () => {
    try {
      const response = JSON.parse(sessionStorage.getItem("sessionId"));

      if (response) {
        setSession(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSessionId();
  }, []);

  return (
    <DataContext.Provider value={{ user, session }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
