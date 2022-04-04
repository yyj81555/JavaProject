import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Box,TextField } from '@mui/material';
import { Button } from '@mui/material';

export default function SignUpPage(props) {
    const [inputName, setInputName] = React.useState("");
    const [InputUserID, setInputUserID] = React.useState("");
    const [InputUserPassword, setInputUserPassword] = React.useState("");
    
    const styles = {
        dimmed_layer_wrapper : {
            position: "fixed",
            top:80,
            right:0,
            bottom:0,
            left:0,
        },
    };

    const OnClickPostSignUp = async () => {
        const response = await axios.post("/api/getPostSignUp", {
          name: inputName,
          userID: InputUserID,
          userPassword: InputUserPassword,
          contentType: "application/json; UTF-8;", // 한국어도 깨짐없이 전송하는 방법.
        });
        const body = response.data;
    
        //setName(body.data);
      }
    const navigate = useNavigate();

    React.useEffect(() => {
        // init
    }, []);
    
    return (
        <div style={styles.dimmed_layer_wrapper}>
            <Box
                style = {{
                    textAlign: "center",
                    marginTop : "210px",
                    border: "1px solid #23ff78",
                    borderRadius: "19px",
                    minWidth: "50%",
                    maxWidth: "50%",
                    minHeight: "50%",
                    maxHeight: "50%",
                }}
            >
            <TextField Labal="이름" onChange={(e) =>  setInputName(e.target.value)} placeholder="이름을 입력하세요"/>
            <br/>
            <TextField Labal="ID" onChange={(e) =>  setInputUserID(e.target.value)} placeholder="아이디를 입력하세요"/>
            <br/>
            <TextField Labal="Password" onChange={(e) =>  setInputUserPassword(e.target.value)} placeholder="패스워드를 입력하세요"/>
            <br/>
            <Button onClick={() => OnClickPostSignUp()}>
            Sign
            </Button>

            </Box>
        </div>
    );
}