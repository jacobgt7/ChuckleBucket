import { getToken } from "./authManager"

const baseUrl = "/api/Category"

export const getAllCategories = () => {
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