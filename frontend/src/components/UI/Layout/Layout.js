import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolBar from "../AppToolBar/AppToolBar";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolBar/>
            <main>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;