import HomePage from './pages/HomePage';
import ConnexionPage from './pages/ConnexionPage';
import CreatePostPage from './pages/CreatePostPage';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';


function App () {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<ConnexionPage />}/>
                    <Route path="/HomePage" element={<HomePage />}/>
                    <Route path="/CreatePostPage" element={ <CreatePostPage />}/>
                </Routes>
            </Router>
        </div> )
}

export default App