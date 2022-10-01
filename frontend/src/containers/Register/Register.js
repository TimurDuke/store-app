import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography, Link, TextField} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff',
        padding: '0 15px',
        borderRadius: '10px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    }
}));

const Register = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();

    const error = useSelector(state => state.users.registerError);
    const registerLoading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        username: '',
        password: '',
        displayName: '',
        phone: '',
    });

    useEffect(() => {
        dispatch(clearRegisterErrors());
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign up
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        name='username'
                        label='Username'
                        required={true}
                        onChange={inputChangeHandler}
                        value={user.username}
                        error={getFieldError('username')}
                    />
                    <FormElement
                        name='password'
                        label='Password'
                        type='password'
                        required={true}
                        onChange={inputChangeHandler}
                        value={user.password}
                        error={getFieldError('password')}
                    />
                    <FormElement
                        name='displayName'
                        label='Display name'
                        required={true}
                        onChange={inputChangeHandler}
                        value={user.displayName}
                        error={getFieldError('displayName')}
                    />
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            autoComplete={'phone'}
                            label={'Phone (996555555555)'}
                            name={'phone'}
                            required
                            value={user.phone}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('phone'))}
                            helperText={getFieldError('phone')}
                            inputProps={{inputMode: 'tel', pattern: "[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}"}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={registerLoading}
                            disabled={registerLoading}
                        >
                            Sign Up
                        </ButtonWithProgress>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;