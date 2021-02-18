import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../assets/css/navbar.css';

function Navbar({ cartCount }:any) {
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
                            {/* <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link to="/shopMask" className="nav-link">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/aboutUs" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/covidInfo" className="nav-link">Covid Info</Link>
                            </li>
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