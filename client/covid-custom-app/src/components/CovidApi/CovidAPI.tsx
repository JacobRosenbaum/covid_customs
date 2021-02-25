import Navbar from '../Navbar';
import { useState, useEffect, useContext } from 'react';
import '../../assets/css/covidApi.css';
import UsaMap from './UsaMap';
import AuthContext from '../AuthContext';
import { useHistory } from 'react-router-dom';
import shopLinkBanner from '../../assets/images/shopLinkBanner.png';


function CovidAPI() {

  const history= useHistory();
  const [data, setData] = useState<any[]>([]);
  //const [stateVar, setStateVar] = useState();
  const [casesByState, setCasesByState] = useState<any>();
  const [deathsByState, setDeathsByState] = useState<any>();
  const [lastUpdateByState, setLastUpdateByState] = useState<any>();
  const [totalCases, setTotalCases] = useState<any>();
  const [totalDeaths, setTotalDeaths] = useState<any>();

  const auth = useContext(AuthContext);
  const nfObject = new Intl.NumberFormat('en-US');

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
    // window.scrollTo(0, 50);
  }, [data]);

  const updateStateInfo = () => {
    if (data.length != 0 && auth.mapState !== 0) {

      let stateIndex = data.findIndex((state: any) => state.state == auth.mapState);
      console.log(data)
      console.log(stateIndex)

      setCasesByState(data[stateIndex].positive);
      setDeathsByState(data[stateIndex].death > 0 ? data[stateIndex].death : 0);
      setLastUpdateByState(data[stateIndex].lastUpdateEt ? data[stateIndex].lastUpdateEt : "--");
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
      <h1 className="selectState" id="covidTitle"><strong>Current Covid Conditions</strong></h1>
      {auth.mapState != 0 ? (<></>) : (<h1 className="covid-data-box-header">Select a State: </h1>)}
      <div className="row move-me-down">
        <div className="col">
          <div className="covid-data-box">

            {auth.mapState != 0 ? (<p className="covid-data-box-header">{auth.mapState}</p>) : (<p className="covid-data-box-header">USA</p>)}
            <p><strong>Total Cases: </strong>{auth.mapState != 0 ? (<span>{nfObject.format(casesByState)}</span>) : (<span>{nfObject.format(totalCases)}</span>)}</p>
            <p><strong>Total Deaths: </strong> {auth.mapState != 0 ? (<span>{nfObject.format(deathsByState)}</span>) : (<span>{nfObject.format(totalDeaths)}</span>)}</p>
            {auth.mapState != 0 ? (<p><strong>Last Updated: </strong> {auth.mapState != 0 ? (<span>{lastUpdateByState}</span>) : (<></>)}</p>) : (<></>)}


          </div>
        </div>
        <div className="col map-box">
          <UsaMap />
        </div>


      </div>
      <br /><br />
      <div className="big-red-box">
        <p className="selectState2" ><strong>Help Stop The Spread!</strong> </p>
      </div>
      
      
        <br />
      <div className='row dropdown'>
        <div className="col-md-4">
          <img className="mask-images" src={process.env.PUBLIC_URL + "/images/mask_white_cotton_athletic.png"} alt="MaskInterface" />
        </div>
        <div className="col-md-4">
          <img className="mask-images" src={process.env.PUBLIC_URL + "/images/mask_covid_red_cot_ear.png"} alt="MaskInterface" />
        </div>
        <div className="col-md-4">
          <img className="mask-images" src={process.env.PUBLIC_URL + "/images/mask_green_black_polyester_wrap.png"} alt="MaskInterface" />
        </div>
      </div>
      <p onClick={()=> history.push("/shopMask")} className="selectState3"> Wear A Mask<i onClick={()=> history.push("/shopMask")} className="bi-forward-fill fill" ></i> </p> 
      <br />
      



    </>
  );
};

export default CovidAPI;

