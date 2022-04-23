import React from 'react';
import axios from "axios";

export default function Mypage(props) {
    const [name, setName] = React.useState("");
    const [userID, setUserID] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    
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

    return (
        <div style={styles.dimmed_layer_wrapper}>
        </div>
    )
}