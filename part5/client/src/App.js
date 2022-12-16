import { useEffect, useRef, useState } from "react"
import { Blog } from "./components/Blog"
import { Notificiation } from "./components/Notification"
import blogService from "./services/blogs"
import { LoginForm } from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"


const App = () => {
    const [notification, setNotification] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedUser")

        console.log(blogs)

        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [blogs])

    // Display the notification for 3 seconds
    const showNotification = (notification) => {
        setNotification(notification)

        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

    const handleLogout = (e) => {
        e.preventDefault()

        window.localStorage.removeItem("loggedUser")
        setUser(null)
    }

    return (
        <div>
            <h1>Blogs</h1>

            {
                notification !== null && <Notificiation message={notification.message} type={notification.type} />
            }

            { user === null ?
                <Togglable buttonLabel={"Log in"}>
                    <LoginForm setUser={setUser} showNotification={showNotification} />
                </Togglable>
                :
                <div>
                    <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>

                    {
                        <Togglable buttonLabel={"New blog"} ref={blogFormRef}>
                            <BlogForm blogFormRef={blogFormRef} blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} />
                        </Togglable>
                    }
                </div>
            }

            <div>
                <ul style={{ padding: 0 }}>
                    {
                        user && blogs.map(blog => <Blog key={blog.id} blog={blog} />)
                    }
                </ul>
            </div>
        </div>
    )
}

export default App
