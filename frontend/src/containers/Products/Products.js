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
    const productsLoading = useSelector(state => state.products.loading);
    const categoriesLoading = useSelector(state => state.categories.loading);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <Preloader
                showPreloader={productsLoading || categoriesLoading}
            />
            <ProductsLayout>
                {!!products.length ?
                    <Grid container spacing={2}>
                        {products.map(product => (
                            <ProductItem
                                key={product['_id']}
                                title={product.title}
                                image={product.image}
                                price={product.price}
                                id={product['_id']}
                            />
                        ))}
                    </Grid>
                    : <h2 style={{textAlign: 'center'}}>There are no products in this category.</h2>}
            </ProductsLayout>
        </>
    );
};

export default Products;