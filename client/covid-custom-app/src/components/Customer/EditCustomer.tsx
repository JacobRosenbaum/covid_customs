import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';



function EditCustomer() {

  var ORGINAL_CUSTOMER:any; 

  const auth = useContext(AuthContext);
  const history = useHistory();

  const [customer, setCustomer] = useState<any>({...auth.customer});
  const [error, setErrors] = useState<any>([]);


  ORGINAL_CUSTOMER = customer;

  const handleChange = (event:any) => {
    const updatedCustomer: any ={...customer};
    updatedCustomer[event.target.name] = event.target.value;
    setCustomer(updatedCustomer);
  };

  const handleSubmitClick = (event:any) => {
    event.preventDefault();

    const body = JSON.stringify(customer);

    fetch(`http://localhost:8080/api/customer/${auth.customerId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.user.token}`
      },
      body
    })
      .then(response => {
          if (response.status === 204) {
              
              //history.push('/account')
            console.log("kitty")

            return null;
          } else if (response.status === 400) {
            setCustomer(ORGINAL_CUSTOMER);
              return response.json();
          } else {
              Promise.reject('Something went wrong!');
          }
      })
      .then(data => {
          if (!data) {
            console.log(customer);
            const cust = {...customer}
            console.log(cust);
            auth.updateCustomer(cust);
              history.push('/account');
          } else {
              setErrors(data);
          }
      })
      .catch(error => console.log(error));


  };
  



  return (
    <>
      <Navbar/>
      <div className="sidenav">
        <Link to="/account">My Info</Link>
        <Link to="/cart">View Cart</Link>
        <Link to="/order_history">Order History</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <div className="main">
        <h1><strong>Edit User Info</strong></h1>

        <>
        {error.length !== 0 ? (
            <div>
            The following errors were found:
            <ul>
              {error.map((error:any) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
          ) : (
            <></>
          )}
          
        <form onSubmit={handleSubmitClick}>
          <div className="container">

            <div className="row">
              <div className="col-2">
                <label htmlFor='title' className="h4"><strong>Name: </strong></label>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='firstName' name='firstName' value={customer.firstName} onChange={handleChange}  placeholder=""/>
                  <label htmlFor="firstName">First Name</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='lastName' name='lastName' value={customer.lastName} onChange={handleChange} placeholder=""/>
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
            </div>
          
            <div className="row">
              <div className="col-2">
                <label htmlFor='title' className="h4"><strong>Phone #: </strong></label>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='phone' name='phone' value={customer.phone} onChange={handleChange}  placeholder=""/>
                  <label htmlFor="phone">Phone #</label>
                </div>
              </div>
              <div className="col"/>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor='title' className="h4"><strong>Street Address: </strong></label>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='addressLine' name='addressLine' value={customer.addressLine} onChange={handleChange} placeholder=""/>
                  <label htmlFor="addressLine">Street Address</label>
                </div>
              </div>
              <div className="col"/>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor='title' className="h4"><strong>City: </strong></label>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='city' name='city' value={customer.city} onChange={handleChange} placeholder=""/>
                  <label htmlFor="city">City</label>
                </div>
              </div>
              <div className="col"/>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor='title' className="h4"><strong>State: </strong></label>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='state' name='state' value={customer.state} onChange={handleChange} placeholder=""/>
                  <label htmlFor="state">State</label>
                </div>
              </div>
              <div className="col"/>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor='title' className="h4"><strong>Postal Code: </strong></label>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input className="form-control" type='text' id='zipCode' name='zipCode' value={customer.zipCode} onChange={handleChange} placeholder=""/>
                  <label htmlFor="zipCode">Postal Code</label>
                </div>
              </div>
              <div className="col"/>
            </div>
          
            <button type='submit' className="btn btn-primary">Confirm Changes</button>
            {/* <button onClick={handleCancelClick} className="btn btn-danger">Cancel</button> */}
          </div>
        </form>
      </>
    </div>








  </>

  );
};

export default EditCustomer;