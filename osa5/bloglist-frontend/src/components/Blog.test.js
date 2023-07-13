import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  username: 'tester',
  name: 'Tester'
}

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'Test Url',
  likes: '0',
  user: user
}

describe('<Blog />', () => {
  let container
  const mockLikeHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} handleLike={mockLikeHandler} />
    ).container
  })

  test('renders title and author but not url or likes', () => {
    const div = container.querySelector('.blogTitle')

    expect(div).toBeVisible()
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).not.toHaveTextContent('Test Url')
    expect(div).not.toHaveTextContent('0')

    const divMore = container.querySelector('.blogMore')

    expect(divMore).toHaveTextContent('Component testing is done with react-testing-library')
    expect(divMore).toHaveTextContent('Test Author')
    expect(divMore).toHaveTextContent('Test Url')
    expect(divMore).toHaveTextContent('0')
    expect(divMore).not.toBeVisible
  })

  test('renders everything after view button is clicked', async () => {
    jest.fn()
    const user_test = userEvent.setup()
    const button = screen.getByText('view')

    await user_test.click(button)

    const div = container.querySelector('.blogMore')

    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Test Author')
    expect(div).toHaveTextContent('Test Url')
    expect(div).toHaveTextContent(0)
    expect(div).toHaveTextContent('Tester')
    expect(div).toBeVisible()
  })

  test('when like button is clicked twice, event handler is called twice', async () => {
    jest.fn()
    const user_test = userEvent.setup()
    const viewButton = screen.getByText('view')
    const likeButton = screen.getByText('like')

    await user_test.click(viewButton)

    await user_test.click(likeButton)
    await user_test.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})