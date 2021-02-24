import { useState, useEffect, useContext } from 'react';
import Navbar from '../Navbar';
import AuthContext from '../AuthContext';
import '../../assets/css/customer.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

function CustomerAccount() {

  const auth = useContext(AuthContext);

  const [customer, setCustomer] = useState<any>([]);
  const [error, setErrors] = useState<any>([0]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/customer/${auth.customerId}`)
      .then(response => response.json())
      .then(data => setCustomer(data))
      .catch(error => console.log(error)); //set errors here?
  }, []);

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
        <h1>My Account</h1>
        <div className="sidenav">
          <Link to="/account">My Info</Link>
          <Link to="/cart">View Cart</Link>
          <Link to="/order_history">Order History</Link>
          <div className='menu' onClick={openModal}>Logout</div>
        </div>
        <div className="row align-items-start m-3">
          <div id='info' className="col m-3">
            <h4 className='customerInfo'><span className='black'>Name: </span>{customer.firstName} {customer.lastName}</h4>
            <h4 className='customerInfo'><span className='black'>Email (username):</span> {customer.email}</h4>
            <h4 className='customerInfo'><span className='black'>Phone: </span>{customer.phone}</h4>
            <h4 className='customerInfo'> <span className='black'>Address: </span>{customer.addressLine} {customer.city}, {customer.state} {customer.zipCode}</h4>
          </div>
          <div className="col m-3 fancyBox red">
            <Link id='update' to="/edit_customer" className="cartLink">Edit My Info</Link>
          </div>
        </div>
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

export default CustomerAccount;