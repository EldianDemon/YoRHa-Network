import React from 'react'
import Register from './register'
import { connect } from 'react-redux'
import { getRegisterThunkCreator } from '../../../reducers/authReducer.ts'

class LoginContainer extends React.Component {
    sendData = (formData) => {
        return this.props.getRegisterThunkCreator(formData)
    }
    render() {
        return <Register sendData={this.sendData} />
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, { getRegisterThunkCreator })(LoginContainer)