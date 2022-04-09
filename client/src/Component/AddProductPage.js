import React from 'react';
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Box, display, style } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'

export default function AddProductPage(props) {
    const styles = {
        dimmed_layer_wrapper : {
            position: "fixed",
            top:80,
            right:0,
            bottom:0,
            left:0,
        },
        add_product_bigbox : {
            marginTop : "210px",
            border: "1px solid #707070",
            borderRadius: "19px",
            minWidth: "50%",
            maxWidth: "50%",
            minHeight: "50%",
            maxHeight: "50%",
            paddingLeft : "100px",  
        },
        img_import_box : {
            minWidth: "200px",
            maxWidth: "200px",
            minHeight: "400px",
            maxHeight: "400px",
            marginTop: "100px",
            paddingLeft: "50px",
        },
        image_box : {
            border: "1px solid black",
            position: "absoulte",
            minWidth: "280px",
            maxWidth: "280px",
            minHeight: "380px",
            maxHeight: "380px",     
        },
        image_impord_button : {
            position: "absolute",
            marginTop: "-220px",
            marginLeft: "100px",
        },
        image_delete_button : {
            top: "730px",
            left: "340px",
            display: "none",
            position: "absolute",
        },
        product_text_name : {
            top: "-400px",
            left: "300px",
        },
        prodcut_text_price : {
            top: "-200px",
            left: "80px"
        },
        prodct_import_button : {
            top: "0px",
            left: "-10px"
        }
    };

    const [productName, inputDbProductName] = React.useState("");
    const [productPrice, inputDbProductPrice] = React.useState("");
    const [preivewImg, preivewImgUrl] = React.useState("");
    const [test1, test2] = React.useState("");

    const imgRef = useRef(null);
    const uploadButton = useRef(null);
    const deleteButton = useRef(null);
    const imgBox = useRef(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        // init
    }, []);

    const onClickImportImage = (e) => {
        imgRef.current.click();
    }

    const onChangeImage = (e) => {
        const file = imgRef.current.files[0];
        const imageUrl = URL.createObjectURL(file);

        preivewImgUrl(imageUrl);

        uploadButton.current.style.display = "none";
        deleteButton.current.style.display = "block";
        imgBox.current.style.display = "block";
    }

    const deleteButtonClick = (e) => {
        uploadButton.current.style.display = "block";
        deleteButton.current.style.display = "none";
        
        imgBox.current.style.display ="none";
        uploadButton.current.style.position = "absolute";
        uploadButton.current.style.marginTop = "200px";
    }

    const inputProductName = (e)  =>{
        inputDbProductName(e.target.value);
        const productNameLength = e.target.value.length;

        console.log(productNameLength);

        if(productNameLength > 50){
            alert("글자 수는 50자를 넘어가면 안됩니다.");
        }
    }

    const inputProductPrice = (e)  =>{
        inputDbProductPrice(e.target.value);
    }

    const submitHander = async (e) => {
        e.preventDefault();
        await axios.post("/api/ProductInfo",{
            dbProductName: productName,
            dbProductPrice: productPrice,
            dbProductImgUrl: preivewImg,
            contentType: "application/json; UTF-8;",
        })
        .then(res => {
            navigate("/");
        })
        .catch(err =>{
            console.log(err);
        })

        

    }
    
    return (
        <div style={styles.dimmed_layer_wrapper}>
            <Box
                style = {styles.add_product_bigbox}>
                <form
                    method="post"
                    onSubmit={submitHander}
                >
                    <Box
                        style = {styles.img_import_box}>
                        <img
                            ref={imgBox} 
                            style={styles.image_box}
                            src = {preivewImg}
                        >
                        </img>
                        <Stack spacing={2} direction="row">
                            <label htmlFor="contained-button-file">
                                <input type="file" name="imagefile" accept="image/*" ref={imgRef} onChange={() => onChangeImage()} style ={{ display : "none" }}></input>
                                <Button ref={uploadButton} variant="contained" onClick = {() => onClickImportImage()}style={styles.image_impord_button}>
                                    Import
                                </Button>
                            </label>
                        </Stack>
                    </Box>
                    <Button
                        ref={deleteButton}
                        variant="outlined"
                        style={styles.image_delete_button}
                        onClick = {() => deleteButtonClick()}
                    >
                        사진삭제
                    </Button>
                    <TextField id="outlined-basic" label="상품명" name="productName" variant="outlined" onChange = {(e) => inputProductName(e)}
                        style={styles.product_text_name}
                    />
                    <TextField id="outlined-basic" label="가격" name="productPrice" variant="outlined" type="number" onChange = { (e) =>inputProductPrice(e)}
                        style={styles.prodcut_text_price}
                    />
                    <Button variant="contained"
                        type="submit"
                        style={styles.prodct_import_button}
                    >추가하기</Button>
                </form>
            </Box>
        </div>
    );
}