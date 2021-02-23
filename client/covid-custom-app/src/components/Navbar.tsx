import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';
import AuthContext, { AuthContextInterface } from './AuthContext';
import { useContext } from 'react';


function Navbar() {
    
    const auth: AuthContextInterface = useContext(AuthContext);
    const adminExists = () => {
        if (auth.user.email === undefined) {
            return false;
        } else if (auth.user.roles[0] == "ROLE_ADMIN") {
            return true;
        }
        return false;
    }
    const cartCount= () => {
        if(auth.order.masks=== undefined){
            return 0;
        }
        let quantityCount=0;

        for(let i: number=0; i< auth.order.masks.length; i++){
            let quantity=auth.order.masks[i].quantity;
            console.log(quantity);
            quantityCount=  quantity+ quantityCount;
        }
        return quantityCount;
    }
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Link to="/" className="navbar-brand"><b>CovidCustoms</b></Link>
                        <div className="navbar-nav">
                            <div className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/shopMask" className="nav-link">Shop</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/aboutUs" className="nav-link">About Us</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/covidInfo" className="nav-link">Covid Info</Link>
                            </div>
                            {auth.user.email !== undefined && (<div className="nav-item">
                                <Link to="/account" className="nav-link">My Account</Link>
                            </div>)}

                            {adminExists() ? (
                                <div className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin</Link>
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>

            </nav>
            <div className="fixed-top">
                {auth.user.token && (
                    <div className="box-container-logout" id='user'>
                        <div className="float-end">
                            <a href="/" className="nav-link-login" onClick={auth.logout}>
                                Logout
                            </a>
                        </div>
                        <div className="float-end">
                            <p className="nav-link-login color-red"><b>Hello {auth.customerName}!</b></p>
                        </div>

                    </div>
                )}
                {!auth.user.token && (<div className="box-container-login float-end">
                    <div className="float-end">
                        <Link className="nav-link-login" to="/register">Sign Up</Link>
                    </div>
                    <div className="float-end">
                        <Link className="nav-link-login" to="/login">Login</Link>
                    </div>
                </div>
                )}
                <div className="float-end">
                    <Link to="/shoppingCart" className="nav-link fa-stack fa-w-18 fa-1x has-badge " data-count={cartCount()}>
                        <i className="fa fa-shopping-cart fa-w-18 fa-2x red-cart"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;