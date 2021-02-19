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
      try {
      const response = await fetch('http://localhost:8080/api/customer/create_account', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
      firstName:'fake data',
      lastName: 'fake_data',
      email: username,
      password: password,
      address: 'fake_data',
      phone: 'fake_data',
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