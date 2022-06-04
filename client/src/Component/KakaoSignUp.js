import React, { useEffect, useRef } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function KakaoSignUp(props) {

    const [value, setValue] = React.useState("1");
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [cellPhone, setCellPhone] = React.useState("");
    const [companyName,setCompanyName] = React.useState("");
    const [businessName,setBusinessName] = React.useState("");
    const [companyNumber,setCompanyNumber] = React.useState("");
    const [checkNumber, setCheckNumber] = React.useState("");
    const [serverCheckNumber, setServerCheckNumber] = React.useState("");

    const checkNumberBox = useRef(null);
    const checkEmailText = useRef(null);

    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onClickSendMail = () => {

        alert("인증번호가 전송되었습니다.");
        checkNumberBox.current.style.display = "inline-flex";
    
        axios.post("/api/sendEmail", {email: email})
        .then(res => {
          const body = res.data;
          setServerCheckNumber(body);
          console.log(body);
        })
        .catch( err => console.log(err))
    }

    const onClickCheckNumber = () => {
        if (checkNumber == serverCheckNumber) {
            alert("인증 되었습니다.");
            checkEmailText.current.style.display = "block";
        }
        else {
            alert("인증번호가 틀립니다.");
        }
        checkNumberBox.current.style.display = "none";
    }

    const submitHander = (e) => {
         e.preventDefault();

        if ( value == "1" ) {
            axios.post("/api/CreatKakaoUser", {
                ID: window.sessionStorage.getItem("ID"),
                level: value,
                email: email,
                name: name,
                cellPhone: cellPhone
            })
            .then( res => {
                const body = res.data;
            })
            .catch( err=> console.log(err))
        }else if ( value == "2" ) {
            axios.post("/api/CreatKakaoUser", {
                ID: window.sessionStorage.getItem("ID"),
                level: value,
                email: email,
                name: name,
                cellPhone: cellPhone,
                companyName: companyName,
                businessName: businessName,
                companyNumber: companyNumber
            })
            .then( res => {
                const body = res.data;
                navigate("/MainPage");
            })
            .catch( err=> console.log(err))
        }
    }

    return (
        <Box sx={{ width: "600px", height: "1000px", typography: 'body1', margin: "auto", position: "relative", top: "200px"}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "600px", margin: "auto"}}>
                    <TabList style={{}} onChange={handleChange}>
                        <Tab label="구매자" value="1" />
                        <Tab label="판매자" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" style={{ height: "700px"}}>
                    <form method="post" onSubmit={submitHander} >
                        <div style={{width: "550px", height: "55px"}}>
                            <TextField id="outlined-basic" label="이메일" variant="outlined" style={{ marginLeft: "108px"}} onChange={(e)=> setEmail(e.target.value)}/>
                            <Button variant="outlined" onClick={() => onClickSendMail()} style={{ position: "relative", left: "10px", top: "10px"}}>이메일 인증</Button>
                        </div>
                        <div ref={checkNumberBox} style={{width: "550px", height: "55px", marginTop: "20px", display: "none"}}>
                            <TextField label="인증번호를 입력하세요." style={{marginLeft: "163px"}} onChange={(e) => setCheckNumber(e.target.value)} />
                            <Button variant="outlined" onClick={() => onClickCheckNumber()} style={{height: "37px",position: "relative", left: "10px", top: "10px"}}>인증번호 확인</Button>
                        </div>
                        <div ref={checkEmailText} style={{ marginLeft: "-105px", display: "none", marginTop: "5px"}}>
                            인증되었습니다.
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="이름" variant="outlined" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="전화번호" variant="outlined" onChange={(e) => setCellPhone(e.target.value)}/>
                        </div>
                        <Button type="submit" variant="contained" style={{position: "relative", top: "80px", left: "0px"}}>회원 가입</Button>
                    </form>
                </TabPanel>
                <TabPanel value="2">
                    <form method="post" onSubmit={submitHander} >
                        <div style={{width: "550px", height: "55px"}}>
                            <TextField id="outlined-basic" label="이메일" variant="outlined" style={{ marginLeft: "108px"}} onChange={(e)=> setEmail(e.target.value)}/>
                            <Button variant="outlined" onClick={() => onClickSendMail()} style={{ position: "relative", left: "10px", top: "10px"}}>이메일 인증</Button>
                        </div>
                        <div ref={checkNumberBox} style={{width: "550px", height: "55px", marginTop: "20px", display: "none"}}>
                            <TextField label="인증번호를 입력하세요." style={{marginLeft: "163px"}} onChange={(e) => setCheckNumber(e.target.value)} />
                            <Button variant="outlined" onClick={() => onClickCheckNumber()} style={{height: "37px",position: "relative", left: "10px", top: "10px"}}>인증번호 확인</Button>
                        </div>
                        <div ref={checkEmailText} style={{ marginLeft: "-105px", display: "none", marginTop: "5px"}}>
                            인증되었습니다.
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="이름" variant="outlined" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="전화번호" variant="outlined" onChange={(e) => setCellPhone(e.target.value)}/>
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="회사명" variant="outlined" onChange={(e) => setCompanyName(e.target.value)}/>
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="대표자명" variant="outlined" onChange={(e) => setBusinessName(e.target.value)}/>
                        </div>
                        <div style={{width: "550px", height: "55px", marginTop: "20px"}}>
                            <TextField id="outlined-basic" label="사업자번호" variant="outlined" onChange={(e) => setCompanyNumber(e.target.value)}/>
                        </div>
                        <Button type="submit" variant="contained" style={{position: "relative", top: "80px", left: "0px"}}>회원 가입</Button>
                    </form>
                </TabPanel>
            </TabContext>
        </Box>
    );
}