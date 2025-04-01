import React, { useEffect } from 'react'
import Bell from './bell'
import { checkRequestsThunk } from '../../../reducers/requestsReducer'
import { connect } from 'react-redux'

const BellContainer = (props) => {
    const requestsPlaceholder = [
        { id: 0, userName: 'testUser1', userAvatar: null },
        { id: 1, userName: 'testUser2', userAvatar: null },
        { id: 2, userName: 'testUser3', userAvatar: null },
        { id: 3, userName: 'testUser4', userAvatar: null },
    ]
    useEffect(() => {
        props.checkRequestsThunk()
    }, [])
    return <Bell requests={requestsPlaceholder} />
}

const mapStateToProps = (state) => {
    return {
        requests: state.requests.requests
    }
}

export default connect(mapStateToProps, {
    checkRequestsThunk
})(BellContainer) 