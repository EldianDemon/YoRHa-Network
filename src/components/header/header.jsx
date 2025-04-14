import React, { memo } from 'react'
import Auth from '../common/auth/auth'
import Logo from '../common/logo/logo'
import Demo from '../common/demo/demo'
import Bell from './bell/bell'


const Header = memo(function Header(props) {
    console.log('render Header')
    return (
        <header className='header'>
            <div className='container header__container'>
                <ul className='header__list'>
                    <li className='header__item'>
                        <Logo />
                        <Demo />
                    </li>
                    <li className='header__item header__item_user'>
                        <Bell />
                        <Auth />
                    </li>
                </ul>
            </div>
        </header>
    )
}
)



export default Header