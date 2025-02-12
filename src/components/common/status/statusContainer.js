import React from 'react'
import Status from './status'
import { connect } from 'react-redux'

const StatusContainer = (props) => {
    return <Status {...props} />
}

const mapStateToProps = (state) => {
    return {
        status: state.profile.profile.status
    }
}

export default connect(mapStateToProps)(StatusContainer) 