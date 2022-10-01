import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

const ProductItem = ({title, image, price, id}) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    <Typography gutterBottom variant="h5">
                        <strong>{title}</strong>
                    </Typography>
                    <Typography
                        variant="body"
                        sx={{
                            display: 'flex',
                            flexGrow: '1',
                            alignItems: 'flex-end',
                            fontSize: '20px',
                            fontWeight: 700,
                            borderBottom: '1px solid blue'
                        }}
                        color='primary'
                    >
                        {price} KGS
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        variant='outlined'
                        component={Link}
                        to={`/products/${id}`}
                        size='small'
                    >
                        More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;