import AdminControls from "./AdminControls";
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../AuthContext';

function AdminCustomer() {
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
    }

    const [customers, setCustomer] = useState<Customer[]>([]);

    useEffect(() => {
        getAllCustomers();
     }, []);

    const getAllCustomers = () => {
        fetch('http://localhost:8080/api/customer')
            .then(response => response.json())
            .then(data => setCustomer(data))
            .catch(error => console.log(error));
    }

    const deleteCustomer = (e: any) => {
        fetch(`http://localhost:8080/api/customer/${e.target.value}`, {
            method: "DELETE",
            //   headers: {
            //     "Authorization": `Bearer ${auth.user.token}`
            //   },  
        })
            .then(response => {
                if (response.status === 204) {
                    getAllCustomers();
                } else if (response.status === 404) {
                    Promise.reject(`Customer Id #${e.target.value} not found.`);
                } else {
                    Promise.reject('Something went wrong!');
                }
            })
            .catch(error => console.log(error));
    };


    return (
        <>
            <AdminControls />
            <div className="container">
                <br /><br /><br />
                <h1>Welcome Admin</h1>
                <h2>Customer Overview</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer =>
                        (<tr key={customer.customerId}>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button type="button" value={customer.customerId} className="btn btn-outline-danger float-end me-1"
                                    onClick={deleteCustomer}>Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminCustomer;