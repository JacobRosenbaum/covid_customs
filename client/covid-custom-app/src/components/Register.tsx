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

    const history = useHistory();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        //POST http://localhost:8080/create_account HTTP/1.1
        // Content-Type: application/json

        // {
        //   "username": "smashdev",
        //   "password": "Asdff88f67!"
        // }
        try {
            const response = await fetch('http://localhost:8080/create_account', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
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
            else{
                console.log(response);
            }
        } catch (err: any) {
            setErrors([err.message]);
        }

    }

    return (
        <>
            <Navbar />
            <div id='register-page' className='jumbotron'>
                <h2>Sign Up</h2>
                <Errors errors={errors} />
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
        </>
    );
}

export default Register;