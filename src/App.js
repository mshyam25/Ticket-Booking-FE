import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import TheatrePage from './Pages/TheatrePage/TheatrePage'
import TheatresPage from './Pages/Theatres-Page/TheatresPage'

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<h1>Landing Page</h1>} />
        <Route path='/theatres' element={<TheatresPage />} />
        <Route path='/theatres/:id' element={<TheatrePage />} />
      </Routes>
    </main>
  )
}

export default App
