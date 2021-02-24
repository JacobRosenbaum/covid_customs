import { Link, useLocation } from 'react-router-dom';

function AdminControls() {
    const location = useLocation();
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">CovidCustoms</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav" >
                            <li className="nav-item">
                                <Link to="/admin/masks" className={`${location.pathname=="/admin/masks" ? "nav-link active" : "nav-link"}`}>Masks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/customers" className={`${location.pathname=="/admin/customers" ? "nav-link active" : "nav-link"}`}>Customers</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/orders" className={`${location.pathname=="/admin/orders" ? "nav-link active" : "nav-link"}`}>Orders</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminControls;