import banner1 from '../assets/images/covid_banner.png';
import banner2 from '../assets/images/wearmask_banner.png';
import banner3 from '../assets/images/personmask_banner.png';
import customMasks from '../assets/images/personmask_banner.png';
import '../assets/css/home.css';
import Navbar from './Navbar';
import CovidAPI from './CovidApi/CovidAPI';

import { Link } from 'react-router-dom';


function Home() {

    return (

        <>
        <Navbar />
            <div id="carouselExampleDark" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item carsoleHeight active" data-bs-interval="5000">
                        <img src={banner1} className="d-block w-100" alt={banner3} />
                    </div>
                    <div className="carousel-item carsoleHeight" data-bs-interval="5000">
                        <img src={banner3} className="d-block w-100 h-auto" alt={banner1} />
                    </div>
                    <div className="carousel-item carsoleHeight" data-bs-interval="5000">
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
            <div className="covidAPI"> 
              <CovidAPI/>
            </div>
        </>
    );
};

export default Home;