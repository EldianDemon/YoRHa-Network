import React from 'react'
import { NavLink } from 'react-router-dom'

const ServerNav = (props) => {
    return (
        <nav className='serverNav'>
            <ul className='serverNav__list'>
                {/* {props.servers.map(el =>
                    <li className='serverNav__item'>
                    {props.server.avatar ? <img src={props.server.avatar} alt="serverAvatar" className='serverNav__img' /> : <div>{props.server.name}</div>}  
                </li>
                )} */}
            </ul>
        </nav>
    )
}

export default ServerNav