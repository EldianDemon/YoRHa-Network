import React from 'react'

const Demo = (props) => {
    console.log(props.isDemo)

    const handleClick = () => {
        props.setDemo(!props.isDemo) 
    }

    return (
        <div className='demo__container'>
            <button 
                onClick={handleClick} 
                className={`btn ${props.isDemo ? 'demo__btn_active' : 'demo__btn'}`}
            >
                Demo Mode
            </button>
        </div>
    )
}

export default Demo
