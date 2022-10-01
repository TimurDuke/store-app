import axiosApi from "../../axiosApi";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, error});

export const fetchProducts = () => {
    return async dispatch => {
        try {
            dispatch(fetchProductsRequest());

            const {data} = await axiosApi.get('/products');

            if (data) {
                dispatch(fetchProductsSuccess(data));
            }
        } catch (e) {
            dispatch(fetchProductsFailure(e));
        }
    };
};