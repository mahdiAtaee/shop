import * as API from './api'

export const check = async () => {
    const authToken = localStorage.getItem("auth")
    if (!authToken) {
        return false
    }
    try {
        const response = await API.post('/auth/check', { authToken })
        if (response.data.success) {
            return true
        }
        

    } catch (error) {
        console.log(error)
    }
}