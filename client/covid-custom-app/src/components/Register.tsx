import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Errors from './Errors';
import AuthContext from './AuthContext';
import Navbar from './Navbar';
import '../assets/css/register.css';


function Register() {
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');



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
                    address,
                    phone,
                    role: ''
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
            else {
                console.log(response);
                // setErrors(response);
            }
        } catch (err: any) {
            setErrors([err.message]);
        }

    }

    return (
        <>
            <Navbar />
            <div id='register-page' className='jumbotron'>
                <h2 id='signUp'>Sign Up</h2>
                <Errors errors={errors} />
                {/* <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                        <Link to={'/login'}>I already have a Login</Link>
                    </div>
                </form> */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setFirstName(event.target.value)} placeholder='First Name' />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setLastName(event.target.value)} placeholder='Last Name' />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setAddress(event.target.value)} placeholder='Address Name' />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setCity(event.target.value)} placeholder='Address Name' />
                    </div>
                                        <div className="form-group">
                        <input type="text" onChange={(event) => setState(event.target.value)} placeholder='Address Name' />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setZipCode(event.target.value)} placeholder='Address Name' />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setPhone(event.target.value)} placeholder='Phone Number' />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setUsername(event.target.value)} placeholder='Username' />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder='Password' />
                    </div>
                    <button type="submit" className="btn btn-primary justify-content-center submitButton">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Register;