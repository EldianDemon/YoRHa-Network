import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (props.auth.isAuth) {
            navigate(`/profile/${props.auth.id}`)
        }
        console.log(props.profile)
    }, [props.auth.isAuth])

    const [hidePass, toggleHide] = useState(true)
    const handleCheckboxChange = (event) => {
        toggleHide(!event.target.checked)
    }

    const sendData = async (formData) => {
        const err = await props.sendData(formData)
        if(err) setError(err.error)
        

    }

    const { register, handleSubmit } = useForm()

    return (
        <section className='form'>
            <div className='container form__container'>
                {error ? <h3 className='form__error'>{error}</h3> : null}
                <form onSubmit={handleSubmit((formData) => { sendData(formData) })} className='form__body'>
                    <label className='form__label'>
                        <input {...register('email', { required: true })} type="email" name="email" placeholder='example@exp.ex' className='form__input' />
                    </label>
                    <label className='form__label'>
                        <div className='form__label__container'>
                            <input {...register('password')} type={hidePass ? 'password' : 'text'} className='form__input' />
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
                </form>
            </div>
        </section>
    )
}

export default Login