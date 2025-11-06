import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
