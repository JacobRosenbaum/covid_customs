import { useState, useEffect } from 'react';

function OrderTable(props:any) {

  const [masks, setMasks] = useState<any[]>([]);
  const [total, setTotal] = useState<any>(0);





  // useEffect(() => {

  // }, []);

  console.log("all masks per order:")
  console.log(props.order.masks);


  return (
    <>
      <h4>OrderTable Comp</h4>
      <h6>orderId: {props.order.orderId}</h6>
      <table className="table">
        <tbody>
          <tr>
            <th>Mask</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Ext. Cost</th>
          </tr>

          {props.order.masks.map((mask:any) => (
            

            <tr >
            <td>
              <img id='mask' src={process.env.PUBLIC_URL + mask.mask.image} alt="Mask" width="100"/>
            </td>
            <td>$ {mask.mask.cost.toFixed(2)}</td>
            <td>{mask.quantity}</td>
            <td><strong>$ {(mask.mask.cost * mask.quantity).toFixed(2)}</strong></td>


            {/* <td><button className="btn btn-warning" onClick={handleEditClick} value={agent.agentId}>Edit</button></td>
            <td><button className="btn btn-danger" onClick={handleDeleteClick} value={agent.agentId}>Delete</button></td> */}
          </tr>

      ))}
        
        <tr className="bg-warning">
          <td><h5><strong>TOTAL</strong></h5></td>
          <td></td>
          <td></td>
          <td><h5><strong>$ {props.order.total.toFixed(2)}</strong></h5></td>
        </tr>

         </tbody> 
      </table>
    </>

  );

}

export default OrderTable;