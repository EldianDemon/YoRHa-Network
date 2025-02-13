import React from 'react'
import User from './user/user'
import UserSkeleton from './user/userSkeleton/userSkeleton'

const Users = (props) => {

    const fakeUsers = [
        { id: 0, name: 'testUser1', photo: null, id_status: null },
        { id: 1, name: 'testUser2', photo: null, id_status: null },
        { id: 2, name: 'testUser3', photo: null, id_status: null },
        { id: 3, name: 'testUser4', photo: null, id_status: null },
        { id: 4, name: 'testUser5', photo: null, id_status: null },
        { id: 5, name: 'testUser6', photo: null, id_status: null },
    ]

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
                    { props.isDemo &&
                        fakeUsers.map(el =>
                            <li key={el.id} className='users__item'>
                                <User id={el.id} name={el.name} photo={el.photo} id_status={el.id_status} />
                            </li>)
                    }

                    { !props.isDemo &&
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