import React, { Component } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

export default function SignUpPage(props) {
    const [name, setName] = React.useState("");
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

    React.useEffect(() => {
        // init
    }, []);
    
    const navigate = useNavigate();

    const OnClickSignUp = async () => {
        const response = await axios.post("/api/createUser", {
            userID: userID,
            userPassword: userPassword,
            name: name,
            contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
        });
        const body = response.data;
        
        setMSG(body.result);
       
        if(body.result === "OK") {
            navigate("/");
        }
    }
    
    class SignUpPage extends Component {
        
    }
    
    return (
        <div style={styles.dimmed_layer_wrapper}>
             <img src='./Image/ID.png' alt='' style={{width: 35, height: 35, marginTop: 200, marginRight: 13, marginLeft: 2}}/>
            <TextField placeholder='아이디' style={{marginTop: 200}} onChange={e => setUserID(e.target.value)}/>
            <br/>
            <img src='./Image/Password.png' alt='' style={{width: 40, height: 40, marginTop: 18, marginRight: 10}}/>
            <TextField placeholder='패스워드' style={{marginTop: 10}} onChange={e => setUserPassword(e.target.value)}/>
            <br/>
            <TextField placeholder='이름' style={{marginTop: 10, marginRight: -50}} onChange={e => setName(e.target.value)}/>
            <br/>
            <Button onClick={() => OnClickSignUp()} style={{marginTop: 5}}> 회원가입 </Button>
            <text> {msg} </text>
        </div>
    );
}