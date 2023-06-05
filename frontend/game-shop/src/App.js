import { useState, useEffect, createContext } from "react";
import SiteRouters from "./SiteRouters";
import MyNavbar from "./MyNavbar";
import { callServer } from "./client/Client";
import "./style.css"

export const AppContext = createContext(null);

function App() {
  const [storeData, setStoreData] = useState(null);

  

  useEffect(() => {
    async function fetchData() {
      try {
        const gamesData = await callServer();
        setStoreData(gamesData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  return (
    <>
      <AppContext.Provider value={{ storeData }}>
        <MyNavbar />
        <SiteRouters />
      </AppContext.Provider>
    </>
  );
}

export default App;
