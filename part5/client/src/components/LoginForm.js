import { useState } from "react"
import blogService from "../services/blogs"
import { login } from "../services/login"
import PropTypes from "prop-types"


const LoginForm = ({
    setUser,
    showNotification
}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await login({ username, password })

            // Save the user object (with token) to local storage
            window.localStorage.setItem("loggedUser", JSON.stringify(user))

            setUser(user)
            setUsername("")
            setPassword("")
            blogService.setToken(user.token)
            showNotification({ message: "Logged in", type: "success" })
        }
        catch (err) {
            showNotification({ message: "wrong credentials", type: "error" })
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={({ target }) => setUsername(target.value)} type="username" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={({ target }) => setPassword(target.value)} type="password" name="password" id="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default LoginForm
