import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const { data, isError, isLoading } = useQuery('anecdotes', getAnecdotes)
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'CREATE', payload: { content: newAnecdote.content } })
      setTimeout(() => {
        notificationDispatch({ type: null })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR' })
      setTimeout(() => {
        notificationDispatch({ type: null })
      }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
        )
        notificationDispatch({ type: 'VOTE', payload: { content: updatedAnecdote.content } })
        setTimeout(() => {
            notificationDispatch({ type: null })
        }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const votedAnecdote = data.find(a => a.id === anecdote.id)
        const updatedAnecdote = { ...votedAnecdote, votes: anecdote.votes + 1 }
        updateAnecdoteMutation.mutate(updatedAnecdote)
  }

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}/>
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
