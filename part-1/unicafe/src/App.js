import { useState } from "react"

const Title = () => (<h1>Provide feedback</h1>)

const Button = ({ onPress, title }) => (<button onClick={onPress}>{ title }</button>)

const Statistics = ({ good, bad, neutral }) => (
    <>
        <h2>Statistics</h2>
        <p style={{ color: "green" }}>Good: { good }</p>
        <p style={{ color: "#333" }}>Neutral: { neutral }</p>
        <p style={{ color: "red" }}>Bad: { bad }</p>
    </>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Title />
            <Button onPress={() => setGood(good + 1)} title="Good" />
            <Button onPress={handleNeutral} title="Neutral" />
            <Button onPress={handleBad} title="Bad" />
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

export default App
