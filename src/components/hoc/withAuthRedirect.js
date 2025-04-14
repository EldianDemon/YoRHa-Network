import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { focusOnLogin } from '../../utilities/focusOn'
import { getAuth } from '../../reducers/authReducer.ts'

const WithAuthRedirect = (Component) => {
    const RedirectedComponent = () => {

        const isAuth = useSelector((state) => state.auth.isAuth)
        const dispatch = useDispatch()

        useEffect(() => {
            if (isAuth === null) {
                dispatch(getAuth())
            }
            if (isAuth === false) {
                focusOnLogin()
            }
        }, [isAuth, dispatch])

        if (isAuth) return <Component />

        return <div>Авторизация не прошла</div>


    }

    return RedirectedComponent

}

export default WithAuthRedirect

