import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

import Anonymous from "./Menu/Anonymous";

const AppToolBar = () => {
    return (
        <>
            <AppBar sx={{padding: '10px 15px'}}>
                <ToastContainer/>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography
                            component={Link}
                            to='/'
                            sx={{textDecoration: 'none', color: '#fff'}}
                            variant='h4'
                        >
                            Market
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Anonymous/>
                    </Grid>
                </Grid>
            </AppBar>
            <Toolbar sx={{marginBottom: '20px'}}/>
        </>
    );
};

export default AppToolBar;