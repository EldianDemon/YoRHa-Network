import React from 'react'
import User from './user/user'
import UserSkeleton from './user/userSkeleton/userSkeleton'

const Users = (props) => {

    console.log('render users')

    return (
        <section className='users'>
            <nav className='users__nav'>
                <ul className='users__nav__list'>
                    <li className='users__nav__item'>
                        <button onClick={() => { props.setSort('important') }} className={props.sort === 'important' ? 'btn users__nav__btn btn_active' : 'btn users__nav__btn'}>
                            Важные
                        </button>
                    </li>
                    <li className='users__nav__item'>
                        <button onClick={() => { props.setSort('name') }} className={props.sort === 'name' ? 'btn users__nav__btn btn_active' : 'btn users__nav__btn'}>
                            Имя
                        </button>
                    </li>
                </ul>
                <ul className='users__nav__list'>
                    <li className='users__nav__item'>
                        <button onClick={() => { props.setByFriends(!props.byFriends) }} className={props.byFriends ? 'btn users__nav__btn btn_active' : 'btn users__nav__btn'}>
                            Друзья
                        </button>
                    </li>
                </ul>
            </nav>
            {props.isInit
                ? <UserSkeleton iterations={3} />
                :
                <ul className='users__list'>
                    {
                        props.users.map(el =>
                            <li key={el.id} className='users__item'>
                                <User id={el.id} name={el.name} photo={el.photo} id_status={el.id_status} />
                            </li>)
                    }
                </ul>
            }
        </section>
    )
}

export default Users