import '../assets/css/home.css';
import Navbar from './Navbar';
import CovidAPI from './CovidApi/CovidAPI';
import banner1 from '../assets/images/covid_banner.png';
import banner2 from '../assets/images/wearmask_banner.png';
import banner3 from '../assets/images/personmask_banner.png';

function Home() {

    return (

        <>
        
        <Navbar />
            <br/> <br/><br/>
            <h1 className="welcome"><strong>Welcome to CovidCustoms</strong></h1>
            <br/>
            <div className="covidAPI"> 
              <CovidAPI/>
            </div>
        </>
    );
};

export default Home;