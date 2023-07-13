import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }


  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newBlogTitle}
            onChange={handleBlogTitleChange}
            placeholder='write title here'
            id='title-input'
          />
        </div>
        <div>
          author:
          <input
            value={newBlogAuthor}
            onChange={handleBlogAuthorChange}
            placeholder='write author here'
            id='author-input'
          />
        </div>
        <div>
          url:
          <input
            value={newBlogUrl}
            onChange={handleBlogUrlChange}
            placeholder='write url here'
            id='url-input'
          />
        </div>
        <div>
          <button id="add-button" type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm