import React, { useEffect } from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import { Button } from '@mui/material';

export default function Mypage(props) {
    const [userConfirm, setUserConfirm] = React.useState(false);
    const [favoriteCount, setFavoriteCount] = React.useState(0);
    const [test1, test2] = React.useState(false);
    const [test3, test4] = React.useState(false);
    const [hoho, haha] = React.useState({});
    const [length, setLength] = React.useState(0);
    //
    const ID = window.sessionStorage.getItem("ID");
    const level = window.sessionStorage.getItem("level");
    const userPassword = window.sessionStorage.getItem("userPassword");
    const name = window.sessionStorage.getItem("name");
    const userEmail = window.sessionStorage.getItem("userEmail");
    const cellphoneNumber = window.sessionStorage.getItem("cellphoneNumber");
    const companyName = window.sessionStorage.getItem("companyName");
    const businessName = window.sessionStorage.getItem("businessName");
    const companyNumber = window.sessionStorage.getItem("companyNumber");
    const petType = window.sessionStorage.getItem("petType");
    const petKind = window.sessionStorage.getItem("petKind");
    //
    const styles = {
        dimmed_layer_wrapper : {
            top:80,
            right:0,
            bottom:0,
            left:0,
            
        },

        user_data : {
            border: "1px solid black",
            width: "1000px",
            height: "200px",
            margin: "auto",
            marginTop: "100px",

        }
    };
    
    useEffect( () => {
        getFavoriteCount();
    },[]);

    const getFavoriteCount = () => {
        axios.post("/api/GetFavoriteCount", {userId: window.sessionStorage.getItem("ID")})
        .then( res => {
            const body = res.data;
            
            setFavoriteCount(body.split(",").length);
            
            getImageRoute(body.split(","), body.split(",").length);
            
        })
        .catch( err => console.log(err))
    }

    const getImageRoute = (favoritePdcNumber, count) => {
        
        let result = JSON.stringify(favoritePdcNumber);
        result = result.replace("[", "");
        result = result.replace(/"/gi, "");
        result = result.replace("]", "");
    

        axios.post("/api/GetImageRoute", { pdcNumber: result, count: count})
        .then( res => {
            const body = res.data;

            haha(body.data);
            setLength(body.data.length);
            console.log(body.data[0].split(","));
            console.log(body.data[1].split(","));
        })
        .catch( err => console.log(err))
    }

    const test = () => {
        return (
            <div style={{width: "100%", height: "600px", border: "1px solid black"}}></div>
        )
    }

    const showFavoriteSec = () => {
        console.log(length);
        return (
            <div style={{ width: "100%", height: "600px", border: "1px solid black"}}>
                <div style={{  border: "1px solid black", fontSize: "25px", fontWeight: "bold", textAlign: "left"}}>
                    관심
                </div>
                <div style={{width: "100%", height: "500px", border: "1px solid blue"}}>
                    <img src={hoho[0].split(",")[0].replace("../client/public", ".")} style={{width: "200px", height: "200px", objectFit: "cover"}}></img>
                    <div>{`${hoho[0].split(",")[1]}`}</div>
                    
                </div>
            </div>
        );
    }

    const onClickFavorite = () => {

    }

    const userInfo = () => {
        
        if (level === "1") {
            return (
                <Box style={{width: "1000px", height: "600px", border: "1px solid black", marginTop: "150px", textAlign:"Left"}}>
                    <div style={{marginLeft:"10px", marginTop:"10px"}}>
                    <text style={{fontSize:"32px" }}>회원정보</text><br/><br/><br/>
                    <text style={{fontSize:"24px" }}>기본정보</text><br/><br/><br/>
                    </div>
                    <div style={{display: "inline-block", marginLeft:"10px"}}>
                        <text style={{fontSize:"16px", color: 'gray'}}>기본정보</text>
                        <text style={{fontSize:"16px",marginLeft: "10px" }}>{`${ID}`}</text>
                        <br/><br/>
                        <text style={{fontSize:"16px", color: 'gray'}}>이메일</text>
                        <text style={{fontSize:"16px", marginLeft: "26px" }}>{`${userEmail}`}</text><br/><br/>
                        <text style={{fontSize:"16px", color: 'gray'}}>휴대전화</text>
                        <text style={{fontSize:"16px", marginLeft: "10px" }}>{`${cellphoneNumber}`}</text>
                    </div>
                    <div style={{position:"relative",top:"-84px",display: "inline-block", marginLeft: "5px"}}>
                        <Button onClick={() => {test2(!test1); setUserConfirm(!userConfirm)}} style={{width:18, height:18}}>
                            수정 
                        </Button>
                    </div>
                    

                    <div style={{marginTop:"100px", marginLeft:"10px"}}>
                        <text style={{fontSize:"24px"}}>나의 반려동물</text>
                    </div>
                    <div style={{marginLeft:"10px", marginTop:"10px"}}>
                        <Link to={"/petTypeUpdate"}>
                            <Button>반려동물등록하기<br/>+</Button>
                        </Link>
                    </div>
                </Box>
                )
        }
        
        if (level === "2") {
            return (
                <Box style={{width: "1000px", height: "600px", border: "1px solid black", marginTop: "150px", textAlign:"Left"}}>
                    <div style={{marginLeft:"10px", marginTop:"10px"}}>
                    <text style={{fontSize:"32px" }}>회원정보</text><br/><br/><br/>
                    <text style={{fontSize:"24px" }}>기본정보</text><br/><br/><br/>
                    </div>
                    <div style={{display: "inline-block", marginLeft:"10px"}}>
                    <text style={{fontSize:"16px", color: 'gray'}}>기본정보</text>
                        <text style={{fontSize:"16px",marginLeft: "10px" }}>{`${ID}`}</text>
                        <br/><br/>
                        <text style={{fontSize:"16px", color: 'gray'}}>이메일</text>
                        <text style={{fontSize:"16px", marginLeft: "26px" }}>{`${userEmail}`}</text><br/><br/>
                        <text style={{fontSize:"16px", color: 'gray'}}>휴대전화</text>
                        <text style={{fontSize:"16px", marginLeft: "10px" }}>{`${cellphoneNumber}`}</text><br/><br/>
                        <text style={{fontSize:"16px", color: 'gray'}}>회사이름</text>
                        <text style={{fontSize:"16px", marginLeft: "10px" }}>{`${companyName}`}</text>
                    </div>
                    <div style={{position:"relative",top:"-126px",display: "inline-block", marginLeft: "5px"}}>
                        <Link to={"/UserInfo"}>
                            <Button  style={{width:18, height:18}}>
                                수정 
                            </Button>
                        </Link>
                    </div>
                </Box>
            )
        }

        
       
    } 

    return (
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.user_data}>
                <div style={{width: "400px", height: "200px", textAlign:"Left"}}>
                    <div style={{marginTop:"10px",marginLeft:"10px"}}>
                        <text>{`${ID}님`}</text>
                        <img src='./Image/Setting.png' alt='' style={{width:18, height:18,marginLeft:"2px"}} onClick={()=>{setUserConfirm(!userConfirm); test2(!test1)}}/><br/>
                        <text>{`${userEmail}`}</text>
                    </div>
                    <div style={{ width: "500px", height: "80px", borderLeft: "3px solid gray" ,position: "relative", left: "500px"}}>
                        <div style={{width: "100px", height: "80px", marginLeft: "40px", fontSize: "20px"}}>
                            관심
                            <div onClick={() => {onClickFavorite(); test4(!test3)}} style={{ marginTop: "20px", cursor: "pointer"}}>
                                <img src='./Image/FavoriteBorder.png' style={{width: "26px", height: "24px", objectFit: "cover", display: "inline-block"}}></img>
                                <div style={{ fontSize: "23px" ,color: "rgb(238,21,85)", fontWeight: "bold", display: "inline-block", position:"relative", top:"-5px", left: "10px"}}>{`${favoriteCount}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {userConfirm ? userInfo(): null}
                </div>
                <div>
                    {test1 ? test(): null}
                </div>
                <div>
                    {test3 ? showFavoriteSec() : null}
                </div>
            </div>
        </div>
    )
}