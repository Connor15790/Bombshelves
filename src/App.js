import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

function App() {
    return (
        <div className="main">
            <Router>
                {/* <Navbar/> */}
                <Routes>
                    {/* <Route exact path='' element={<div><Navbar/><Popup/></div>}/> -> Render multiple components */}
                    <Route exact path='/' element={<Navbar />} />
                    <Route exact path='/register' element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
