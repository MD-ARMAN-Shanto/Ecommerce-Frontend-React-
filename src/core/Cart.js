import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from 'moment';
import {addItemToCart, updateItem, removeItem} from "./cartHelpers";

const Cart = ({
                  product,
                  showViewButton=true,
                  showAddToCartButton=true,
                  cartUpdate=false,
                  showRemoveItemButton=false
}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const addToCart = () =>{
        addItemToCart(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    }

    const viewButton=(showViewButton)=>{
        return (
            showViewButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link>
            )
        )
    }

    const viewAddToCartButton=(showAddToCartButton)=>{
        return(
            showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to cart
            </button>
            )
        )
    }

    const showRemoveButton=(showRemoveItemButton)=>{
        return(
            showRemoveItemButton && (
                <button onClick={()=>removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
                    Remove Product
                </button>
            )
        )
    }

    const showStock = quantity => {
        return quantity > 0 ?
            <span className="badge badge-primary badge-pill"> In stock</span>
            :
            <span className="badge badge-danger badge-pill">Out of stock</span>
    }

    const handleChange = productId => event => {
        console.log('no of product', event.target.value)
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"> Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count}
                    onChange={handleChange(product._id)}
                />
            </div>
        </div>
    }

    return(
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <div className="card">
                        <ShowImage item={product} url="product"/>
                    </div>
                    <p className="lead mt-2">{product.description.substring(0,30)}
                        <span title="click to see more" style={{cursor: 'pointer', border:'1px solid #dae0e5', marginLeft:'5px'}}>...</span></p>
                    <p className="black-9">${product.price}</p>
                    <p className="black-8">Category: {product.category && product.category.name}</p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>

                    {showStock(product.quantity)}
                    <br/>

                    {viewButton(showViewButton)}

                    {viewAddToCartButton(showAddToCartButton)}

                    {showRemoveButton(showRemoveItemButton)}

                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
    )
};

export default Cart;
