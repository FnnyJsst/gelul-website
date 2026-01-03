// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// 🔧 MODE DÉVELOPPEMENT - Mettre à true pour utiliser les données mockées
const USE_MOCK_DATA = true;

// ==================== DONNÉES MOCKÉES ====================

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: 'Mobilier',
    slug: 'mobilier',
    description: 'Meubles et éléments d\'ameublement pour votre intérieur',
    productCount: 8
  },
  {
    id: 2,
    name: 'Objet de décoration',
    slug: 'objet-de-decoration',
    description: 'Objets décoratifs pour embellir votre espace',
    productCount: 12
  }
];

const MOCK_PRODUCTS = [
  // MOBILIER
  {
    id: 1,
    name: 'Banc Boiban',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Banc en bois massif, finition naturelle',
    price: '390.00',
    image: 'src/assets/images/banc2.jpg',
    stock: 5,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 2,
    name: 'Tabouret Sertium',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Tabouret en bois tourné, style scandinave',
    price: '190.00',
    image: 'src/assets/images/wooden-stool.jpg',
    stock: 8,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 3,
    name: 'Chaise Design',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Chaise moderne avec assise rembourrée',
    price: '250.00',
    image: 'src/assets/images/banc2.jpg',
    stock: 12,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 4,
    name: 'Table Basse',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Table basse en chêne massif',
    price: '450.00',
    image: 'src/assets/images/wooden-stool.jpg',
    stock: 3,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 5,
    name: 'Étagère Murale',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Étagère murale en bois recyclé',
    price: '120.00',
    image: 'src/assets/images/banc2.jpg',
    stock: 15,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 6,
    name: 'Fauteuil Confort',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Fauteuil confortable en tissu',
    price: '380.00',
    image: 'src/assets/images/wooden-stool.jpg',
    stock: 6,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 7,
    name: 'Console Entrée',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Console fine pour entrée, style épuré',
    price: '280.00',
    image: 'src/assets/images/banc2.jpg',
    stock: 4,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 8,
    name: 'Bureau Compact',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Bureau compact idéal pour petits espaces',
    price: '420.00',
    image: 'src/assets/images/wooden-stool.jpg',
    stock: 7,
    isCustomizable: true,
    availableColors: []
  },
  
  // OBJETS DE DÉCORATION
  {
    id: 9,
    name: 'Pot de fleur Vinyle',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Pot de fleur unique fabriqué à partir de vinyles recyclés',
    price: '39.00',
    image: 'src/assets/images/pot.jpg',
    stock: 20,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 10,
    name: 'Vase Artisanal',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Vase en céramique fait main',
    price: '65.00',
    image: 'src/assets/images/pot.jpg',
    stock: 15,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 11,
    name: 'Miroir Rond',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Miroir rond avec cadre en rotin',
    price: '85.00',
    image: 'src/assets/images/pot.jpg',
    stock: 10,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 12,
    name: 'Cadre Photo Vintage',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Cadre photo style vintage en métal',
    price: '28.00',
    image: 'src/assets/images/pot.jpg',
    stock: 25,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 13,
    name: 'Bougeoir Design',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Bougeoir moderne en laiton',
    price: '45.00',
    image: 'src/assets/images/pot.jpg',
    stock: 18,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 14,
    name: 'Coussin Décoratif',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Coussin avec motifs géométriques',
    price: '32.00',
    image: 'src/assets/images/pot.jpg',
    stock: 30,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 15,
    name: 'Suspension Luminaire',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Suspension en papier japonais',
    price: '78.00',
    image: 'src/assets/images/pot.jpg',
    stock: 12,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 16,
    name: 'Plaid Doux',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Plaid en laine mérinos',
    price: '95.00',
    image: 'src/assets/images/pot.jpg',
    stock: 14,
    isCustomizable: true,
    availableColors: []
  },
  {
    id: 17,
    name: 'Horloge Murale',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Horloge murale silencieuse, design minimaliste',
    price: '55.00',
    image: 'src/assets/images/pot.jpg',
    stock: 16,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 18,
    name: 'Tapis Berbère',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Petit tapis berbère fait main',
    price: '120.00',
    image: 'src/assets/images/pot.jpg',
    stock: 8,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 19,
    name: 'Panier Rangement',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Panier de rangement en osier tressé',
    price: '42.00',
    image: 'src/assets/images/pot.jpg',
    stock: 22,
    isCustomizable: false,
    availableColors: []
  },
  {
    id: 20,
    name: 'Affiche Artistique',
    category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
    description: 'Affiche d\'art contemporain, impression qualité',
    price: '35.00',
    image: 'src/assets/images/pot.jpg',
    stock: 50,
    isCustomizable: false,
    availableColors: []
  }
];

// Helper pour simuler un délai réseau
const mockDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper pour les requêtes
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// ==================== CATEGORIES ====================

export const categoryAPI = {
  // Récupérer toutes les catégories
  getAll: async () => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return MOCK_CATEGORIES;
    }
    return fetchAPI('/categories');
  },
  
  // Récupérer une catégorie par son slug
  getBySlug: async (slug) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const category = MOCK_CATEGORIES.find(cat => cat.slug === slug);
      if (!category) throw new Error('Catégorie non trouvée');
      return category;
    }
    return fetchAPI(`/categories/${slug}`);
  },
  
  // Récupérer les catégories avec le nombre de produits
  getAllWithCount: async () => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return MOCK_CATEGORIES;
    }
    return fetchAPI('/categories/with-count');
  },
};

// ==================== PRODUCTS ====================

export const productAPI = {
  // Récupérer tous les produits avec filtres optionnels
  getAll: async (params = {}) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      
      let products = [...MOCK_PRODUCTS];
      
      // Filtrer par catégorie
      if (params.category) {
        products = products.filter(p => p.category.slug === params.category);
      }
      
      // Recherche
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 50;
      const total = products.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        items: products.slice(start, end),
        total,
        page,
        limit
      };
    }
    
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return fetchAPI(`/products${query ? `?${query}` : ''}`);
  },
  
  // Récupérer un produit par son ID
  getById: async (id) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
      if (!product) throw new Error('Produit non trouvé');
      return product;
    }
    return fetchAPI(`/products/${id}`);
  },
  
  // Récupérer les produits d'une catégorie
  getByCategory: (categorySlug, page = 1, limit = 12) => {
    return productAPI.getAll({ category: categorySlug, page, limit });
  },
  
  // Rechercher des produits
  search: (searchTerm, page = 1, limit = 12) => {
    return productAPI.getAll({ search: searchTerm, page, limit });
  },
};

// ==================== CART ====================

export const cartAPI = {
  // Récupérer le panier
  get: (userId) => fetchAPI(`/carts/${userId}`),
  
  // Ajouter un produit au panier
  addItem: (cartId, productId, quantity = 1) => 
    fetchAPI(`/carts/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  
  // Mettre à jour la quantité d'un produit
  updateItem: (cartId, itemId, quantity) =>
    fetchAPI(`/carts/${cartId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  
  // Supprimer un produit du panier
  removeItem: (cartId, itemId) =>
    fetchAPI(`/carts/${cartId}/items/${itemId}`, {
      method: 'DELETE',
    }),
  
  // Vider le panier
  clear: (cartId) =>
    fetchAPI(`/carts/${cartId}`, {
      method: 'DELETE',
    }),
};

// ==================== ORDERS ====================

export const orderAPI = {
  // Créer une commande
  create: (orderData) =>
    fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  // Récupérer les commandes d'un utilisateur
  getByUser: (userId) => fetchAPI(`/orders/user/${userId}`),
  
  // Récupérer une commande par son ID
  getById: (id) => fetchAPI(`/orders/${id}`),
};

// ==================== WISHLIST ====================

export const wishlistAPI = {
  // Récupérer la wishlist d'un utilisateur
  get: (userId) => fetchAPI(`/wishlists/${userId}`),
  
  // Ajouter un produit à la wishlist
  addItem: (wishlistId, productId) =>
    fetchAPI(`/wishlists/${wishlistId}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId }),
    }),
  
  // Supprimer un produit de la wishlist
  removeItem: (wishlistId, productId) =>
    fetchAPI(`/wishlists/${wishlistId}/items/${productId}`, {
      method: 'DELETE',
    }),
};

export default {
  category: categoryAPI,
  product: productAPI,
  cart: cartAPI,
  order: orderAPI,
  wishlist: wishlistAPI,
};

