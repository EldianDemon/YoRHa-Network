import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { register as registerThunk } from '../../../reducers/authReducer.ts'
import CustomForm, { CustomFormInput } from '../../common/form/form'
import s from './register.module.scss'
import f from '../../common/form/form.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {

    const [hidePass, toggleHide] = useState(true)
    const [sendStatus, toggleSend] = useState(false)

    const { register, handleSubmit, getValues, setFocus, formState: { errors } } = useForm()

    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth) 
    const dispatch = useDispatch()

    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    useEffect(() => {
        if (auth.isAuth) navigate(`/profile/${auth.id}`)
    }, [auth.id])

    const handleCheckboxChange = (event) => {
        toggleHide(!event.target.checked)
    }

    const sendFormData = async (formData) => {
        try {
            console.log(formData)
            dispatch(registerThunk(formData))
            toggleSend(true)
        } catch (err) {
            console.log('Ошибка в фетчинге регистрации: ', err.message)
        }
    }

    const handleKeyDown = (e, name) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setFocus(name)
        }
    }

    return (
        <section className={s.register}>
            <div className={`container ${s.register__container}`}>
                <CustomForm onSubmit={handleSubmit(sendFormData)}>
                    <label className={f.form__label}>
                        <CustomFormInput
                            register={register('email', { required: 'Пожалуйста, введите Почту ^ ^' })}
                            name={'email'}
                            onKeyDown={(e) => handleKeyDown(e, 'username')}
                            type={'email'}
                            placeholder={'Ваша почта'}
                            error={errors.email?.message}
                        />
                    </label>
                    <label className={f.form__label}>
                        <CustomFormInput
                            register={register('username', { required: 'Пожалуйста, введите Логин ^ ^' })}
                            name={'username'}
                            onKeyDown={(e) => handleKeyDown(e, 'password')}
                            type={'text'}
                            placeholder={'Ваш логин'}
                            error={errors.username?.message}
                        />
                    </label>
                    <div className={f.form__label}>
                        <label className={f.form__label}>
                            <div className={f.form__label__container}>
                                <CustomFormInput
                                    register={register('password', { required: 'Пожалуйста, введите Пароль ^ ^' })}
                                    name={'password'}
                                    onKeyDown={(e) => handleKeyDown(e, 'passwordConfirm')}
                                    type={hidePass ? 'password' : 'text'}
                                    placeholder={'Ваш пароль'}
                                    error={errors.password?.message}
                                />
                                <span className='form__label_c'>
                                    <input type="checkbox" onChange={handleCheckboxChange} className={`${f.form__input} ${f.form__input_c}`} />
                                    Показать пароль
                                </span>
                            </div>
                        </label>
                    </div>
                    <div className='form__label'>
                        <CustomFormInput
                            register={register('passwordConfirm', {
                                validate: (match) => {
                                    const password = getValues('password');
                                    return match === password || 'Пароль должен совпадать!';
                                },
                            })}
                            name={'passwordConfirm'}
                            onKeyDown={(e) => handleKeyDown(e, 'passwordConfirm')}
                            type={'password'}
                            placeholder={'Подтвердите пароль'}
                            error={errors.passwordConfirm?.message}
                        />
                    </div>
                    <button type='submit' onKeyDown={(e) => handleKeyDown(e, 4)} className='form__btn'>
                        Зарегистрироваться
                    </button>
                </CustomForm>
                {sendStatus ? <h2>Данные отправлены</h2> : null}
            </div>
        </section>
    )
}

export default <Register />