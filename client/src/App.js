import './App.css';
import React from 'react';
import { useEffect, useRef, Component } from 'react';
import axios from "axios";
import { BrowserRouter, Link, Route, Routes, useNavigate  } from 'react-router-dom';

import { AppBar, Toolbar, Box, Typography, Grid, List, ListItemButton } from '@mui/material';
import { Button } from '@mui/material';
import { Dehaze } from '@mui/icons-material';

import AddProductPage from './Component/AddProductPage';
import MainPage from './Component/MainPage';
import LoginPage from './Component/LoginPage';
import SignUpPage from './Component/SignUpPage';
import MyPage from './Component/MyPage';
import ProductPage from './Component/ProductPage';
import ProductFilterPage from './Component/ProductFilterPage';
import KakaoSignUp from './Component/KakaoSignUp';
import Kakao from './Component/Kakao';
import { display } from '@mui/system';

import { categoryEnum } from './Component/const';

export default function App(props) {
  const styles = {
    listStyle: {
      width: "80%", 
      margin: "0 auto", 

      buttonTitleStyle: {
        font: "normal normal bold 17px Segoe UI",
        padding: 3,
      },

      buttonNomalStyle: {
        padding: 3,
      }
    }
  }
  const [showCategory, setShowCategory] = React.useState(false);
  let [type, setType] = React.useState(0);
  // useEffect(() => {}, []);

  const loginButton = useRef(null);
  const userName = useRef(null);
  const ID = window.sessionStorage.getItem("ID");
  const signUpButton = useRef(null);
  const myPage = useRef(null);
  const logoutButton = useRef(null);

  const loginState = () => {
    
    if (ID !== null) {
      loginButton.current.style.display="none";
      userName.current.style.display="block";
      signUpButton.current.style.display="none";
      myPage.current.style.display="block";
      logoutButton.current.style.display="block";
    }

  }

  const logout = () => {
    
    let ID = window.sessionStorage.removeItem("ID");
    window.sessionStorage.removeItem("level");
    window.sessionStorage.removeItem("userPassword");
    window.sessionStorage.removeItem("name");
    window.sessionStorage.removeItem("userEmail");
    window.sessionStorage.removeItem("cellphoneNumber");
    window.sessionStorage.removeItem("companyName");
    window.sessionStorage.removeItem("businessName");
    window.sessionStorage.removeItem("companyNumber");
    window.sessionStorage.removeItem("petType");
    window.sessionStorage.removeItem("petKind");


    if (ID === null) {
      loginButton.current.style.display="block";
      userName.current.style.display="none";
      signUpButton.current.style.display="block";
      myPage.current.style.display="none";
      logoutButton.current.style.display="none";

    }
    window.location.reload();
  }

  
  useEffect( () => {
    loginState();

  },[]);
  const TopBar = () => {
    return (
      <>
        <Link to={"/AddProduct"}>
          <Button>
            추가
          </Button>
        </Link>
        <Link to={"/MainPage"}>
          <Button>
            메인페이지
          </Button>
        </Link>
        <Link to={"/product"}>
          <Button>
            상세 페이지
            </Button>
        </Link>
        <Link to={"/Login"}>         
          <Button ref={loginButton}>
            로그인
          </Button>
        </Link>
          <div ref={userName} style={{display: "none", color: "black"}}>
          {`${ID}님`}
          </div>
        <Link to={"/SignUp"}>
          <Button ref={signUpButton}>
            회원가입
          </Button>
        </Link>
        <Link to={"/Mypage"}>
          <Button ref={myPage} style={{display: "none"}}>
            마이페이지
          </Button>
        </Link>
          <Button ref={logoutButton} style={{display: "none"}} onClick={logout}>
            로그아웃
          </Button>
      </>
    )
  }

  const showCategoryField = () => {
    return(
      <>
        <Box style={{width: 1400, height: 300, border: "1px solid black", zIndex: 100, position:"absolute", backgroundColor: "#ffffff",}}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <List style={styles.listStyle} onClick={() => {window.sessionStorage.setItem("type", categoryEnum.FOOD); window.location.href='ProductFilter';}}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;건식 사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;습식 사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;화식 사료
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;동결 간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;뼈 간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;츄르
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;트릿
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  }

  return (
    <BrowserRouter>
      <div className="App"
      style={{
        overflow: "auto",
        minWidth: "1900px",
        maxWidth: "100%", 
        minHeight: "969px",
        maxHeight: "100%",
      }} >
        <AppBar position="static"
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            borderWidth: "0px 0px 2px 0px",
            borderBottomColor: "#ffe4e1",
            borderStyle: "solid", 
            boxShadow: "none",
          }}
        >
          <Toolbar style={{padding: "0px", minHeight: "36px", maxHeight: "36px", display:"flex", justifyContent:"center"}}>
            {TopBar()}
          </Toolbar>
        </AppBar>

        <img src='./Image/MainLogo.png' alt='' onClick={() => {window.location.href="MainPage";}} style={{margin: "0 auto", width:250, height: 65, marginTop: 5, marginBottom: 2}}/>
        <Box
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            boxShadow: "none",
          }}
        >
          <Box style={{width: 1400, margin: "0 auto",}}>
            <Box style={{display:"flex",}}>
              <Dehaze style={{width:35, height:35, display:"flex", alignItems: "center", marginTop: 2}} onClick={() => setShowCategory(!showCategory)}/>
              <Typography style={{font: "normal normal bold 20px Segoe UI", display:"flex", alignItems: "center", marginLeft: 12}}> 전체 카테고리 </Typography>
            </Box>
            {showCategory ? showCategoryField() : null}
          </Box>
        </Box>

        <Routes>
          <Route exact path="/AddProduct" element={ <AddProductPage/>}/>
          <Route exact path="/MainPage" element={ <MainPage/>}/>
          <Route exact path="/MyPage" element={ <MyPage/> }/>
          <Route exact path="/Login" element={ <LoginPage/> }/>
          <Route exact path="/SignUp" element={ <SignUpPage/> }/>
          <Route exact path="/product" element={ <ProductPage/> }/>
          <Route exact path="/ProductFilter" element={ <ProductFilterPage/> }/>
          <Route exact path="/KakaoCode" element={ <Kakao/> }/>
          <Route exact path="/KakaoSignUp" element={ <KakaoSignUp/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
