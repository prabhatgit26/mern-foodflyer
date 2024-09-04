// import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {


//     const [cartItems, setCartItems] = useState({});
    
//     const addToCart = (itemId) => {
//         if(!cartItems[itemId]){
//             setCartItems((prev)=>({...prev,[itemId]:1}))
//         }
//         else{
//             setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//         }
//     }

//     const removeFromCart = (itemId) => {
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//     }


//    const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for(const item in cartItems)
//     {
//         if(cartItems[item]>0){
//             let itemInfo = food_list.find((product)=>product._id === item);
//             totalAmount += itemInfo.price * cartItems[item];
//         }
//     }
//     return totalAmount;
//    }

//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount
//     }
    
//     return(
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider;


// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = "http://localhost:4000";
//   const [token, setToken] = useState("");
//   const [food_list, setFood_list] = useState([]);


//   // Add item to cart
//   const addToCart = async (itemId) => {
//     if(!cartItems[itemId]){
//       setCartItems((prev)=>({...prev,[itemId]:1}))
//     }
//     else{
//       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//     }

//     if(token){
//       await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({...prev, [itemId] :prev[itemId] - 1 }));
//       if(token){
//         await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
//       }
//   };

//   // Calculate total cart amount
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const itemId in cartItems) {
//       if (cartItems[itemId] > 0) {
//         const itemInfo = food_list.find((product) => product._id === itemId);
//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[itemId];
//         }
//       }
//     }
//     return totalAmount;
//   };



//   const fetchFoodList = async()=>{
//     const response = await axios.get(url+"/api/food/list");
//     setFood_list(response.data.data);
//   }


//   const loadCartData = async (token) =>{
//     const response = await axios.get(url+"/api/cart/get", {},{headers:{token}});
//     setCartItems(response.data.cartData);
//   }


//   useEffect(()=>{
//     async function loadData() {
//       await fetchFoodList();
//       if(localStorage.getItem("token")){
//         setToken(localStorage.getItem("token"));
//         await loadCartData(localStorage.getItem("token"));
//       }
//     }
//     loadData();
//   },[])

//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;



import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState([]);
  const [token, setToken] = useState('');
  const url = 'http://localhost:4000';

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        // Optionally handle errors (e.g., show a message to the user)
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newQuantity = (prev[itemId] || 1) - 1;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: {Authorization: `Bearer ${token}`}});
      } catch (error) {
        console.error('Error removing item from cart:', error);
        // Optionally handle errors (e.g., show a message to the user)
      }
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  // Fetch food list from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFood_list(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
      // Optionally handle errors
    }
  };

  // Load cart data
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, { headers: { Authorization: `Bearer ${token}` } });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error('Error loading cart data:', error);
      // Optionally handle errors
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
