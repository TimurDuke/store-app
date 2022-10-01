import React, {useEffect, useState} from 'react';
import {CssBaseline, Drawer, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DrawerContent from "./DrawerContent";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../store/actions/categoriesActions";

const drawerWith = 240;

const AppDrawer = () => {
    const dispatch = useDispatch();

    const [mobileOpen, setMobileOpen] = useState(false);

    const categories = useSelector(state => state.categories.categories);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <>
            <CssBaseline/>
            <IconButton
                aria-label='open drawer'
                onClick={handleDrawerToggle}
                edge='start'
                sx={{mr: 2, display: {sm: 'none'}}}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                variant='temporary'
                anchor='left'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWith},
                }}
            >
                <DrawerContent
                    categories={categories}
                    drawerToggle={handleDrawerToggle}
                />
            </Drawer>
            <Drawer
                variant='permanent'
                sx={{
                    display: {xs: 'none', sm: 'block', zIndex: 0, position: 'relative'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWith},
                }}
                open
            >
                <DrawerContent categories={categories}/>
            </Drawer>
        </>
    );
};

export default AppDrawer;