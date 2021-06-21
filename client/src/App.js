import Header from './layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container">
                <Route exact path="/" component={HomeScreen} />
            </div>
        </Router>
    );
};

export default App;
