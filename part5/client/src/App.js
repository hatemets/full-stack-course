import { useEffect, useRef, useState } from "react"
import { Blog } from "./components/Blog"
import { Notificiation } from "./components/Notification"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
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

    const handleLike = async (id) => {
        try {
            const newBlog = blogs.find(blog => blog.id === id)
            newBlog.likes++

            // Update the blog in the back-end (user must be ID, as it's expanded in the front-end)
            await blogService.update(id, ({ ...newBlog, user: newBlog.user.id }))

            // Update the blog in the front-end (faster than fetching all blogs from db)
            setBlogs(blogs.map(blog => blog.id === id ? newBlog : blog))
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleBlogDeletion = async (id) => {
        try {
            const confirmation = window.confirm("Do you really wish to delete this post?")

            if (confirmation) {
                await blogService.remove(id)
                setBlogs(blogs.filter(blog => blog.id !== id))
            }
        }
        catch (err) {
            console.log(err)
        }
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
                        user && blogs
                            .sort((blog1, blog2) => blog2.likes - blog1.likes) // Sort by the number of likes (descending)
                            .map(blog => <Blog
                                key={blog.id}
                                blog={blog}
                                handleLike={handleLike}
                                handleBlogDeletion={handleBlogDeletion}
                            />)
                    }
                </ul>
            </div>
        </div>
    )
}

export default App
