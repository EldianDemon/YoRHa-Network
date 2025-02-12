import React from 'react'

export const FormInput = ({ error, register, name, type, placeholder, onKeyDown }) => {
    return (
        <>
            {error ? <span className='form__label__error'>{error}</span> : null}
            <input
                {...register}
                type={type}
                name={name}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                className={error ? 'form__input_err' : 'input form__input'} />
        </>
    )
}

