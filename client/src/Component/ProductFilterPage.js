import React, { useEffect,Component } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import {List, ListItemButton, Collapse, ListItemText} from '@mui/material';
import { ExpandMore, ExpandLess, ReplayOutlined } from '@mui/icons-material';

import { categoryEnum } from './const';

export default function ProductFilterPage(props) {
  const [openFirstTab, setOpenFirstTab] = React.useState(true);
  const [openSecondTab, setOpenSecondTab] = React.useState(true);
  const [productInfo, setProductInfo] = React.useState([]);



  const navigate = useNavigate();

  const tempType = parseInt(window.sessionStorage.getItem("type"));
  
  useEffect( () => {
    axios.post("/api/GetProduct")
    .then(res => {
      const body = res.data;
      setProductInfo(body.data);
      console.log(body.data);
    })
    .catch( err => console.log(err))
  },[]);
  
  const test = () => {
    console.log(tempType);
  }

  const stringCategory = () => {
    switch (tempType) {
      case 1:
        return "사료"
      case 2:
        return "사료 > 건식사료"
      case 3:
        return "사료 > 습식사료"
      case 4:
        return "사료 > 화식사료"
      case 10:
        return "간식"
      case 11:
        return "간식 > 동결간식"
      case 12:
        return "간식 > 뼈간식"
      case 13:
        return "간식 > 츄르"
      case 14:
        return "간식 > 트릿"
      default:
        return null
    }
  }

  const showProduct = () => {
    return(
      <ImageList cols={3}>
        {productInfo.map((item) => (
          parseInt(item.productType.split(",")[0]) === tempType || parseInt(item.productType.split(",")[1]) === tempType
          ?
          <ImageListItem key={item.mainImageRoute}>
            <img
              src={item.mainImageRoute.replace("../client/public", ".")}
              srcSet={item.mainImageRoute.replace("../client/public", ".")}
              alt={item.productName}
              loading="lazy"
              onClick={ (e) => {window.sessionStorage.setItem("productID", item.pdcNumber); navigate("../Product");}}
            />
            <ImageListItemBar
              title={item.productName}
              subtitle={<span>판매처: {item.brand}</span>}
              position="bottom"
            />
          </ImageListItem> : null
        )
      )}
    </ImageList>
    )
  }

  return (
    <div>
      <Box
        style={{
          backgroundColor: "#ffe4e1",
          width: "100%",
          height: 35,
          boxShadow: "none",
          marginBottom: 10,
        }}
      >
        <Box style={{
          margin: "0 auto",
          textAlign: "left",
          padding: 6,
          width:1400,
        }}>
          <Typography>{stringCategory()}</Typography>
        </Box>
      </Box>

      <Box style={{width:1400, display: "flex", margin: "0 auto", justifyContent:"center"}}>
        <Box style={{width:300, height: 1200, border: "1px solid black", marginRight: 10}}>
          <List>
            <ListItemButton onClick={() => {setOpenFirstTab(!openFirstTab); window.sessionStorage.setItem("type", categoryEnum.FOOD);}}>
              <ListItemText primary="사료" />
              {openFirstTab ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openFirstTab}>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.DRY_FOOD); window.location.reload();}}>&nbsp;&nbsp;&nbsp;건식 사료</ListItemButton>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.WET_FOOD); window.location.reload();}}>&nbsp;&nbsp;&nbsp;습식 사료</ListItemButton>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.BOIL_FOOD); window.location.reload();}}>&nbsp;&nbsp;&nbsp;화식 사료</ListItemButton>
            </Collapse>
          </List>
          <List>
            <ListItemButton onClick={() => {setOpenSecondTab(!openSecondTab);  window.sessionStorage.setItem("type", categoryEnum.SNACKS);}}>
              <ListItemText primary="간식" />
              {openSecondTab ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSecondTab}>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.FROZEN_SNACKS); window.location.reload();}}>&nbsp;&nbsp;&nbsp;동결 간식</ListItemButton>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.BONE_SNACKS); window.location.reload();}}>&nbsp;&nbsp;&nbsp;뼈 간식</ListItemButton>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.CHURU_SNACKS); window.location.reload();}}>&nbsp;&nbsp;&nbsp;츄르</ListItemButton>
              <ListItemButton onClick={() => {window.sessionStorage.setItem("type", categoryEnum.TREATS_SNACKS); window.location.reload();}}>&nbsp;&nbsp;&nbsp;트릿</ListItemButton>
            </Collapse>
          </List>
        </Box>
        <Box style={{width:1090, height: 1200, border: "1px solid black", padding: "0px 10px 0px 10px"}}>
          {showProduct()}
        </Box>
      </Box>
    </div>
    
  )
}