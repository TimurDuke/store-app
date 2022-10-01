import React from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Products from "./containers/Products/Products";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import PersonalProducts from "./containers/PersonalProducts/PersonalProducts";
import ProductForm from "./containers/ProductForm/ProductForm";
import Product from "./containers/Product/Product";

const App = () => (
    <Layout>
        <Switch>
            <Route path='/' exact component={Products}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/personal/products' component={PersonalProducts}/>
            <Route path='/products/add' component={ProductForm}/>
            <Route path='/products/:id' component={Product}/>
            <Route render={() => <h1>Not found!</h1>}/>
        </Switch>
    </Layout>
);

export default App;