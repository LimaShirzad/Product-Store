// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Load initial cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : { items: [] }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return { items: [] }
  }
}

const initialState = loadCartFromStorage()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state))
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        localStorage.setItem('cart', JSON.stringify(state))
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload)
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    
    clearCart: (state) => {
      state.items = []
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalItems = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer