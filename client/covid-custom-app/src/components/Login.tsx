
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
    const [passwordShown, setPasswordShown] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from: '/' } }: any = location;

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(username, password);

        try {
            await auth.authenticate(username, password)
            // .then(auth.findCustomerByCustomerEmail())
            // .then(auth.findOrderByCustomerId())
            history.push(from);
        } catch (err) {
            setErrors([err.message]);
        }
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <>
            <Navbar />
            <div id='login-page' className='jumbotron'>
                <h3>Login</h3>
                <Errors errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className='row flexContainer'>
                        <div className="form-group col-sm-6 col-m-4 col-12 firstForm">
                            <input className='form-control' id='userName' type="email" onChange={(event) => setUsername(event.target.value)} placeholder='Email' />
                            <div>
                                <input className='form-control' id='password' type={passwordShown ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} placeholder='Password' />
                                <i onClick={togglePasswordVisiblity} id='loginEye' className="fa fa-eye"></i>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="btn btn-primary create">Login</button>
                    <h5 className='signUp'>
                    Don't have an account yet? <Link to={'/register'}> <span id='clickHere'>Sign Up!</span> </Link>
                </h5>
                </form>
            </div>
        </>
    );
}

export default Login;