import React from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../common/form/formComponents'

const InChat = (props) => {


    const { register, handleSubmit } = useForm()

    const sendFormData = async () => {

    }


    console.log('InChat')
    return (
        <div className='inChat'>
            
            <ul className='inChat__list'>
                All activity in room of each user:
                {
                    props.messages.map(mes =>
                        <li key={mes.date} className='inChat__item'>
                            <div className='inChat__item__left'>
                                <img src="" alt="avatar" className='inChat__item__img' />
                            </div>
                            <div className='inChat__item__center'>
                                <h4 className='inChat__item__name'>{mes.user}</h4>
                                <p className='inChat__item__dscr'>{mes.text}</p>
                            </div>
                            <div className='inChat__item__right'>
                                <span className='inChat__item__date'>{mes.date.toLocaleString()}</span>
                            </div>
                        </li>)
                }
            </ul>
            <div className='inChat__btm'>
                <form onSubmit={handleSubmit((formData) => { sendFormData(formData) })}>
                    <label htmlFor="" className='label inChat__label'>
                        your typer
                        <FormInput register={register('email')} name={'message'} type={'text'} placeholder={'Message'} />
                        <button className='btn inChat__btn'>Send</button>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default InChat