// src/components/SettingsPanel.jsx
import { useSettings } from '../contexts/SettingsContext'
import { Sun, Moon, Grid, List } from 'lucide-react'

function SettingsPanel() {
  const { theme, viewMode, toggleTheme, setViewMode } = useSettings()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Theme Mode
              </label>
              <div className="flex gap-4">
                <button
                  onClick={toggleTheme}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition ${
                    theme === 'light'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <Sun className="w-6 h-6" />
                  <span className="font-semibold">Light</span>
                </button>
                
                <button
                  onClick={toggleTheme}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition ${
                    theme === 'dark'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <Moon className="w-6 h-6" />
                  <span className="font-semibold">Dark</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Product Layout
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition ${
                    viewMode === 'grid'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <Grid className="w-6 h-6" />
                  <span className="font-semibold">Grid View</span>
                </button>
                
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition ${
                    viewMode === 'list'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <List className="w-6 h-6" />
                  <span className="font-semibold">List View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 p-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Settings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Theme: <span className="font-semibold capitalize">{theme}</span> | 
            Layout: <span className="font-semibold capitalize">{viewMode} view</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Your preferences are automatically saved in your browser
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel