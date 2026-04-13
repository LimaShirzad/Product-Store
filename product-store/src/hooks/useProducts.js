// src/hooks/useProducts.js
import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts, fetchProductById } from '../services/productApi'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  })
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run if id exists
  })
}