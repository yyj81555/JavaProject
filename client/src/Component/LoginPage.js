import React from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

export default function LoginPage(props) {
    const [userID, setUserID] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [msg, setMSG] = React.useState("");

    const styles = {
        dimmed_layer_wrapper : {
            position: "fixed",
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
            navigate("/");
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