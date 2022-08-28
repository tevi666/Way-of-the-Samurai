import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/Preloader/FormsControls/FormsControls';
import styled from './Login.module.css';
import { login } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom';
import style from './../common/Preloader/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    validate={[required]}
                    name={"email"}
                    type="text"
                    component={Input} />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    validate={[required]}
                    name={"password"}
                    type="password"
                    component={Input} />
            </div>
            <div className={styled.flex}>
                <Field
                    component={Input}
                    name={"rememberMe"}
                    type="checkbox"
                />
                <span>
                    remember me
                </span>
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Navigate to="/profile" />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);

