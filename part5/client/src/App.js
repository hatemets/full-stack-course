import axios from 'axios';
import { useEffect, useState } from "react"
import { Blog } from "./components/Blog"
import { Login } from "./components/Login"
import { Notificiation } from './components/Notification'
import { getAll } from "./services/blogs"
import { login } from './services/login'

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        getAll().then(blogs => setBlogs(blogs))
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await login({ username, password });
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch (err) {
            setErrorMessage("wrong credentials")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    };

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
        <form onSubmit={addBlog}>
            <input value={newBlog} onChange={handleBlogChange} />
            <button type="submit">save</button>
        </form>
    )

    return (
        <div>
            <h1>blogs</h1>

            <Notificiation message={errorMessage} />

            {
                user ? (
                    <div>
                        <p>{user.name} logged in</p>
                        {blogForm()}

                        <ul>
                            {
                                blogs.map(blog => <Blog key={blog.id} blog={blog} />)
                            }
                        </ul>
                    </div>
                )
                : { loginForm() }
            }
        </div>
    )
}

export default App
