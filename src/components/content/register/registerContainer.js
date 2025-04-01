import React from 'react'
import { connect } from 'react-redux'
import { getRegisterThunkCreator } from '../../../reducers/authReducer.ts'
import Register from './register'

const RegisterContainer = (props) => {
    
    const sendData = (formData) => {
        return props.getRegisterThunkCreator(formData)
    }

    return (
        <Register sendData={sendData} auth={props.auth} />
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, { getRegisterThunkCreator })(RegisterContainer)