const Header = ({ course }) => (<h1>{ course }</h1>)

const Part = ({ part }) => (<p>{part.name} {part.exercises}</p>)

const Content = ({ parts }) =>
    (<>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />
    </>)

const Total = ({ total }) => (<p>Number of exercises {total}</p>)


const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)} />
        </div>
    )
}

export default App
