import { useState } from "react"

const App = () => {
    const initial = [
        {
            quote: "If it hurts, do it more often.",
            votes: 0
        },
        {
            quote: "Adding manpower to a late software project makes it later!",
            votes: 0
        },
        {
            quote: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
            votes: 0
        },
        {
            quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            votes: 0
        },
        {
            quote: "Premature optimization is the root of all evil.",
            votes: 0
        },
        {
            quote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
            votes: 0
        },
        {
            quote: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
            votes: 0
        }
    ]

    const [anecdotes, setAnecdotes] = useState(initial)
    const [selected, setSelected] = useState(0)

    const handleNext = () => setSelected(Math.round(Math.random() * (anecdotes.length - 1)))
    const handleVote = () => setAnecdotes(anecdotes.map(obj => anecdotes.indexOf(obj) !== selected ? obj : { ...obj, votes: obj.votes + 1 }))


    return (
        <div>
            <button onClick={handleVote}>Vote</button>
            <button onClick={handleNext}>Next anecdote</button>
            <p>Votes: { anecdotes[selected].votes }</p>
            <p>{ anecdotes[selected].quote }</p>
        </div>
    )
}

export default App
