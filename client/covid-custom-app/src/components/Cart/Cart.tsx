import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import OrderTable from '../Customer/OrderTable';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


function Cart() {

  const auth = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [order, setOrder] = useState<any>({});
  const [error, setErrors] = useState<any>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/order/${auth.order.orderId}`)
      .then(response => response.json())
      .then(data => setOrder(data))
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
      padding: 5,
      zIndex: 123456
    }
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  console.log(auth.order);
  //console.log(order);

  return (
    <>
      <Navbar />
      <div className="main">
        <h1>Cart</h1>
        <div id='navigation'>
          <Link className='menu' to="/account">My Info</Link>
          <Link className='menu' to="/cart">View Cart</Link>
          <Link className='menu' to="/order_history">Order History</Link>
          <span className='menu' onClick={openModal}>Logout</span>
        </div>
        {auth.order.masks[0].quantity != 0 ?
          (
            <>
              {/* <h6>orderId: {auth.order.orderId}</h6> */}
              <table className="table">
                <tbody>
                  <tr>
                    <th className='cartHead'>Mask</th>
                    <th className='cartHead'>Cost</th>
                    <th className='cartHead'>Quantity</th>
                    <th className='cartHead'>Ext. Cost</th>
                  </tr>
                  {auth.order.masks.map((mask: any) => (
                    <tr>
                      <td className='cartData'>
                        <img id='mask' src={process.env.PUBLIC_URL + mask.mask.image} alt="Mask" width="100" />
                      </td>
                      <td className='cartData'>$ {mask.mask.cost.toFixed(2)}</td>
                      <td className='cartData'>{mask.quantity}</td>
                      <td className='cartData'>$ {(mask.mask.cost * mask.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  {/* <tr className="bg-warning">
                    <td><strong>TOTAL</strong></td>
                    <td></td>
                    <td></td>
                    <td><strong>$ {auth.order.total.toFixed(2)}</strong></td>
                  </tr> */}
                </tbody>
              </table>
              <div id='total'>
                TOTAL: $ {auth.order.total.toFixed(2)}
              </div>
              {/* <Link className="cartLink" to="/cart">{auth.order.purchaseDate ? "" : "View Order In Cart"}</Link> */}
            </>
          ) : (<h2>No Orders To View</h2>)}
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
}

export default Cart