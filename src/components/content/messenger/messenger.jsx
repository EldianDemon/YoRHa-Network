import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import InChatPlaceHolder from './inChat/inChatPlaceholder/inChatPlaceholder'
import ServerNavContainer from './serverNav/serverNavContainer'

const Messenger = (props) => {

    const location = useLocation()
    const messengerPath = location.pathname

    return (
        <section className='messenger'>
            personal
            <ServerNavContainer />
            <Outlet /> 
        </section>
    )
}

export default Messenger