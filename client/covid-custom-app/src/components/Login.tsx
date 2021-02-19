
import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';
import Errors from './Errors';
import Navbar from './Navbar';
import '../assets/css/login.css'

function Login() {
    const auth: any = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from: '/' } }: any = location;

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            await auth.authenticate(username, password);
            history.push(from);
        } catch (err) {
            setErrors([err.message]);
        }
    }

    return (
        <>
            <Navbar />
            <div id='login-page' className='jumbotron'>
                <h2>Login</h2>
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
                        <button type="submit">Login</button>
                        <Link to={from}>Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;