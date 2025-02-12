import React, { useEffect, useState } from 'react'
import Users from './users'
import { connect } from 'react-redux'
import { clearCache, getUsersThunkCreator } from '../../../reducers/usersReducer.ts'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../hoc/withAuthRedirect'
import { getAuth } from '../../../selectors/authSelector'
import { getUsersSelector } from '../../../selectors/usersSelector'

const UsersContainer = (props) => {

    const [sort, setSort] = useState('important')
    const [byFriends, setByFriends] = useState(false)

    const getUsers = (sortBy, filter) => {
        props.getUsersThunkCreator(sortBy, filter)
    }

    useEffect(() => {
        getUsers(sort, byFriends)
    }, [sort, byFriends])
    
    return <Users {...props} sort={sort} setSort={setSort} byFriends={byFriends} setByFriends={setByFriends} />

}

const mapStateToProps = (state) => {
    return {
        isInit: state.app.init,
        users: getUsersSelector(state),
        isAuth: getAuth(state)
    }
}

export default compose(connect(mapStateToProps, { getUsersThunkCreator, clearCache }), WithAuthRedirect)(UsersContainer) 
