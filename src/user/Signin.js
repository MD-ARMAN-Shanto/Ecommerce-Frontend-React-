import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Link, Redirect} from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: 'user@gmail.com',
        password:'user123',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    //destructuring object
    const { email, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    //handle change method
    const handleChange = name => (event)=>{
        setValues({ ...values, error: false ,[name]: event.target.value });
    }

    const signInSubmit = event =>{
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({ email, password })
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                } else {
                   authenticate(data, ()=> {
                       setValues({
                           ...values,
                           redirectToReferrer: true
                       });
                   });
                }
            })
    }
    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input value={email}
                       onChange={handleChange('email')} type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input value={password}
                       onChange={handleChange('password')} type="password" className="form-control"/>
            </div>

            <button onClick={signInSubmit} className="btn btn-primary">Submit</button>

        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-info"><h2>Loading...</h2></div>
        )
    )

    const redirectUser = () =>{
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>
            }else {
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    return (
        <div>
            <Layout title="Signin" description=" Sign in to Node React Ecommerce Application"
                    classname="container col-md-4 offset-md-4"
            >
                {showLoading()}
                {showError()}
                {signInForm()}
                {redirectUser()}

            </Layout>
        </div>
    )
}

export default Signin;