import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';

export default function SignUpPage(props) {
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
            </Box>
        </div>
    );
}