import React, { useEffect } from 'react'
import Logo from './logo'
import { connect } from 'react-redux'
import { getAuthThunkCreator } from '../../../reducers/authReducer.ts'

const LogoContainer = (props) => {

    useEffect(() => {
        
    }, [props.id])

    const refreshPage = () => {
        window.location.reload()
    }

    return <Logo id={props.id} refreshPage={refreshPage} />
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id
    }
}

export default connect(mapStateToProps, {getAuthThunkCreator})(LogoContainer) 