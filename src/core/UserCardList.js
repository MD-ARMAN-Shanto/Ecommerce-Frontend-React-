import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {getCartItem} from "./cartHelpers";
import Cart from "./Cart";
import {Link} from "react-router-dom";
import Checkout from "./Checkout";

const UserCardList = () => {
    const [items, setItems] = useState([])

    useEffect(()=>{
        setItems(getCartItem())
    }, []);

    const showCartItems = items => {
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((p, i)=> (
                    <Cart
                        key={i}
                        product={p}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveItemButton={true}
                    />
                    ))}
            </div>
        )
    }

    const noItemMessage = () => (
        <h2>Your cart is empty. <br/>
        <Link to="/shop">
            Continue Shopping
        </Link></h2>
    )


    return (
        <Layout
            title="Shopping Cart"
            classname="container-fluid"
            description="Manage your cart Items. Add remove or continue shopping"
        >

            <div className="row">
                <div className="col-6">
                    {items.length > 0 ?
                        showCartItems(items) : noItemMessage()
                    }
                </div>

                <div className="col-6">
                   <h2 className="mb-4">Your cart Summary </h2>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
        </Layout>
    )
};
export default UserCardList;