import { createContext, useEffect, useState } from "react";
import { toast }  from "react-hot-toast";


export let Cartcontext = createContext();



export default function CartContextProvider(props){

  const arrProducts = [
    {
      id: "p1",
      image: "/assets/static-images/bag.jpeg",
      name: "Fjallraven Backpack",
      price: 109.95,
    },
    {
      id: "p2",
      image: "/assets/static-images/backBack.jpeg",
      name: "Canvas Backpack",
      price: 89.5,
    },
    {
      id: "p3",
      image: "/assets/static-images/adidasShoes.jpeg",
      name: "Adidas Running Shoes",
      price: 120.0,
    },
    {
      id: "p4",
      image: "/assets/static-images/nikeShoes.jpeg",
      name: "Nike Sneakers",
      price: 135.0,
    },
    {
      id: "p5",
      image: "/assets/static-images/blackWatch.jpeg",
      name: "Black Wrist Watch",
      price: 150.0,
    },
    {
      id: "p6",
      image: "/assets/static-images/blackWatch2.jpeg",
      name: "Luxury Black Watch",
      price: 199.0,
    },
    {
      id: "p7",
      image: "/assets/static-images/glassesBlack.jpeg",
      name: "Classic Black Glasses",
      price: 49.99,
    },
    {
      id: "p8",
      image: "/assets/static-images/glassesBrown.jpeg",
      name: "Brown Frame Glasses",
      price: 59.99,
    },
    {
      id: "p9",
      image: "/assets/static-images/Necklace.jpeg",
      name: "Golden Necklace",
      price: 220.0,
    },
  
    // repeated with different IDs & slight variations
    {
      id: "p10",
      image: "/assets/static-images/bag.jpeg",
      name: "Travel Backpack",
      price: 99.95,
    },
    {
      id: "p11",
      image: "/assets/static-images/backBack.jpeg",
      name: "Casual Backpack",
      price: 79.5,
    },
    {
      id: "p12",
      image: "/assets/static-images/adidasShoes.jpeg",
      name: "Adidas Casual Shoes",
      price: 115.0,
    },
    {
      id: "p13",
      image: "/assets/static-images/nikeShoes.jpeg",
      name: "Nike Air Shoes",
      price: 140.0,
    },
    {
      id: "p14",
      image: "/assets/static-images/blackWatch.jpeg",
      name: "Modern Black Watch",
      price: 155.0,
    },
    {
      id: "p15",
      image: "/assets/static-images/blackWatch2.jpeg",
      name: "Premium Black Watch",
      price: 210.0,
    },
    {
      id: "p16",
      image: "/assets/static-images/glassesBlack.jpeg",
      name: "Retro Black Glasses",
      price: 54.99,
    },
    {
      id: "p17",
      image: "/assets/static-images/glassesBrown.jpeg",
      name: "Light Brown Glasses",
      price: 62.99,
    },
    {
      id: "p18",
      image: "/assets/static-images/Necklace.jpeg",
      name: "Silver Necklace",
      price: 180.0,
    },
    {
      id: "p19",
      image: "/assets/static-images/blackWatch.jpeg",
      name: "Modern Black Watch",
      price: 155.0,
    },
    {
      id: "p20",
      image: "/assets/static-images/blackWatch2.jpeg",
      name: "Premium Black Watch",
      price: 210.0,
    }
  ];


  const [cartItems, setCartItems] = useState([]);

  // أول ما الصفحة تفتح هجيب الداتا من localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);


    function addToCart(id){

      const product = arrProducts.find(item => item.id === id);
    
    if (product) {
     
      const existingItems = localStorage.getItem('cartItems');
      let cartArray = existingItems ? JSON.parse(existingItems) : [];
      
    
      const existingProductIndex = cartArray.findIndex(item => item.id === id);
      
      if (existingProductIndex !== -1) {
         
        if (cartArray[existingProductIndex].quantity >= 5) {
          return toast.error("max quantity to be added is 5" , {
            duration: 2000 ,
          });
        }
        cartArray[existingProductIndex].quantity += 1;
      } else {
       
        cartArray.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      toast.success("Item added to cart" , {
        duration: 2000 , 
      });
       
      localStorage.setItem('cartItems', JSON.stringify(cartArray));
      
      
      setCartItems(cartArray);
      
   
      
    }
   
        
    }


    function updateQuantity(id, change) {
      
      let updatedCart = [...cartItems];
    
      
      const productIndex = updatedCart.findIndex((item) => item.id === id);
    
      if (productIndex !== -1) {
       
        updatedCart[productIndex].quantity += change;
    
       
        if (updatedCart[productIndex].quantity < 1) {
          updatedCart.splice(productIndex, 1);
        }
    
      
        if (updatedCart[productIndex] && updatedCart[productIndex].quantity > 5) {
          updatedCart[productIndex].quantity = 5;
          return toast.error("max quantity is 5", { duration: 2000 });
        }
        toast.success("Item quantity updated", { duration: 2000 });
    
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    }

   
    function removeFromCart(id) {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
    
    function clearCart() {
      if (cartItems.length === 0) return toast.error("Cart is already empty", { duration: 2000 });
      setCartItems([]);
      localStorage.removeItem("cartItems");
      toast.success("Cart cleared", { duration: 2000 });
    }
  
   



    return <Cartcontext.Provider value={ {addToCart , arrProducts , cartItems , updateQuantity , removeFromCart , clearCart }}> 
      {props.children}
    </Cartcontext.Provider>





}