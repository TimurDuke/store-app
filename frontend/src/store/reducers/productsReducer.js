import {
    CLEAR_PRODUCT_FORM_ERRORS, CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
    DEACTIVATE_PRODUCT_FAILURE,
    DEACTIVATE_PRODUCT_REQUEST,
    DEACTIVATE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/productsActions";

const initialState = {
    products: [],
    product: null,
    loading: false,
    fetchError: null,
    deactivateError: null,
    createError: null,
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CLEAR_PRODUCT_FORM_ERRORS:
            return {...state, createError: null};

        case FETCH_PRODUCTS_REQUEST:
            return {...state, loading: true, fetchError: null};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, loading: false, fetchError: null, products: actions.products};
        case FETCH_PRODUCTS_FAILURE:
            return {...state, loading: false, fetchError: actions.error};

        case FETCH_PRODUCT_REQUEST:
            return {...state, loading: true, fetchError: null};
        case FETCH_PRODUCT_SUCCESS:
            return {...state, loading: false, fetchError: null, product: actions.product};
        case FETCH_PRODUCT_FAILURE:
            return {...state, loading: false, fetchError: actions.error};

        case DEACTIVATE_PRODUCT_REQUEST:
            return {...state, loading: true, deactivateError: null};
        case DEACTIVATE_PRODUCT_SUCCESS:
            return {...state, loading: false, deactivateError: null};
        case DEACTIVATE_PRODUCT_FAILURE:
            return {...state, loading: false, deactivateError: actions.error};

        case CREATE_PRODUCT_REQUEST:
            return {...state, loading: true, createError: null};
        case CREATE_PRODUCT_SUCCESS:
            return {...state, loading: false, createError: null};
        case CREATE_PRODUCT_FAILURE:
            return {...state, loading: false, createError: actions.error};

        default:
            return state;
    }
};

export default reducer;