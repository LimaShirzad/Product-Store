// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {


//   return (

//     <>
//        <div className="flex items-center justify-center h-screen bg-gray-100">
//         <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
//   Click Me
// </button>
//       <h1 className="text-4xl font-bold text-blue-600">
//         Tailwind is Working 🚀
//       </h1>
//     </div>
//     </>

//   )

// }

// export default App




// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import SettingsPanel from './components/SettingsPanel'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<SettingsPanel />} />
        </Routes>
      </main>
    </div>
  )
}

export default App