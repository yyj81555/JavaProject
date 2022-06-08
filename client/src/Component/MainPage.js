import React from 'react';
import { Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    }

    const imageArray = ['./Image/EventBarImage/FirstEventBar.png', './Image/EventBarImage/SecondEventBar.png',];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      };

    return(
        <div style={styles.dimmed_layer_wrapper}>
            <div style={styles.event_bar_area}>
                <Slider {...settings} style={{width: "95%", height:"500px",margin: "auto"}}>
                    <div>
                        <img src={imageArray[0]} style={{objectFit: "cover", width:"100%", height: "500px"}}></img>
                    </div>
                    <div>
                        <img src={imageArray[1]} style={{ objectFit :"cover", width:"100%", height: "500px"}}></img>
                    </div>
                </Slider>
            </div>
        </div>
    );
}