"use client"
import { createContext, useContext } from "react"

// Import all stores here
import { userStore } from "./UserStore"
import { manageUsersStore } from "./admin/ManageUsersStore"
import { productStore } from "./admin/ProductStore"
import { publicProductsStore } from "./PublicProductsStore"

// Combine stores in one object
const store = {
  userStore,
  manageUsersStore,
  productStore,
  publicProductsStore,
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
