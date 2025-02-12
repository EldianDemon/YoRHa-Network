import React, { memo } from 'react'
import AuthContainer from '../common/auth/authContainer'
import LogoContainer from '../common/logo/logoContainer'
import BellContainer from './bell/bellContainer'

const Header = memo(function Header(props) {
    console.log('render Header')
    return (
        <header className='header'>
            <div className='container header__container'>
                <ul className='header__list'>
                    <li className='header__item'>
                        <LogoContainer />
                    </li>
                    <li className='header__item'>
                        someNav
                    </li>
                    <li className='header__item header__item_user'>
                        <BellContainer />
                        <AuthContainer />
                    </li>
                    
                </ul>
            </div>
        </header>
    )
}
)



export default Header