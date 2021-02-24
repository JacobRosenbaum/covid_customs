import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Errors from './Errors';
import AuthContext from './AuthContext';
import Navbar from './Navbar';
import '../assets/css/register.css';
import Modal from 'react-modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { allStates } from './States';


function Register() {
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState('');
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
            backgroundColor: "lightgrey",
            color: "white",
            borderRadius: "6px",
            border: "3px solid white",
            padding: 5
        }
    };

    function closeModal() {
        setModalIsOpen(false);
    }

    function openModal() {
        setModalIsOpen(true);
    }

    const history = useHistory();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/customer/create_account', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email: username,
                    password: password,
                    addressLine: address,
                    city,
                    state,
                    zipCode,
                    phone,
                })
            })

            if (response.status === 201) {
                try {
                    await auth.authenticate(username, password);
                    history.push('/');
                } catch (err) {
                    throw new Error('Unknown Error');
                }
            }
            else if (response.status === 400) {
                const data = await response.json();
                setErrors(data);
                closeModal();
                // setErrors(response);
            }
        } catch (err: any) {
            setErrors([err.message]);
            closeModal();
        }

    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div id='body'>
            <Navbar />
            <div id='register-page' className='jumbotron'>
                <h3 className='signUp'>Hey There! </h3>
                <h4 className='signUp'>
                    Let's get you started with your FREE account
                </h4>
                <Errors errors={errors} />
                <div className='row flexContainer'>
                    <div className="form-group col-sm-6 col-m-4 col-12 firstForm">
                        <input required className='form-control' id='userName' type="email" onChange={(event) => setUsername(event.target.value)} placeholder='Email' />
                        <div>
                            <input required className='form-control' id='password' type={passwordShown ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} placeholder='Password' />
                            <i onClick={togglePasswordVisiblity} id='eye' className="fa fa-eye"></i>
                        </div>
                    </div>
                </div>
                <button
                    onClick={openModal
                    }
                    className="btn btn-primary create">Create my Account!</button>
                <h5 className='signUp'>
                    Already have an account with us? <Link to={'/login'}> <span id='clickHere'>Login</span> </Link>
                </h5>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false} >
                    <i id="close" className="fa fa-times" onClick={closeModal}></i>
                    <h1 className='modalTitle'>
                        Just a bit more info!
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row flexContainer'>
                            <div className="form-group col-sm-6 col-m-4 col-12">
                                <input onChange={e => { setFirstName(e.target.value); console.log('first ' + e.target.value) }}
                                    type="text" className="form-control" placeholder="First name" required />
                                <input onChange={e => { setLastName(e.target.value); console.log('last ' + e.target.value) }}
                                    type="text" className="form-control" placeholder="Last name" required />
                                <input onChange={e => { setAddress(e.target.value); console.log('address ' + e.target.value) }}
                                    type="text" className="form-control" placeholder="Address" required />
                                <input onChange={e => { setCity(e.target.value); console.log('city ' + e.target.value) }}
                                    type="text" className="form-control" placeholder="City" required />
                                <select value={state} onChange={(e) => (setState(e.target.value))} id="state" name="state" className="form-select">
                                    {allStates.map(st => (<option value={st.abbreviation}>{st.name}</option>))}
                                </select>
                                <input onChange={e => { setZipCode(e.target.value); console.log('zip ' + e.target.value) }}
                                    type="text" className="form-control" placeholder="Zip code" required />
                                <input onChange={e => { setPhone(e.target.value); console.log('phone ' + e.target.value) }}
                                    type="text" className="form-control" placeholder="Phone number" required />
                            </div>
                        </div>
                        <button type='submit' className="btn btn-primary submitButton">Submit</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Register;