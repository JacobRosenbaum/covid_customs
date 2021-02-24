import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';
import Modal from 'react-modal';



function EditCustomer() {

  const auth = useContext(AuthContext);
  const history = useHistory();

  const [customer, setCustomer] = useState<any>(auth.customer);
  const [error, setErrors] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const handleChange = (event: any) => {
    const updatedCustomer: any = { ...customer };
    updatedCustomer[event.target.name] = event.target.value;
    setCustomer(updatedCustomer);
  };

  const handleSubmitClick = (event: any) => {
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
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          Promise.reject('Something went wrong!');
        }
      })
      .then(data => {
        if (!data) {
          auth.updateCustomer(customer);
          history.push('/account');
        } else {
          setErrors(data);
        }
      })
      .catch(error => console.log(error));


  };

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
      borderColor: "white",
      borderRadius: "6px",
      border: ".5px solid white",
      padding: 5
    }
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }
  return (
    <>
      <Navbar />
      <div className="main">
      <h1>Edit My Info</h1>
      <div id='navigation'>
        <Link className='menu' to="/account">My Info</Link>
        <Link className='menu' to="/cart">View Cart</Link>
        <Link className='menu' to="/order_history">Order History</Link>
          <span className='menu' onClick={openModal}>Logout</span>
      </div>
        <>
          {error.length !== 0 ? (
            <div>
              The following errors were found:
              <ul>
                {error.map((error: any) => (
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
                    <input className="form-control" type='text' id='firstName' name='firstName' value={customer.firstName} onChange={handleChange} placeholder="" />
                    <label htmlFor="firstName">First Name</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input className="form-control" type='text' id='lastName' name='lastName' value={customer.lastName} onChange={handleChange} placeholder="" />
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <label htmlFor='title' className="h4"><strong>Phone Number: </strong></label>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input className="form-control" type='text' id='phone' name='phone' value={customer.phone} onChange={handleChange} placeholder="" />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                </div>
                <div className="col" />
              </div>

              <div className="row">
                <div className="col-2">
                  <label htmlFor='title' className="h4"><strong>Street Address: </strong></label>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input className="form-control" type='text' id='addressLine' name='addressLine' value={customer.addressLine} onChange={handleChange} placeholder="" />
                    <label htmlFor="addressLine">Street Address</label>
                  </div>
                </div>
                <div className="col" />
              </div>

              <div className="row">
                <div className="col-2">
                  <label htmlFor='title' className="h4"><strong>City: </strong></label>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input className="form-control" type='text' id='city' name='city' value={customer.city} onChange={handleChange} placeholder="" />
                    <label htmlFor="city">City</label>
                  </div>
                </div>
                <div className="col" />
              </div>

              <div className="row">
                <div className="col-2">
                  <label htmlFor='title' className="h4"><strong>State: </strong></label>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input className="form-control" type='text' id='state' name='state' value={customer.state} onChange={handleChange} placeholder="" />
                    <label htmlFor="state">State</label>
                  </div>
                </div>
                <div className="col" />
              </div>

              <div className="row">
                <div className="col-2">
                  <label htmlFor='title' className="h4"><strong>Postal Code: </strong></label>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input className="form-control" type='text' id='zipCode' name='zipCode' value={customer.zipCode} onChange={handleChange} placeholder="" />
                    <label htmlFor="zipCode">Postal Code</label>
                  </div>
                </div>
                <div className="col" />
              </div>
              <button id='confirm' type='submit' className="btn btn-primary">Confirm Changes</button>
              {/* <button onClick={handleCancelClick} className="btn btn-danger">Cancel</button> */}
            </div>
          </form>
        </>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false} >
          <div className='sure'>
            Are you sure you want to log out?
          </div>
          <div>
            <button id='no' onClick={closeModal} className="btn btn-primary submitButton">No</button>
          </div>
          <div>
            <a href="/" id='yes' type='button' onClick={auth.logout} className="btn btn-primary submitButton">Yes</a>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EditCustomer;