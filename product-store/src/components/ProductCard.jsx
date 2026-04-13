// // src/components/ProductCard.jsx
// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { addToCart } from '../store/cartSlice'
// import { ShoppingCart } from 'lucide-react'

// function ProductCard({ product }) {
//   const dispatch = useDispatch()

//   const handleAddToCart = () => {
//     dispatch(addToCart({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       image: product.image,
//     }))
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover">
//       <Link to={`/product/${product.id}`}>
//         <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
//           <img 
//             src={product.image} 
//             alt={product.title}
//             className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
//           />
//         </div>
//       </Link>
      
//       <div className="p-4">
//         <Link to={`/product/${product.id}`}>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
//             {product.title}
//           </h3>
//         </Link>
        
//         <div className="flex items-center justify-between mt-3">
//           <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//             ${product.price.toFixed(2)}
//           </span>
          
//           <button
//             onClick={handleAddToCart}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition transform hover:scale-105"
//           >
//             <ShoppingCart className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductCard



// src/components/ProductCard.jsx
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/cartSlice'
import { useToast } from '../contexts/ToastContext'
import { ShoppingCart } from 'lucide-react'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }))
    addToast(`Added "${product.title}" to cart!`, 'success')
  }

  return (

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {/* <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
          /> */}

          <img 
  src={product.image || 'https://via.placeholder.com/150?text=No+Image'} 
  alt={product.title}
  className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
  onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
/>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard