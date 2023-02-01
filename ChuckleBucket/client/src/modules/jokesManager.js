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