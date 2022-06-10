import * as React from 'react';
import { useRef } from 'react';
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
  const [userIDCheck, setUserIDCheck] = React.useState(false);
  const [userPassword, setUserPassword] = React.useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = React.useState("");
  const [msg, setMSG] = React.useState("");
  const [isUserPasswordSame,setIsUserPasswordSame] = React.useState(false);
  const [value, setValue] = React.useState('1');
  const [cellphoneNumber,setCellphoneNumber] = React.useState("");
  const [companyName,setCompanyName] = React.useState("");
  const [businessName,setBusinessName] = React.useState("");
  const [companyNumber,setCompanyNumber] = React.useState("");
  const [userEmail,setUserEmail] = React.useState("");
  const [serverCheckNumber, setServerCheckNumber] = React.useState("");
  const [checkNumber, setCheckNumber] = React.useState("");

  const checkNumberBox = useRef(null);
  const checkEmailText = useRef(null);
  
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
      userEmail: userEmail,
      contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
    }
  }
  else if (value === "2") {
    formData = {
	    level: value,
      userID: userID,
      userPassword: userPassword,
      userEmail:userEmail,
      companyName: companyName,
      businessName: businessName,
      companyNumber: companyNumber,
      cellphoneNumber: cellphoneNumber,
      userEmail: userEmail,
      contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
    }
  }

    const response = await axios.post("/api/createUser", formData);
    const body = response.data;

    setMSG(body.result);

    if(body.result === "OK") {
    navigate("/");
    }
  }
 
  const UserIdCodition = (e) => {
    setUserID(e.target.value);
    const userIdLangth = e.target.value.length;
    
    if (userIdLangth > 8) {
      alert("글자 수는 2-8여야 합니다");
    }
  }

  const OnChangeUserPassword = (val) => {
    setUserPassword(val);
    PasswordConfirm(userPasswordConfirm, val);
  }

  const PasswordConfirm = (confirm, password) => {
    setUserPasswordConfirm(confirm);
    console.log(confirm);
    if (password === confirm || "" === confirm) {
      setIsUserPasswordSame(true);
    }

    else {
      setIsUserPasswordSame(false);
    }
  }
  
  const handleChange = (event, newValue) => {// 판매자 구매자 나눌때 쓰는 것
    setValue(newValue);
  };

  const onClickSendMail = () => {

    alert("인증번호가 전송되었습니다.");
    checkNumberBox.current.style.display = "inline-flex";

    axios.post("/api/sendEmail", {email: userEmail})
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

  const UserIdConfirm = async () => {
    const response = await axios.post("/api/UserIdConfirm", {
      userID: userID,
      contentType: "application/json; UTF-8;",
    });
    const body = response.data;

    if(body.result === "false") {
      setUserIDCheck(false);
      alert("아이디가 중복됩니다.");
    } else {
      setUserIDCheck(true);
      alert("사용가능한 아이디입니다.");
    }
  }

  const UserCheckSignUpData = () => {
    if (userID === "") return false;
    else if (userPassword === "") return false;
    else if (name === "") return false;
    else if (cellphoneNumber === "") return false;
    return true;
  }

  const SellerCheckSignUpData = () => {
    if (userID === "") return false;
    else if (userPassword === "") return false;
    else if (cellphoneNumber === "") return false;
    else if (companyName === "") return false;
    else if (businessName === "") return false;
    else if (companyNumber === "") return false;
    return true;
  }
  
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
                  <Box>
                    <img src='./Image/ID.png' alt='' style={{width: 35, height: 35, marginTop: 10, marginRight: 13, marginLeft: 2}}/>
                    <TextField value={userID} placeholder='아이디' onChange={e => {setUserID(e.target.value); UserIdCodition(e); setUserIDCheck(false);}}/>
                    <img src={userID === "" ? "./Image/InputImageDefault.png" : userIDCheck ? "./Image/check-icon.png" : "./Image/censle_icon.png"} alt=''
                      style={{width: 20, height: 20, marginLeft: 5}}/>
                    <Button onClick={()=> UserIdConfirm()} style={{marginLeft: 10}}> 중복확인 </Button>
                  </Box>
                  <br/>
                  <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginLeft: -110}}/>
                  <TextField value={userPassword} placeholder='패스워드' style={{marginTop: 10, marginLeft: 13}} onChange={e => OnChangeUserPassword(e.target.value)}/>
                  <br/>
                  <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginLeft: -110}}/>
                  <TextField value={userPasswordConfirm} placeholder='패스워드확인' style={{marginTop: 10, marginLeft: 13}} onChange={(e) => PasswordConfirm(e.target.value, userPassword)}/>
                  <br/>
                  { isUserPasswordSame ? <text style={{marginLeft: -50}}>비밀번호가 일치합니다.</text> : <text style={{marginLeft: -50}}>비밀번호가 일치하지 않습니다 . </text> }
                  <br/>
                  <TextField placeholder='이메일' style={{marginTop: 10, marginLeft: 55}} onChange={e => setUserEmail(e.target.value)}/>
                  <Button type="submit" variant="contained" style={{ marginTop: 25, marginLeft: 30 }} onClick={() => onClickSendMail()}>이메일 인증</Button>
                  <br/>
                  <div ref={checkNumberBox} style={{display: "none"}}>
                    <TextField placeholder='인증번호를 입력하세요' style={{marginTop: 10, marginLeft: 70}} onChange={e => setCheckNumber(e.target.value)}/>
                    <Button type="submit" variant="contained" style={{ marginTop: 25, marginLeft: 30, width: "100px", height: "25px" }} onClick={() => onClickCheckNumber()}>인증번호 확인</Button>
                  </div>
                  <div ref={checkEmailText} style={{ marginLeft: "-160px", display: "none"}}>
                    인증되었습니다.
                  </div>
                  <TextField placeholder='이름' style={{marginTop: 10, marginLeft: -60}} onChange={e => setName(e.target.value)}/>
                  <br/>
                  <TextField placeholder='전화번호' style={{marginTop: 10, marginLeft: -60}} onChange={e => setCellphoneNumber(e.target.value)}/>
                  <br/>
                  <Button type = "submit" onClick={() => OnClickSignUp()} style={{marginTop: 5, marginLeft: -50}}
                  disabled={!UserCheckSignUpData()}> 회원가입 </Button>
                  <text> {msg} </text>
              </TabPanel>
              <TabPanel value="2">
              <Box>
                    <img src='./Image/ID.png' alt='' style={{width: 35, height: 35, marginTop: 10, marginRight: 13, marginLeft: 2}}/>
                    <TextField value={userID} placeholder='아이디' onChange={e => {setUserID(e.target.value); UserIdCodition(e); setUserIDCheck(false);}}/>
                    <img src={userID === "" ? "./Image/InputImageDefault.png" : userIDCheck ? "./Image/check-icon.png" : "./Image/censle_icon.png"} alt=''
                      style={{width: 20, height: 20, marginLeft: 5}}/>
                    <Button onClick={()=> UserIdConfirm()} style={{ marginLeft: 10}}> 중복확인 </Button>
                  </Box>
                  <br/>
                  <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginLeft: -110}}/>
                  <TextField value={userPassword} placeholder='패스워드' style={{marginTop: 10, marginLeft: 13}} onChange={e => OnChangeUserPassword(e.target.value)}/>
                  <br/>
                  <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginLeft: -110}}/>
                  <TextField value={userPasswordConfirm} placeholder='패스워드확인' style={{marginTop: 10, marginLeft: 13}} onChange={(e) => PasswordConfirm(e.target.value, userPassword)}/>
                  <br/>
                  { isUserPasswordSame ? <text style={{marginLeft: -50}}>비밀번호가 일치합니다.</text> : <text style={{marginLeft: -50}}>비밀번호가 일치하지 않습니다 . </text>}
                  <br/>
                  <br/>
                  <TextField placeholder='이메일' style={{marginTop: 10, marginLeft: 55}} onChange={e => setUserEmail(e.target.value)}/>
                  <Button type="submit" variant="contained" style={{ marginTop: 25, marginLeft: 30 }} onClick={() => onClickSendMail()}>이메일 인증</Button>
                  <br/>
                  <div ref={checkNumberBox} style={{display: "none"}}>
                    <TextField placeholder='인증번호를 입력하세요' style={{marginTop: 10, marginLeft: 70}} onChange={e => setCheckNumber(e.target.value)}/>
                    <Button type="submit" variant="contained" style={{ marginTop: 25, marginLeft: 30, width: "100px", height: "25px" }} onClick={() => onClickCheckNumber()}>인증번호 확인</Button>
                  </div>
                  <div ref={checkEmailText} style={{ marginLeft: "-160px", display: "none"}}>
                    인증되었습니다.
                  </div>
                  <TextField placeholder='전화번호' style={{marginTop: 10, marginLeft: -60}} onChange={e => setCellphoneNumber(e.target.value)}/>
                  <br/>
                  <TextField placeholder='사업장명' style={{marginTop: 10, marginLeft: -60}} onChange={e => setCompanyName(e.target.value)}/>
                  <br/>
                  <TextField placeholder='대표자명' style={{marginTop: 10, marginLeft: -60}} onChange={e => setBusinessName(e.target.value)}/>
                  <br/>
                  <TextField placeholder='사업자번호' style={{marginTop: 10, marginLeft: -60}} onChange={e => setCompanyNumber(e.target.value)}/>
                  <br/>
                  <Button onClick={() => OnClickSignUp()} style={{marginTop: 5, marginLeft: -50}}
                  disabled={!SellerCheckSignUpData()}> 회원가입 </Button>
                  <text> {msg} </text> 
              </TabPanel>
          </TabContext>
        </Box>
      </div>   
    </div>
  );
}