import React from 'react'

export const loginRef = React.createRef()

export const focusOnLogin = () => {
    if(loginRef.current) loginRef.current.focus()
}
