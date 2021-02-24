import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import OrderTable from '../Customer/OrderTable';
import AuthContext from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

function Cart() {

  const auth = useContext(AuthContext);
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [order, setOrder] = useState<any>(auth.order);
  const [error, setErrors] = useState<any>([]);
  const [refresh, setRefresh] = useState<any>(0);

  useEffect(() => {

    updateMaskOrder()
  }, [order]);

  const handleSubtractClick = (event: any) => {
    const updatedOrder: any = { ...order };
    let maskToUpdateIndex = updatedOrder.masks.findIndex((mask: any) => mask.mask.maskId == event.target.value);

    if ((updatedOrder.masks[maskToUpdateIndex].quantity -= 1) <= 0 && updatedOrder.masks.length === 1) {
    }
    else if ((updatedOrder.masks[maskToUpdateIndex].quantity) <= 0) {
      updatedOrder.masks = updatedOrder.masks.filter((mask: any) => mask.mask.maskId != event.target.value);
    }

    setOrder(updatedOrder);
  }


  const handleAddClick = (event: any) => {
    const updatedOrder: any = { ...order };
    let maskToUpdateIndex = updatedOrder.masks.findIndex((mask: any) => mask.mask.maskId == event.target.value);
    updatedOrder.masks[maskToUpdateIndex].quantity += 1;
    setOrder(updatedOrder);
  }

  const handleDeleteClick = (event: any) => {
    const updatedOrder: any = { ...order };
    if (auth.order.masks.length == 1) {

      updatedOrder.masks[0].quantity = 0;
      //updatedOrder.masks
    } else {
      updatedOrder.masks = updatedOrder.masks.filter((mask: any) => mask.mask.maskId != event.target.value);

    }
    toaster.notify("We have deleted this mask from your cart", {
      duration: 4500
    });
    setOrder(updatedOrder);
  }

  const handlePurchaseClick = (event: any) => {
    let today = new Date;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let stringToday = yyyy + '-' + mm + '-' + dd;

    const updatedOrder: any = { ...order };

    updatedOrder.purchased = true;
    updatedOrder.purchaseDate = stringToday;
    setOrder(updatedOrder);
    toaster.notify("Thank you for your purchase!", {
      duration: 4500
    });
  }


  const updateMaskOrder = async () => {

    const body = JSON.stringify(order);


    const response = await fetch(`http://localhost:8080/api/order/${auth.order.orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.user.token}`
      },
      body
    })
    try {
      if (response.status === 200) {
        const data = await response.json();
        auth.updateOrder(data);
        setRefresh(refresh + 1);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data);
      } else {
        Promise.reject('Something went wrong!');
      }

    } catch (error) {
      console.log(error);
    }
  }

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
      <div className="main">
        <h1>Cart</h1>
        {auth.order.masks[0].quantity != 0 ?
          (
            <>
              {/* <h6>orderId: {auth.order.orderId}</h6> */}
              <table className="table">
                <tbody>
                  <tr className='tableTop'>
                    <th>Mask</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Ext. Cost</th>
                  </tr>

                  {auth.order.masks.map((mask: any) => (
                    <tr key={mask.mask.maskId}>
                      <td>
                        <img src={process.env.PUBLIC_URL + mask.mask.image} alt="Mask" width="100" />
                      </td>
                      <td>${mask.mask.cost.toFixed(2)}</td>
                      <td>
                        <button type="button" id='minus' className="btn btn-warning btn-sm" onClick={handleSubtractClick} value={mask.mask.maskId}>-</button>
                        <>
                          {mask.quantity}
                        </>
                        <button type="button" id='plus' className="btn btn-warning btn-sm" onClick={handleAddClick} value={mask.mask.maskId}>+</button>
                      </td>
                      <td>
                        <strong>${(mask.mask.cost * mask.quantity).toFixed(2)}</strong>
                        <button type="button" id='delete' className="btn btn-danger btn-sm" onClick={handleDeleteClick} value={mask.mask.maskId}>x</button>
                      </td>
                    </tr>
                  ))}
                  <tr >
                    <td><strong>SUBTOTAL</strong></td>
                    <td></td>
                    <td></td>
                    <td><strong>${auth.order.total.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
              <div style={{ textAlign: 'center' }}>
                <button id='purchase' className="btn btn-success" onClick={handlePurchaseClick}>Purchase</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link to="/shopMask" className="cartLink">Nothing yet! Check out the merch here!</Link>
            </div>
          )}
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