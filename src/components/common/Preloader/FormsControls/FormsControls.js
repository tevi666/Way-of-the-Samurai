import React from 'react'
import { Field } from 'redux-form';
import styles from './FormsControls.module.css'


const FormControl = ({ input, meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...Restprops } = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...Restprops} />
        </FormControl>
    )
}
export const Input = (props) => {
    const { input, meta, child, ...Restprops } = props
    return (
        <FormControl {...props}>
            <input {...input} {...Restprops} />
        </FormControl>
    )
}
export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
        <Field
            placeholder={placeholder}
            validate={validators}
            name={name}
            type="text"
            component={component}
            {...props}
        /> {text}
    </div>
)