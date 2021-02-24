import '../assets/css/aboutUs.css';
import Navbar from './Navbar';
import banner1 from '../assets/images/covid_banner.png';
import banner2 from '../assets/images/wearmask_banner.png';
import banner3 from '../assets/images/personmask_banner.png';
import customMasks from '../assets/images/personmask_banner.png';

function About() {
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
                <div className="move_down">
                    <h1>About Us</h1>
                    <div className="row align-items-start m-3">
                        {/* <div className="col m-3 fancyBox"></div> */}
                        <div className="col m-3 red">
                            <h4 style={{marginTop: '5px'}}>
                                Meet the Developers
                            </h4>
                            <div className='row' style={{marginTop: '25px'}}>
                                <div className= 'col-md-4'>
                                        <a className = 'link' href = 'https://www.linkedin.com/in/jacobrosenbaum/' target='blank'>Austin</a>
                                </div>
                                <div className= 'col-md-4'>
                                        <a className = 'link' href = 'https://www.linkedin.com/in/kendra-krosch/' target='blank'>Kendra</a>
                                </div>
                                <div className= 'col-md-4'>
                                        <a className = 'link' href = 'https://www.linkedin.com/in/austin-shinnick-191257115/' target='blank'>Jacob</a>
                                </div>
                            </div>
                        </div>
                        <div className="col m-3">
                            <p>We were founded in the height of the pandemic hoping to make masks more
                            fun for people to wear. Our company is a non-profit organization and the
                            money that we make goes back into helping with the fight of covid-19. We
                            take out extra money our company makes and puts it toward communities that
                            are having difficulties due to the pandemic. We are hoping that through our
                            sales we can make a difference and hope to have everyone proudly wear a mask
                    of their own design. Help us make a difference by wearing a mask!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;