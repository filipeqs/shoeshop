import Header from './layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import CartScreen from './pages/CartScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProductScreen from './pages/ProductScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import OrderScreen from './pages/OrderScreen';
import OrderListScreen from './pages/OrderListScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <Container>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart" component={CartScreen} />
                <Route path="/checkout" component={CheckoutScreen} />
                <Route path="/orders" component={OrderListScreen} />
                <Route path="/orders/:id" component={OrderScreen} />
            </Container>
        </Router>
    );
};

export default App;
