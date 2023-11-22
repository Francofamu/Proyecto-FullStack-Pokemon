/* components to render */
import LandingPage from './views/landingPage/landingPage';
import Home from './views/home/home';
import Detail from './views/details/details';
import Create from './views/create/create'

import { Routes, Route } from "react-router-dom";


const App = () => {

  return (
    <div className='App'>      
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
    </div>
  )
}

  export default App;