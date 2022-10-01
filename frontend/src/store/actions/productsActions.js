import axiosApi from "../../axiosApi";
import {useToastInfo} from "../../hooks";
import {historyPush} from "./historyActions";

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

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST});
const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, product});
const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, error});

export const fetchProduct = productId => {
    return async dispatch => {
        try {
            dispatch(fetchProductRequest());

            const {data} = await axiosApi.get('/products/' + productId);

            if (data) {
                dispatch(fetchProductSuccess(data));
            }
        } catch (e) {
            dispatch(fetchProductFailure(e));
        }
    };
};

export const DEACTIVATE_PRODUCT_REQUEST = 'DEACTIVATE_PRODUCT_REQUEST';
export const DEACTIVATE_PRODUCT_SUCCESS = 'DEACTIVATE_PRODUCT_SUCCESS';
export const DEACTIVATE_PRODUCT_FAILURE = 'DEACTIVATE_PRODUCT_FAILURE';

const deactivateProductRequest = () => ({type: DEACTIVATE_PRODUCT_REQUEST});
const deactivateProductSuccess = () => ({type: DEACTIVATE_PRODUCT_SUCCESS});
const deactivateProductFailure = error => ({type: DEACTIVATE_PRODUCT_FAILURE, error});

export const deactivateProduct = productId => {
    return async dispatch => {
        try {
            dispatch(deactivateProductRequest());

            await axiosApi.delete('/products/' + productId);
            await dispatch(deactivateProductSuccess());
            useToastInfo('The product has been successfully deactivated.');

            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(deactivateProductFailure(e));
        }
    };
};

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
const createProductFailure = error => ({type: CREATE_PRODUCT_FAILURE, error});

export const createProduct = productData => {
    return async dispatch => {
        try {
            dispatch(createProductRequest());

            await axiosApi.post('/products', productData);

            dispatch(createProductSuccess());
            useToastInfo('The product has been successfully created.');

            dispatch(historyPush('/'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createProductFailure(e.response.data));
            } else {
                dispatch(createProductFailure({global: 'No internet'}));
            }
        }
    };
};

export const CLEAR_PRODUCT_FORM_ERRORS = 'CLEAR_PRODUCT_FORM_ERRORS';
export const clearProductFormErrors = () => ({type: CLEAR_PRODUCT_FORM_ERRORS});

export const FETCH_CATEGORY_PRODUCTS_REQUEST = 'FETCH_CATEGORY_PRODUCTS_REQUEST';
export const FETCH_CATEGORY_PRODUCTS_SUCCESS = 'FETCH_CATEGORY_PRODUCTS_SUCCESS';
export const FETCH_CATEGORY_PRODUCTS_FAILURE = 'FETCH_CATEGORY_PRODUCTS_FAILURE';

const fetchCategoryProductsRequest = () => ({type: FETCH_CATEGORY_PRODUCTS_REQUEST});
const fetchCategoryProductsSuccess = products => ({type: FETCH_CATEGORY_PRODUCTS_SUCCESS, products});
const fetchCategoryProductsFailure = error => ({type: FETCH_CATEGORY_PRODUCTS_FAILURE, error});

export const fetchCategoryProducts = categoryId => {
    return async dispatch => {
        try {
            dispatch(fetchCategoryProductsRequest());

            const {data} = await axiosApi.get('/products?category=' + categoryId);

            if (data) {
                dispatch(fetchCategoryProductsSuccess(data));
            }
        } catch (e) {
            dispatch(fetchCategoryProductsFailure(e));
        }
    };
};