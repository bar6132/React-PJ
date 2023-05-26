// import React, { useState, useEffect, useContext } from "react";
// import { Stack, Typography, Slider, TextField } from "@mui/material";
// import './sidebarstyle.css'
// import { Button } from 'react-bootstrap';
// import  back from '../image/back.jpg'
// import axios from "axios";
// import { AppContext } from "../App";


// function SideBar() {
//   const [minNum, setMinNum] = useState(0);
//   const [maxNum, setMaxNum] = useState(1000);
//   const minmin = 0;
//   const maxmax = 1000;
//   const [priceRangeValue, setPriceRangeValue] = useState([0, 1000]);
//   const [storeData, setStoreData] = useState(null);
//   const [searchTxt, setSearchTxt] = useState('');
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []); // Run this effect only once, on component mount

//   const fetchData = async () => {
//     try {
//       // Simulating data fetching from an API
//       const response = await fetch('/api/games');
//       const data = await response.json();
//       setStoreData(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
  
//   const handleSearchChange = (e) => {
//     const searchQuery = e.target.value;
//     setSearchTxt(searchQuery);
//     fetchData();
//   };
  
  
//   const handlePriceRangeChange = (event, newValue) => {
//     setMinNum(newValue[0]);
//     setMaxNum(newValue[1]);
//     setPriceRangeValue(newValue);
//   };

//   console.log(priceRangeValue);

//   return (<>
//     <div className='sidebar'>
//       <div style={{ height: '30%' }}>
//         <h2 style={{ textAlign: 'center' }}>שם המשחק</h2>
//         <input
//           type="search"
//           placeholder="חפש"
//           value={searchTxt}
//           onChange={handleSearchChange}
//         />
//         <button onClick={fetchData}>
//           חפש
//         </button>

// <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'fantasy' }}>
//   {/* Render the games based on the search results */}
//         <h3>סנן לפי מחיר</h3>
//       <Slider
//         getAriaLabel={() => "Price range"}
//         value={priceRangeValue}
//         onChange={handlePriceRangeChange}
//         valueLabelDisplay="auto"
//         min={minmin}
//         max={maxmax}
//       /></div>
//       <Stack direction="row" justifyContent="space-evenly" alignItems="center">
//         <TextField
//           label="מינימום"
//           type="number"
//           variant="outlined"
//           InputLabelProps={{ shrink: true }}
//           sx={{ width: "85px" }}
//           value={minNum}
//           onChange={(e) => {
//             setMinNum(Number(e.target.value));
//             setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
//           }}
//         />
//         <Typography>-</Typography>
//         <TextField
//           label="מקסימום"
//           type="number"
//           variant="outlined"
//           InputLabelProps={{ shrink: true }}
//           sx={{ width: "85px" }}
//           value={maxNum}
//           onChange={(e) => {
//             setMaxNum(Number(e.target.value));
//             setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
//           }}
//         />
//         <h4> : מחיר</h4>
//       </Stack>
//       <br/>
//       <div style={{textAlign: "right", direction: 'rtl'}}>
//         <p style={{textAlign: 'center'}}>Playstation</p>
    
//         <div style={{backgroundImage:`url(${back})`, backgroundSize: "cover", width: '100%' }}>
//           <Button style={{ background:'none', border:'0'}} > ps5 </Button>
//           <br/>
//           <br/>
//           <Button style={{ background:'none', border:'0'}}> ps4 </Button>
//           <br/>
//           <br/>
//           <Button style={{ background:'none', border:'0'}}> ps3 </Button>
//           <br/>
//           <br/>
//           <Button style={{ background:'none', border:'0'}}> ps2 </Button>
//           <br/>
//           <br/>
//           <Button style={{ background:'none', border:'0'}}> ps1 </Button>
//         </div>
//       </div>
//       </div>
//       </div>
//     </>
//   )
// }

// export default SideBar;



import React, { useState, useEffect } from 'react';

const SideBar = () => {
  const [storeData, setStoreData] = useState(null);
  const [searchTxt, setSearchTxt] = useState('');
  const [filteredGame, setFilteredGame] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Run this effect only once, on component mount

  const fetchData = async () => {
    try {
      // Simulating data fetching from an API
      const response = await fetch('/api/games');
      const data = await response.json();
      setStoreData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchTxt(searchQuery);
  };

  useEffect(() => {
    if (storeData === null || storeData === undefined) {
      return; // Exit if storeData is not available
    }

    const filteredGame = storeData.find((game_name) =>
      game_name.toLowerCase() === searchTxt.toLowerCase()
    );
    setFilteredGame(filteredGame);
  }, [storeData, searchTxt]);

  return (
    <>
      <div className='sidebar'>
        <div style={{ height: '30%' }}>
          <h2 style={{ textAlign: 'center' }}>שם המשחק</h2>
          <input
            type="search"
            placeholder="חפש"
            value={searchTxt}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='game-details'>
        {filteredGame ? (
          <div>
            <h3>{filteredGame.name}</h3>
            {/* Render other game details */}
          </div>
        ) : (
          <p>No matching game found.</p>
        )}
      </div>
    </>
  );
};

export default SideBar;
