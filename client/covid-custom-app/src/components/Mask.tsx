import { useState, useEffect } from 'react';
import '../assets/css/Mask.css';
import mask1 from '../assets/images/mask_blue_polycot_ear.png';
import mask2 from '../assets/images/mask_blue_white_polyester_wrap.jpg';
import mask3 from '../assets/images/mask_black_polycot_ear.png';
import mask4 from '../assets/images/mask_green_black_polyester_wrap.jpg';
import mask5 from '../assets/images/mask_purple_white_black_polycot_ear.webp';
import mask6 from '../assets/images/mask_orange_cotton_athletic.jpg';
import mask7 from '../assets/images/mask_white_cotton_athletic.jpg';
import mask8 from '../assets/images/mask_red_cotton_athletic.jpg';
import mask9 from '../assets/images/mask_red_white_blue_polyester_wrap.jpg';
import { setConstantValue } from 'typescript';


function Mask() {
    const [masks, setMasks] = useState<any[]>([]);
    const [material, setMaterial] = useState();
    const [style, setStyle] = useState();
    const [cost, setCost] = useState();
    const [colors, setColors] = useState([]);

    const first = masks[0];

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/mask');
                const data = await response.json();
                setMasks(data);
                console.log(data)
                console.log(data[0])
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);


    return (
        <div className='container'>
            <div className='jumbotron'>
                <h1 className='title'>
                    Shop Masks
                </h1>
                <div className="row flexContainer">
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                            <img className="img" src={mask1} alt="Mask" />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                    <img className="img" src={mask2} alt="Mask" />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask3} />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask4} />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask5} />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask6} />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask7} />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask8} />
                    </div>
                    <div className="col-sm-6 col-m-4 col-12 maskImage">
                        <img className="img" src={mask9} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mask;