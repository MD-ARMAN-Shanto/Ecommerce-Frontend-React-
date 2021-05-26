import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Link} from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password:'',
        error: '',
        success: false
    })

    //destructuring object
    const { name, email, password, error, success} = values;

    //handle change method
    const handleChange = name => (event)=>{
        setValues({ ...values, error: false ,[name]: event.target.value });
    }

    const signUpSubmit = event =>{
        event.preventDefault();
        setValues(({...values, error: false}))
        signup({ name, email, password })
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, success: false})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })


    }
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input value={name}
                    onChange={handleChange('name')} type="text" className="form-control"/>
            </div>
            
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

            <button onClick={signUpSubmit} className="btn btn-primary">Submit</button>
            
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '': 'none'}}>
            New Account is created.Please <Link to={"/signin"}>Signin</Link>
        </div>
    )

    return (
        <div>
            <Layout title="Signup" description=" Sign up to Node React Ecommerce Application"
            classname="container col-md-4 offset-md-4"
            >
                {showSuccess()}
                {showError()}
                {signUpForm()}

            </Layout>
        </div>
    )
}

export default Signup;