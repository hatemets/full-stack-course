const Header = ({ course }) => (<h1>{ course }</h1>)

const Part = ({ part }) => (<p>{part.name} {part.exercises}</p>)

const Content = ({ parts }) =>
    <>
        {
            parts.map(part => <Part key={part.id} part={part} />)
        }
    </>

const Total = ({ total }) => (<p style={{ fontWeight: "bold" }}>Number of exercises: {total}</p>)



const Course = ({ course }) => {
    const { name, parts, id } = course
    return <div key={id}>
        <Header course={name} />
        <Content parts={parts} />
        <Total total={parts.map(p => p.exercises).reduce((a, b) => a + b, 0)} />
    </div>
}

export default Course
