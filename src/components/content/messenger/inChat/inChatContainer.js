import React, { useEffect } from 'react'
import InChat from './inChat'
import { useParams } from 'react-router-dom'

const jsonUsers = [
    {
        userId: 0,
        name: "Вася",
        messages: [
            { text: "привет!", date: "2025-01-22T12:00:00Z" },
            { text: "Хорошо, у тебя как?", date: "2025-01-23T12:30:00Z" }
        ]
    },
    {
        userId: 1,
        name: "Ваня",
        messages: [
            { text: "Как дела?", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 2,
        name: "Настя",
        messages: [
            { text: "что делаете, ребята?", date: "2025-01-27T12:45:00Z" }
        ]
    },
    {
        userId: 3,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 4,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 5,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 5,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 5,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 5,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
    {
        userId: 5,
        name: "TEST",
        messages: [
            { text: "Как дела? loreasdasdasddddddddddddddddddddddddddd", date: "2025-01-20T12:15:00Z" }
        ]
    },
]

const allMessages = jsonUsers.flatMap(user =>
    user.messages.map(message => ({
        user: user.name,
        text: message.text,
        date: new Date(message.date)
    }))
)

const sortMessages = allMessages.sort((a, b) => a.date - b.date)

const InChatContainer = (props) => {

    const server = useParams()
    const serverId = server.serverId

    useEffect(() => {

        //getserver
    }, [])


    console.log(serverId)

    //Передаем массив всех узеров и если какой-то совпадает с твоим, отображаем версткой



    return <InChat {...props} messages={sortMessages} />
}

export default InChatContainer