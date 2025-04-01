import { io } from 'socket.io-client'

const socket = new io('http://localhost:3006', {
    autoConnect: false, //connect only when user logged in
    withCredentials: true
})

export default socket