import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from "../auth";
import {Link} from "react-router-dom";
import {createProduct, getCategories} from "./ApiAdmin";


const AddProduct = () =>{
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile: false,
        formData:''
    })

    //de-structuring
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData,
    } = values;

    const {user, token} = isAuthenticated();

    //load categories set form data
    const init = () =>{
        getCategories().then(data =>{
            //console.log(data)
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        })
    }

    useEffect(()=>{
        init();
    }, [])

    //higher order function
    const handleChange = name => e =>{
        const value = name === 'photo' ? e.target.files[0]: e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value })
    }

    const clickSubmit = (e) =>{
        e.preventDefault();
        setValues({...values, error:'', loading: true})
        createProduct(user._id, token, formData)
            .then(data=>{
                if(data.error){
                    setValues({...values, error: data.error})
                }else {
                    setValues({
                        ...values,
                        name:'',
                        description: '',
                        photo:'',
                        price:'',
                        quantity: '',
                        categories: [],
                        loading: false,
                        createdProduct: data.name
                    });
                }
            })
            .catch(err=>console.log(err))
    }

    const newProductPostForm = () =>(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        name="photo"
                        accept="image/*"/>
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange('description')}
                    className="form-control" value={description}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange('price')}
                    type="number"
                    className="form-control" value={price}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange('category')}
                    className="form-control" value={category}>
                    <option>Please Select</option>
                    {categories &&
                        categories.map((category, index)=>(
                            <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange('shipping')}
                    className="form-control" value={shipping}>
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange('quantity')}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
            <div className="alert alert-info" style={{display: createdProduct ? '' : 'none' }}>
                <h2>{`${createdProduct}`} is created Successfully </h2>
            </div>
    )
    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>
                    Loading...
                </h2>
            </div>
        )
    )

    return(
        <Layout
            title="Add a new product"
            description={`Hey ${user.name}, ready to add a new product`}>
            <div className="container">
                <div className="col-md-6 offset-md-3">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newProductPostForm()}
                </div>
            </div>
        </Layout>
    )
}
export default AddProduct;