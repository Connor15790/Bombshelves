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
                <Routes>
                    {/* <Route exact path='' element={<div><Navbar/><Popup/></div>}/> -> Render multiple components */}
                    <Route exact path='' Component={Navbar}/>
                    <Route exact path='/register' Component={Register}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
