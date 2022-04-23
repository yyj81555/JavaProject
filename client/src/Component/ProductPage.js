import React from 'react';
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

export default function ProductPage(props) {
    const styles = {
        dimmed_layer_wrapper : {
            position: "fixed",
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
            minHeight: "500px",
            maxHeight: "500px",
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
            height: "3000px",
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
            textAlign: "center",
        },
        content_detail_img : {
            border: "1px solid orange",
            width: "860px",
            height: "600px",
            margin: "auto",
            marginTop: "50px",
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

    const navigate = useNavigate();

    const productDetail = useRef(null);
    const openButton = useRef(null);
    const closedButton = useRef(null);

    const openProductDetailImg = (e) => {
        console.log("1");
        productDetail.current.style.height = "2000px";
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
                <img style={styles.image_photo_bix}></img>
                <div style={styles.product_titel_detail_content}>
                    <div>
                        <h3 style={styles.product_detail_title}>
                            상품명
                        </h3>
                    </div>
                    <div>
                        <dl style={styles.product_list_box}>
                            <dt style={styles.product_list}>
                                가격
                            </dt>
                            <dd style={styles.product_detail_list}>
                                10000 원
                            </dd>
                        </dl>
                        <dl style={styles.product_list_box}>
                            <dt style={styles.product_list}>
                                원산지
                            </dt>
                            <dd style={styles.product_detail_list}>
                                대한민국
                            </dd>
                        </dl>
                        <dl style={styles.product_list_box}>
                            <dt style={styles.product_list}>
                                브랜드
                            </dt>
                            <dd style={styles.product_detail_list}>
                                브랜드명
                            </dd>
                        </dl>
                        <dl style={styles.product_list_box}>
                            <dt style={styles.product_list}>
                                무게
                            </dt>
                            <dd style={styles.product_detail_list}>
                                100kg
                            </dd>
                        </dl>
                        <dl style={styles.product_list_box}>
                            <dt style={styles.product_list}>
                                링크
                            </dt>
                            <a href="https://www.naver.com" target="_blank" style={styles.product_detail_list}>
                                네이버
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
                        <img ref={productDetail}
                            style = {styles.content_detail_img}
                        ></img>
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
                                <div style={styles.detail_review_sec}></div>
                            </div>
                            <div style={styles.worst_review_box}>
                                <h3 style={styles.review_text}>worst리뷰</h3>
                                <div style={styles.detail_review_sec}></div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}