import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, update } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload.id
      const votedAnecdote = state.find(n => n.id === id)
      const changedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1}
      return state.map(a => a.id !== id ? a : changedAnecdote) 
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
      const anecdotes = await getAll()
      dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
      const newAnecdote = await createNew(content)
      dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
      const updatedAnecdote = await update(anecdote)
      dispatch(vote(updatedAnecdote))
  }
}

export const { create, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer