import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {

  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)
  
  
  useEffect(() => {
    // Ubicación va desde 1 a 126
    let URL

    if (locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`
    } else {
      const randomIdLocation = Math.floor(Math.random() * 126 + 1)
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`
    }
    axios.get(URL)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })
  }, [locationInput])

  // console.log(location)
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocationInput(e.target.inputSearch.value)
    
  }

  return (
    <div className="App">
     
      <h1 className='h1_center'>Rick and Morty</h1>

      <form  className='form_center' onSubmit={handleSubmit}>
        <input className='input_center' type="text" id="inputSearch" />
        <button className='btn_center'>Search</button>
      </form>
      {
        hasError ?
          <ErrorFetch />
          :
          <>
            <LocationInfo location={location} />

            <div className='redidents-container'>
              {
                location?.residents.map(url => (
                  <ResidentCard key={url} url={url} />
                ))
              }
            </div>
          </>
    
      }
      
    </div>
  )
}

export default App
