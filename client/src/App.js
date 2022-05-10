import './App.css';
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Link, Route, Routes  } from 'react-router-dom';

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
  const [file, setFile] = React.useState(null);
  // useEffect(() => {}, []);

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
        <Link to={"/MyPage"}>
          <Button>
            MyPage
            </Button>
        </Link>
        <Link to={"/product"}>
          <Button>
            상세 페이지
            </Button>
        </Link>
        <Link to={"/Login"}>
          <Button>
            로그인
          </Button>
        </Link>
        <Link to={"/SignUp"}>
          <Button>
            회원가입
          </Button>
        </Link>
      </>
    )
  }

  const saveImage = async() => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
    await axios.post("/api/SaveImage", formData, config)
    .then(res => {
      window.location.reload();
    })
    .catch(err =>{
        console.log(err);
    })
}

  const showCategoryField = () => {
    return(
      <>
        <Box style={{width: 1400, height: 300, border: "1px solid black", zIndex: 100, position:"absolute", backgroundColor: "#ffffff",}}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <List style={styles.listStyle} onClick={() => {window.location.href='ProductFilter';}}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;건식 사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;습식 사료
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
            <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  장난감
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;삑삑이
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;뼈 간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;습식 간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;고기 간식
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  산책용품
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;리드줄
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;똥츄
                </ListItemButton>
              </List>
            </Grid>

            <Grid item xs={3}>
              <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;건식 사료
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;습식 사료
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
            <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  장난감
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;삑삑이
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;뼈 간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;습식 간식
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;고기 간식
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List style={styles.listStyle}>
                <ListItemButton style={styles.listStyle.buttonTitleStyle}>
                  산책용품
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;리드줄
                </ListItemButton>
                <ListItemButton style={styles.listStyle.buttonNomalStyle}>
                  &nbsp;&nbsp;&nbsp;똥츄
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

        <img src='./Image/MainLogo.png' alt='' style={{margin: "0 auto", width:250, height: 65, marginTop: 5, marginBottom: 2}}/>
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

        <input type="file" file={file} onChange={(e) => {setFile(e.target.files[0]);}}/>
        <Button placeholder='파일추가' onClick={() => saveImage()}>파일 추가</Button>
        <Routes>
          <Route exact path="/AddProduct" element={ <AddProductPage/>}/>
          <Route exact path="/MainPage" element={ <MainPage/>}/>
          <Route exact path="/MyPage" element={ <MyPage/> }/>
          <Route exact path="/Login" element={ <LoginPage/> }/>
          <Route exact path="/SignUp" element={ <SignUpPage/> }/>
          <Route exact path="/product" element={ <ProductPage/> }/>
          <Route exact path="/ProductFilter" element={ <ProductFilterPage/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}