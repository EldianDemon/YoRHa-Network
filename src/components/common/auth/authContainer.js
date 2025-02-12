import React, { useEffect } from 'react'
import Auth from './auth'
import { connect } from 'react-redux'
import { getAuth } from '../../../selectors/authSelector'
import { loginRef } from '../../../utilities/focusOn'
import { getAuthThunkCreator } from '../../../reducers/authReducer.ts'
import { useLocation } from 'react-router-dom'

const AuthContainer = (props) => {

    const location = useLocation()

    const waitFetch = async () => {
        await props.getAuthThunkCreator()
    }

    useEffect(() => {
        waitFetch()
    }, [])


    return props.isAuth !== null ? <Auth {...props} loginRef={loginRef} location={location} /> : <></>
}

const mapStateToProps = (state) => {
    return {
        isAuth: getAuth(state),
    }
}

export default connect(mapStateToProps, { getAuthThunkCreator })(AuthContainer)