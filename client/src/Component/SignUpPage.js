import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

export default function SignUpPage(props) {
    const [name, setName] = React.useState("");
    const [userID, setUserID] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [userPasswordConfirm, setUserPasswordConfirm] = React.useState("");
    const [msg, setMSG] = React.useState("");
    const [isUserPasswordSame,setIsUserPasswordSame] = React.useState(false);
    const [value, setValue] = React.useState("1");
    const [cellphoneNumber,setCellphoneNumber] = React.useState("");
    const [companyName,setCompanyName] = React.useState("");
    const [businessName,setBusinessName] = React.useState("");
    const [companyNumber,setCompanyNumber] = React.useState("");
    
    const styles = {
        dimmed_layer_wrapper : {
            top:80,
            right:0,
            bottom:0,
            left:0,
        },

        prodct_content : {
            border: "1px solid black",
            width: "600px",
            height: "800px",
            margin: "auto",
            marginTop: "100px",
            textAlign: "center",
        },
    };

    React.useEffect(() => {
        // init
    }, []);
    
    const navigate = useNavigate();

    const OnClickSignUp = async () => {
    let formData = null;
    
    if(value === "1") {
        formData = {
            level: value,
	        userID: userID,
            userPassword: userPassword,
            name: name,
            cellphoneNumber: cellphoneNumber,
            contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
        }
    }
    else if (value === "2") {
        formData = {
	        level: value,
            userID: userID,
            userPassword: userPassword,
            name: name,
            companyName: companyName,
            businessName: businessName,
            companyNumber: companyNumber,
            cellphoneNumber: cellphoneNumber,
            contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
        }
    }

    const response = await axios.post("/api/createUser", formData);

    console.log(1);
    const body = response.data;

    setMSG(body.result);

    if(body.result === "OK") {
        navigate("/");
    }
}

    const PasswordConfirm = (e) => {
        setUserPasswordConfirm(e.target.value);
        if (userPassword === e.target.value) {
            setIsUserPasswordSame(true);
        }
    }
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.prodct_content}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="구매자" value="1" />
                            <Tab label="판매자" value="2" />
                            </TabList>
                        </Box>
                            <TabPanel value="1">
                                <img src='./Image/ID.png' alt='' style={{width: 35, height: 35, marginTop: 20, marginRight: 13, marginLeft: 2}}/>
                                    <TextField placeholder='아이디' style={{marginTop: 20}} onChange={e => setUserID(e.target.value)}/>
                                    <br/>
                                    <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginRight: 10}}/>
                                    <TextField placeholder='패스워드' style={{marginTop: 10}} onChange={e => setUserPassword(e.target.value)}/>
                                    <br/>
                                    <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginRight: 10}}/>
                                    <TextField placeholder='패스워드확인' style={{marginTop: 10}} onChange={(e) => PasswordConfirm(e)}/>
                                    <br/>
                                    { isUserPasswordSame ? <text>비밀번호가 일치합니다.</text> : <text>비밀번호가 일치하지 않습니다 . </text>}
                                    <br/>
                                    <TextField placeholder='이름' style={{marginTop: 10, marginRight: -50}} onChange={e => setName(e.target.value)}/>
                                    <br/>
                                    <TextField placeholder='전화번호' style={{marginTop: 10, marginRight: -50}} onChange={e => setCellphoneNumber(e.target.value)}/>
                                    <br/>
                                    <Button onClick={() => OnClickSignUp()} style={{marginTop: 5}}> 회원가입 </Button>
                                    <text> {msg} </text>
                            </TabPanel>
                            <TabPanel value="2">
                                <img src='./Image/ID.png' alt='' style={{width: 35, height: 35, marginTop: 20, marginRight: 13, marginLeft: 2}}/>
                                    <TextField placeholder='아이디' style={{marginTop: 20}} onChange={e => setUserID(e.target.value)}/>
                                    <br/>
                                    <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginRight: 10}}/>
                                    <TextField placeholder='패스워드' style={{marginTop: 10}} onChange={e => setUserPassword(e.target.value)}/>
                                    <br/>
                                    <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginRight: 10}}/>
                                    <TextField placeholder='패스워드확인' style={{marginTop: 10}} onChange={(e) => PasswordConfirm(e)}/>
                                    <br/>
                                    { isUserPasswordSame ? <text>비밀번호가 일치합니다.</text> : <text>비밀번호가 일치하지 않습니다 . </text>}
                                    <br/>
                                    <TextField placeholder='전화번호' style={{marginTop: 10, marginRight: -50}} onChange={e => setCellphoneNumber(e.target.value)}/>
                                    <br/>
                                    <TextField placeholder='사업장명' style={{marginTop: 10, marginRight: -50}} onChange={e => setCompanyName(e.target.value)}/>
                                    <br/>
                                    <TextField placeholder='대표자명' style={{marginTop: 10, marginRight: -50}} onChange={e => setBusinessName(e.target.value)}/>
                                    <br/>
                                    <TextField placeholder='사업자번호' style={{marginTop: 10, marginRight: -50}} onChange={e => setCompanyNumber(e.target.value)}/>
                                    <br/>
                                    <Button onClick={() => OnClickSignUp()} style={{marginTop: 5}}> 회원가입 </Button>
                                    <text> {msg} </text> 
                            </TabPanel>
                    </TabContext>
                </Box>
            </div>     
        </div>
    );
}