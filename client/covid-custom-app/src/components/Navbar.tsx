import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../assets/css/navbar.css';
import AuthContext from './AuthContext';
import { useContext } from 'react';


function Navbar({ cartCount }: any) {
    const auth = useContext(AuthContext);
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">CovidCustoms</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shopMask" className="nav-link">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/aboutUs" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/covidInfo" className="nav-link">Covid Info</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/account" className="nav-link">My Account</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/register" className="nav-link">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li> */}
                            {auth.user.token && (
                                <li className="nav-item" id='user'>
                                        Hello {auth.user.email}
                                    <span className="nav-item" id='logout' onClick={auth.logout}>
                                        Logout
                                    </span>
                                </li>
                            )}
                            {!auth.user.email && (
                                <li>
                                    {/* <li className="nav-item"> */}
                                        <Link to="/login">Login</Link>
                                    {/* </li> */}
                                    <span className="nav-item">
                                        <Link id='signUpLink' to="/register">Sign Up</Link>
                                    </span>
                                </li>
                            )}
                            <div>
                                <li className="nav-item">
                                    <Link to="/shoppingCart" className="nav-link">
                                        <span className="fa-stack fa-2x has-badge" data-count={cartCount}>
                                            <i className="fa fa-shopping-cart fa-stack-2x red-cart"></i>
                                        </span>
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;