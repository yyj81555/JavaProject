import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate  } from 'react-router-dom';

export default function Kakao(props) {

    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    console.log(code);

    const navigate = useNavigate();

    useEffect( () => {
        kakaoToken();
    },[])

    const kakaoToken = () => {
        axios.post("/api/KakaoLogin", { code: code} )
        .then( res => {
            const body = res.data;
            
            getKakaoUserInfo(body.access_token);
        })
        .catch ( err => console.log(err))
    }

    const getKakaoUserInfo = (token) => {
        axios.post("/api/GetKakaoUserInfo", {token: token})
        .then( res => {
            const body = res.data;
            
            console.log(body);
            console.log(body.id);
            console.log(body.properties.nickname);

            checkUserinfo(body.id);

            window.sessionStorage.setItem("ID", body.id);
            window.sessionStorage.setItem("nickName", body.properties.nickname);
        })
        .catch ( err => console.log(err))
    }

    const checkUserinfo = (id) => {
        axios.post("/api/CheckUserInfo", {id: id})
        .then( res => {
            const body = res.data;
            
            if( body == 0 ){  //존재 하지 않는다.
                navigate("/kakaoSignUp");
            } else {  //존재 한다
                navigate("/MainPage");
            }
        })
        .catch ( err => console.log(err))
    }

    return (
    
        <div>잠시만 기다려주세요.</div>
    )

}