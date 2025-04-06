import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import Swal from 'sweetalert2';

const NavBar = ({ isAdmin }) => {
    const handleHelpButtonClick = e => {
        e.preventDefault();
        Swal.fire({
            title: 'Need Help?',
            html: `
                <p>Email: fleet@gmail.com</p>
                <p>Contact us anytime</p>
            `,
            icon: 'info',
            customClass: {
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-button'
            }
        });
    };

    // const handleLogout = () => {
    //     navigate('/auth');
    // };

    return (
        <div>
            <header className="header_nav">
                <NavLink to={isAdmin ? '/admin' : '/home'}>
                    <div className="logo_nav">
                        <img src="/Logo.png" alt="🚗 FLEET" />
                    </div>
                </NavLink>
                <div className="links_nav">
                    {!isAdmin ? (
                        <>
                            <NavLink to='/home/help' className="help_nav" onClick={handleHelpButtonClick}>Help</NavLink>
                            <NavLink to='/home/active' className="booking_nav">Booking</NavLink>
                            <NavLink to='/auth' className="logout_nav">Logout</NavLink>
                            <NavLink to='/home/profile' className="profile_nav">👤</NavLink>
                            
                        </>
                    ) : (
                        <>
                           <NavLink to='/auth' className="logout_nav">Logout</NavLink>
                            <NavLink to='/admin/profile' className="profile_nav">👤</NavLink>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
};

export default NavBar;