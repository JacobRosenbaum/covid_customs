import { useState} from 'react';

function CovidAPI(){

	const [data, setData] = useState<any[]>([]);

	function functionAPI(){
		fetchingData().then(json => console.log(json))
		.catch(console.log);
	};
	const fetchingData= async()=> await fetch("https://api.covidtracking.com/v1/us/daily.json")
            .then(response => {
				console.log(response.status);
                if (response.status !== 200) {
                    return Promise.reject("Agents fetch failed")
				}
                return response.json();
			})
			
	functionAPI();


            
functionAPI();
    return(
        <>
        <h2>Covid Info</h2>
        </>
    );
};

export default CovidAPI;