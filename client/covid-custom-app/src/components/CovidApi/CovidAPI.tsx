import Navbar from '../Navbar';
import { useState, useEffect, useContext } from 'react';
import '../../assets/css/covidApi.css';
import UsaMap from './UsaMap';
import AuthContext from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import shopLinkBanner from '../../assets/images/shopLinkBanner.png';


function CovidAPI() {

  const [data, setData] = useState<any[]>([]);
  //const [stateVar, setStateVar] = useState();
  const [casesByState, setCasesByState] = useState<any>();
  const [deathsByState, setDeathsByState] = useState<any>();
  const [lastUpdateByState, setLastUpdateByState] = useState<any>();
  const [totalCases, setTotalCases] = useState<any>();
  const [totalDeaths, setTotalDeaths] = useState<any>();

  const auth = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await fetch('https://api.covidtracking.com/v1/us/daily.json');
        // const response = await fetch(`https://api.covidtracking.com/v1/states/info.json`);
        const response = await fetch(`https://api.covidtracking.com/v1/states/current.json`);
        const data = await response.json();
        console.log(data);
        setData(data)
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [auth.mapState]);

  useEffect(() => {
    updateStateInfo()
    updateCountryInfo()
    window.scrollTo(0, 50);
  }, [data]);

  const updateStateInfo = () => {
    if (data.length != 0 && auth.mapState !== 0) {

      let stateIndex = data.findIndex((state: any) => state.state == auth.mapState);
      console.log(data)
      console.log(stateIndex)

      setCasesByState(data[stateIndex].positive);
      setDeathsByState(data[stateIndex].death > 0 ? data[stateIndex].death : 0);
      setLastUpdateByState(data[stateIndex].lastUpdateEt);
    }
  }

  const updateCountryInfo = () => {
    if (data.length != 0) {
    
      let casesArray = data.map(e => e.positive)
      const caseReducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
      setTotalCases(casesArray.reduce(caseReducer));

      let deathsArray = data.map(e => (e.death > 0 ? e.death : 0))
      const deathReducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
      setTotalDeaths(deathsArray.reduce(deathReducer));
    }
  }


  return (
    <>
      <div className='container'>
        <Navbar />
      </div>

      <div className="main">
        <h1 id="covidTitle"><strong>Current Covid Conditions</strong></h1>
        <div className='jumbotron'>
          <div id='table'>
            <table className="table table-striped">
              <thead id='head'>
                <tr>
                  <th className='th' scope="col">Location</th>
                  <th className='th' scope="col">Total Cases</th>
                  <th className='th' scope="col">Total Deaths</th>
                  {auth.mapState != 0 ? (<th className='th' scope="col">Last Updated</th>) : (<></>)}
                </tr>
              </thead>
              <tbody>

                <tr>
                  {auth.mapState != 0 ? (<td>{auth.mapState}</td>) : (<td>USA</td>)}
                  {auth.mapState != 0 ? (<td>{casesByState}</td>) : (<td>{totalCases}</td>)}
                  {auth.mapState != 0 ? (<td>{deathsByState}</td>) : (<td>{totalDeaths}</td>)}
                  {auth.mapState != 0 ? (<td>{lastUpdateByState}</td>) : (<></>)}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {auth.mapState != 0 ? (<></>) : (<h2>Select a State: </h2>)}
      </div>
      <div className='mapdiv'>
        <UsaMap />
      </div>

      <div className="img-box">
      <h1 id="covidTitle"><strong>Help Stop The Spread!</strong></h1>
        <Link to="/shopMask">
          <img className="img" src={shopLinkBanner}/>
        </Link>      
      </div>
      

    </>
  );
};

export default CovidAPI;

//banner image do your part