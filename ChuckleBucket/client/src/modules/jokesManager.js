import { getToken } from "./authManager"

const baseUrl = "/api/Joke"

export const getAllJokes = () => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}

export const getJokesByCategory = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/category/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}

export const getJokesByAuthor = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/author/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}

export const getJokesByCurrentUser = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/currentUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}