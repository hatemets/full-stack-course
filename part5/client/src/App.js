import { useEffect, useState } from "react"
import { Blog } from "./components/Blog"
import { Notificiation } from "./components/Notification"
import { login } from "./services/login"
import blogService from "./services/blogs"

const App = () => {
    const [notification, setNotification] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogUrl, setNewBlogUrl] = useState("")

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedUser")

        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [blogs])

    const handleNewBlog = async (e) => {
        e.preventDefault()

        const newBlog = {
            title: newBlogTitle,
            url: newBlogUrl,
            likes: 0
        }

        try {
            const res = await blogService.create(newBlog)
            setBlogs(blogs.concat(res))
            showNotification({ message: "New blog created", type: "success" })
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleBlogChange = (e) => {
    }

    // Display the notification for 3 seconds
    const showNotification = (notification) => {
        setNotification(notification)

        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

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

    const handleLogout = (e) => {
        e.preventDefault()

        window.localStorage.removeItem("loggedUser")
        setUser(null)
    }

    const loginForm = () => (
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

    const blogForm = () => (
        <form onSubmit={handleNewBlog}>
            <div>
                <label htmlFor="title">Title</label>
                <input name="title" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
            </div>
            <div>
                <label htmlFor="url">Url</label>
                <input name="url" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
    )

    return (
        <div>
            <h1>blogs</h1>

            {
                notification !== null && <Notificiation message={notification.message} type={notification.type} />
            }

            { user === null ?
                    loginForm() :
                    <div>
                        <p>{user.name} logged in</p>
                        <button onClick={handleLogout}>Log out</button>
                        { blogForm() }
                    </div>
            }

            <div>
                <ul>
                    {
                        user && blogs.map(blog => <Blog key={blog.id} blog={blog} />)
                    }
                </ul>
            </div>
        </div>
    )
}

export default App
