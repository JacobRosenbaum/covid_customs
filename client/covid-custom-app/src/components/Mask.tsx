import { useContext, useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../assets/css/mask.css';
import Navbar from './Navbar';
import AuthContext from './AuthContext';
import Modal from 'react-modal';
import Errors from './Errors';

function Mask(props: any) {
    const auth = useContext(AuthContext);

    const [masks, setMasks] = useState<any[]>([]);
    const [customerMask, setCustomerMask] = useState<any>('');
    const [errors, setErrors] = useState<any>([]);
    const [filteredMasks, setFilteredMasks] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "550px",
            height: "550px",
            fontSize: "24px",
            marginTop: "20px",
            backgroundColor: "white",
            color: "firebrick",
            borderColor: "firebrick",
            borderRadius: "6px",
            border: ".5px solid white",
            padding: 5
        }
    };

    function closeModal() {
        setModalIsOpen(false);
    }

    function openModal(mask: any) {
        setModalIsOpen(true);
        setCustomerMask(mask)
    }

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

    const handleAddSubmit = async (maskId: number) => {
        console.log(auth.order)
        if (auth.user.token) {
            // console.log(auth.order[0].masks)
            console.log(auth.order.masks)
            let maskOrder = [...auth.order.masks];
            let updatedQuantity = quantity;
            for (let i = 0; i < maskOrder.length; i++) {
                if (maskOrder[i].mask.maskId == customerMask.maskId) {
                    // maskOrder[i].quantity = quantity + maskOrder[i].quantity
                    updatedQuantity = maskOrder[i].quantity + updatedQuantity;
                    maskOrder.splice(i, 1)
                }
                else if (maskOrder[i].quantity == 0) {
                    maskOrder.splice(i, 1)
                }
            }
            console.log(maskOrder)
            console.log(updatedQuantity)
            maskOrder.push({
                mask: customerMask,
                quantity: updatedQuantity
            });
            const newOrder = {
                orderId: auth.order.orderId,
                customer: auth.customer,
                masks: maskOrder,
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
                        closeModal()
                    }
                    else if (response.status === 400) {
                        setErrors(data);
                        closeModal()
                    }

                }
                else {
                    console.log(response.status)
                    let message = 'Error Error! Sorry:(';
                    closeModal()
                    throw new Error(message);

                }
            } catch (e) {
                console.log(e);
                closeModal()
            };
        }
        else {
            setErrors(['Please log in to purchase our masks!'])
            console.log('undefined')
            closeModal()
        }
    }
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='jumbotron'>
                    <h1 className='title'>
                        Shop Masks
                    </h1>
                    <Errors errors={errors} />
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
                                <button onClick={openModal}
                                    className='btn' id='addButton'>
                                    Add to Cart
                                    </button>
                            </div>
                        )) : masks.map(mask => (
                            <div key={mask.maskId} className="col-sm-6 col-m-4 col-12 maskImage">
                                <img id='mask' className="img" src={process.env.PUBLIC_URL + mask.image} alt="Mask" />
                                <p>
                                    ${mask.cost}
                                </p>
                                <button onClick={() => (openModal(mask))} className='btn' id='addButton'>
                                    Add to Cart
                                    </button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    ariaHideApp={false} >
                                    <i id="closeMask" className="fa fa-times" onClick={closeModal}></i>
                                    <h1 style={{ color: 'gray' }} className='modalTitle'>
                                        {customerMask.material}
                                    </h1>
                                    <form>
                                        <div className='row flexContainer'>
                                            <div className="form-group col-sm-6 col-m-4 col-12">
                                                <img id='customerMask' className="img" src={process.env.PUBLIC_URL + customerMask.image} alt="Mask" />
                                                <p id='cost'>
                                                    ${customerMask.cost}
                                                </p>
                                                <input id='quantity' onChange={e => { setQuantity(parseInt(e.target.value)); console.log('quantity ' + e.target.value) }}
                                                    type="number" min="1" className="form-control" placeholder="Quanity" />
                                            </div>
                                        </div>
                                        <button onClick={() => (handleAddSubmit(customerMask))} type='button' className="btn btn-primary submitButton">Add to Cart</button>
                                    </form>
                                </Modal>
                            </div>))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mask;