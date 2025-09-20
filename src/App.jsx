
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Products from './Components/Products/Products'

function App() {

  const router = createBrowserRouter(
    [ 
      {path: "/" , element: <Layout/> , children : [
      {index: true, element: <Products/>} ,

      ]}  , 
    
    ]
  )


  return <CartContextProvider>
<Toaster
  position="top-center"
  reverseOrder={false}
/>
<RouterProvider router={router}>
        </RouterProvider>
  </CartContextProvider> 
}

export default App
