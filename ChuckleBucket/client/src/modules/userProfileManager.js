import { getToken } from "./authManager"

const baseUrl = "/api/UserProfile"

export const getUserById = (id) => {
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

export const getAllDisplayNames = () => {
    return fetch(`${baseUrl}/allDisplayNames`)
        .then(res => res.json())
}

export const updateUser = (id, userProfile) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        })
    })
}