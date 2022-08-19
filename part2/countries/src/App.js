import axios from "axios"
import { useEffect, useState } from "react"

const kelvinToCelsius = K => K - 273.15

const App = () => {
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(res => setAllCountries(res.data))
            .catch(err => console.error(err))
    }, [])

    const [filtered, setFiltered] = useState([])
    const [allCountries, setAllCountries] = useState([])
    const [weather, setWeather] = useState({})

    const handleQuery = query => {
        setFiltered(allCountries.filter(country => country.name.official.toLowerCase().includes(query.toLowerCase())))
    }
    
    useEffect(() => {
        console.log("running")
        if (filtered.length === 1) {
            const [ country ] = filtered
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${process.env.REACT_APP_API_KEY}`
            console.log(url)

            axios
                .get(url)
                .then(res => { console.log(res.data.weather[0].icon); setWeather(res.data) })
                .catch(err => console.error(err))
        }
        else {
            setWeather({})
        }
    }, [filtered])

    const renderCountries = () => {
        if (filtered.length === 1) {
            const [ country ] = filtered

            return (
                <div>
                    <h2>{ country.name.common }</h2>
                    <p>Capital: { country.capital }</p>
                    <p>Area: { country.area }</p>
                    <h4>Languages:</h4>
                    <ul>
                        {
                            Object.values(country.languages).map(lng => <li key={lng}>{ lng }</li>)
                        }
                    </ul>
                    <img src={country.flags.png} alt="Flag" />

                    {
                        Object.keys(weather).length > 0 && 
                            <div>
                                <h3>Weather in { country.capital }</h3>
                                <p>Temperature: { parseInt(kelvinToCelsius(weather.main.temp), 10) } C</p>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather" />
                                <p>Wind: { weather.wind.speed } m/s</p>
                            </div>
                    }
                </div>
            )
        }
        else if (filtered.length > 1 && filtered.length < 10) {
            return (
                <div>
                    <ul>
                        { filtered.map(country => <li key={country.name.common}>{ country.name.common } <button onClick={() => handleQuery(country.name.official)}>Show</button></li>)}
                    </ul>
                </div>
            )
        }
        else if (filtered.length >= 10) {
            return <div>There are too many matches</div>
        }
    }

    return (
        <div>
            <div>
                Search for countries: <input type="text" onChange={e => handleQuery(e.target.value)} />
            </div>
            <div>
                <h1>Countries</h1>
                {
                    renderCountries()
                }
            </div>
        </div>
    )
}

export default App
