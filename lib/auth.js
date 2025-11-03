// Simple authentication utilities
import { getUserByEmail, createUser } from "./db"

export const hashPassword = (password) => {
  // In production, use bcrypt or similar
  return Buffer.from(password).toString("base64")
}

export const verifyPassword = (password, hash) => {
  return hashPassword(password) === hash
}

export const registerUser = (name, email, password, mobile) => {
  const existingUser = getUserByEmail(email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  const user = createUser({
    name,
    email,
    password: hashPassword(password),
    mobile,
  })

  return user
}

export const loginUser = (email, password) => {
  const user = getUserByEmail(email)
  if (!user) {
    throw new Error("User not found")
  }

  if (!verifyPassword(password, user.password)) {
    throw new Error("Invalid password")
  }

  return user
}

export const generateToken = (userId) => {
  // In production, use JWT
  return Buffer.from(userId).toString("base64")
}

export const verifyToken = (token) => {
  try {
    return Buffer.from(token, "base64").toString()
  } catch {
    return null
  }
}
