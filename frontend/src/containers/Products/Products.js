import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductsLayout from "../../components/UI/Layout/ProductsLayout";
import Preloader from "../../components/UI/Preloader/Preloader";

const Products = () => {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            {!!products.length ? <ProductsLayout>
                <Grid container spacing={2}>
                    {!!products.length ? products.map(product => (
                        <ProductItem
                            key={product['_id']}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            id={product['_id']}
                        />
                    )) : null}
                </Grid>
            </ProductsLayout> : null}
        </>
    );
};

export default Products;