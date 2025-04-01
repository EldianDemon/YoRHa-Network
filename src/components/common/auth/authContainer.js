import React, { useEffect } from 'react'
import Auth from './auth'
import { connect } from 'react-redux'
import { getAuth } from '../../../selectors/authSelector'
import { loginRef } from '../../../utilities/focusOn'
import { getAuthThunkCreator } from '../../../reducers/authReducer.ts'

const AuthContainer = (props) => {

    const waitFetch = async () => {
        await props.getAuthThunkCreator()
    }

    return <Auth {...props} waitFetch={waitFetch} loginRef={loginRef} /> 
}

const mapStateToProps = (state) => {
    return {
        isAuth: getAuth(state),
    }
}

export default connect(mapStateToProps, { getAuthThunkCreator })(AuthContainer)