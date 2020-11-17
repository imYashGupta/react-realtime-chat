import React, { useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from 'react-redux';
import {loginUser} from './../store/actions';
import { url } from "../util/constants";


const validationSchema = Yup.object({
    email: Yup.string()
        .email("The email must be a valid email address.")
        .required("The Email field is required."),
    password: Yup.string().required("The Password is required."),
});
const Init = (props) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        $("body").addClass("form-membership");
    }, []);

    const handleLogin = (formFields,setErrors,setSubmitting) => {
        console.log(formFields)
        dispatch(loginUser(formFields))
            .then(response => {
                localStorage.setItem("token",response.data.token);
                // setSubmitting(false)
                window.location = "/";
            })
            .catch(error => {
                console.log(error);
                if (error.response.status===401) {
                    setErrors({email:error.response.data.message})
                }
                if(error.response.status===422){
                    setErrors({email:error.response.data?.error?.retry})
                }
                setSubmitting(false)
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
                    email: "test@mozej.com",
                    password: "123456",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                   
                    handleLogin(values,setErrors,setSubmitting);
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
                                className={
                                    errors.email &&
                                    touched.email &&
                                    errors.email
                                        ? "form-control is-invalid mb-0"
                                        : "form-control"
                                }
                                placeholder="Username or email"
                                autoFocus
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                name="email"
                            />
                            <span className="invalid-feedback" role="alert">
                                <strong>
                                    {errors.email &&
                                        touched.email &&
                                        errors.email}
                                </strong>
                            </span>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={
                                    errors.password &&
                                    touched.password &&
                                    errors.password
                                        ? "form-control is-invalid mb-0"
                                        : "form-control"
                                }
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                name="password"
                            />
                            <span className="invalid-feedback" role="alert">
                                <strong>
                                    {errors.password &&
                                        touched.password &&
                                        errors.password}
                                </strong>
                            </span>
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label className="custom-control-label">
                                    Remember me
                                </label>
                            </div>
                            <a href="./reset-password.html">Reset password</a>
                        </div>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Login
                            {isSubmitting && (
                                <span
                                    className="spinner-grow spinner-grow-sm ml-3"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                        <hr />
                        <p className="text-muted">Don't have an account?</p>
                        <Link
                            to="/register"
                            className="btn btn-outline-light btn-sm"
                        >
                            Register now!
                        </Link>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Init;
