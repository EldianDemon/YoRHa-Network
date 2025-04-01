import React from 'react'
import s from './demo.module.scss'

const Demo = (props) => {
    console.log(props.isDemo)

    const handleClick = () => {
        props.setDemo(!props.isDemo)
    }

    return (
        <div className={s.container}>
            {/* <button
                onClick={handleClick}
                className={`btn ${props.isDemo ? s.btn_active : s.btn}`}
            >
                Demo Mode
            </button> */}
        </div>
    )
}

export default Demo
