import React from 'react';
import axios from "axios";

import { Box } from '@mui/material';
import {List, ListItemButton, Collapse, ListItemText} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export default function ProductFilterPage(props) {
    const [open, setOpen] = React.useState(true);
    // const styles = {};

    // React.useEffect(() => {
    //     // init
    // }, []);

    return (
        <div>
            <Box style={{width:1400, display: "flex", margin: "0 auto", justifyContent:"center"}}>
                <Box style={{width:300, height: 1200, border: "1px solid black", marginRight: 10}}>
                    <List>
                        <ListItemButton onClick={() => setOpen(!open)}>
                            <ListItemText primary="사료" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open}>
                            <ListItemButton>&nbsp;&nbsp;&nbsp;건식 사료</ListItemButton>
                            <ListItemButton>&nbsp;&nbsp;&nbsp;습식 사료</ListItemButton>
                        </Collapse>
                    </List>
                </Box>
                <Box style={{width:1090, height: 1200, border: "1px solid black"}}>

                </Box>
            </Box>
        </div>
    )
}