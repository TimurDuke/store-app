import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {apiUrl} from "../../config";

const SingleProduct = ({title, image, price, user, productUser, description, deactivateHandler}) => {
    return (
        <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1'
                }}
            >
                {image ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CardMedia
                            title={title}
                            image={apiUrl + '/' + image}
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '10px',
                                marginTop: '10px'
                            }}
                        />
                    </Box>
                    : null}
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                    }}
                >
                    <Box
                        sx={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <AccountCircleIcon sx={{marginRight: '5px'}}/>
                            <span style={{color: "gray"}}>{productUser.displayName}</span>
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <LocalPhoneIcon sx={{marginRight: '5px'}}/>
                            <span style={{color: "gray"}}>{productUser.phone}</span>
                        </Typography>
                    </Box>
                    <Typography gutterBottom variant="h4">
                        <strong>{title}</strong>
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        {description}
                    </Typography>
                    <Typography
                        variant="body"
                        sx={{
                            display: 'flex',
                            flexGrow: '1',
                            alignItems: 'flex-end',
                            fontSize: '20px',
                            fontWeight: 700,
                            borderTop: '1px solid blue',
                            paddingTop: "20px",
                        }}
                        color='primary'
                    >
                        {price} KGS
                    </Typography>
                </CardContent>
                {user ?
                    user['_id'] === productUser['_id'] ?
                        <CardActions
                            sx={{
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Button
                                variant='outlined'
                                color='error'
                                onClick={deactivateHandler}
                            >
                                Deactivate
                            </Button>
                        </CardActions>
                        : null
                    : null}
            </Card>
        </Grid>
    );
};

export default SingleProduct;