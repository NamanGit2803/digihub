"use client"
import { createContext, useContext } from "react"

// Import all stores here
import { productsStore } from "./ProductsStore"
import { userStore } from "./UserStore"

// Combine stores in one object
const store = {
  productsStore,
  userStore,
}

// Create React Context
const StoreContext = createContext(store)

// Provider component
export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

// Hook to use stores anywhere
export const useStore = () => useContext(StoreContext)
