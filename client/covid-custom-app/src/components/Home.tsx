import banner1 from '../assets/images/download.jpg';
import banner2 from '../assets/images/banner.jpg';
import banner3 from '../assets/images/banner2.jpg';
import customMasks from '../assets/images/customization.jpg';
import '../assets/css/home.css';
import Navbar from './Navbar';

import { Link } from 'react-router-dom';


function Home() {

    return (

        <>
        <Navbar />
            <div id="carouselExampleDark" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item carsoleHeight active" data-bs-interval="10000">
                        <img src={banner3} className="d-block w-100" alt={banner3} />
                    </div>
                    <div className="carousel-item carsoleHeight" data-bs-interval="10000">
                        <img src={banner1} className="d-block w-100 h-auto" alt={banner1} />
                    </div>
                    <div className="carousel-item carsoleHeight" data-bs-interval="10000">
                        <img src={banner2} className="d-block w-100" alt={banner2} />
                    </div>
                </div>
                <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container">

                <h1 className="m-5">Welcome to Covid Customs</h1>

                <div className="row align-items-start m-5">
                    <div className="col card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Customize Your Mask</h2>
                            <p className="card-text">Want the freedom to sylize your mask?</p>
                        </div>
                        <div className="img-box"><img src={customMasks} className="card-img-top" alt="..." /></div>
                        <Link to="/shopMask" className="btn btn-danger">Customize Mask</Link>
                    </div>

                    <div className="col card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Get your Mask</h2>
                            <p className="card-text">Check out out latest styles of masks.</p>
                        </div>
                        <div className="img-box"><img src={customMasks} className="card-img-top" alt="..." /></div>
                        <Link to="/shopMask" className="btn btn-danger">Shop Masks </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;