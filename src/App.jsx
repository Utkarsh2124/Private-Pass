import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='min-h-[88vh]'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
