import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <Router>
        <Routes>
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
