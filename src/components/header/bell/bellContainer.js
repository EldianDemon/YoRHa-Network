import React, { useEffect } from 'react'
import Bell from './bell'

const BellContainer = (props) => {
    const requestsPlaceholder = [
        {id: 0, userName: 'testUser1', userAvatar: null},
        {id: 1, userName: 'testUser2', userAvatar: null},
        {id: 2, userName: 'testUser3', userAvatar: null},
        {id: 3, userName: 'testUser4', userAvatar: null},
    ]
    useEffect(() => {

    }, [])
    return <Bell requests={requestsPlaceholder} />
}

export default BellContainer