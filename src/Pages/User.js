import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate for React Router v6
import Profile from '../components/Profile';
import WatchList from '../components/WatchList';
import { useAuth } from '../context/AuthContext';

function User() {
    const { currentUser, logOut } = useAuth();
    const navigate = useNavigate(); // Updated to useNavigate

    useEffect(() => {
        if (!currentUser) {
            navigate('/'); // Updated to use navigate
        }
    }, [currentUser, navigate]); // Updated dependency array

    const handleLogout = async () => {
        await logOut();
        navigate('/'); // Updated to use navigate
    };

    return (
        <div className="user-container">
            <Profile handleLogout={handleLogout} />
            <WatchList />
        </div>
    );
}

export default User;
