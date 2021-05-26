import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read, listRelatedProduct} from "./apiCore";
import Cart from "./Cart";


const Product = props => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        //
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else {
                setProduct(data)
                //now fetch the related product based on product id with category
                listRelatedProduct(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else {
                        setRelatedProducts(data)
                    }
                })

            }
        })
    }

    useEffect(()=> {
        const productId = props.match.params.productId;
        loadSingleProduct(productId)
    }, [props])

    return(
        <Layout title= {product && product.name} classname="container-fluid"
                description={product &&
                            product.description &&
                            product.description.substring(0,50)}
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description &&
                        <Cart product={product} showViewButton={false}/>
                    }
                </div>

                <div className="col-4">
                    <h2>Related Products</h2>
                    {relatedProducts.map((p, i)=> (
                        <div key={i} className="mb-3">
                            <Cart product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>

    )
};

export default Product;
