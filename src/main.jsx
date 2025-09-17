import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"
import { HashRouter as Router,Routes,Route } from 'react-router-dom'
import App from './App.jsx'
import PkmDetails from './pages/PkmDetails.jsx'
import PkmIndex from './pages/PkmIndex.jsx'
import AboutMe from './pages/AboutMe.jsx'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<PkmIndex/>}/>
          <Route path='/pokemon/:name' element={<PkmDetails/>}/>
          <Route path='about-me' element={<AboutMe/>}/>
        </Route>
      </Routes>
    </Router>
)
