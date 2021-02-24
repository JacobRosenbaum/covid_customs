import AdminControls from "./AdminControls";
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { MaskInterface } from '../Interfaces';

function AdminMasks() {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [masks, setMasks] = useState<MaskInterface[]>([]);

    const getAllMasks = () => {
        fetch('http://localhost:8080/api/mask/admin')
            .then(response => response.json())
            .then(data => setMasks(data))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getAllMasks();
    }, []);

    const redirectEdit = (e: any) => {
        history.push(`/admin/masks/edit/${e.target.value}`);
    }

    const deleteMask = (e: any) => {
        fetch(`http://localhost:8080/api/mask/${e.target.value}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${auth.user.token}`
            },
        })
            .then(response => {
                if (response.status === 204) {
                    getAllMasks();
                } else if (response.status === 404) {
                    Promise.reject(`MaskInterface Id #${e.target.value} not found.`);
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
                <Link to="/admin/masks/add" className="btn btn-primary float-end">Add</Link>
                <h2>Masks Overview</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {masks.map(mask => (<div key={mask.maskId} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <img src={process.env.PUBLIC_URL + mask.image} alt="MaskInterface" className="card-img-top" />
                                <div><h5 className="card-title cost-font">Cost: ${mask.cost.toFixed(2)}</h5>
                                    <p className="card-text">
                                        Style: {mask.style} <br />
                                        Colors: {mask.colors} <br />
                                        Material: {mask.material} <br />
                                        Status: {mask.deleted ? 'Discontinued or Unavaliable' : 'Instock'}</p>
                                </div>
                                <div className="position-absolute top-0 end-0">
                                    {!mask.deleted ? <button onClick={deleteMask} value={mask.maskId} className="btn btn-danger btn-sm m-1">Delete</button> : <></>}
                                    <button onClick={redirectEdit} value={mask.maskId} className="btn btn-info btn-sm">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>
        </>
    );
};

export default AdminMasks;