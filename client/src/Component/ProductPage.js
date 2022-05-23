import React, { useEffect, useState, useRef, Component } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';

export default function ProductPage(props) {
  const styles = {
    dimmed_layer_wrapper : {
      top:80,
      right:0,
      bottom:0,
      left:0,
      overflowY: "auto"
    },
    prodct_content : {
      border: "1px solid black",
      width: "1200px",
      height: "800px",
      margin: "auto",
      marginTop: "200px",
      textAlign: "left",
    },
    product_type : {
      margin: "auto",
      marginTop: "20px",
      marginLeft: "20px",
    },
    image_photo_bix : {
      display: "inline-block",
      border: "1px solid red",
      width: "500px",
      height: "auto",
      margin: "auto",
      marginTop: "50px",
    },
    product_titel_detail_content : {
      border: "1px solid blue",
      minWidth: "700px",
      maxWidth: "700px",
      minHeight: "500px",
      maxHeight: "500px",
      margin: "auto",
      marginLeft: "500px",
      marginTop: "-506px",
    },
    product_detail_title : {
      marginLeft: "20px",
      marginTop: "30px",
      marginBottom: "50px",
    },
    product_list_box : {
      margin: "auto",
      marginTop: "30px",
      textAlign: "left"
    },
    product_list : {
      display: "inline-block",
      maxWidth: "100px",
      position: "absoulte",
      margin: "0px",
      marginLeft: "50px",
      minWidth: "100px"
    },
    product_detail_list : {
      display: "inline-block",
      position: "absoulte",
      minWidth: "100px",
      marginLeft: "200px",
      marginTop: "-50x"
    },
    content_detail_big_box : {
      border: "1px solid red",
      width: "1200px",
      height: "auto",
      margin: "auto",
      textAlign: "left",
    },
    content_detail_text_box : {
      display: "inline-block",
      width: "auto",
      textAlign: "left",
      margin: "auto",
    },
    content_detail_text : {
      margin: "auto",
      marginTop: "20px",
      marginLeft: "20px",
    },
    content_detail_img_big_box : {
      margin: "auto",
      border: "1px solid blue",
      width: "1200px",
      height: "auto",
      textAlign: "center",
      paddingTop: "50px",
      overflow: "hidden"
    },
    content_detail_img : {
      border: "1px solid orange",
      width: "100%",
      height: "600px",
      objectFit : "none"
    },
    content_open_close_button_area : {
      margin: "auto",
      marginTop: "20px",
      textAlign: "center",
      border: "1px solid black",
    },
    review_big_box : {
      border: "1px solid black",
      height: "500px"
    },
    best_review_box : {
      display: "inline-block",
      border: "1px solid red",
      width: "400px",
      height: "300px",
      marginRight: "100px"
    },
    worst_review_box : {
      display: "inline-block",
      border: "1px solid red",
      width: "400px",
      height: "300px",
      
    },
    review_text : {
      border: "1px solid black"
    },
    detail_review_sec : {
      border: "1px solid blue",
      height: "235px",
    },
  };
  
  const StyledSlider = styled(Slider)`
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  `;

  const [productName, getProductName] = React.useState(""); 
  const [productPrice, getProductPrice] = React.useState("");
  const [brandName, getBrandName] = React.useState("");
  const [origin, getOrigin] = React.useState("");
  const [weight, getWeight] = React.useState("");
  const [productLink, getProductLink] = React.useState("");
  const [bestReview, getBestReview] = React.useState("");
  const [worstReview, getWorstReview] = React.useState("");
  const [bestValue, getBestValue] = React.useState(0);
  const [worstValue, getWorstValue] = React.useState(0);
  const [mainImg, getMainImg] = React.useState("");
  const [detailImg, getDetailImg] = React.useState("");
  const [detailImageHeight, getDetailImageHeight] = React.useState(0);
  const [mainImageSrc, setMainImageSrc] = React.useState("");
  const [detailImageSrc, setDetailImageSrc] = React.useState("");
  const [bestImg, getBestImg] = React.useState("");
  const [worstImg, getWorstImg] = React.useState("");
  const [bestImageSrc, setBestImageSrc] = React.useState("");
  const [worstImageSrc, setWorstImageSrc] = React.useState("");

  const [recomProductInfo, setRecomProductInfo] = React.useState([]);

  const navigate = useNavigate();

  const productMainIamge = useRef(null);
  const productDetail = useRef(null);
  const openButton = useRef(null);
  const closedButton = useRef(null);
  const bestImageRef = useRef(null);
  const worstImageRef = useRef(null);
  
  const detailImageSize = new Image();

  const PdcNumber = window.sessionStorage.getItem("productID");


  useEffect( () => {
    getProductInfo();
    getSimilarProduct();
  },[]);

  const getProductInfo = () => {
    axios.post("/api/GetProductInfo", { PdcNumber : PdcNumber })
    .then(res => {
        const body = res.data;

        body.data.map(c => { // map도 비동기식 임 얜 비동기여도 되서 한거. 어차피 이전값이 다음값에 영향 안주잖아 그니까 비동기여도됨 난! 간다!
            getProductName(c.productName);
            getProductPrice(c.productPrice);
            getBrandName(c.brandName);
            getOrigin(c.origin);
            getWeight(c.productWeight);
            getProductLink(c.productLink);
            getBestReview(c.bestReviewText);
            getWorstReview(c.worstReviewText);
            getBestValue(c.bestRating);
            getWorstValue(c.worstRating);
            getMainImg(c.mainImageRoute);
            getDetailImg(c.detailImageRoute);
            getBestImg(c.bestImageRoute);
            getWorstImg(c.worstImageRoute);

            setMainImageSrc(c.mainImageRoute.replace("../client/public", "."));
            productMainIamge.current.src = c.mainImageRoute.replace("../client/public", ".");

            setDetailImageSrc(c.detailImageRoute.replace("../client/public", "."));
            productDetail.current.src = c.detailImageRoute.replace("../client/public", ".");

            setBestImageSrc(c.bestImageRoute.replace("../client/public", "."));
            bestImageRef.current.src = c.bestImageRoute.replace("../client/public", ".");

            setWorstImageSrc(c.worstImageRoute.replace("../client/public", "."));
            worstImageRef.current.src = c.worstImageRoute.replace("../client/public", ".");
        })
        
        setTimeout(() => {
            detailImageSize.src = body.data[0].detailImageRoute.replace("../client/public", ".");
            getDetailImageHeight(detailImageSize.height);
        },10)
    })
    .catch( res => console.log(res))
  }

  const getSimilarProduct = () => {
    axios.post("/api/GetSimilarProduct", {PdcNumber : PdcNumber})
    .then(res => {
      const body = res.data;

      setRecomProductInfo(body.data);
    })
    .catch( res => console.log(res))
  }

  const openProductDetailImg = (e) => {
    productDetail.current.style.height = detailImageHeight +"px";
    openButton.current.style.display = "none";
    closedButton.current.style.display = "inline-flex";
  }
  
  const closedProductDetailImg = (e) => {
    productDetail.current.style.height = "600px";
    openButton.current.style.display = "inline-flex";
    closedButton.current.style.display = "none";
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  
  return (
    <div style={styles.dimmed_layer_wrapper}>
      <div style={styles.prodct_content}>
        <div style={styles.product_type}>
          [상품 분류]
        </div>
        <img style={styles.image_photo_bix} ref={productMainIamge}></img>
        <div style={styles.product_titel_detail_content}>
          <div>
            <div style={styles.product_detail_title}>
              {`${productName}`}
            </div>
          </div>
          <div>
            <dl style={styles.product_list_box}>
              <dt style={styles.product_list}>
                가격
              </dt>
              <dd style={styles.product_detail_list}>
                {`${productPrice} 원`}
              </dd>
            </dl>
            <dl style={styles.product_list_box}>
              <dt style={styles.product_list}>
                무게
              </dt>
              <dd style={styles.product_detail_list}>
                {`${weight}`}
              </dd>
            </dl>
            <dl style={styles.product_list_box}>
              <dt style={styles.product_list}>
                브랜드
              </dt>
              <dd style={styles.product_detail_list}>
                {`${brandName}`}
              </dd>
            </dl>
            <dl style={styles.product_list_box}>
              <dt style={styles.product_list}>
                원산지
              </dt>
              <dd style={styles.product_detail_list}>
                {`${origin}`}
              </dd>
            </dl>
            <dl style={styles.product_list_box}>
              <dt style={styles.product_list}>
                링크
              </dt>
              <a href={productLink} target="_blank" style={styles.product_detail_list}>
                링크 바로가기
              </a>
            </dl>
          </div>
        </div>
      </div>
      <div style={styles.content_detail_big_box}>
        <div
          style={styles.content_detail_text_box}
        >
          <div
            style={styles.content_detail_text}
          >
            [상세내용]
          </div>
          <div style={styles.content_detail_img_big_box}>
            <img ref={productDetail} style = {styles.content_detail_img}></img>
          </div>
          <div
            style={styles.content_open_close_button_area}
          >
            <Button ref={openButton} variant="outlined" onClick={() => openProductDetailImg()}>
              상세설명 더보기
            </Button>
            <Button ref={closedButton} style={{display: "none"}} variant="outlined" onClick={() => closedProductDetailImg()}>
              상세설명 접기
            </Button>
            <div style={styles.review_big_box}>
              <div style={styles.best_review_box}>
                <div style={styles.review_text}>best 리뷰</div>
                <div style={styles.detail_review_sec}>
                  <div style={{ textAlign: "left", width: "150px", position: "relative", top: "70px", width: "200px", height: "150px" }}>
                    <Rating name="read-only" style={{ top:"5px", left: "-1px"}} value={bestValue} readOnly/>
                    <div style={{ display: "inline-block"}}>
                      {`${bestValue}점`}
                    </div>
                    <div style={{ marginTop: "20px"}}>
                      {`${bestReview}`}
                    </div>
                  </div>
                  <img ref={bestImageRef} style={{ width: "100px", height: "100px", border: "1px solid black", marginLeft: "230px", position: "relative", top: "-60px", objectFit: "cover"}}></img>
                </div>
              </div>
              <div style={styles.worst_review_box}>
                <div style={styles.review_text}>worst리뷰</div>
                <div style={styles.detail_review_sec}>
                  <div style={{ textAlign: "left", width: "150px", position: "relative", top: "70px", width: "200px", height: "150px" }}>
                    <Rating name="read-only" style={{ top:"5px", left: "-1px"}} value={worstValue} readOnly/>
                    <div style={{ display: "inline-block"}}>
                      {`${worstValue}점`}
                    </div>
                    <div style={{ marginTop: "20px",}}>
                      {`${worstReview}`}
                    </div>
                  </div>
                  <img ref={worstImageRef} style={{ width: "100px", height: "100px", border: "1px solid black", marginLeft: "230px", position: "relative", top: "-60px", objectFit: "cover" }}></img>
                </div>
              </div> 
            </div>
          </div>
          <div style={{width: "1200px", height: "400px", border: "1px solid orange" }}>
            <div style={{ width: "1100px",border: "1px solid blue", margin: "auto"}}>
              <h2> 추천 상품</h2>
              <StyledSlider {...settings} style={{width: "1000px", border: "1px solid red", margin: "auto"}}>
                {
                  recomProductInfo.map((product) => (
                    <div onClick={ (e) => {window.sessionStorage.setItem("productID", product.recomPdcNumber); window.location.reload();}}>
                      <div style={{ border: "1px solid black",width: "140px", height: "210px",marginRight: "20px"}}>
                        <img src={product.recomMainImageRoute.replace("../client/public", ".")} style={{ width: "100px", height: "100px", margin: "auto", marginTop: "10px", objectFit:"cover"}}></img>
                        <div style={{fontSize: "15px", height: "40px", overflow: "hidden"}}>{`${product.recomProductName}`}</div>
                        <div style={{textAlign: "right"}}>{`${product.recomProductPrice}원`}</div>
                        <Rating name="read-only" value={product.recomBestRating} style={{ top: "5px", left: "10px"}} readOnly/>
                      </div>
                    </div>
                  ))
                }
              </StyledSlider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}