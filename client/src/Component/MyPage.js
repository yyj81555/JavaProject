import React from 'react';
import axios from "axios";

export default function Mypage(props) {
    const [name, setName] = React.useState("");
    const [userID, setUserID] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    
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

    

    React.useEffect(() => {
        // init
    }, []);

    


    return (
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.user_data}>
            </div>
        </div>
    )
}