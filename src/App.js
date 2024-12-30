
import './App.css';
import Login from './component/Login';
import {User} from './component/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
        </Routes>
    </Router>
  );
}

export default App;
