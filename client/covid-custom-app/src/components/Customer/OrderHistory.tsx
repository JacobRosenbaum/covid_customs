import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Navbar from '../Navbar';
import OrderTable from './OrderTable';
import '../../assets/css/customer.css';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


function OrderHistory() {

  const [orders, setOrders] = useState<any[]>([]);
  const [error, setErrors] = useState<any>([0]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/order/customer/${auth.customerId}`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.log(error));
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
      <div className="sidenav">
        <Link to="/account">My Info</Link>
        <Link to="/cart">View Cart</Link>
        <Link to="/order_history">Order History</Link>
        <div className='menu' onClick={openModal}>Logout</div>
      </div>
      <div>
        <div className="main">
          <h1>Order History</h1>

          <div className="accordion">
            {orders.map(order => (

              (order.masks[0].quantity != 0 ? (

                <div key={order.orderId}>
                  <div className="accordion-item" >
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + order.orderId} aria-expanded="false" aria-controls={"collapse" + order.orderId}>
                        Order: #{order.orderId} - {order.purchaseDate ? (order.purchaseDate) : ("Active")}
                      </button>
                    </h2>
                    <div id={"collapse" + order.orderId} className="accordion-collapse collapse" aria-labelledby={"heading" + order.orderId} >
                      <div className="accordion-body">
                        <OrderTable order={order} />
                      </div>
                    </div>
                  </div>
                </div>

              ) : (

                  <></>))

            ))}
          </div>
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
    </>

  );
};

export default OrderHistory;