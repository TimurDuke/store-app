import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deactivateProduct, fetchProduct} from "../../store/actions/productsActions";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import {Grid} from "@mui/material";
import Preloader from "../../components/UI/Preloader/Preloader";

const Product = ({match}) => {
    const dispatch = useDispatch();

    const product = useSelector(state => state.products.product);
    const loading = useSelector(state => state.products.loading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const deactivateHandler = id => {
        dispatch(deactivateProduct(id));
    };

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            {product ? <Grid container justifyContent='center'>
                <SingleProduct
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    deactivateHandler={() => deactivateHandler(product['_id'])}
                    user={user ? user : null}
                    productUser={product.user}
                />
            </Grid> : null}
        </>
    );
};

export default Product;