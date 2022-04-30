import React from 'react';
import axios from "axios";

import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import {List, ListItemButton, Collapse, ListItemText} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export default function ProductFilterPage(props) {
  const [open, setOpen] = React.useState(true);
  const [product, setProduct] = React.useState("사료");
  const [type, setType] = React.useState("");

  const itemData = [
    {
      img: './Image/Product/ZIWI.jpg',
      title: '지위픽 고등어 and 양 사료',
      author: '지위픽',
      product: "사료",
      type: "건식 사료",
      ID : "PDC-00001"
    },
    {
      img: './Image/Product/NOW.jpg',
      title: '나우 어덜트',
      author: '나우',
      product: "사료",
      type: "건식 사료",
      ID : "PDC-00002"
    },
    {
      img: './Image/Product/RoyalCanin.jpg',
      title: '로얄캐닌 통조림',
      author: '로얄캐닌',
      product: "사료",
      type: "습식 사료",
      ID : "PDC-00003"
    },
    {
      img: './Image/Product/MOISTURE.jpg',
      title: '모이스트루 습식사료',
      author: '모이스트루',
      product: "사료",
      type: "습식 사료",
      ID : "PDC-00004"
    },
  ]

  const showProduct = () => {
    return(
      <ImageList cols={3}>
        {itemData.map((item) => (
          item.product === product && 
          (type === "" || item.type === type) ?
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              onClick={() => {window.sessionStorage.setItem("productID", item.ID); window.location.reload();}}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>판매처: {item.author}</span>}
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
          <Typography>{product}{type !== "" ? " > " + type : null}</Typography>
        </Box>
      </Box>

      <Box style={{width:1400, display: "flex", margin: "0 auto", justifyContent:"center"}}>
        <Box style={{width:300, height: 1200, border: "1px solid black", marginRight: 10}}>
          <List>
            <ListItemButton onClick={() => {setOpen(!open); setProduct("사료"); setType("");}}>
              <ListItemText primary="사료" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
              <ListItemButton onClick={() => {setProduct("사료"); setType("건식 사료");}}>&nbsp;&nbsp;&nbsp;건식 사료</ListItemButton>
              <ListItemButton onClick={() => {setProduct("사료"); setType("습식 사료");}}>&nbsp;&nbsp;&nbsp;습식 사료</ListItemButton>
            </Collapse>
          </List>
        </Box>
        <Box style={{width:1090, height: 1200, border: "1px solid black", padding: "0px 10px 0px 10px"}}>
          {showProduct()}
        </Box>
      </Box>

      <text>{window.sessionStorage.getItem("productID")}</text>
    </div>
  )
}