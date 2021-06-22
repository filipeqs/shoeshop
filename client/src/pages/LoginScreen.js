import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faKey } from '@fortawesome/free-solid-svg-icons';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h1 className="auth-title">Sign In</h1>
                <form className="auth__form">
                    <div className="form-group">
                        <label className="form-label" hidden>Email Address</label>
                        <FontAwesomeIcon icon={faUser} className="form-icon" />
                        <input 
                            className="form-input" 
                            type="email" 
                            placeholder="Enter Email" 
                            value={email} 
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
