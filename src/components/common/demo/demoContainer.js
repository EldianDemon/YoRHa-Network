import React, { useState } from 'react'
import Demo from './demo'
import { connect } from 'react-redux'
import { setDemo } from '../../../reducers/appReducer.ts'

const DemoContainer = (props) => {

    return <Demo {...props} />
} 

const mapStateToProps = (state) => {
    return {
        isDemo: state.app.isDemo
    }
}

export default connect(mapStateToProps, {setDemo})(DemoContainer)