import React from 'react'
import Main from './main'
import { connect } from 'react-redux'
import { logoutThunkCreator } from '../../../../reducers/authReducer.ts'

const MainContainer = (props) => {

    const logout = () => {
        props.logoutThunkCreator()
    }

    return <Main {...props} logout={logout} />
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, { logoutThunkCreator })(MainContainer)