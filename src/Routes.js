import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from '../src/admin/AddCategory';
import AddProduct from '../src/admin/AddProduct';
import Shop from "./core/Shop";
import Product from "./core/Product";
import UserCardList from "./core/UserCardList";

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute
                    path="/user/dashboard"
                    exact component={Dashboard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact component={AdminDashboard}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={UserCardList} />
            </Switch>
        </BrowserRouter>
    )
    
}

export default Routes;