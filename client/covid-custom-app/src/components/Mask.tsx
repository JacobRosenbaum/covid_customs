import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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

function Mask() {
    const [masks, setMasks] = useState<any[]>([]);
    const [filteredMasks, setFilteredMasks] = useState<any[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/mask');
                const data = await response.json();
                setMasks(data)
                console.log(data)
                console.log(mask1)
                console.log(mask2)
                console.log(mask3)
                console.log(mask4)
                console.log(mask5)
                console.log(mask6)
                console.log(mask7)
                console.log(mask8)
                console.log(mask9)
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    function sort(s: string) {
        setFilteredMasks(masks.filter(m => m.style.includes(s) ||
            m.material.includes(s) ||
            m.colors.includes(s)
        ));
        console.log(filteredMasks);
        console.log(s)
    }

    return (
        <div className='container'>
            <div className='jumbotron'>
                <h1 className='title'>
                    <a href='shopMask'>Shop Masks</a>
                </h1>
                <div className='row dropdown'>
                    <Dropdown className='col-md-4'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Color
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => (sort('RED'))}>Red</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sort('ORANGE'))}>Orange</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sort('BLUE'))}>Blue</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sort('VIOLET'))}>Violet</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sort('WHITE'))}>White</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sort('BLACK'))}>Black</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sort('GREEN'))}>Green</Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => (sortByColor('INDIGOE'))}>Indigo</Dropdown.Item>
                            <Dropdown.Item onClick={() => (sortByColor('YELLOW'))}>Yellow</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='col-md-4'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Material
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => (
                                sort('POLY_COT'))}>Poly Cot</Dropdown.Item>
                            <Dropdown.Item onClick={() => (
                                sort('POLYESTER'))}>Polyester</Dropdown.Item>
                            <Dropdown.Item onClick={() => (
                                sort('COTTON'))}>Cotton</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='col-md-4'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Style
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => (
                                sort('ATHLETIC'))}>Athletic</Dropdown.Item>
                            <Dropdown.Item onClick={() => (
                                sort('OVER_EAR'))}>Over the Ear</Dropdown.Item>
                            <Dropdown.Item onClick={() => (
                                sort('WRAP'))}>Gator</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="row flexContainer">
                    {filteredMasks.length ? filteredMasks.map(mask => (
                        <div key={mask.maskId} className="col-sm-6 col-m-4 col-12 maskImage">
                            <img id='mask' className="img" src={mask.image} alt="Mask" />
                            <p>
                                ${mask.cost}
                            </p>
                        </div>
                    )) : masks.map(mask => (
                        <div key={mask.maskId} className="col-sm-6 col-m-4 col-12 maskImage">
                            <img id='mask' className="img" src={mask.image} alt="Mask" />
                            <p>
                                ${mask.cost}
                            </p>
                        </div>))}
                </div>
            </div>
        </div>

    );
};

export default Mask;