import { useState, useEffect, createContext } from "react";
import SiteRouters from "./SiteRouters";
import MyNavbar from "./MyNavbar";
import "./style.css"


export const AppContext = createContext(null);

function App() {
  const [person, setPerson] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const url = "http://127.0.0.1:8000/api/";
  const personurl = `${url}pp`;
  

  useEffect(() => {
    async function fetchData() {
      try {
        const [gamesResponse, personResponse] = await Promise.all([
          fetch(`${url}games`, { method: "GET" }),
          fetch(personurl, { method: "GET" })
        ]);

        const [gamesData, personData] = await Promise.all([
          gamesResponse.json(),
          personResponse.json()
        ]);

        setStoreData(gamesData);
        setPerson(personData);
        console.log(personData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {!storeData || !person ? (
        <div>Loading...</div>
      ) : (
        <AppContext.Provider value={{ storeData, url, person  }}>
          <MyNavbar />
          <SiteRouters />
        </AppContext.Provider>
      )}
    </>
  );
}

export default App;
