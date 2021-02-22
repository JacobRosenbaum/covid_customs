import AdminControls from "./AdminControls";
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../AuthContext';

function AdminOrders() {
    const auth = useContext(AuthContext);

    interface Customer {
        customerId: number;
        firstName: String;
        lastName: String;
        email: String;
        password: String;
        addressLine: String;
        city: String;
        State: String;
        zipCode: number;
        phone: String;
        role: String;
    };

    interface MaskOrder {
        maskId: number;
        quantity: number;
    };

    interface Order {
        orderId: number;
        customer: Customer;
        masks: MaskOrder[];
        total: number;
        purchased: boolean,
        purchaseDate?: Date;
    }

    const [orders, setOrder] = useState<Order[]>([]);

    useEffect(() => {
        getAllCustomers();
     }, []);

    const getAllCustomers = () => {
        fetch('http://localhost:8080/api/order')
            .then(response => response.json())
            .then(data => setOrder(data))
            .catch(error => console.log(error));
    }



    return (
        <>
        <AdminControls/>
        <div className="container">
            <br/><br/><br/>
            <h1>Welcome Admin</h1>
            <h2>Orders Overview</h2>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Total Cost</th>
                            <th>Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                        (<tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.customer.firstName}</td>
                            <td>{order.customer.lastName}</td>
                            <td>{order.total}</td>
                            <td>{order.purchaseDate}</td>
                        </tr>))}
                    </tbody>
                </table>
        </div>
        </>
    );
};

export default AdminOrders;