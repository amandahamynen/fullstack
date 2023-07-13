import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async blog => {
  const updatedBlog = {
    user: blog.user.id,
    author: blog.author,
    likes: blog.likes,
    title: blog.title,
    url: blog.url
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, deleteBlog }