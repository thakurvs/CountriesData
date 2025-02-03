import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/index.js'
import Home from './components/Home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import ContinentsGraph from './components/ContinentsGraph/ContinentsGraph.jsx'
import Heatmap from './components/HeatMap/Heatmap.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/continents' element={<ContinentsGraph />} />
      <Route path='/heatmap' element={< Heatmap />}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
