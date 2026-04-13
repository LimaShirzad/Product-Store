import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotalItems } from '../store/cartSlice'
import { useSettings } from '../contexts/SettingsContext'
import { ShoppingCart, Sun, Moon, Settings, Sparkles } from 'lucide-react'

function Navbar() {
  const totalItems = useSelector(selectCartTotalItems)
  const { theme, toggleTheme } = useSettings()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with icon */}
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ShopVibe
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Cart Button with Badge */}
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md group-hover:shadow-lg transition-all duration-300">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            {/* Settings */}
            <Link to="/settings" className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar