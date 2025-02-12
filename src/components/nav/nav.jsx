import React from 'react'
import { NavLink } from 'react-router-dom'
import navi from './navItems.json'

const Nav = (props) => {
    return (
        <nav className='nav'>
            <ul className='nav__list'>
                {navi.lists.map(el =>
                    <li key={el.id}>
                        <NavLink to={el.root} className={({ isActive }) => isActive ? 'nav__item nav__item_active' : 'nav__item'}>{el.name}</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Nav