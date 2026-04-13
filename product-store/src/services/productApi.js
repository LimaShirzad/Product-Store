const API_BASE_URL = 'https://dummyjson.com'

export async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=30`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    // ✅ CRITICAL: Map thumbnail to image for every product
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.thumbnail,  // ← Must be here
    }))
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.thumbnail,
    }
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to fetch product details')
  }
}