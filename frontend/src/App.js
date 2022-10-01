import React from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Products from "./containers/Products/Products";
import Register from "./containers/Register/Register";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Products}/>
                <Route path='/register' component={Register}/>
                <Route render={() => <h1>Not found!</h1>}/>
            </Switch>
        </Layout>
    );
};

export default App;