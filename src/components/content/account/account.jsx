import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import WithAuthRedirect from '../../hoc/withAuthRedirect'

const Account = () => {
    return (
        <section className='account'>
            <div className='account__container'>
                <nav className='account__nav'>
                    <ul className='account__nav__list'>
                        <li className='account__nav__item'>
                            <NavLink to='main' className='account__nav__item__btn'>
                                Main
                            </NavLink>
                        </li>
                        <li className='account__nav__item'>
                            <NavLink to='personal' className='account__nav__item__btn'>
                                Personal data
                            </NavLink>
                        </li>
                        <li className='account__nav__item'>
                            <NavLink to='safety' className='account__nav__item__btn'>
                                Safety
                            </NavLink>
                        </li>
                    </ul>
                    <button className='btn account__nav__btn'>
                        Back to YoRHa
                    </button>
                </nav>
                <Outlet />
            </div>
        </section>
    )
}

export default WithAuthRedirect(Account) 