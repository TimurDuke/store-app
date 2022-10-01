import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deactivateProduct, fetchProduct} from "../../store/actions/productsActions";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import {Grid} from "@mui/material";

const Product = ({match}) => {
    const dispatch = useDispatch();

    const product = useSelector(state => state.products.product);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const deactivateHandler = id => {
        dispatch(deactivateProduct(id));
    };

    return product && (
        <Grid container justifyContent='center'>
            <SingleProduct
                title={product.title}
                image={product.image}
                price={product.price}
                description={product.description}
                deactivateHandler={() => deactivateHandler(product['_id'])}
                user={user ? user : null}
                productUser={product.user}
            />
        </Grid>
    );
};

export default Product;