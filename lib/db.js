// Mock database - In production, replace with actual database (Supabase, MongoDB, etc.)
const db = {
  users: [],
  products: [],
  orders: [],
  downloads: [],
}

// User operations
export const createUser = (userData) => {
  const user = {
    id: Date.now().toString(),
    ...userData,
    created_at: new Date(),
  }
  db.users.push(user)
  return user
}

export const getUserByEmail = (email) => {
  return db.users.find((u) => u.email === email)
}

export const getUserById = (id) => {
  return db.users.find((u) => u.id === id)
}

// Product operations
export const createProduct = (productData) => {
  const product = {
    id: Date.now().toString(),
    ...productData,
    created_at: new Date(),
  }
  db.products.push(product)
  return product
}

export const getAllProducts = () => {
  return db.products.filter((p) => p.status === "active")
}

export const getProductById = (id) => {
  return db.products.find((p) => p.id === id)
}

export const updateProduct = (id, updates) => {
  const product = db.products.find((p) => p.id === id)
  if (product) {
    Object.assign(product, updates)
  }
  return product
}

// Order operations
export const createOrder = (orderData) => {
  const order = {
    id: Date.now().toString(),
    ...orderData,
    created_at: new Date(),
  }
  db.orders.push(order)
  return order
}

export const getOrdersByUserId = (userId) => {
  return db.orders.filter((o) => o.user_id === userId)
}

export const getOrderById = (id) => {
  return db.orders.find((o) => o.id === id)
}

export const updateOrder = (id, updates) => {
  const order = db.orders.find((o) => o.id === id)
  if (order) {
    Object.assign(order, updates)
  }
  return order
}

// Download operations
export const createDownload = (downloadData) => {
  const download = {
    id: Date.now().toString(),
    ...downloadData,
    download_time: new Date(),
  }
  db.downloads.push(download)
  return download
}

export const getDownloadsByUserId = (userId) => {
  return db.downloads.filter((d) => d.user_id === userId)
}

export const getAllOrders = () => {
  return db.orders
}

export const getAllUsers = () => {
  return db.users
}
