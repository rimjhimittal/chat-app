import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {toast, ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const [values, setValues] = useState({
        username: "",
        email:"",
        password:"",
        confirmpassword:"",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
       if(handleValidation()){
        console.log("In Validation", registerRoute);
        const {password, confirmpassword, username, email} = values;
            const {data} = await axios.post(registerRoute, {
                username, 
                email,
                password, 
            })
       }
    };
    const toastOptions = {
        position: 'bottom-right',
        pauseOnHover:true,
        autoClose: true,
        theme: 'dark',
    }
    const handleValidation = () => {
        const { password, confirmpassword, username, email} = values;
        if(password !== confirmpassword) {
            toast.error("Password and ConfirmPasssword should be same.",toastOptions);
            return false;
        }
        else if(username.length<3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        }            
        else if(password.length<6) {
            toast.error("Password should be greater than 6 characters.", toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("E-mail is required!", toastOptions);
            return false;
        }
        return true;
            };
       
        
    
    const handleChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value});
    };
    return (
        <>
        <FormContainer>
            <form onSubmit = {(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src = "" alt = ""/>
                    <h1>Name of App</h1>
                </div>
                <input type = "text" placeholder = "Username" name = "username" onChange={(e) => handleChange(e)}/>
                <input type = "email" placeholder = "Email" name = "email" onChange={(e) => handleChange(e)}/>
                <input type = "password" placeholder = "Password" name = "password" onChange={(e) => handleChange(e)}/>
                <input type = "password" placeholder = "Confirm Password" name = "confirmpassword" onChange={(e) => handleChange(e)}/>
                <button type = "submit">Create User</button>
                <span>Already have an account? <Link to= "/login">Login</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
        </>
    );
    }

const FormContainer  = styled.div``;

export default Register;