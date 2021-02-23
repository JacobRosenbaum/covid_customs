import { useContext, useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../assets/css/mask.css';
import Navbar from './Navbar';
import AuthContext from './AuthContext';


function Mask(props: any) {
    const auth = useContext(AuthContext);

    const [masks, setMasks] = useState<any[]>([]);
    const [customerMasks, setCustomerMasks] = useState<any[]>([]);
    const [customer, setCustomer] = useState<any[]>([]);
    const [order, setOrder] = useState<any[]>([]);
    const [filteredMasks, setFilteredMasks] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState<number>(0)
    const [maskId, setMaskId] = useState<number>();
    const [errors, setErrors] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/mask');
                const data = await response.json();
                setMasks(data)
                console.log(data)
                console.log(auth.customerId)

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

    // const getCustomerMasks = async () => {
    //     console.log(auth.user);
    //     console.log(auth.customerId);

    //     try {
    //         const response = await fetch(`http://localhost:8080/api/order/customer/${auth.customerId}`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${auth.user.token}`
    //             },
    //         })
    //         const data = await response.json();
    //         if (response.status === 200) {
    //             if (data[0].orderId) {
    //                 setCustomerMasks(data[0].masks[0]);
    //                 console.log(data[0].masks[0])
    //                 console.log(customerMasks)
    //             }
    //             else {
    //                 console.log('bad status')
    //             }
    //         }
    //         else {
    //             console.log(response)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleAddSubmit = async (maskId: number) => {
        console.log(auth.order)
        if (auth.user.token) {
            // console.log(auth.order[0].masks)
            console.log(auth.order.masks)
            let test = [...auth.order.masks];
            console.log(test)
            test.push({
                maskId,
                quantity: 1
            });
            const newOrder = {
                orderId: auth.order.orderId,
                customer: auth.customer,
                masks: test,
                total: 0.00,
                purchased: false,
                purchaseDate: null
            };
            const body = JSON.stringify(newOrder);

            try {
                console.log(body)
                const response = await fetch(`http://localhost:8080/api/order/${auth.order.orderId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.user.token}`
                    },
                    body
                });
                if (response.status === 200 || response.status === 400) {
                    const data = await response.json();
                    console.log(data)
                    if (response.status === 200) {
                        setErrors([]);
                        auth.updateOrder(data.payload)
                        console.log(data.payload)
                    } 
                    // else if(response.status === 500){

                    // }
                    
                    else if (response.status === 400) {
                        // setErrors(data.messages);
                        // console.log(errors)
                        setErrors(data);
                    }
                
                }
                else {
                    console.log(response.status)
                    let message = 'Error Error! Sorry:(';
                    // setErrors(message)
                    throw new Error(message);
                }
            } catch (e) {
                console.log(e);
            };
        }
        else {
            setErrors('Please log in to purchase our masks!')
            console.log('undefined')
        }
    }
    return (
        <>
            <Navbar cartCount={cartCount} />
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
                                <img id='mask' className="img" src={process.env.PUBLIC_URL + mask.image} alt="Mask" />
                                <p>
                                    ${mask.cost}
                                </p>
                                <button onClick={() => (handleAddSubmit(mask.maskId))} className='btn' id='addButton'>
                                    Add to Cart
                                    </button>
                            </div>
                        )) : masks.map(mask => (
                            <div key={mask.maskId} className="col-sm-6 col-m-4 col-12 maskImage">
                                <img id='mask' className="img" src={process.env.PUBLIC_URL + mask.image} alt="Mask" />
                                <p>
                                    ${mask.cost}
                                </p>
                                <button onClick={() => (handleAddSubmit(mask.maskId))} className='btn' id='addButton'>
                                    Add to Cart
                                    </button>
                            </div>))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Mask;