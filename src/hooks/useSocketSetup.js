import { useEffect } from "react"
import socket from "../socket"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/authReducer.ts"


const useSocketSetup = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        socket.connect()
        socket.on('connect_error', () => {
            dispatch(logout())
        })

        return () => {
            socket.off('connect_error')
            socket.disconnect()
        }
    }, [dispatch])
}

export default useSocketSetup