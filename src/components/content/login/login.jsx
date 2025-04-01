import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import CustomForm, { CustomFormInput } from '../../common/form/form'

const Login = (props) => {

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (props.auth.isAuth) {
            navigate(`/profile/${props.auth.id}`)
        }
        console.log(props.auth.id)
    }, [props.auth.isAuth])

    const [hidePass, toggleHide] = useState(true)
    const handleCheckboxChange = (event) => {
        toggleHide(!event.target.checked)
    }

    const sendData = async (formData) => {
        const err = await props.sendData(formData)
        if (err) setError(err.error)
    }

    const { register, handleSubmit } = useForm()

    return (
        <section className='form'>
            <div className='container form__container'>
                {error ? <h3 className='form__error'>{error}</h3> : null}
                <CustomForm onSubmit={handleSubmit((formData) => { sendData(formData) })}>
                    <label className='form__label'>
                        <CustomFormInput
                        register={register('email', { required: true })}
                        type="email"
                        name="email"
                        placeholder='example@exp.ex'
                        className='form__input' />
                    </label>
                    <label className='form__label'>
                        <div className='form__label__container'>
                            <CustomFormInput
                            register={register('password')}
                            name='password'
                            placeholder='your password'
                            type={hidePass ? 'password' : 'text'}
                            className='form__input' />
                            <input type="checkbox" onChange={handleCheckboxChange} className='form__input' />
                            Показать пароль
                        </div>
                    </label>
                    <button type='submit' className='form__btn'>
                        Login
                    </button>
                    <NavLink to='/register' className='form__sign'>
                        Sign in
                    </NavLink>
                </CustomForm>
            </div>
        </section>
    )
}

export default Login