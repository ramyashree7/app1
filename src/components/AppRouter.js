import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Add from './Add'
import App from '../App'
import Edit from './Edit'
function AppRouter() {
  return (
    <BrowserRouter>
    <App>
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/create' element={<Add/>} />
            <Route path='update/:id' element={<Edit/>} />
        </Routes>
        </App>
        </BrowserRouter>
   
  )
}

export default AppRouter