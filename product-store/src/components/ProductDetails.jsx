// // src/components/ProductDetails.jsx
// import { useParams, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useProduct } from '../hooks/useProducts'
// import { addToCart } from '../store/cartSlice'
// import LoadingSpinner from './LoadingSpinner'
// import ErrorMessage from './ErrorMessage'
// import { ShoppingCart, ArrowLeft } from 'lucide-react'

// function ProductDetails() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { data: product, isLoading, error } = useProduct(id)

//   if (isLoading) return <LoadingSpinner />
//   if (error) return <ErrorMessage message={error.message} />

//   const handleAddToCart = () => {
//     dispatch(addToCart({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       image: product.image,
//     }))
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <button
//         onClick={() => navigate('/')}
//         className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         Back to Products
//       </button>

//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
//         <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
//           <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 flex items-center justify-center">
//             <img 
//               src={product.image} 
//               alt={product.title}
//               className="max-h-96 w-full object-contain"
//             />
//           </div>
          
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               {product.title}
//             </h1>
            
//             <div className="flex items-center gap-2 mb-4">
//               <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
//                 {product.category}
//               </span>
//             </div>
            
//             <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
//               {product.description}
//             </p>
            
//             <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
//               <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
//                 ${product.price.toFixed(2)}
//               </span>
//               <button
//                 onClick={handleAddToCart}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition transform hover:scale-105"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 Add to Cart
//               </button>
//             </div>
            
//             <div className="text-sm text-gray-500 dark:text-gray-400">
//               <p>✓ Free shipping on orders over $50</p>
//               <p>✓ 30-day return policy</p>
//               <p>✓ In stock, ready to ship</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductDetails



// Add import and useToast inside ProductDetails
// src/components/ProductDetails.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useProduct } from '../hooks/useProducts'
import { addToCart } from '../store/cartSlice'
import { useToast } from '../contexts/ToastContext'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { ShoppingCart, ArrowLeft } from 'lucide-react'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const { data: product, isLoading, error } = useProduct(id)

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} />

  // const handleAddToCart = () => {
  //   dispatch(addToCart({
  //     id: product.id,
  //     title: product.title,
  //     price: product.price,
  //     image: product.image,
  //   }))
  //   // addToast(`Added "${product.title}" to cart!`, 'success')
    
  // }

  // Inside ProductDetails component, add:
// const { addToast } = useToast()

const handleAddToCart = () => {
  dispatch(addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  }))
  addToast(`🛍️ ${product.title} added to cart!`, 'success')
}

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-96 w-full object-contain"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
              <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day return policy</p>
              <p>✓ In stock, ready to ship</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails  // ← THIS LINE IS CRITICAL