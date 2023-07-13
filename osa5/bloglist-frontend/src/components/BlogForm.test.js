import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('Blogform calls its return function with correct information when a new blog is created', async () => {
    const blogFormMock = jest.fn()

    render(<BlogForm createBlog={blogFormMock} />)

    const title = screen.getByPlaceholderText('write title here')
    const author = screen.getByPlaceholderText('write author here')
    const url = screen.getByPlaceholderText('write url here')
    const addButton = screen.getByText('add')

    const user = userEvent.setup()
    await user.type(title, 'title for test')
    await user.type(author, 'author for test')
    await user.type(url, 'url for test')
    await user.click(addButton)

    expect(blogFormMock.mock.calls).toHaveLength(1)
    expect(blogFormMock.mock.calls[0][0].title).toBe('title for test')
    expect(blogFormMock.mock.calls[0][0].author).toBe('author for test')
    expect(blogFormMock.mock.calls[0][0].url).toBe('url for test')
  })

})