import {
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, loading: false, error: null, categories: actions.categories};
        case FETCH_CATEGORIES_FAILURE:
            return {...state, loading: false, error: actions.error};

        default:
            return state;
    }
};

export default reducer;