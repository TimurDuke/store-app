import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Grid} from "@mui/material";

import {deactivateProduct, fetchPersonalProducts} from "../../store/actions/productsActions";
import PersProductItem from "../../components/PersProductItem/PersProductItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const PersonalProducts = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);

    const products = useSelector(state => state.products.personalProducts);
    const loading = useSelector(state => state.products.loading);

    useEffect(() => {
        dispatch(fetchPersonalProducts());
    }, [dispatch]);

    if (!user) {
        return <Redirect to='/login'/>;
    }

    const deactivateHandler = id => {
        dispatch(deactivateProduct(id));
    };

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            {!!products.length ?
                <Grid
                    container
                    spacing={2}
                    justifyContent='center'
                >
                    {products.map(product => (
                        <PersProductItem
                            key={product['_id']}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            deactivateHandler={() => deactivateHandler(product['_id'])}
                            category={product.category}
                        />
                    ))}
                </Grid> :
                <h2 style={{textAlign: 'center'}}>You don't have any products yet.</h2>}
        </>
    );
};

export default PersonalProducts;