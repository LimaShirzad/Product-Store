import { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state - default to light mode
const initialState = {
  theme: 'light',  // Change default to light
  viewMode: 'grid',
}

// Reducer function
function settingsReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      // Save to localStorage
      localStorage.setItem('theme', newTheme)
      return { ...state, theme: newTheme }
    
    case 'SET_VIEW_MODE':
      localStorage.setItem('viewMode', action.payload)
      return { ...state, viewMode: action.payload }
    
    default:
      return state
  }
}

// Create context
const SettingsContext = createContext()

// Provider component
export function SettingsProvider({ children }) {
  // Load saved theme from localStorage on initial render
  const savedTheme = localStorage.getItem('theme')
  const savedViewMode = localStorage.getItem('viewMode')
  
  const initialStateWithStorage = {
    theme: savedTheme || 'light',  // Use saved theme or default 'light'
    viewMode: savedViewMode || 'grid',
  }
  
  const [state, dispatch] = useReducer(settingsReducer, initialStateWithStorage)

  // Apply theme to document - THIS IS THE CRITICAL PART
  useEffect(() => {
    const htmlElement = document.documentElement
    if (state.theme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    // Also save to localStorage when theme changes
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode })
  }

  const value = {
    theme: state.theme,
    viewMode: state.viewMode,
    toggleTheme,
    setViewMode,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

// Custom hook to use settings
export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}