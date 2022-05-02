import React from 'react';
import { Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

export default function MainPage(props) {
    

    const styles = {
        dimmed_layer_wrapper : {
            position: "relative",
            top:80,
            right:0,
            bottom:0,
            left:0,
        },
        event_bar_area : {
            marginTop: "100px",
            width: "100%",
            height: "500px"
        },
        event_bar_image_area : {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        right_button : {
            margin: "auto",
            border: "1px solid black",
            top: "-300px",
            left: "-500px"
        },
        left_button : {
            margin: "auto",
            border: "1px solid black",
            top: "-300px",
            left: "500px"
        }
    }

    const [referenceNumber, chechkNumber] = useState(0);

    const eventBarImage = useRef(null);

    const imageArray = ['./Image/EventBarImage/dada1.jpg', './Image/EventBarImage/dada2.jpg',];

  
    const rightEventBar = () => {
    
        chechkNumber(referenceNumber + 1);

        if(referenceNumber >= 1){
            chechkNumber(0);
            eventBarImage.current.src= imageArray[referenceNumber];
        }
    }

    const leftEventBar = () => {
        chechkNumber(referenceNumber - 1);

        if (referenceNumber <= 0  ){
            chechkNumber(1);
            eventBarImage.current.src= imageArray[referenceNumber];
        }
    }
  
     useEffect(() => {
        const loop = setInterval( () => {
            chechkNumber(referenceNumber + 1);
        }, 2000);

        return () => clearInterval(loop);
    }, []);


    return(
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.event_bar_area}>
            <img
                ref = {eventBarImage}
                style={styles.event_bar_image_area}
                src={imageArray[referenceNumber]}>
                </img>
                <Button variant="text"
                style={styles.right_button}
                onClick = {() => rightEventBar()}
                >Text</Button>
                <Button variant="text"
                style={styles.left_button}
                onClick = {() => leftEventBar()}
                >Text</Button>
            </div>
        </div>
    );
}