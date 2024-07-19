import { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS for react-toastify
import { assets } from '../../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async(event,orderId)=>{
    // console.log(event,orderId);
    const response = await  axios.post("http://localhost:4000/status", {
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order-list'>
      <ToastContainer />
      <h2>Order Page</h2>
      {orders.map((order, index) => (
        <div key={index} className='order-item'>
          <img src={assets.parcel_icon} alt="Parcel Icon" />
          <div>
            <p className='order-item-food'>
              {order.items.map((item, itemIndex) => (
                <span key={itemIndex}>
                  {item.name} x {item.quantity}{itemIndex < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
            <div className='order-item-address'>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + "," + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
            </div>
            <p className='order-item-phone'>{order.address.phone}</p>
          </div>
          <p>Items: {order.items.length}</p>
          <p>${order.amount}</p>
          <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
            <option value="Food Processing">Food Processing</option> 
            <option value="Out of delivery">Out of delivery</option> 
            <option value="Delivered">Delivered</option> 
          </select>
        </div>
      ))}
    </div>
  );
}

export default Orders;
