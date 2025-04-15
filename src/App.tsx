import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
    return(
    <div className="w-screen h-screen flex flex-col bg-white">
    <Router>
        <Routes>
            <Route path={'/'} element={<Start/>} />
            <Route path={'/signup'} element={<Signup/>} />
            <Route path={'/login'} element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
