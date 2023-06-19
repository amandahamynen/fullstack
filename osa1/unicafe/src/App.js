import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.action}>
      {props.name}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.symbol}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.total} />
        <StatisticLine text="average" value ={props.average} />
        <StatisticLine text="positive" value ={props.positiveReviews} symbol={'%'} />
      </table>
      
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const calculateAverage = () => {
    let output = 0
    if (total > 0) {
      output = (good - bad) / total
    }
    return output
  }

  const average = calculateAverage(good, bad, total)

  const calculatePositive = (good, total) => {
    let output = 0
    if (total > 0) {
      output = (good * 100) / total
    }
    return output
  }

  const positiveReviews = calculatePositive(good, total)
  
  const handleGoodClick = () => {
    return (
      setGood(good + 1)
    )
  }

  const handleNeutralClick = () => {
    return (
      setNeutral(neutral + 1)
    )
  }

  const handleBadClick = () => {
    return (
      setBad(bad + 1)
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button action={handleGoodClick} name={'good'}/>
      <Button action={handleNeutralClick} name={'neutral'}/>
      <Button action={handleBadClick} name={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral= {neutral} bad={bad} total={total} average={average} positiveReviews={positiveReviews}/>

    </div>
  )
}

export default App