import React from 'react';

const Loader = () => {
    return (
        <div className="loader-container">
            <object
                className="loader__img"
                data="/images/loading.svg"
                type="image/svg+xml"
                aria-label="loader"
            ></object>
        </div>
    );
};

export default Loader;
