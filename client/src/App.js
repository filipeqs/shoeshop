import Header from './layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container">
                <Route exact path="/" component={HomeScreen} />
                <Route path="/login" component={LoginScreen} />
            </div>
        </Router>
    );
};

export default App;
