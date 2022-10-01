import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const PersProductItem = ({title, image, price, description, deactivateHandler, category}) => {
    return (
        <Grid item xs={12} sm={8} md={6} lg={4}>
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
                    <Typography gutterBottom variant="body">
                        Category <strong>{category.title}</strong>
                    </Typography>
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
            </Card>
        </Grid>
    );
};

export default PersProductItem;