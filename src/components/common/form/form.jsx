import React from 'react'
import s from './form.module.scss'

const CustomForm = (props) => {
    
    return (
        <form onSubmit={props.onSubmit} className={s.form}>
            {props.children}
        </form>
    )
}

export const CustomFormInput = ({ error, register, name, type, placeholder, onKeyDown }) => {
    return (
        <>
            {error ? <span className={s.label__error}>{error}</span> : null}
            <input
                {...register}
                type={type}
                name={name}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                className={error ? `${s.form__input} ${s.input_err}` : s.form__input}
            />
        </>
    )
}

export default CustomForm