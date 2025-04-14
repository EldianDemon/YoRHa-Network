import React, { useEffect, useState } from 'react'
import User from './user/user'
import UserSkeleton from './user/userSkeleton/userSkeleton'
import Nav from './nav/nav'
import WithAuthRedirect from '../../hoc/withAuthRedirect'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../reducers/usersReducer.ts'

const Users = () => {

    const [sort, setSort] = useState('important')
    const [byFriends, setByFriends] = useState(false)

    const users = useSelector((state) => state.users.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(sort, byFriends))
    }, [users])

    console.log('render users')

    return (
        <section className='users'>
            <Nav />
            <ul className='users__list'>
                {
                    users?.length === 0
                        ?
                        <UserSkeleton iterations={3} />
                        :
                        users?.map(el =>
                            <li key={el.id} className='users__item'>
                                <User id={el.id} username={el.username} avatar={el.avatar} status={el.status} />
                            </li>)
                }
            </ul>
        </section>
    )
}

export default WithAuthRedirect(Users) 