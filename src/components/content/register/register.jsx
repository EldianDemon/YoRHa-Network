import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../common/form/formComponents'

const Register = (props) => {

    const [hidePass, toggleHide] = useState(true)
    const [sendStatus, toggleSend] = useState(false)

    const handleCheckboxChange = (event) => {
        toggleHide(!event.target.checked)
    }

    const sendFormData = async (formData) => {
        try {
            toggleSend(await props.sendData(formData))
        }
        catch (error) {
            console.log('Ошибка в фетчинге регистрации: ', error.message)
        }
        console.log(sendStatus)
    }

    const { register, handleSubmit, getValues, setFocus, formState: { errors } } = useForm()

    useEffect(() => {
        setFocus('email')
    }, [setFocus])
    useEffect(() => {
        console.log(sendStatus)
    }, [sendStatus])

    const handleKeyDown = (e, name) => {
        if (e.key === 'Enter') {
            e.preventDefault() //офаю дефолт победение Enter
            setFocus(name)
        }
    }

    console.log('render register')
    return (
        <section className='form'>
            <div className='container form__container'>
                <form onSubmit={handleSubmit((formData) => { sendFormData(formData) })} className='form__body'>
                    <label className='form__label'>
                        <FormInput
                            register={register('email', { required: 'Пожалуйста, введите Почту ^ ^' })}
                            name={'email'}
                            onKeyDown={(e) => handleKeyDown(e, 'name')}
                            type={'email'}
                            placeholder={'Ваша почта'}
                            error={errors.email?.message} />
                    </label>
                    <label className='form__label'>
                        <FormInput
                            register={register('name', { required: 'Пожалуйста, введите Логин ^ ^' })}
                            name={'name'}
                            onKeyDown={(e) => handleKeyDown(e, 'password')}
                            type={'text'}
                            placeholder={'Ваш логин'}
                            error={errors.name?.message} />
                    </label>
                    <div className='form__label'>
                        <label className='form__label'>
                            <div className='form__label__container'>
                                <input
                                    {...register('password')}
                                    type={hidePass ? 'password' : 'text'}
                                    placeholder='Пароль'
                                    onKeyDown={(e) => handleKeyDown(e, 'passwordConfirm')}
                                    className='form__input' />
                                <span className='form__label_c'>
                                    <input type="checkbox" onChange={handleCheckboxChange} className='form__input form__input_c' />
                                    Показать пароль
                                </span>
                            </div>
                        </label>
                    </div>
                    <div className='form__label'>
                        {errors.passwordConfirm?.message ? <p>{errors.passwordConfirm?.message}</p> : null}
                        <input {...register('passwordConfirm', {
                            validate: (match) => {
                                const password = getValues('password')
                                return match === password || 'Пароль должен совпадать!'
                            }
                        })} type='password' placeholder='Подтвердите пароль' onKeyDown={(e) => handleKeyDown(e, 're')} className='form__input' />
                    </div>
                    <button type='submit' onKeyDown={(e) => handleKeyDown(e, 4)} className='form__btn'>
                        Зарегистрироваться
                    </button>
                </form>
                {sendStatus ? <h2>Успешно</h2> : null}
            </div>
        </section>
    )
}

export default Register