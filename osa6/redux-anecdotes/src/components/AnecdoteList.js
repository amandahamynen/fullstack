import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationNew } from '../reducers/notificationReducer'

const AnecoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes.filter((el) => el.content.toLowerCase().includes(filter.toLowerCase())))
    const dispatch = useDispatch()

    anecdotes.sort((a,b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(updateAnecdote(anecdote))
        dispatch(setNotificationNew(`Voted ${anecdote.content}`, 5))
      }

    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
            )}
        </div>
    )
}

export default AnecoteList