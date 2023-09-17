import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Common/Homepage/Homepage'
import Aboutpage from './Pages/Common/Aboutpage/Aboutpage'
import Contactpage from './Pages/Common/Contactpage/Contactpage'
import Privacypage from './Pages/Common/Privacypage/Privacypage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path={'/'} element={<Homepage/>} />
      <Route path={'/about'} element={<Aboutpage/>} />
      <Route path={'/contact'} element={<Contactpage/>} />
      <Route path={'/privacy'} element={<Privacypage/>} />
    </Routes>
  )
}

export default App
