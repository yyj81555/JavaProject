import React from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

export default function LoginPage(props) {
    const [userID, setUserID] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [msg, setMSG] = React.useState("");
    const [userInfo,setUserInfo] = React.useState("");
    
    const styles = {
        dimmed_layer_wrapper : {
            
            top:80,
            right:0,
            bottom:0,
            left:0,
        },
    };

    const navigate = useNavigate();

    React.useEffect(() => {
        // init
    }, []);

    

    const OnClickLogin = async () => {
        const response = await axios.post("/api/Login", {
            userID: userID,
            userPassword: userPassword,
            contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
        });
        const body = response.data;
        
        setMSG(body.result);

        if(body.result === "OK") {   
            axios.post("/api/GetUserInfo", {userID: userID})
            .then(res => {
                const body = res.data;
        
                setUserInfo(body);
            
                window.sessionStorage.setItem("level", body.level);
                window.sessionStorage.setItem("userPassword", body.userPassword);
                window.sessionStorage.setItem("name", body.name);
                window.sessionStorage.setItem("userEmail", body.userEmail);
                window.sessionStorage.setItem("cellphoneNumber", body.cellphoneNumber);
                window.sessionStorage.setItem("companyName", body.companyName);
                window.sessionStorage.setItem("businessName", body.businessName);
                window.sessionStorage.setItem("companyNumber", body.companyNumber);
                window.sessionStorage.setItem("petType", body.petType);
                window.sessionStorage.setItem("petKind", body.petKind);

                console.log(body.name);
                console.log(body.companyName);
                console.log(body.cellphoneNumber);

            }).catch( res => console.log(res))

            //navigate("/");
            window.sessionStorage.setItem("ID", userID);
            //window.location.reload();
              
        }

        
        
    }

    

    const OnClickSignUp = async () => {
       
    }
     
    return (
        <div style={styles.dimmed_layer_wrapper}>
            <img src='./Image/Logo.png' alt='' style={{width: 120, height: 85, marginTop: 220, marginBottom: 10}}/>
            <br/>
            <img src='./Image/ID.png' alt='' style={{width: 35, height: 35, marginTop: 8, marginRight: 13, marginLeft: 2}}/>
            <TextField placeholder='아이디' onChange={e => setUserID(e.target.value)}/>
            <br/>
            <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginRight: 10}}/>
            <TextField placeholder='패스워드' style={{marginTop: 10}} onChange={e => setUserPassword(e.target.value)}/>
            <br/>
            <Button onClick={() => OnClickLogin()} style={{marginTop: 10}}> 로그인 </Button>
            <br/>
            <Link to={"/SignUp"}>
            <Button onClick={() => OnClickSignUp()} style={{marginTop: 5}}> 회원가입 </Button>
            </Link>
            <br/>
            <text> {msg} </text>
        </div>
    );
}