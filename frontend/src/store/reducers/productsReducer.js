import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/productsActions";

const initialState = {
    products: [],
    loading: false,
    fetchError: null,
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case FETCH_PRODUCTS_REQUEST:
            return {...state, loading: true, fetchError: null};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, loading: false, fetchError: null, products: actions.products};
        case FETCH_PRODUCTS_FAILURE:
            return {...state, loading: false, fetchError: actions.error};

        default:
            return state;
    }
};

export default reducer;