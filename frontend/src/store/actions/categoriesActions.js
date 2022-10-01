import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
const fetchCategoriesFailure = error => ({type: FETCH_CATEGORIES_FAILURE, error});

export const fetchCategories = () => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());

            const {data} = await axiosApi.get('/categories');

            if (data) {
                dispatch(fetchCategoriesSuccess(data));
            }
        } catch (e) {
            dispatch(fetchCategoriesFailure(e));
        }
    };
};
