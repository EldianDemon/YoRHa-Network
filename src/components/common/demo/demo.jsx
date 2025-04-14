import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDemo } from '../../../reducers/appReducer.ts'
import s from './demo.module.scss'

const Demo = (props) => {

    const isDemo = useSelector((state) => state.app.isDemo)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setDemo())
    }

    console.log(isDemo)

    return (
        <div className={s.container}>
            {/* <button
                onClick={handleClick}
                className={`btn ${isDemo ? s.btn_active : s.btn}`}
            >
                Demo Mode
            </button> */}
        </div>
    )
}

export default Demo
