import React from 'react';
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Box, display, style } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function AddProductPage(props) {
    const styles = {
        
        add_product_bigbox: {
            margin: "auto",
            marginTop: "100px",
            width: "1200px",
            height: "1140px",
            textAlign: "left",
        },
        hide_input : {
            display: "none"
        },
        add_product_text : {
            marginLeft: "100px",
            color: "#233756"
        },
        add_proudct_sec : {
            width: "1000px",
            height: "850px",
            margin:"auto"
        },
        first_table_sec : {
            width: "auto",
            height: "50px"
        },
        first_explanation_sec : {
            textAlign: "center",
            width: "150px",
            height: "60px",
            lineHeight: "60px",
            backgroundColor: "#f0f7ff",
            color: "#233756",
            display: "inline-block",
            borderBottom: "1px solid #5e6c81"
        },
        input_textfield_sec : {
            display: "inline-block",
            width: "350px",
            position: "relative",
            top: "-6px"
        },
        second_table_sec : {
            width: "1000px",
            height: "500px",
            marginTop: "-254px"
        },
        second_explanation_sec : {
            textAlign: "center",
            width: "150px",
            height: "500px",
            lineHeight: "500px",
            backgroundColor: "#f0f7ff",
            color: "#233756",
            display: "inline-block",
            borderBottom: "1px solid #5e6c81"
        },
        second_input_table_sec : {
            width: "350px",
            height: "500px",
            display: "inline-block",
            position: "relative",
            top: "266px"
        },
        input_image_sec : {
            width: "350px",
            height: "500px",
            objectFit: "cover",
            borderBottom: "1px solid #5e6c81"
        },
        product_image_upload_button : {
            marginTop: "-550px",
            marginLeft: "85px"
        },
        product_image_delete_button : {
            display: "none",
            backgroundColor: "white",
            color: "#5e6c81",
            top: "-490px",
            left: "280px",
            borderRadius: "100px",
            marginTop: "-11px"
        },
        third_table_sec : {
            width: "1000px",
            height: "322px",
            marginTop: "214px"
        },
        third_explanation_sec : {
            textAlign: "center",
            width: "150px",
            height: "357px",
            lineHeight: "322px",
            backgroundColor: "#f0f7ff",
            color: "#233756",
            display: "inline-block",
            borderBottom: "1px solid #5e6c81"
        },
        input_review_info_sec : {
            width: "350px",
            height: "322px",
            display: "inline-block",
            position: "relative",
            top: "68px",
            marginLeft: "0px"
        },
        review_rating : {
            marginLeft: "100px"
        },
        input_review_image_sec : {
            width: "350px",
            height:"150px",
            objectFit: "cover",
            borderBottom: "1px solid #5e6c81"
        },
        review_image_upload_button : {
            marginTop:"-200px",
            marginLeft: "65px"
        },
        review_image_delete_button : {
            display: "none",
            backgroundColor: "white",
            color: "#5e6c81",
            top: "-130px",
            left: "280px",
            borderRadius: "100px",
            marginTop: "-20px"
        },
        submit_button : {
            top: "150px",
            left: "980px"
        }
    };

    const [productName, inputProductName] = React.useState("");
    const [productPrice, inputProductPrice] = React.useState("");
    const [brandName, inputBrandName] = React.useState("");
    const [origin, inputOrigin] = React.useState("");
    const [weight, inputWeight] = React.useState("");
    const [productLink, inputProductLink] = React.useState("");
    const [bestReview, inputBestReview] = React.useState("");
    const [worstReview, inputWorstReview] = React.useState("");
    const [mainImg, inputMainImg] = React.useState("./Image/InputImageDefault.png");
    const [detailImg, inputDetailImg] = React.useState("./Image/InputImageDefault.png");
    const [bestReviewImg, inputBestReviewImg] = React.useState("./Image/InputImageDefault.png");
    const [worstReviewImg, inputWorstReviewImg] = React.useState("./Image/InputImageDefault.png");
    const [bestValue, bestSetValue] = React.useState(0);
    const [worstValue, worstSetValue] = React.useState(0);

    const mainImgInput = useRef(null);
    const detailImgInput = useRef(null);
    const bestReviewImgInput = useRef(null);
    const worstReivewImgInput = useRef(null);
    const mainImgUploadButton =useRef(null);
    const mainImgDeleteButton = useRef(null);
    const detailImgUploadButton = useRef(null);
    const detailImgDeleteButton = useRef(null);
    const bestReviewImgUploadButton = useRef(null);
    const bestReviewImgDeleteButton = useRef(null);
    const worstReviewImgUploadButton = useRef(null);
    const worstReviewImgDeleteButton = useRef(null);
    const mainImgBox = useRef(null);
    const detailImgBox =useRef(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        // init
    }, []);

    const onClickMainImgUpload = (e) => {
        mainImgInput.current.click();
    }

    const onClickDetailImgUpload = (e) => {
        detailImgInput.current.click();
    }

    const onClickBestReviewImgUpload = (e) => {
        bestReviewImgInput.current.click();
    }

    const onClickWorstReviewImgUpload = (e) => {
        worstReivewImgInput.current.click();
    }

    const onChangeMainImage = () => {
        const file = mainImgInput.current.files[0];
        const imageUrl = URL.createObjectURL(file);

        inputMainImg(imageUrl);
        
        mainImgUploadButton.current.style.display = "none";
        mainImgDeleteButton.current.style.display = "inline-flex";
    }

    const onClickMainImgDelete = (e) => {
        inputMainImg("./Image/InputImageDefault.png");
        
        mainImgUploadButton.current.style.display = "inline-flex";
        mainImgDeleteButton.current.style.display = "none";
    }

    const onChangeDetailImage = () => {
        const file = detailImgInput.current.files[0];
        const imageUrl = URL.createObjectURL(file);

        inputDetailImg(imageUrl);

        detailImgUploadButton.current.style.display = "none";
        detailImgDeleteButton.current.style.display = "inline-flex";
    }

    const onClickDetailImgDelete = () => {
        inputDetailImg("./Image/InputImageDefault.png");

        detailImgUploadButton.current.style.display = "inline-flex";
        detailImgDeleteButton.current.style.display = "none";
    }

    const onChangeBestReviewImage = () => {
        const file = bestReviewImgInput.current.files[0];
        const imageUrl = URL.createObjectURL(file);

        inputBestReviewImg(imageUrl);

        bestReviewImgUploadButton.current.style.display = "none";
        bestReviewImgDeleteButton.current.style.display = "inline-flex";
    }

    const onClickBestReviewImgDelete = () => {
        inputBestReviewImg("./Image/InputImageDefault.png");

        bestReviewImgUploadButton.current.style.display = "inline-flex";
        bestReviewImgDeleteButton.current.style.display = "none";
    }

    const onChangeWorstReviewImage = () => {
        const file = worstReivewImgInput.current.files[0];
        const imageUrl = URL.createObjectURL(file);

        inputWorstReviewImg(imageUrl);

        worstReviewImgUploadButton.current.style.display = "none";
        worstReviewImgDeleteButton.current.style.display = "inline-flex";
    }

    const onClickWorstReviewImgDelete = () => {
        inputWorstReviewImg("./Image/InputImageDefault.png");

        worstReviewImgUploadButton.current.style.display = "inline-flex";
        worstReviewImgDeleteButton.current.style.display = "none";
    }

    const onChangeProductName = (e) => {
        inputProductName(e.target.value);
        const productNameLength = e.target.value.length;

        console.log(e.target.value);

        if (productNameLength > 20) {
            alert("글자 수는 20자를 넘어가면 안됩니다.");
        }
    }

    const onChangeProductPrice = (e) => {
        inputProductPrice(e.target.value);
    }

    const onChangeBrandName = (e) => {
        inputBrandName(e.target.value);
    }
    
    const onChangeOrigin = (e) => {
        inputOrigin(e.target.value);
    }

    const onChangeBestReview = (e) => {
        inputBestReview(e.target.value);
    }

    const onChangeWorstReview = (e) => {
        inputWorstReview(e.target.value);
    }

    const onChangeWeight = (e) => {
        inputWeight(e.target.value);
    }
    
    const onChangeLink = (e) => {
        inputProductLink(e.target.value);
    }

    const submitHander = async (e) => {
        e.preventDefault();
        await axios.post("/api/ProductInfo", {
            productName: productName,
            productPrice: productPrice,
            brandName: brandName,
            origin: origin,
            bestValue: bestValue,
            worstValue: worstValue,
            bestReview: bestReview,
            worstReview: worstReview,
            weight: weight,
            productLink: productLink,
            contentType: "application/json; UTF-8;",
        })
            .then(res => {
                navigate("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        
            <Box style={styles.add_product_bigbox}>
                <h3 style={styles.add_product_text}>[상품 추가]</h3>
                <form method="post" onSubmit={submitHander}>
                    <div style={styles.add_proudct_sec}>
                        <div style={styles.first_table_sec}>
                            <div style={styles.first_explanation_sec}>상품명</div>
                            <div style={styles.input_textfield_sec}>
                                <TextField id="standard-basic" label="상품명" variant="standard" fullWidth onChange={(e) => onChangeProductName(e)}/>
                            </div>
                            <div style={styles.first_explanation_sec}>상품가격</div>
                            <div style={styles.input_textfield_sec}>
                                <TextField id="standard-basic" label="상품가격" variant="standard" fullWidth type="number" onChange={(e) => onChangeProductPrice(e)} />
                            </div>
                        </div>
                        <div style={{ width: "auto", height: "50px", marginTop: "11px"}}>
                            <div style={styles.first_explanation_sec}>브랜드명</div>
                            <div style={styles.input_textfield_sec}>
                                <TextField id="standard-basic" label="브랜드명" variant="standard" fullWidth onChange={(e) => onChangeBrandName(e)}/>
                            </div>
                            <div style={styles.first_explanation_sec}>원산지</div>
                            <div style={styles.input_textfield_sec}>
                                <TextField id="standard-basic" label="원산지" variant="standard" fullWidth onChange={(e) => onChangeOrigin(e)} />
                            </div>
                        </div>
                        <div style={{ width: "auto", height: "50px", marginTop: "11px"}}>
                            <div style={styles.first_explanation_sec}>무게</div>
                            <div style={styles.input_textfield_sec}>
                                <TextField id="standard-basic" label="무게" variant="standard" fullWidth onChange={(e) => onChangeWeight(e)}/>
                            </div>
                            <div style={styles.first_explanation_sec}>링크</div>
                            <div style={styles.input_textfield_sec}>
                                <TextField id="standard-basic" label="링크" variant="standard" fullWidth onChange={(e) => onChangeLink(e)} />
                            </div>
                        </div>
                        <div style={styles.second_table_sec}>
                            <div style={styles.second_explanation_sec}>대표 이미지</div>
                            <div style={styles.second_input_table_sec}> 
                                <img src={mainImg} ref={mainImgBox} style={styles.input_image_sec}></img>
                                <input type="file" accept="img/*" ref={mainImgInput} onChange={() => onChangeMainImage()}  style={styles.hide_input} />
                                <Button variant="contained" ref={mainImgUploadButton} onClick={() => onClickMainImgUpload()} style={styles.product_image_upload_button}>대표 이미지 추가하기</Button>
                                <Button variant="contained" ref={mainImgDeleteButton} onClick={() => onClickMainImgDelete()} style={styles.product_image_delete_button}> X </Button>
                            </div>
                            <div style={styles.second_explanation_sec}>상세 이미지</div>
                            <div style={styles.second_input_table_sec}> 
                                <img src={detailImg} ref={detailImgBox}  style={styles.input_image_sec}></img>
                                <input type="file" accept="img/*" ref={detailImgInput} onChange={() => onChangeDetailImage()} style={styles.hide_input} />
                                <Button variant="contained" ref={detailImgUploadButton} onClick={() => onClickDetailImgUpload()} style={styles.product_image_upload_button}>상세 이미지 추가하기</Button>
                                <Button variant="contained" ref={detailImgDeleteButton} onClick={() => onClickDetailImgDelete()} style={styles.product_image_delete_button}> X </Button>
                            </div>
                        </div>
                        <div style={styles.third_table_sec}>
                            <div style={styles.third_explanation_sec}>best 리뷰</div>
                            <div style={styles.input_review_info_sec}>        
                                <Rating name="no-value" value={bestValue} onChange={(event, newValue) => {bestSetValue(newValue)}} style={styles.review_rating}/>
                                <img src={bestReviewImg} style={styles.input_review_image_sec}></img>
                                <input type="file" accept="img/*" ref={bestReviewImgInput} onChange={() => onChangeBestReviewImage()} style={styles.hide_input} />
                                <Button variant="contained" ref={bestReviewImgUploadButton} onClick={() => onClickBestReviewImgUpload()} style={styles.review_image_upload_button}>best 리뷰이미지 추가하기</Button>
                                <Button variant="contained" ref={bestReviewImgDeleteButton} onClick={() => onClickBestReviewImgDelete()} style={styles.review_image_delete_button}> X </Button>
                                <TextField
                                id="standard-multiline-static"
                                label="best리뷰"
                                multiline
                                rows={5}
                                defaultValue="리뷰를 입력해주세요."
                                variant="standard"
                                fullWidth
                                onChange={(e) => onChangeBestReview(e)}
                                />
                            </div>
                            <div style={styles.third_explanation_sec}>worst 리뷰</div>
                            <div style={styles.input_review_info_sec}>
                                <Rating name="no-value" value={worstValue} onChange={(event, newValue) => {worstSetValue(newValue)}} style={styles.review_rating}/>
                                <img src={worstReviewImg} style={styles.input_review_image_sec}></img>
                                <input type="file" accept="img/*" ref={worstReivewImgInput} onChange={() => onChangeWorstReviewImage()} style={styles.hide_input} />
                                <Button variant="contained" ref={worstReviewImgUploadButton} onClick={() => onClickWorstReviewImgUpload()} style={styles.review_image_upload_button}>worst 리뷰이미지 추가하기</Button>
                                <Button variant="contained" ref={worstReviewImgDeleteButton} onClick={() => onClickWorstReviewImgDelete()} style={styles.review_image_delete_button}> X </Button>
                                <TextField
                                id="standard-multiline-static"
                                label="best리뷰"
                                multiline
                                rows={5}
                                defaultValue="리뷰를 입력해주세요."
                                variant="standard"
                                fullWidth
                                onChange={(e) => onChangeWorstReview(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" variant="contained" style={styles.submit_button}>상품 등록하기</Button>
                </form>
            </Box>
        
    );
}