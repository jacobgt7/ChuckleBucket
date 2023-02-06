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

export const getJokeById = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
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

export const addJoke = (joke) => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(joke)
        })
    })
}

export const addLaugh = (jokeId) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/laugh/${jokeId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export const updateJoke = (id, joke) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(joke)
        })
    })
}

export const deleteJoke = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}