import React from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import { Button } from '@mui/material';

export default function Mypage(props) {
    const [userConfirm, setUserConfirm] = React.useState(false);
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
                        <Link to={"/UserInfo"}>
                            <Button style={{width:18, height:18}}>
                                수정 
                            </Button>
                        </Link>
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
                            <Button style={{width:18, height:18}}>
                                수정 
                            </Button>
                        </Link>
                    </div>
                </Box>
            )
        }

        
       
    } 

    React.useEffect(() => {
        // init
    }, []);

    return (
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.user_data}>
                <div style={{width: "400px", height: "200px", textAlign:"Left"}}>
                    <div style={{marginTop:"10px",marginLeft:"10px"}}>
                    <text>{`${ID}님`}</text>
                    <img src='./Image/Setting.png' alt='' style={{width:18, height:18,marginLeft:"2px"}} onClick={()=>setUserConfirm(!userConfirm)}/><br/>
                    <text>{`${userEmail}`}</text>
                    </div>
                </div>
                
                <div>
                    {userConfirm ? userInfo(): null}
                </div>
                
            </div>
        </div>
    )
}