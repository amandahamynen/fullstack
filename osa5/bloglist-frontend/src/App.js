import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('login successful')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 1000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setSuccessMessage('a new blog added')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 1000)
      })
      .catch (error => {
        console.log(error)
        setErrorMessage('title or author missing')
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      })
  }


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes: likes }
    const newBlog = await blogService.update(updatedBlog)
    const newBlogs = (blogs.map(b => b.id !== newBlog.id ? b : newBlog))
    newBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(newBlogs)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete ${blog.title}`)) {
      blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setSuccessMessage(`${blog.title} removed`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 1000)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="add new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default App