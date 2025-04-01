import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { focusOnLogin } from '../../utilities/focusOn'
import { getAuthThunkCreator } from '../../reducers/authReducer.ts'
 
export const WithAuthRedirect = (Component) => {
    const RedirectedComponent = (props) => {
        useEffect(() => {
            if(props.isAuth === null) props.getAuthThunkCreator()
            if(props.isAuth == false) focusOnLogin()
        }, [props.isAuth])
    
        if(props.isAuth || props.isDemo) return <Component {...props} />
        if(!props.isDemo) return <div>Авторизация не прошла</div> 
        
        
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