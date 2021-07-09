import Header from './layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import CartScreen from './pages/CartScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProductScreen from './pages/ProductScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import OrderScreen from './pages/OrderScreen';
import OrderListScreen from './pages/OrderListScreen';
import ReviewProductScreen from './pages/ReviewProductScreen';
import Footer from './layout/Footer';
import ProductBrandScreen from './pages/ProductBrandScreen';
import ProfileScreen from './pages/ProfileScreen';
import EditProfileScreen from './pages/EditProfileScreen';
import AdminScreen from './pages/AdminScreen';
import AdminOrderListScreen from './pages/AdminOrderListScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route exact path="/product/brand/:brand" component={ProductBrandScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/product/:id/review" component={ReviewProductScreen} />
            <Route exact path="/product/:id/:pageNumber" component={ProductScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/checkout" component={CheckoutScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/profile/edit" component={EditProfileScreen} />
            <Route exact path="/orders" component={OrderListScreen} />
            <Route exact path="/orders/:id" component={OrderScreen} />
            <Route exact path="/admin" component={AdminScreen} />
            <Route exact path="/admin/orderlist" component={AdminOrderListScreen} />
            <Route exact path="/admin/orderlist/:pageNumber" component={AdminOrderListScreen} />
            <Footer />
        </Router>
    );
};

export default App;
