export interface JWTPayload {
  iat: number
  exp: number
  roles: string[]
  username: string
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    // Split the token into parts
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    // Decode the payload (second part)
    const payload = parts[1]
    
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4)
    
    // Decode base64
    const decodedPayload = atob(paddedPayload)
    
    // Parse JSON
    return JSON.parse(decodedPayload) as JWTPayload
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token)
  if (!payload) {
    return true
  }

  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}

export function getUserFromToken(token: string): { email: string; roles: string[] } | null {
  const payload = decodeJWT(token)
  if (!payload) {
    return null
  }

  return {
    email: payload.username,
    roles: payload.roles
  }
}
