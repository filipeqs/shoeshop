import React from 'react';
import { useSelector } from 'react-redux';

const AlertMessage = () => {
    const alerts = useSelector((state) => state.alerts);

    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
    );
};

export default AlertMessage;
