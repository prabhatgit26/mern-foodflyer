// import React, { useEffect, useState } from 'react'
// import './Orders.css'
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Orders = ({url}) => {

//   const [orders, setOrders] = useState([]);


//   const fetchAllOrders = async () =>{
//     const response = await axios.get(url+"/api/order/list");
//     if(response.data.success){
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }
//     else{
//       toast.error("Error Fetching Orders For Admin Panel.");
//     }
//   }


//   useEffect(()=>{
//     fetchAllOrders();
//   },[url]);


//   return (
//     <div className="h2">
//       <h1>Orders Uploading, Please Wait...!</h1>
//     </div>
//   )
// }

// export default Orders



import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const apiUrl = `${url}/api/order/list`;
      console.log('Attempting to fetch from URL:', apiUrl);

      const response = await axios.get(apiUrl);
      console.log('Response:', response);

      if (response.data.success) {
        setOrders(response.data.data);
        console.log('Orders:', response.data.data);
      } else {
        toast.error('Error Fetching Orders For Admin Panel.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      toast.error('An error occurred while fetching orders.');
    }
  };




const statusHandler = async (event, orderId) =>{
  const response = await axios.post(url+"/api/order/status", {
    orderId,
    status:event.target.value
  })
  if(response.data.success){
    await fetchAllOrders();
  }
  
}




  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Re-run fetch if url changes

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index)=>{
                  if(index === order.items.length-1){
                    return item.name + " x " + item.quantity
                  }
                  else{
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+ " " + order.address.lastName }</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pincode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Rs. {order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
