const Header = (props) => {
    console.log('Header toimii')
    console.log(props)
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Content = (props) => {
    console.log('Content toimii')
    console.log(props)
    return (
      <div>
         <ul>
          {
            props.parts.map(part => 
              <li key={part.id}>
                {part.name} {part.exercises}
              </li>)
          }
         </ul>
      </div>
    )
  }
  
  const Total = (props) => {
    console.log('Total toimii')
    console.log(props)
  
    const countTotal = () => {
      var total = props.parts.reduce((totalCount, part) => totalCount + part.exercises, 0)
      return (
        total
      )
    }
  
    const total = countTotal()
  
    console.log(total)
  
    return (
      <p> Number of exercises {total}</p>
    )
  }
  
  const Course = (props) => {
    console.log('Course toimii')
    return (
      <div>
         <ul>
          {
            props.courses.map(course =>
              <li key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
              </li>)
          }
         </ul>
       </div>
    )
  }

export default Course