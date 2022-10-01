import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductsLayout from "../../components/UI/Layout/ProductsLayout";

const Products = () => {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return products && (
        <ProductsLayout>
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
        </ProductsLayout>
    );
};

export default Products;