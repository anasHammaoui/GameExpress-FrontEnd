// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import api from '../api/axios';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const user = JSON.parse(localStorage.getItem('user'));

//       if (!token || !user) return;

//       const res = await api.get(`/v2/client/cart/`);
    
//     setCartItems(res.data.products);
//     setTotal(res.data.totalPrice);
// } catch (err) {
//       console.error('Error fetching cart:', err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cartItems, total, fetchCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
