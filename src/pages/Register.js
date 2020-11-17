import React, { useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import "./../App.css";
import { useDispatch } from 'react-redux';

import {registerUser} from './../store/actions';

const validationSchema = Yup.object({
    name: Yup.string()
        .required("The Name field is required.")
        .min("3", "The name must be at least 3 characters.")
        .max("15", "The name must not be more then 15 characters long."),
    email: Yup.string()
        .email("The email must be a valid email address.")
        .required("The Email field is required."),
    phone: Yup.number()
        .required("The Phone number is required.")
        .integer("Please enter the vaild phone number")
        .test('len', 'Please Enter 10-digit phone number.', (val) => { if(val) return val.toString().length === 10; })
        .typeError('Please enter the vaild phone number'),
    password: Yup.string()
        .required("The Password is required.")
        .min("6", "The password must be at least of 6 characters."),
});


const Register = (props) => {
    const dispatch = useDispatch();


    useEffect(() => {
        $("body").addClass("form-membership");
    }, []);

    const handleSubmit = (formFields,setErrors,setSubmitting) => {
        console.log(formFields)
        dispatch(registerUser(formFields)).then(response => {
                localStorage.setItem("status",btoa(formFields.email));
                setSubmitting(false)
                props.history.push("email-verification");
        }).catch(error => {
            console.log(error)
            setSubmitting(false)
            if(error.response.status===500){
                if(error.response.data.error.name==="MongoError"){
                    //server error related to mongoDB
                    if(error.response.data.error.code===11000){
                        setErrors(
                            {
                                email: 'This is email already exists.',
                            }
                        )
                    }
                }
            }
        })
    }

    return (
        <div className="form-wrapper">
            <div className="logo">
                <img src="dist/media/img/small-logo.png" alt="logo" />
            </div>

            <h5>Sign in</h5>
            <Formik
                initialValues={{
                    name: "Yash Gupta",
                    email: "test@mozej.com",
                    phone: "7879781114",
                    password: "123456",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setErrors,setSubmitting}) => {
                    handleSubmit(values,setErrors,setSubmitting);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={errors.name && touched.name && errors.name ? "form-control is-invalid mb-0" : "form-control"}
                                placeholder="Your name"
                                autoFocus
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                name="name"

                            />
                            <span className="invalid-feedback" role="alert">
                                <strong >{errors.name && touched.name && errors.name}</strong>
                            </span>
                           
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className={errors.email && touched.email && errors.email ? "form-control is-invalid mb-0" : "form-control"}
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                name="email"
                            />
                            <span className="invalid-feedback" role="alert">
                                <strong>{errors.email && touched.email && errors.email}</strong>
                            </span>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={errors.phone && touched.phone && errors.phone ? "form-control is-invalid mb-0" : "form-control"}
                                placeholder="Phone No."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                name="phone"
                            />
                            <span className="invalid-feedback" role="alert">
                                <strong>{errors.phone && touched.phone && errors.phone}</strong>
                            </span>
                        </div>
                        
                        <div className="form-group">
                            <input
                                type="password"
                                className={errors.password && touched.password && errors.password ? "form-control is-invalid mb-0" : "form-control"}
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                name="password"
                            />
                            <span className="invalid-feedback" role="alert">
                                <strong >{errors.password && touched.password && errors.password}</strong>
                            </span>
                        </div>
                        <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block">
                            Register 
                            {isSubmitting && <span className="spinner-grow spinner-grow-sm ml-3" role="status" aria-hidden="true"></span>}
                        </button>
                        <hr />
                        <p className="text-muted">Already have an account?</p>
                      
                        <Link
                            to="/login"
                            className="btn btn-outline-light btn-sm"
                        >
                            Login
                        </Link>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
