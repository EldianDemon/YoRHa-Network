import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { focusOnLogin } from '../../utilities/focusOn'
import { getAuthThunkCreator } from '../../reducers/authReducer.ts'
import NotAuth from '../common/auth/notAuth/notAuth'
 
export const WithAuthRedirect = (Component) => {
    const RedirectedComponent = (props) => {
        useEffect(() => {
            if(props.isAuth === null) props.getAuthThunkCreator()
            if(props.isAuth == false) focusOnLogin()
        }, [props.isAuth])
    
        if(props.isAuth || props.isDemo) return <Component {...props} />
        if(!props.isDemo) return <NotAuth isAuth={props.isAuth} authMessage={props.authMessage} />
        
        
    }
    const ConnectedComponent = connect(mapStateToProps, {getAuthThunkCreator})(RedirectedComponent)

    return ConnectedComponent

}

const mapStateToProps = (state) => {
    return {
        isDemo: state.app.isDemo,
        isAuth: state.auth.isAuth,
        authMessage: state.auth.authMessage
    }
}