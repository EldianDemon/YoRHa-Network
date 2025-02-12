import React from 'react'
import Login from './login'
import { connect } from 'react-redux'
import { getLoginThunkCreator } from '../../../reducers/authReducer.ts'

class LoginContainer extends React.Component {
    sendData = (formData) => {
        return this.props.getLoginThunkCreator(formData)
    }
    
    render() {
        return <Login sendData={this.sendData} auth={this.props.auth} profile={this.props.profile} />
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, { getLoginThunkCreator })(LoginContainer)