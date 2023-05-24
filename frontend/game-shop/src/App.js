import { useState, useEffect, createContext } from "react";
import SiteRouters from "./SiteRouters";
import MyNavbar from "./MyNavbar";
import "./style.css"

export const AppContext = createContext(null);

function App() {
  const [storeData, setStoreData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const url = "http://127.0.0.1:8000/api/";

  

  useEffect(() => {
    async function fetchData() {
      try {
        const [gamesResponse] = await Promise.all([
          fetch(`${url}games/`, { method: "GET" }),
        ]);

        const [gamesData] = await Promise.all([
          gamesResponse.json(),
        ]);

        setStoreData(gamesData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ storeData, url }}>
        <MyNavbar />
        <SiteRouters />
      </AppContext.Provider>
    </>
  );
}

export default App;
