import React, { useContext, useState, useEffect } from 'react'
import { Cartcontext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {


  
  let {addToCart , arrProducts  ,  } = useContext(Cartcontext);
 
   
  function addProduct(id) {
   
    
    addToCart(id);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-25 ">
        {arrProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl shadow-md  transition p-4 flex flex-col items-center bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.3)]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-contain rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3 text-center text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="text-gray-700 font-bold mt-1 dark:text-gray-300">
              ${product.price}
            </p>
            <button onClick={ () => addProduct(product.id)} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full mt-4 transition dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}