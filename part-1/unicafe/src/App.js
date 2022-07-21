import { useState } from "react"

const Title = () => (<h1>Provide feedback</h1>)

const Button = ({ onPress, title }) => (<button onClick={onPress}>{ title }</button>)

const Statistics = ({ good, bad, neutral }) => (
    <>
        <h2>Statistics</h2>
        <p style={{ color: "green" }}>Good: { good }</p>
        <p style={{ color: "#333" }}>Neutral: { neutral }</p>
        <p style={{ color: "red" }}>Bad: { bad }</p>
        <Overview good={good} bad={bad} neutral={neutral} />
    </>
)

const Overview = ({ good, bad, neutral }) => {
    // Average is 0 when no reviews have been given (so as to prevent division by 0 returnin NaN)
    const total = () => (good + bad + neutral)
    const hasFeedback = () => total() !== 0

    return (<>
        <p>Total reviews: { total() }</p>
        <p>Average: { hasFeedback() ? (good - bad) / total() : 0 }</p>
        <p>Positive: { hasFeedback() ? (good / total()) * 100 : 0 }%</p>
    </>)
}

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
            {
                (good + bad + neutral) > 0 &&
                    <Statistics good={good} bad={bad} neutral={neutral} />
            }
        </div>
    )
}

export default App
