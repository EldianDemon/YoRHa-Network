import React from 'react'
import Account from './account'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../hoc/withAuthRedirect'

const AccountContainer = (props) => {
    return <Account />
}

export default compose(WithAuthRedirect)(AccountContainer) 