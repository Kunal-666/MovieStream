// src/components/SomeComponent.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const SomeComponent = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            {/* {currentUser ? <p>Welcome, {currentUser.email}</p> : <p>Please log in.</p>} */}
        </div>
    );
};

export default SomeComponent;
