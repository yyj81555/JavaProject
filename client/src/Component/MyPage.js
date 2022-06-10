import * as React from 'react';
import axios from "axios";

import { useEffect } from 'react';
import { useRef } from 'react';

import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Mypage(props) {
    const [userConfirm, setUserConfirm] = React.useState(false);
    const [userInfoConfirm,setUserInfoConfirm] = React.useState(false);
    const [userPetInfoAdd,setUserPetInfoAdd] = React.useState(false);
    const [userPasswordCheck, setUserPasswordCheck] = React.useState(false);
    //
    const [userPasswordUpdataConfirm, setUserPasswordUpdataConfirm] = React.useState("");
    const [isUserPasswordSameUpdata ,setIsUserPasswordSameUpdata] = React.useState(false);
    const [isUserPasswordSame ,setIsUserPasswordSame] = React.useState(false);
    //
    const [favoriteCount, setFavoriteCount] = React.useState(0);
    const [test1, test2] = React.useState(false);
    const [test3, test4] = React.useState(false);
    const [hoho, haha] = React.useState({});
    const [length, setLength] = React.useState(0);
    //
    const [nameUpdata, setNameUpdata] = React.useState("");
    const [userPasswordUpdata, setUserPasswordUpdata] = React.useState("");
    const [cellphoneNumberUpdata,setCellphoneNumberUpdata] = React.useState("");
    const [companyNameUpdata,setCompanyNameUpdata] = React.useState("");
    const [businessNameUpdata,setBusinessNameUpdata] = React.useState("");
    const [companyNumberUpdata,setCompanyNumberUpdata] = React.useState("");
    const [petTypeUpdata,setPetTypeUpdata] = React.useState("");
    const [petKindUpdata,setPetKindUpdata] = React.useState("");
    const [msg, setMSG] = React.useState("");
    //

    let ID = window.sessionStorage.getItem("ID");
    let level = window.sessionStorage.getItem("level");
    let userPassword = window.sessionStorage.getItem("userPassword");
    let name = window.sessionStorage.getItem("name");
    let userEmail = window.sessionStorage.getItem("userEmail");
    let cellphoneNumber = window.sessionStorage.getItem("cellphoneNumber");
    let companyName = window.sessionStorage.getItem("companyName");
    let businessName = window.sessionStorage.getItem("businessName");
    let companyNumber = window.sessionStorage.getItem("companyNumber");
    let petType = window.sessionStorage.getItem("petType");
    let petKind = window.sessionStorage.getItem("petKind");
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
        userLoginInfo();
    },[]);

    const userLoginInfo = () => {
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
    }

    const navigate = useNavigate();

    const onClickInfoUpdata = async ()=>{
        
        let formData = null;
            if (level === "1") {
                formData = {
                    userID: ID, 
                    level: level,
                    name: nameUpdata,
                    userPassword: userPasswordUpdata,
                    cellphoneNumber: cellphoneNumberUpdata,
                    contentType: "application/json; UTF-8;",
                    
                } 
            } else if (level === "2") {
                formData = {
                    userID: ID, 
                    level: level,
                    userPassword: userPasswordUpdata,
                    cellphoneNumber: cellphoneNumberUpdata,
                    companyName: companyNameUpdata,
                    businessName: businessNameUpdata,
                    companyNumber: companyNumberUpdata,
                    contentType: "application/json; UTF-8;",
                } 
            }
            console.log(nameUpdata);
            console.log(cellphoneNumberUpdata);
        const response = await axios.post("/api/userInfoChange", formData);
        const body = response.data;
            console.log(nameUpdata);
            console.log(cellphoneNumberUpdata);
        setMSG(body.result);
    
        if(body.result === "OK") {
        navigate("/");
            }
        };

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
                        <Button style={{width:18, height:18}} onClick={()=>{setUserInfoConfirm(!userInfoConfirm);setUserConfirm(!userConfirm)}}>
                            수정 
                        </Button>
                    </div>
                    

                    <div style={{marginTop:"100px", marginLeft:"10px"}}>
                        <text style={{fontSize:"24px"}}>나의 반려동물</text>
                    </div>
                    <div style={{marginLeft:"10px", marginTop:"10px"}}>
                        <Button onClick={()=>{setUserPetInfoAdd(!userPetInfoAdd);setUserConfirm(!userConfirm)}}>
                            반려동물등록하기<br/>+
                        </Button>
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
                        <Button style={{width:18, height:18}} onClick={()=>{setUserInfoConfirm(!userInfoConfirm);setUserConfirm(!userConfirm)}}>
                            수정 
                        </Button>
                    </div>
                </Box>
            )
        }

        
       
    } 

    const UserCheckSignUpData = () => {
        if (userPasswordUpdata === "") return false;
        else if (nameUpdata === "") return false;
        else if (cellphoneNumberUpdata === "") return false;
        return true;
    }

    const SellerCheckSignUpData = () => {
        if (userPasswordUpdata === "") return false;
        else if (cellphoneNumberUpdata === "") return false;
        else if (companyNameUpdata === "") return false;
        else if (businessNameUpdata === "") return false;
        else if (companyNumberUpdata === "") return false;
        return true;
    }
    
    const passwordconfirm = (e) =>{
        if(userPassword === e.target.value) {
            setIsUserPasswordSame(true);
        } else {
            setIsUserPasswordSame(false);
        }
    }

    
    const OnChangeUserPasswordUpdata = (val) => {
        setUserPasswordUpdata(val);
    
        PasswordConfirm(userPasswordUpdataConfirm, val);
    }
    
    const PasswordConfirm = (confirm, password) => {
        setUserPasswordUpdataConfirm(confirm);
        if (password === confirm || "" === confirm ) {
            setIsUserPasswordSameUpdata(true);
        }
    
        else {
            setIsUserPasswordSameUpdata(false);
        }
    }

    

    const userInfoUpdata = () => {
        
        if (level === "1") {
            
            return (
                <div style={{width: "1000px", height: "600px", border: "1px solid black", marginTop: "150px", margin: "auto", textAlign:"center"}}>
                    <text style={{marginTop: "10px",marginRight: "190px" ,fontSize:"16px" }}>이름</text><br/>
                    <TextField placeholder='이름을 입력하세요' onChange={e=> setNameUpdata(e.target.value)}/><br/><br/>
                    <text style={{marginRight: "155px" ,fontSize:"16px" }}>비밀번호</text><br/>
                    <TextField placeholder='현재 비밀번호' onChange={e=>passwordconfirm(e)}/><br/>
                    { isUserPasswordSame ? <text style={{marginLeft: -50}}>비밀번호가 일치합니다.</text> : <text style={{marginLeft: 5}}>비밀번호가 일치하지 않습니다 . </text> }<br/>
                    <TextField value={userPasswordUpdata}placeholder='새로운 비밀번호' onChange={e => OnChangeUserPasswordUpdata(e.target.value)}/><br/>
                    <TextField value={userPasswordUpdataConfirm}placeholder='비밀번호 확인' onChange={(e) => PasswordConfirm(e.target.value, userPasswordUpdata)}/><br/>
                    { isUserPasswordSameUpdata ? <text style={{marginLeft: -50}}>비밀번호가 일치합니다.</text> : <text style={{marginLeft: 5}}>비밀번호가 일치하지 않습니다 . </text> }<br/><br/>
                    <text style={{marginRight: "140px",fontSize:"16px" }}>휴대폰번호</text><br/>
                    <TextField placeholder='휴대폰번호를 입력하세요' onChange={e => setCellphoneNumberUpdata(e.target.value)}/><br/><br/>
                    <Button type = "submit" onClick={()=>onClickInfoUpdata()} disabled={!UserCheckSignUpData()}>
                        수정
                    </Button>
                        <text> {msg} </text> 
                </div>
            )
        }

        if (level === "2") {

            return (
                <div style={{width: "1000px", height: "600px", border: "1px solid black", marginTop: "150px", margin: "auto", textAlign:"center"}}>
                    <text style={{marginTop: "10px",marginRight: "190px" ,fontSize:"16px" }}>회사정보</text><br/>
                    <TextField placeholder='회사이름을 입력하세요' onChange={e=> setCompanyNameUpdata(e.target.value)}/><br/>
                    <TextField placeholder='사업자명을 입력하세요' onChange={e=> setBusinessNameUpdata(e.target.value)}/><br/>
                    <TextField placeholder='사업자번호를 입력하세요' onChange={e=> setCompanyNumberUpdata(e.target.value)}/><br/><br/>
                    <text style={{marginRight: "155px" ,fontSize:"16px" }}>비밀번호</text><br/>
                    <TextField placeholder='현재 비밀번호' onChange={e=>passwordconfirm(e)}/><br/>
                    { isUserPasswordSame ? <text style={{marginLeft: -50}}>비밀번호가 일치합니다.</text> : <text style={{marginLeft: 5}}>비밀번호가 일치하지 않습니다 . </text> }<br/>
                    <TextField value={userPasswordUpdata}placeholder='새로운 비밀번호' onChange={e => OnChangeUserPasswordUpdata(e.target.value)}/><br/>
                    <TextField value={userPasswordUpdataConfirm}placeholder='비밀번호 확인' onChange={(e) => PasswordConfirm(e.target.value, userPasswordUpdata)}/><br/>
                    { isUserPasswordSameUpdata ? <text style={{marginLeft: -50}}>비밀번호가 일치합니다.</text> : <text style={{marginLeft: 5}}>비밀번호가 일치하지 않습니다 . </text> }<br/><br/>
                    <text style={{marginRight: "140px",fontSize:"16px" }}>휴대폰번호</text><br/>
                    <TextField placeholder='휴대폰번호를 입력하세요' onChange={e => setCellphoneNumberUpdata(e.target.value)}/><br/><br/>
                    <Button type = "submit" onClick={()=>SellerCheckSignUpData()} disabled={!UserCheckSignUpData()}>
                        수정
                    </Button>
                        <text> {msg} </text> 
                </div>
            )
        }
    }

    
    const petEtc = useRef(null);
    const [petKindEtc,setPetKindEtc] = React.useState("");
    
    const petTypeHandleChange = (event) => {
        setPetTypeUpdata(event.target.value)
    };
    
    const petKindHandleChange = (event) => {
       
        setPetKindUpdata(event.target.value);
    };

    

    const addPetInfo = async () => {
        console.log(petTypeUpdata);
        console.log(petKindUpdata);
        console.log(petKindEtc);

        
        let formData = null;
            if(petKindUpdata === "기타") { // petKindUpdata <- value값
                formData = {
                    userID: ID,
                    petType: petTypeUpdata,
                    petKind: petKindEtc,
                    contentType: "application/json; UTF-8;",
                }
            } else {
                formData = {
                    userID: ID,
                    petType: petTypeUpdata,
                    petKind: petKindUpdata,
                    contentType: "application/json; UTF-8;",
                }
            }

            
            
            const response = await axios.post("/api/addPet", formData);
            const body = response.data;
                
            setMSG(body.result);
        
            if(body.result === "OK") {
                //window.location.reload();
            }
    };

    const onClickTextField = () => {
        petEtc.current.style.display = "none";
    }
    const onClickEtc = () => {
        petEtc.current.style.display = "block";
    }

    const petInfoAdd = () => {
        return (
            <div style={{width: "600px", height: "400px", border: "1px solid black", marginTop: "150px", margin: "auto", textAlign:"center"}}>
                <FormControl style={{textAlign:"Left", border: "1px solid black", marginTop: "100px",marginRight: "100px"}} >
                    <FormLabel id="demo-controlled-radio-buttons-group">펫종류</FormLabel>
                    <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={petTypeUpdata}
                    onChange={petTypeHandleChange}>
                        <FormControlLabel value="고양이" control={<Radio/>} label="고양이" />
                        <FormControlLabel value="강아지" control={<Radio/>} label="강아지" />
                    </RadioGroup>
                </FormControl>
                <Box style={{width:"200px", display: "inline-block", marginTop:"100px"}}sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">품종</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={petKindUpdata}
                        label="품종"
                        onChange={petKindHandleChange}>
                            <MenuItem onClick={()=>onClickTextField()} value={"사모예드"}>사모예드</MenuItem>
                            <MenuItem onClick={()=>onClickTextField()} value={"시베리안 허스키"}>시베리안 허스키</MenuItem>
                            <MenuItem onClick={()=>onClickEtc()} value={"기타"}>기타품종</MenuItem>
                        </Select>
                    </FormControl>
                    <div ref={petEtc} style={{display: "none"}}>
                        <TextField placeholder='품종을 입력하세요' onChange={e => setPetKindEtc(e.target.value)}/>
                    </div>
                </Box>
                <br/>
                <Button style={{marginTop:"20px"}} type = "submit" onClick={()=>addPetInfo()}>
                    등록하기
                </Button>
            </div>
        
        )
    }

    const setButton = () => {
        if(userInfoConfirm === true) {
            userInfoConfirm(!userInfoConfirm);
        } else if(userPetInfoAdd === true) {
            userPetInfoAdd(!userPetInfoAdd);
        }
    }


    return (
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.user_data}>
                <div style={{width: "400px", height: "200px", textAlign:"Left"}}>
                    <div style={{marginTop:"10px",marginLeft:"10px"}}>
                        <text>{`${ID}님`}</text>
                        <img src='./Image/Setting.png' alt='' style={{width:18, height:18,marginLeft:"2px"}} onClick={()=>{setUserConfirm(!userConfirm);setButton();}}/><br/>
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
                    {userConfirm ? userInfo() : null}
                </div>
                <div>
                    {userInfoConfirm ? userInfoUpdata() : null}
                </div>
                <div>
                    {userPetInfoAdd ? petInfoAdd() : null}
                </div>
            </div>
        </div>
    )
}