import './App.css';
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

export default function App(props) {
  const [dogBreed, setDogBreed] = React.useState([]);
  // useEffect(() => {}, []);

  const OnClickDogButton = async () => {
    const response = await axios.get("/api/getDogBreed");
    const body = response.data;

    setDogBreed(body.data);
  }

  const TopBar = () => {
    return (
      <>
        <Button onClick={() => OnClickDogButton()}>
          강아지 
        </Button>
      </>
    )
  }

  const ShowDogBreed = () => {
    if(dogBreed.length > 0) {
      
    }
  }

  return (
    <BrowserRouter>
      <div className="App" 
      style={{
        overflow: "auto",
        minWidth: "1920px",
        maxWidth: "100%", 
        minHeight: "969px",
        maxHeight: "100%",
      }} >
        <AppBar position="static"
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            minHeight: "40px",
            maxHeight: "40px",
            borderWidth: "0px 0px 2px 0px",
            borderBottomColor: "green",
            borderStyle: "solid", 
            boxShadow: "none",
          }}
        >
          <Toolbar style={{padding: "0px", minHeight: "40px", maxHeight: "40px",}}>
            {TopBar()}
            {ShowDogBreed()}
          </Toolbar>
        </AppBar>
        
        {
          dogBreed.map(c => {
            return(
              <Typography>{c}</Typography>
            )
          })
        }

        <Routes>
          <Route path="/AA"></Route>
          {/* <Route exact path="/Group" element={ <GroupList onPage={() => ChangeBannerControl(1)} openPopup={(title, text) => onClickOpenPopup(title, text)}/> }/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}