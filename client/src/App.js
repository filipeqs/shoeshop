import Header from './layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Header />
            <Route exact path="/" component={Home} />
        </Router>
    );
};

export default App;
