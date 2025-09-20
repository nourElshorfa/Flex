import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {

  const [isDark, setIsDark] = useState(() => {
        
        return localStorage.getItem('darkMode') === 'true';
      });
    
      useEffect(() => {
       
        localStorage.setItem('darkMode', isDark);
        
      
        const htmlElement = document.documentElement;
        
       
        if (isDark) {
          htmlElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
        }
      }, [isDark]);
    
    
    
      const toggleTheme = () => setIsDark(!isDark);



  return <>


<div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
<Header isDark={isDark} toggleTheme={toggleTheme} />
   <Header isDark={isDark} toggleTheme={toggleTheme}/>
   <Outlet/>
   <Footer/>
   </div>

    <button
      onClick={toggleTheme}
      className="cursor-pointer mb-20 fixed bottom-6 right-6 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow-lg hover:scale-110 transition-all z-50" >
      {isDark ? "☀️" : "🌙"}
    </button>
   
  
  </>
}




