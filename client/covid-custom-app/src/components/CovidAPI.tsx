import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import '../assets/css/covidApi.css';
import UsaMap from './UsaMap';


function CovidAPI() {

    const [data, setData] = useState<any[]>([]);
    const [state, setState] = useState('');

    // function functionAPI() {
    //     fetchingData().then(json => console.log(json))
    //         .catch(console.log);
    // };
    // const fetchingData = async () => await fetch("https://api.covidtracking.com/v1/us/daily.json")
    //     .then(response => {
    //         console.log(response.status);
    //         if (response.status !== 200) {
    //             return Promise.reject("Agents fetch failed")
    //         }
    //         return response.json();
    //     })

    // functionAPI();

    // functionAPI();

    useEffect(() => {
        const getData = async () => {
            try {
                // const response = await fetch('https://api.covidtracking.com/v1/us/daily.json');
                // const response = await fetch(`https://api.covidtracking.com/v1/states/info.json`);
                const response = await fetch(`https://api.covidtracking.com/v1/states/current.json`);
                const data = await response.json();
                setData(data)
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);


    return (
        <>
            <div className='container'>
              <Navbar />
            </div>
            <div className='container'>
              <h1>Blank Space</h1>
              <h1>Blank Space</h1>
              <h1>Blank Space</h1>
            </div>
            <div className='container'>
              <UsaMap/>
            </div>
            <div className='container'>
                <div className='jumbotron'>
                    <h1 id='covidTitle'>
                        Covid-19
                    </h1>
                    <div id='table'>
                        <table className="table table-striped">
                            <thead id='head'>
                                <tr>
                                    <th scope="col">State</th>
                                    <th scope="col">Total Deaths</th>
                                    <th scope="col">Currently Hospitlized</th>
                                    <th scope="col">Current Positive Cases</th>
                                    <th scope="col">Currently on a Ventilator</th>
                                    <th scope="col">Last Updated</th>
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
                </div>
            </div>
        </>
    );
};

export default CovidAPI;