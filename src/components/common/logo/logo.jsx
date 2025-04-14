import React, { useEffect } from 'react'
import logo from './../../../img/logo/logo.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Logo = () => {

    const id = useSelector((state) => state.auth.id)

    useEffect(() => {
        
    }, [id])

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <NavLink to={id ? `/profile/${id}` : `/profile/notAuthorized`} className='logo__link'>
            <img src={logo} alt="" className='logo__img' /> 
        </NavLink>
    )
}

export default Logo