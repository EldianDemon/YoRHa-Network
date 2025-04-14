import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import CustomForm, { CustomFormInput } from '../../common/form/form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login } from '../../../reducers/authReducer.ts'

const Login = () => {

    const [error, setError] = useState(null)
    const [hidePass, toggleHide] = useState(true)
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    
    const auth = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.isAuth) {
            navigate(`/profile/${auth.id}`)
        }
    }, [auth.isAuth])

    const handleCheckboxChange = (event) => {
        toggleHide(!event.target.checked)
    }

    const sendData = async (formData) => {
        const result = await dispatch(login(formData))

        if (result.err) setError(result.err)
    }

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