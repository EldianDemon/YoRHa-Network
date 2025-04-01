import React from "react"
import { useParams } from "react-router-dom"

const Chat = () => {

    const { chatId } = useParams()

    const chatsPlaceholder = [
        { id: 1, name: 'Antony', message: 'Something here', messageDate: 'must be a date', isViewed: false }
    ]

    return (
        <div>
            Chat ID: {chatId}
        </div>
    )
}

export default Chat