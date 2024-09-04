// import React, { useContext } from "react";
// import "./Cart.css";
// import { StoreContext } from "../../context/StoreContext";

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>Rs. {item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>Rs. {item.price * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>Rs. {getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Charges</p>
//               <p>Rs. {2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>Rs. {getTotalCartAmount()+2}</b>
//             </div>
//           </div>
//           <button>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If You have a promocode, Enter it here.</p>
//             <div className="cart-promocode-input">
//               <input type="text" placeholder="Promocode" />
//               <button type="submit">Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    <span>{cartItems[item._id]}</span>
                    <button onClick={() => addToCart(item._id)}>+</button>
                  </div>
                  <p>Rs. {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>Rs.{getTotalCartAmount()===0?0:149}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs. {getTotalCartAmount()===0?0:getTotalCartAmount() + 149}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
