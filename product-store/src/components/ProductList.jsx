import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useProducts } from '../hooks/useProducts'
import { useSettings } from '../contexts/SettingsContext'
import { addToCart } from '../store/cartSlice'
import ProductCard from './ProductCard'
import SkeletonLoader from './SkeletonLoader'
import ErrorMessage from './ErrorMessage'
import { Grid, List, ChevronLeft, ChevronRight, Search } from 'lucide-react'

function ProductList() {
  const { data: products, isLoading, error } = useProducts()
  const { viewMode, setViewMode } = useSettings()
  const dispatch = useDispatch()
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  // Search, Filter, Sort
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('default')

  // Get unique categories
  const categories = useMemo(() => {
    if (!products) return []
    const cats = [...new Set(products.map(p => p.category))]
    return ['all', ...cats]
  }, [products])

  // Filter, search, sort products
  const filteredProducts = useMemo(() => {
    if (!products) return []
    let filtered = [...products]

    // Search by title
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Sort
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOption === 'title-asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOption === 'title-desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title))
    }

    return filtered
  }, [products, searchTerm, selectedCategory, sortOption])

  // Pagination logic
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) return <SkeletonLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Products</h1>

      {/* Search, Filter, Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange() }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange() }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => { setSortOption(e.target.value); handleFilterChange() }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
        </select>

        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition ${
              viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products count */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Found {totalProducts} product{totalProducts !== 1 ? 's' : ''}
      </div>

      {/* Products Display */}
      {currentProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No products match your criteria.</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4">
                  {/* <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto sm:mx-0" /> */}
                 <img 
  src={product.image || 'https://via.placeholder.com/150?text=No+Image'} 
  alt={product.title} 
  className="w-32 h-32 object-contain mx-auto sm:mx-0"
  onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
/>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => dispatch(addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                        }))}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition w-full sm:w-auto"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button onClick={goToPrevPage} disabled={currentPage === 1} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => { setCurrentPage(i+1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`px-3 py-1 rounded-md ${currentPage === i+1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
              {i+1}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {totalProducts > 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
          Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} products
        </div>
      )}
    </div>
  )
}

export default ProductList