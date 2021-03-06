import Header from './layout/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
import ProfileEditScreen from './pages/ProfileEditScreen';
import AdminScreen from './pages/AdminScreen';
import AdminOrderListScreen from './pages/AdminOrderListScreen';
import AdminUserListScreen from './pages/AdminUserListScreen';
import AdminProductListScreen from './pages/AdminProductListScreen';
import AdminProductCreateScreen from './pages/AdminProductCreateScreen';
import AdminProductEditScreen from './pages/AdminProductEditScreen';
import AdminUserEditScreen from './pages/AdminUserEditScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
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
                <Route exact path="/profile/edit" component={ProfileEditScreen} />
                <Route exact path="/orders" component={OrderListScreen} />
                <Route exact path="/orders/:id" component={OrderScreen} />
                <Route exact path="/admin" component={AdminScreen} />
                <Route exact path="/admin/user/:id/edit" component={AdminUserEditScreen} />
                <Route exact path="/admin/userlist" component={AdminUserListScreen} />
                <Route
                    exact
                    path="/admin/userlist/search/:userName"
                    component={AdminUserListScreen}
                />
                <Route
                    exact
                    path="/admin/userlist/search/:userName/:pageNumber"
                    component={AdminUserListScreen}
                />
                <Route exact path="/admin/userlist/:pageNumber" component={AdminUserListScreen} />
                <Route exact path="/admin/product/create" component={AdminProductCreateScreen} />
                <Route exact path="/admin/product/:id/edit" component={AdminProductEditScreen} />
                <Route exact path="/admin/productlist" component={AdminProductListScreen} />
                <Route
                    exact
                    path="/admin/productlist/:pageNumber"
                    component={AdminProductListScreen}
                />
                <Route
                    exact
                    path="/admin/productlist/search/:productName"
                    component={AdminProductListScreen}
                />
                <Route
                    exact
                    path="/admin/productlist/search/:productName/:pageNumber"
                    component={AdminProductListScreen}
                />
                <Route exact path="/admin/orderlist" component={AdminOrderListScreen} />
                <Route exact path="/admin/orderlist/:pageNumber" component={AdminOrderListScreen} />
                <Route
                    exact
                    path="/admin/orderlist/search/:orderNumber"
                    component={AdminOrderListScreen}
                />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
