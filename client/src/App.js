import Header from './layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProductDetails from './pages/ProductDetails';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container">
                <Route exact path="/" component={HomeScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/product/:id" component={ProductDetails} />
            </div>
        </Router>
    );
};

export default App;
