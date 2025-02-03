import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'

function App() {

  // const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))
  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem('isDaisDarkMode')) ?? false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);  //here body element will get dark class
  }, [isDark]);

  return (
    <>
      <Header theme={[isDark, setIsDark]} />
      <div className='w-full min-h-screen bg-white border'>
        <Outlet context={[isDark, setIsDark]} />
      </div>
    </>
  )
}

export default App
