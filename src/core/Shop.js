import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories, getFilteredProducts} from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { fixedPrice } from "./fixedPrice";
import Cart from "./Cart";


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category:[], price:[]}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const init = () =>{
        getCategories().then(data =>{
            //console.log(data)
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data);
            }
        })
    }

    const loadFilteredProducts= newFilters => {
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setFilteredResults(data.data)
                    setSize(data.size)
                    setSkip(0)
                }
        })
    }

    const loadMore= () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setFilteredResults([...filteredResults, ...data.data])
                    setSize(data.size)
                    setSkip(toSkip)
                }
            })
    }

    useEffect(()=>{
        init();
        loadFilteredProducts(skip,limit, myFilters.filters);
    },[])

    const handleFilters = (filters, filterBy) => {
       const newFilters = {...myFilters};
       newFilters.filters[filterBy] = filters;

       if(filterBy === 'price'){
           let priceValue = handlePrice(filters)
           newFilters.filters[filterBy] = priceValue;
       }
       loadFilteredProducts(myFilters.filters)
       setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = fixedPrice;
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }

    const loadMoreButton = () => {
        return(
            size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
    }

    return(
        <Layout
            title="Homepage"
            classname="container-fluid"
            description="Node.js Ecommerce Application">

            <div className="row">
                <div className="col-4">
                   <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters = {filters => handleFilters(filters, "category")}
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            fixedPrice={fixedPrice}
                            handleFilters = {filters => handleFilters(filters, "price")}
                        />
                    </div>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        { filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Cart  product={product}/>
                            </div>
                        ))}
                    </div>
                    {loadMoreButton()}
                    {/*{JSON.stringify(filteredResult)}*/}
                </div>
            </div>
        </Layout>
    )
};
export default Shop;