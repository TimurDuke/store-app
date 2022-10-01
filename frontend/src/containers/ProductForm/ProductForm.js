import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FileInput from "../../components/UI/FileInput/FileInput";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import MenuItem from "@mui/material/MenuItem";
import {clearProductFormErrors, createProduct} from "../../store/actions/productsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import Preloader from "../../components/UI/Preloader/Preloader";
import {Redirect} from "react-router-dom";

const ProductForm = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);

    const categories = useSelector(state => state.categories.categories);
    const error = useSelector(state => state.products.createError);
    const loading = useSelector(state => state.products.loading);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(clearProductFormErrors());

        return () => {
            dispatch(clearProductFormErrors());
        };
    }, [dispatch]);

    const [stateCategory, setStateCategory] = useState({
        category: ""
    });

    const [state, setState] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
    });

    const submitFormHandler = async e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        await dispatch(createProduct(formData));
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const categoryChangeHandler = e => {
        const {name, value} = e.target;

        setStateCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    if (!user) {
        return <Redirect to='/login'/>;
    }

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid
                    container
                    maxWidth="md"
                    textAlign="center"
                    marginX="auto"
                    direction="column"
                    rowSpacing={2}
                >
                    <Typography
                        sx={{fontSize: '28px', margin: '10px 0'}}
                    >
                        Create your new product
                    </Typography>
                    <FormElement
                        required={true}
                        label='Title'
                        name='title'
                        value={state.title}
                        onChange={inputChangeHandler}
                        error={getFieldError('title')}
                    />

                    <FormElement
                        required={true}
                        label='Description'
                        name='description'
                        value={state.description}
                        onChange={inputChangeHandler}
                        error={getFieldError('description')}
                    />
                    <FormElement
                        required={true}
                        type='number'
                        label='Price'
                        name='price'
                        value={state.price}
                        onChange={inputChangeHandler}
                        error={getFieldError('price')}
                    />

                    <Grid item xs={12}>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={fileChangeHandler}
                            error={getFieldError('image')}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{marginTop: '10px'}}>
                        {!!categories.length ?
                            <FormControl
                                sx={{width: '50%'}}
                                error={Boolean(getFieldError('category'))}
                                required={true}
                            >
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='category'
                                    value={stateCategory.category}
                                    label="Category"
                                    onChange={categoryChangeHandler}
                                >
                                    {categories.map(category => (
                                        <MenuItem
                                            key={category['_id']}
                                            value={category.title}
                                            onClick={() => setState(
                                                prev => ({
                                                        ...prev,
                                                        category: category['_id']
                                                    }
                                                ))}
                                        >
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            : null}
                    </Grid>

                    <Grid item>
                        <Button type="submit" color="primary" variant="contained">Create</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ProductForm;