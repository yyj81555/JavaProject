import React, { useEffect } from 'react';
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Button, Hidden } from '@mui/material';

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
            paddingTop: "50px"
        },
        content_detail_img : {
            border: "1px solid orange",
            width: "860px",
            height: "600px",
            overflowY: "hidden"
        },
        content_open_close_button_area : {
            margin: "auto",
            marginTop: "20px",
            textAlign: "center",
            border: "1px solid black",
        },
        review_big_box : {
            border: "1px solid black",
            height: "300px"
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
    const [mainImg, getMainImg] = React.useState("./Image/mainImage.jpeg");
    const [detailImg, gettDetailImg] = React.useState("./Image/detailImage.jpg");
    const [detailImageHeight, getDetailImageHeight] = React.useState(0);

    const navigate = useNavigate();

    const productDetail = useRef(null);
    const openButton = useRef(null);
    const closedButton = useRef(null);
    const detailImageSize = new Image();

    useEffect( async () => {
        const response  = await axios.post("/api/GetProductInfo");
        const body = response.data;

        getProductName(body.data[0]);
        getProductPrice(body.data[1]);
        getBrandName(body.data[2]);
        getOrigin(body.data[3]);
        getWeight(body.data[4]);
        getProductLink(body.data[5]);
        getBestReview(body.data[6]);
        getWorstReview(body.data[7]);
        getBestValue(body.data[8]);
        getWorstValue(body.data[9]);

        detailImageSize.src = detailImg;
        getDetailImageHeight(detailImageSize.height);
    },[]);
    

    const openProductDetailImg = (e) => {
        console.log(detailImageHeight);
        productDetail.current.style.height = detailImageHeight +"px";
        openButton.current.style.display = "none";
        closedButton.current.style.display = "inline-flex";
    }
    
    const closedProductDetailImg = (e) => {
        productDetail.current.style.height = "600px";
        openButton.current.style.display = "inline-flex";
        closedButton.current.style.display = "none";
    }

    React.useEffect(() => {
        // init
    }, []);

   
    
    return (
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.prodct_content}>
                <h3 style={styles.product_type}>
                    [상품 분류]
                </h3>
                <img style={styles.image_photo_bix} src='./Image/mainImage.jpeg'></img>
                <div style={styles.product_titel_detail_content}>
                    <div>
                        <h3 style={styles.product_detail_title}>
                            {`${productName}`}
                        </h3>
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
                    <h3
                        style={styles.content_detail_text}
                    >
                        [상세내용]
                    </h3>
                    <div style={styles.content_detail_img_big_box}>
                        <img ref={productDetail} style = {styles.content_detail_img} src='./Image/detailImage.jpg'></img>
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
                                <h3 style={styles.review_text}>best 리뷰</h3>
                                <div style={styles.detail_review_sec}>
                                    <div style={{ textAlign: "left", width: "150px", position: "relative", top: "70px" }}>
                                        <Rating name="no-value" style={{ top:"5px", left: "-1px"}} value={bestValue}/>
                                        <div style={{ display: "inline-block"}}>
                                            {`${bestValue}점`}
                                        </div>
                                        <div style={{ marginTop: "20px"}}>
                                            {`${bestReview}`}
                                        </div>
                                    </div>
                                    <img style={{ width: "100px", height: "100px", border: "1px solid black", marginLeft: "230px"}}></img>
                                </div>
                            </div>
                            <div style={styles.worst_review_box}>
                                <h3 style={styles.review_text}>worst리뷰</h3>
                                <div style={styles.detail_review_sec}>
                                    <div style={{ textAlign: "left", width: "150px", position: "relative", top: "70px" }}>
                                        <Rating name="no-value" style={{ top:"5px", left: "-1px"}} value={worstValue}/>
                                        <div style={{ display: "inline-block"}}>
                                            {`${worstValue}점`}
                                        </div>
                                        <div style={{ marginTop: "20px"}}>
                                            {`${worstReview}`}
                                        </div>
                                    </div>
                                    <img style={{ width: "100px", height: "100px", border: "1px solid black", marginLeft: "230px"}}></img>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}