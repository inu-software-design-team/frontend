import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    return(
    <div className="w-screen h-screen flex flex-col bg-[#F1F5F9]">
    <Router>
        <Routes>
            <Route path={'/'} element={<Start/>} />
            <Route path={'/signup'} element={<Signup/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/Home'} element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
