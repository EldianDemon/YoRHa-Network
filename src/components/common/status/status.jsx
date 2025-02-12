import React from 'react'

const Status = (props) => {
    return (
        <div className='profile__info'>
            <span>{props.status ? props.status : '------------'}</span>
        </div>
    )
}

export default Status