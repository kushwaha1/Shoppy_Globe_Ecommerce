import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
    </div>
  )
}

export default App
