import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [view, setView] = useState(false)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const handleView = () => {
    setView(!view)
  }

  const DeleteBlog = () => {
    try {
      if (blog.user.username === user.username) {
        return (
          <button id="delete-button" onClick={() => handleDelete(blog)}>delete</button>
        )
      } else {
        return ''
      }
    } catch (error) {
      return ''
    }

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className='blogTitle'>
        <p>{blog.title} <button id="view-button" onClick={handleView}>view</button></p>
      </div>
      <div style={showWhenVisible} className='blogMore'>
        <p>{blog.title} <button onClick={handleView}>hide</button></p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button id="like-button" onClick={() => handleLike(blog)}>like</button></p>
        <p>{blog.user.name}</p>
        <p><DeleteBlog /></p>
      </div>
    </div>
  )
}


export default Blog