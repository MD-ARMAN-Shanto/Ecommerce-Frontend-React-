import React, {useState} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from "../auth";
import {Link} from "react-router-dom";
import {createCategory} from "./ApiAdmin";

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    //destructure user and token from localstorage
    const { user, token} = isAuthenticated();

    const handleChange = (e) =>{
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false)
        //create api to make post request
        createCategory(user._id, token, {name})
            .then(data=>{
                if(data.error){
                    setError(true)
                }else {
                    setError("");
                    setSuccess(true);
                }
            })
            .catch(err=>console.log(err))
    }

    const newCategoryForm = () =>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )

    const showSuccess =() =>{
        if(success){
             //return <h3 className="text-success"></h3>
            return(
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{display:'contents'}}>
                    <div className="toast-body" style={{background:'forestgreen', color:'white'}}>
                        {name} is created successfully.
                    </div>
                </div>
            )
        }
    };

    const showError =() =>{
        if(error){
             //return <h6 className="text-danger">Category already exists. Please write down the unique one</h6>
            return(
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{display:'contents', color:'red'}}>
                    <div className="toast-body" style={{background:'#ff1800bf', color:'white'}}>
                        Category already exists. Please write down the unique one.
                    </div>
                </div>
                )
        }
    };

    return(
        <Layout
            title="Add a new category"
            description={`Hey ${user.name}, ready to add a new category`}>
            <div className="container">
                <div className="col-md-6 offset-md-3">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;