import React from 'react'

const Alert = ({children, variant}) => {
    return (
        <div className={`alert-container alert-container--${variant}`}>
            <span className={`alert__text alert__text--${variant}`}>{children}</span>
        </div>
    )
}

export default Alert
