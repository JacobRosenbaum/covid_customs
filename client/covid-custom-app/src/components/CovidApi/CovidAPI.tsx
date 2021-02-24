import Navbar from '../Navbar';
import { useState, useEffect, useContext } from 'react';
import '../../assets/css/covidApi.css';
import UsaMap from './UsaMap';
import AuthContext from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';


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
      window.scrollTo(0,0);
    }, [data]);

    const updateStateInfo = () => {
      if(data.length != 0 && auth.mapState !== 0) {
        
        console.log("kitty")
        let stateIndex = data.findIndex((state:any) => state.state == auth.mapState);
        console.log(data)
        console.log(stateIndex)

        setCasesByState(data[stateIndex].positive);
        setDeathsByState(data[stateIndex].death > 0 ? data[stateIndex].death : 0);
        setLastUpdateByState(data[stateIndex].lastUpdateEt);
      }
    }

    const updateCountryInfo = () => {
      if(data.length != 0 && auth.mapState !== 0) {
        console.log("puppy")

        let casesArray = data.map(e => e.positive)
        const caseReducer = (accumulator:any, currentValue:any) => accumulator + currentValue;
        setTotalCases(casesArray.reduce(caseReducer));

        let deathsArray = data.map(e => (e.death > 0 ? e.death:0))
        const deathReducer = (accumulator:any, currentValue:any) => accumulator + currentValue;
        setTotalDeaths(deathsArray.reduce(caseReducer));
      }
    }


    return (
        <>
            <div className='container'>
              <Navbar />
            </div>
         
            <div className="main">
            <h1>Check Out Current Covid Conditions Near You</h1>

            {auth.mapState != 0 ? (

              <div className="container">
                <div className="row">
                  <div className="col">
                    <h3>By State</h3>
                  </div>
                  <div className="col">
                    <h3>By Country</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">Location: {auth.mapState}</div>
                  <div className="col">USA</div>
                </div>
                <div className="row">
                  <div className="col">Total Cases: {casesByState}</div>
                  <div className="col">{totalCases}</div>
                </div>
                <div className="row">
                  <div className="col">Total Deaths: {deathsByState}</div>
                  <div className="col">{totalDeaths}</div>
                </div>
                <div className="row">
                  <div className="col">Last Updated: {lastUpdateByState} EST</div>
                </div>
              </div>


          ) : (

            <h2>Select a State: </h2>

          )}
            </div>
            <div className='mapdiv'>
              <UsaMap/>
            </div>

            <div className='container'>
              <Link to="/shopMask">Do Your Part! Help Stop The Spread!</Link>
                {/* <div className='jumbotron'>
                    <h1 id='covidTitle'>
                        Covid-19
                    </h1>
                    <div id='table'>
                        <table className="table table-striped">
                            <thead id='head'>
                                <tr>
                                    <th className='th' scope="col">State</th>
                                    <th className='th' scope="col">Total Deaths</th>
                                    <th className='th' scope="col">Currently Hospitlized</th>
                                    <th className='th' scope="col">Current Positive Cases</th>
                                    <th className='th' scope="col">Currently on a Ventilator</th>
                                    <th className='th' scope="col">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(d => (
                                    <tr key={d.state}>
                                        <td>{d.state}</td>
                                        <td>{d.death > 0 ? d.death : 0}</td>
                                        <td>{d.hospitalizedCurrently > 0 ? d.hospitalizedCurrently : 0}</td>
                                        <td>{d.positive > 0 ? d.positive : 0}</td>
                                        <td>{d.onVentilatorCurrently > 0 ? d.onVentilatorCurrently : 0}</td>
                                        <td>{d.lastUpdateEt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default CovidAPI;