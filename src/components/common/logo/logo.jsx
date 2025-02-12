import React, { useEffect } from 'react'
import logo from './../../../img/logo/logo.svg'
import logoDarkTheme from './../../../img/logo/logoDarkTheme.svg'
import { NavLink } from 'react-router-dom'

const Logo = (props) => {

    return (
        <NavLink to={props.id ? `/profile/${props.id}` : `/profile/notAuthorized`} className='logo__link'>
            <img src={logo} alt="" className='logo__img' /> 
        </NavLink>
    )
}

export default Logo