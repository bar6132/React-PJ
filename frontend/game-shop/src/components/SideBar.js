import React, { useState, useEffect, useContext } from "react";
import { Stack, Typography, Slider, TextField } from "@mui/material";
import './sidebarstyle.css'
import { Button } from 'react-bootstrap';
function SideBar() {
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(1000);
  const minmin = 0;
  const maxmax = 1000;
  const [priceRangeValue, setPriceRangeValue] = useState([0, 1000]);

  
  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  console.log(priceRangeValue);

  return (<>
    <div className='sidebar'>
      <div style={{height: '30%'}}>
      <h2 style={{textAlign:'center'}}>חיפוש</h2>
      <div style={{ padding: '20px', textAlign: 'center', fontFamily:'fantasy'}}>
        
        <h3>סנן לפי מחיר</h3>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minmin}
        max={maxmax}
      /></div>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <TextField
          label="מינימום"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "85px" }}
          value={minNum}
          onChange={(e) => {
            setMinNum(Number(e.target.value));
            setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
          }}
        />
        <Typography>-</Typography>
        <TextField
          label="מקסימום"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "85px" }}
          value={maxNum}
          onChange={(e) => {
            setMaxNum(Number(e.target.value));
            setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
          }}
        />
        <h4> : מחיר</h4>
      </Stack>
      <br/>
      <div className="dropdown">
        <span  style={{position:'absolute', textAlign: "center"}}> Playstasion</span>
        <div className="dropdown-content">
          <Button style={{position:'absolute'}} onClick={()=>{}} > ps5 </Button>
          <br/>
          <br/>
          <Button style={{position:'absolute'}}> ps4 </Button>
          <br/>
          <br/>
          <Button style={{position:'absolute'}}> ps3 </Button>
          <br/>
          <br/>
          <Button style={{position:'absolute'}}> ps2 </Button>
          <br/>
          <br/>
          <Button style={{position:'absolute'}}> ps1 </Button>
        </div>
      </div>
      </div>
      
    </div>
    </>
  )
}

export default SideBar;