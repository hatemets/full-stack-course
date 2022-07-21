import { useState } from "react"

const Title = () => (<h1>Provide feedback</h1>)

const Button = ({ onPress, title }) => (<button onClick={onPress}>{ title }</button>)

const Statistics = ({ good, bad, neutral }) => {
    const total = () => (good + bad + neutral)
    const hasFeedback = () => total() !== 0
    const average = () => hasFeedback() ? (good - bad) / total() : 0
    const positivePercentage = () => (hasFeedback() ? (good / total()) * 100 : 0) + "%"

    return (<>
        <h2>Statistics</h2>
        <table>
            <tbody>
                <StatisticLine text="Good" value={good} />
                <StatisticLine text="Bad" value={neutral} />
                <StatisticLine text="Neutral" value={bad} />
                <StatisticLine text="Total" value={total()} />
                <StatisticLine text="Average" value={average()} />
                <StatisticLine text="Positive" value={positivePercentage()} />
            </tbody>
        </table>
    </>)
}

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{ text }</td>
        <td>{ value }</td>
    </tr>
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
            {
                (good + bad + neutral) > 0 &&
                    <Statistics good={good} bad={bad} neutral={neutral} />
            }
        </div>
    )
}

export default App
