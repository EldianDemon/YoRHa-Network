import React from 'react'
import Posts from './posts'
import { connect } from 'react-redux'

const PostsContainer = (props) => {
    return <Posts {...props} />
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(PostsContainer)