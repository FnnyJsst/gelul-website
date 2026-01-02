// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Helper pour les appels API
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Service d'authentification
export const authService = {
  /**
   * Connexion utilisateur
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    // TODO: Décommenter quand le backend sera prêt
    /*
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    return response
    */

    // Simulation pour le développement
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simuler un échec de connexion si le mot de passe est "error"
    if (password === 'error') {
      throw new Error('Email ou mot de passe incorrect')
    }

    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: null
      }
    }
  },

  /**
   * Inscription utilisateur
   * @param {string} email 
   * @param {string} password 
   * @param {string} name 
   * @returns {Promise<{token: string, user: object}>}
   */
  async register(email, password, name) {
    // TODO: Décommenter quand le backend sera prêt
    /*
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    })
    return response
    */

    // Simulation pour le développement
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simuler un échec si l'email contient "error"
    if (email.includes('error')) {
      throw new Error('Cet email est déjà utilisé')
    }

    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: Date.now(),
        email: email,
        name: name,
        avatar: null
      }
    }
  },

  /**
   * Vérifier le token
   * @param {string} token 
   * @returns {Promise<{user: object}>}
   */
  async verifyToken(token) {
    // TODO: Décommenter quand le backend sera prêt
    /*
    const response = await apiCall('/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response
    */

    // Simulation pour le développement
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      user: {
        id: 1,
        email: 'user@example.com',
        name: 'Utilisateur',
        avatar: null
      }
    }
  },

  /**
   * Mettre à jour le profil utilisateur
   * @param {string} token 
   * @param {object} userData 
   * @returns {Promise<{user: object}>}
   */
  async updateProfile(token, userData) {
    // TODO: Décommenter quand le backend sera prêt
    /*
    const response = await apiCall('/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
    return response
    */

    // Simulation pour le développement
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      user: {
        id: 1,
        ...userData
      }
    }
  },

  /**
   * Demander une réinitialisation de mot de passe
   * @param {string} email 
   * @returns {Promise<{message: string}>}
   */
  async requestPasswordReset(email) {
    // TODO: Décommenter quand le backend sera prêt
    /*
    const response = await apiCall('/auth/password-reset-request', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
    return response
    */

    // Simulation pour le développement
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      message: 'Un email de réinitialisation a été envoyé'
    }
  },

  /**
   * Réinitialiser le mot de passe
   * @param {string} token 
   * @param {string} password 
   * @returns {Promise<{message: string}>}
   */
  async resetPassword(token, password) {
    // TODO: Décommenter quand le backend sera prêt
    /*
    const response = await apiCall('/auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    })
    return response
    */

    // Simulation pour le développement
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      message: 'Votre mot de passe a été réinitialisé'
    }
  }
}

export default authService

