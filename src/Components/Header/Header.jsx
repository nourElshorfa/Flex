import React, { useContext, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
// import { MdClear } from "react-icons/md";
import Marquee from "react-fast-marquee";
import Cart from '../Cart/Cart';
import { Cartcontext } from '../../Context/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
 const {cartItems} = useContext(Cartcontext);

  function toggleSidebar() {
    setIsOpen(!isOpen);

  }



  return (
    <>
<header className="fixed top-0 w-full z-40 bg-black text-white shadow-[0_4px_6px_-1px_rgba(255,255,255,0.3)] dark:text-gray-100 transition-colors duration-300">
  <div className="flex items-center justify-between px-4 py-3">
    <h2 className="text-xl font-bold tracking-wide">
      Flexibility
    </h2>

    <button
      onClick={toggleSidebar}
      className="relative p-2 rounded-full bg-gray-800 text-white hover:scale-110 hover:shadow-lg transition-all duration-300 dark:bg-gray-700 dark:text-gray-200"
    >
      <FaShoppingCart className="w-6 h-6 cursor-pointer hover:text-red-400" />
      <span className={`${cartItems.length == 0 ? "hidden" : "absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"}`}> {cartItems.length == 0 ? "" : cartItems.length}</span>
    </button>
  </div>
  <Marquee speed={200} direction="left" className="bg-green-600 py-2 text-sm font-medium absolute z-40">
      Limited time offer:  Free shipping on orders over $500
    </Marquee>
</header>

    
      <Cart isOpen={isOpen} toggleSidebar={toggleSidebar}/>

    </>
  );
}



// absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center
// {cartItems.length == 0 ? "" : cartItems.length}