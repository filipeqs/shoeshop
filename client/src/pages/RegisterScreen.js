import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Alert from '../components/Alert';
import Loader from '../components/Loader';

import { register } from '../redux/actions/userActions';

const RegisterScreen = ({ history, location }) => {
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) history.push(redirect);
    }, [history, userInfo, redirect]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) setMessage('Passwords do not match');
        else {
            setMessage('');
            dispatch(register(name, email, password));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h1 className="auth-title mb-1">Register</h1>
                {loading && <Loader />}
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="danger">{message}</Alert>}
                <form onSubmit={handleFormSubmit} className="auth__form">
                    <div className="form-group">
                        <label className="form-label" hidden>
                            Name
                        </label>
                        <FontAwesomeIcon icon={faUser} className="form-icon" />
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" hidden>
                            Email Address
                        </label>
                        <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
                        <input
                            className="form-input"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" hidden>
                            Password
                        </label>
                        <FontAwesomeIcon icon={faKey} className="form-icon" />
                        <input
                            className="form-input"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" hidden>
                            Confirm Password
                        </label>
                        <FontAwesomeIcon icon={faKey} className="form-icon" />
                        <input
                            className="form-input"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn__black mt-2">
                        Register
                    </button>

                    <div className="auth__group mt-3">
                        <Link to="/#">
                            <button type="button" className="btn btn__transparent">
                                Forgot Password?
                            </button>
                        </Link>
                        <Link to="/login">
                            <button type="button" className="btn btn__white">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
