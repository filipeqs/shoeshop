import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import Alert from '../components/Alert';
import Loader from '../components/Loader';

import {login} from '../redux/actions/userActions'

const LoginScreen = () => {
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.userInfo);
    const { loading, error } = userInfo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h1 className="auth-title mb-1">Sign In</h1>
                {loading && <Loader />}
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleFormSubmit} className="auth__form">
                    <div className="form-group">
                        <label className="form-label" hidden>Email Address</label>
                        <FontAwesomeIcon icon={faUser} className="form-icon" />
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
                        <label className="form-label" hidden>Password</label>
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
          
                    <button type="submit" className="btn btn__black mt-2">Sign In</button>

                    <div className="auth__group mt-3">
                        <button type="button" className="btn btn__transparent">Forgot Password?</button>
                        <button type="button" className="btn btn__white">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen
