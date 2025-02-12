import React from 'react'

const NotAuth = (props) => {

    return (
        <section className='notAuth'>
            <div className='container notAuth__container'>
                <h1>
                    {props.authMessage ? props.authMessage : 'Loading...'}
                </h1>
            </div>
        </section>
    )
}

export default NotAuth