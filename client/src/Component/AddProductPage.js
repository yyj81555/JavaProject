import React from 'react';
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Box, display } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function AddProductPage(props) {
    const styles = {
        dimmed_layer_wrapper : {
            position: "fixed",
            top:80,
            right:0,
            bottom:0,
            left:0,
        },
    };

    const [productName, inputDbProductName] = React.useState("");
    const [productPrice, inputDbProductPrice] = React.useState("");
    const [productImg, uploadImg] = React.useState("");
    const [preivewImg, preivewImgUrl] = React.useState("");

    const imgRef = useRef(null);

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

        uploadImg(file); 
    }

    const inputProductName = (e)  =>{
        inputDbProductName(e.target.value);
    }

    const inputProductPrice = (e)  =>{
        inputDbProductPrice(e.target.value);
    }

    const submitHander = (e) => {

        axios.post("/api/ProductInfo",{
            dbProductName: productName,
            dbProductPrice: productPrice,
            dbProductImgUrl: preivewImg,
            contentType: "application/json; UTF-8;",
        })
    }
    
    return (
        <div style={styles.dimmed_layer_wrapper}>
            <Box
                style = {{
                    textAlign: "center",
                    marginTop : "210px",
                    border: "1px solid #707070",
                    borderRadius: "19px",
                    minWidth: "50%",
                    maxWidth: "50%",
                    minHeight: "50%",
                    maxHeight: "50%",
                    paddingLeft : "100px",
                }}
            >
                <form
                    onSubmit={submitHander}
                >
                    <Box
                        style = {{
                            minWidth: "200px",
                            maxWidth: "200px",
                            minHeight: "400px",
                            maxHeight: "400px",
                            marginTop: "100px",
                            paddingLeft: "50px",
                        }}
                    >
                        <img 
                            style={{
                                border: "1px solid #707070",
                                position: "absoulte",
                                minWidth: "300px",
                                maxWidth: "300px",
                                minHeight: "400px",
                                maxHeight: "400px",        
                            }}
                            src = {preivewImg}
                        >
                        </img>
                        <Stack spacing={2} direction="row">
                            <label htmlFor="contained-button-file">
                                <input type="file" name="imagefile" accept="image/*" ref={imgRef} onChange={() => onChangeImage()} style ={{ display : "none" }}></input>
                                <Button variant="contained" onClick = {() => onClickImportImage()}
                                    style={{
                                        position: "absolute",
                                        marginTop: "-220px",
                                        marginLeft: "105px"
                                    }}
                                >
                                    Import
                                </Button>
                            </label>
                        </Stack>
                    </Box>
                    <TextField id="outlined-basic" label="상품명" name="productName" variant="outlined" onChange = {(e) => inputProductName(e)}

                        style={{
                            top: "-350px",
                            left: "300px"
                        }}
                    />
                    <TextField id="outlined-basic" label="가격" name="productPrice" variant="outlined" type="number" onChange = { (e) =>inputProductPrice(e)}

                        style={{
                            top: "-200px",
                            left: "75px"
                        }}
                    />
                    <Button variant="contained"
                        type="submit"
                        style={{
                            top: "-50px",
                            left: "-20px"
                        }}
                    >추가하기</Button>
                </form>
            </Box>
        </div>
    );
}