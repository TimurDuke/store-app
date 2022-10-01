import React from 'react';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    styled,
    Typography
} from "@mui/material";

import {makeStyles} from "tss-react/mui";
import {useDispatch} from "react-redux";
import {fetchCategoryProducts, fetchProducts} from "../../../store/actions/productsActions";

const useStyles = makeStyles()(theme => ({
    title: {
        margin: '80px 0 16px 0',
    },
    item: {
        borderBottom: '1px solid #ccc'
    },
    itemText: {
        fontSize: '20px',
        letterSpacing: '2px'
    }
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const DrawerContent = ({categories}) => {
    const {classes} = useStyles();

    const dispatch = useDispatch();

    const findByCategoryHandler = id => {
        dispatch(fetchCategoryProducts(id));
    };

    return (
        <>
            <DrawerHeader>
                <Typography variant='h5' className={classes.title}>
                    Categories
                </Typography>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItem className={classes.item} disablePadding>
                    <ListItemButton>
                        <Typography
                            className={classes.itemText}
                            onClick={() => dispatch(fetchProducts())}
                        >
                            All products
                        </Typography>
                    </ListItemButton>
                </ListItem>
                {categories.map(category => (
                    <ListItem key={category['_id']} className={classes.item} disablePadding>
                        <ListItemButton
                            onClick={() => findByCategoryHandler(category['_id'])}
                        >
                            <Typography className={classes.itemText}>
                                {category.title}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default DrawerContent;