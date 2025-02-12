import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3006/',
    withCredentials: true,
})

const authorize = (link, data) => {
    return instance.post(link, { ...data })
        .then(response => response.data)
}

export const API = {
    getAuth: () => {
        return instance.get('auth/me')
            .then(response => response.data)
    },
    register: (data) => {
        return authorize('register', data)
    },
    login: (data) => {
        return authorize('login', data)
    },
    logout: () => {
        return authorize('logout')
    },
    getProfile: (id) => {
        return instance.get(`profile/${id}`)
            .then(response => response.data)
    },
    getUsers: (sort, filter) => {

        return instance.get(`users?sort=${sort}&filter=${filter}`)
            .then(response => response.data)
    },

    removeFriend: (id) => {
        return instance.delete(`/friends/remove/${id}`)
            .then(response => response.data)
    },
    addFriend: (id) => {
        return instance.post(`/friends/add/${id}`)
            .then(response => response.data)
    }
}

