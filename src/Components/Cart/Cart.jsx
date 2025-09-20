import React, { useState, useEffect, useContext, useRef, use } from 'react'
import { MdClear } from "react-icons/md";
import { Cartcontext } from '../../Context/CartContext';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";

export default function Cart({isOpen , toggleSidebar}) {

  const {  cartItems , updateQuantity , removeFromCart , clearCart }  =     useContext(Cartcontext);
  let [cartValue , setCartValue] = useState(0);
  let [shippingValue , setShippingValue] = useState(0);
  let [isExpress, setIsExpress] = useState(false); 

  let couponInput = useRef();

   let coupons = [
    {code : "FLEX10" , discount : 10},
    {code : "FLEX20" , discount : 20},
    {code : "FLEX30" , discount : 30},
    {code : "FLEX40" , discount : 40},
    {code : "FLEX50" , discount : 50},
    {code : "FLEX60" , discount : 60},
    {code : "FLEX70" , discount : 70},
    {code : "FLEX80" , discount : 80},
    {code : "FLEX90" , discount : 90},
    {code : "FLEX100" , discount : 100},

   ]

   useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);
  
   function calculateTotalPrice() {


    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = total >= 500   ? 0 : 5;
    if (total === 0) {
      setShippingValue(0);
      setCartValue(0);
      return;


      
    }

    let totalPrice =  total + shipping;
    setShippingValue(shipping);
    setCartValue(totalPrice);
  }

  function orderConfirm(){
    if (cartItems.length === 0) {
      toast.error("there is no item in the cart", { duration: 2000 });
      return;
    }
    const orderNumber = "#" + Math.floor(1000000000 + Math.random() * 9000000000);

    Swal.fire({
      title: "Order Confirmed 🎉",
      text: `Your order has been placed successfully!\nOrder Number: ${orderNumber}`,
      icon: "success",
      confirmButtonText: "OK",
    });
    
     clearCart();
    setCartValue(0);
    setShippingValue(0);
  }

 function removeItem(id) {
  removeFromCart(id);
  calculateTotalPrice();
 }
function applyCoupon() {
  if (cartItems.length === 0) {
    return toast.error("Cart is empty", { duration: 2000 });
  }
  let code = couponInput.current.value.trim();
  let coupon = coupons.find((item) => item.code === code);

  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 5;

  if (coupon) {
    toast.success(`Coupon applied: $${coupon.discount} off`, { duration: 2000 });

     
    let totalPrice = subtotal + shipping - coupon.discount;
    if (totalPrice < 0) totalPrice = 0;
      couponInput.current.classList.remove("border-red-500");
      couponInput.current.classList.add("border-green-500");
   
    setShippingValue(shipping);
    setCartValue(totalPrice);
  } else {
    couponInput.current.classList.remove("border-green-500");
    couponInput.current.classList.add("border-red-500");
    return toast.error("Invalid coupon code", { duration: 2000 });
  }
}

function emptyCart() {
  clearCart();
  calculateTotalPrice();
}
function handleQuantityChange(id, change) {
    updateQuantity(id, change);
 }

 function applyExpressShipping() {
  if (cartItems.length === 0) {
    return toast.error("Cart is empty", { duration: 2000 });
  }

  if (shippingValue === 15 || shippingValue === 10) {
    return toast.error("Express Shipping already applied", { duration: 2000 });
  }

  setShippingValue(shippingValue + 10);
  setCartValue(cartValue + 10);
}



  return <>

    <div
        className={`fixed top-0 right-0 h-full w-[35%] bg-gray-300 dark:bg-gray-800 z-20 transform transition-transform duration-500 ease-in-out border-l border-gray-300 dark:border-gray-600 overflow-y-auto p-3 mb-20
        ${isOpen ? "translate-x-0" : "translate-x-full"}`} >
       <div className='flex justify-between '>
       <MdClear
          className="text-4xl font-extrabold  mt-25 ml-4 cursor-pointer dark:text-white hover:text-red-500 hover:scale-110 transition-all duration-300 "
          onClick={toggleSidebar}
        />

        <button onClick={applyExpressShipping} className='sm:px-1 px-4 py-2 rounded-lg bg-amber-400 text-white font-semibold hover:bg-amber-500 transition cursor-pointer mt-25'> Express Shipping </button>
       </div>
       
       {cartItems.map((item) => (
  <div
    key={item.id}
    className="m-4 p-4 rounded-2xl shadow-md bg-white dark:bg-gray-700 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4  "
  >
    
    <div className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-xl border border-gray-300 dark:border-gray-600"
      />
      <div>
        <p className="font-semibold text-gray-800 dark:text-white md:text-sm">
          {item.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 sm:text-xs">
          ${item.price.toFixed(2)} each
        </p>

        <FaTrashAlt onClick={()=> removeItem(item.id)} className='text-sm mt-2 text-red-500 cursor-pointer hover:scale-110 transition-all duration-300' />
      </div>
    </div>

   
    <div className="flex items-center gap-2 self-center sm:self-auto">
      <button onClick={()=> handleQuantityChange(item.id , -1)} className="px-3 py-1 rounded-lg bg-red-400 hover:bg-red-500 cursor-pointer text-lg font-bold  transition">
        -
      </button>
      <p className="w-8 text-center font-semibold text-gray-800 dark:text-white">
        {item.quantity}
      </p>
      <button onClick={()=> handleQuantityChange(item.id , 1)}  className="px-3 py-1 rounded-lg text-lg font-bold  transition bg-green-400 hover:bg-green-500 cursor-pointer ">
        +
      </button>
    </div>

    <p className="text-center sm:text-right font-bold text-gray-900 dark:text-white">
      ${(item.quantity * item.price).toFixed(2)}
    </p>
    
  </div>
))}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
  {/* الجزء الخاص بالـ أسعار */}
  <div>
    <h2 className="dark:text-white text-base md:text-lg">
      Shipping fees : ${shippingValue}
    </h2>
    <h2 className="dark:text-white text-base md:text-lg">
      Total Cart Price: ${cartValue.toFixed(2)}
    </h2>
  </div>

  {/* الجزء الخاص بالـ كوبون */}
  <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-[50%]">
    <input
      ref={couponInput}
      type="text"
      placeholder="Coupon Code"
      className="w-full sm:flex-1 px-3 py-2 rounded-lg border-2 
                 dark:bg-gray-700 dark:text-white 
                 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
    />
    <button
      onClick={applyCoupon}
      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-500 text-white cursor-pointer  font-semibold hover:bg-green-600 transition"
    >
      Apply
    </button>
  </div>
</div>


    <div className='flex space-x-2 mb-40'>
    <button onClick={orderConfirm} className='px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition mt-10 cursor-pointer'>Confirm Order </button>

    <button onClick={emptyCart} className='px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition mt-10 cursor-pointer'>Clear Cart</button>

    </div>
</div>





   

  
  </>
}
