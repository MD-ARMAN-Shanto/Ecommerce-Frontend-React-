import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProduct} from "./apiCore";
import Cart from './Cart';
import Search from "./Search";

const Home = () => {
    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductBySell = () => {
        getProduct('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }else {
                setProductBySell(data)
            }
        })
    }

    const loadProductByArrival =()=>{
        getProduct('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else {
                setProductByArrival(data)
            }
        })
    }

    useEffect(()=>{
        loadProductByArrival();
        loadProductBySell();
    }, [])

    return(
        <Layout title="Homepage" classname="container-fluid"
                description="Node.js Ecommerce Application">

            <Search/>
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                {productByArrival.map((product, i) =>(
                    <div key={i} className="col-4 mb-3">
                        <Cart  product={product}/>
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productBySell.map((product, i) =>(
                    <div key={i} className="col-4 mb-3">
                        <Cart  product={product}/>
                    </div>
                ))}
            </div>
        </Layout>

    )
}
export default Home;