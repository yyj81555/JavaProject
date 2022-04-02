import './App.css';
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { AppBar, TextField, Toolbar, Typography } from '@mui/material';
import { Button } from '@mui/material';

import AddProductPage from './Component/AddProductPage';
import LoginPage from './Component/LoginPage';
import SignUpPage from './Component/SignUpPage';

export default function App(props) {
  const [dogBreed, setDogBreed] = React.useState([]);
  const [inputBreed, setInputBreed] = React.useState("");
  // useEffect(() => {}, []);

  const OnClickDogButton = async () => {
    const response = await axios.get("/api/getDogBreed");
    const body = response.data;

    setDogBreed(body.data);
  }

  const OnClickPostTest = async () => {
    const response = await axios.post("/api/getPostTest", {
      breed: inputBreed,
      contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
    });
    const body = response.data;

    //setDogBreed(body.data);
  }

  const TopBar = () => {
    return (
      <>
        <Link to={"/"}>
          <Button onClick={() => OnClickDogButton()}>
            강아지 
          </Button>
        </Link>
        <Link to={"/AddProduct"}>
          <Button>
            추가
          </Button>
        </Link>
        <Link to={"/Login"}>
          <Button style={{position: "absolute", right: 10, top: 2}}>
            로그인
          </Button>
        </Link>
        <Link to={"/SignUp"}>
          <Button style={{position: "absolute", right: 70, top: 2}}>
            회원가입
          </Button>
        </Link>
      </>
    )
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
          </Toolbar>
        </AppBar>
        
        {
          dogBreed.map(c => {
            return(
              <Typography>{c}</Typography>
            )
          })
        }

        <TextField onChange={(e) =>  setInputBreed(e.target.value)} placeholder="견종을 입력하세요."/>
        <br/>
        <Button onClick={() => OnClickPostTest()}>
          Post Test
        </Button>

        <Routes>
          <Route exact path="/AddProduct" element= { <AddProductPage/>}/>
          <Route exact path="/Login" element = { <LoginPage/> }/>
          <Route exact path="/SignUp" element = { <SignUpPage/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}