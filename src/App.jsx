import { useMemo, useState } from 'react';

const categories = ['Tous', 'Électronique', 'Mode', 'Maison', 'Beauté', 'Automobile', 'Sport', 'Jouets'];

const products = [
  {
    id: 1,
    name: 'Smartphone Mali X Pro',
    category: 'Électronique',
    price: 245000,
    oldPrice: 320000,
    rating: 4.8,
    reviews: 182,
    shipping: 'Livraison gratuite',
    tag: 'Top vente',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    seller: 'MaliTech',
    description:
      'Smartphone 5G avec écran AMOLED, appareil photo 64 MP, batterie longue durée et performance optimisée pour les usages quotidiens.',
    stock: 'En stock',
  },
  {
    id: 2,
    name: 'Ensemble de cuisine premium',
    category: 'Maison',
    price: 186000,
    oldPrice: 240000,
    rating: 4.7,
    reviews: 96,
    shipping: 'Livraison 48h',
    tag: 'Promo',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
    seller: 'Bamako Home',
    description:
      'Coffret complet pour la cuisine moderne : pansements résistants, ustensiles premium et finition élégante pour un usage familial.',
    stock: 'Stock limité',
  },
  {
    id: 3,
    name: 'Montre connectée Mali Fit',
    category: 'Mode',
    price: 98000,
    oldPrice: 150000,
    rating: 4.9,
    reviews: 264,
    shipping: 'Livraison express',
    tag: 'Nouveau',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
    seller: 'Fashion Mali',
    description:
      'Montre intelligente avec suivi du sommeil, fréquence cardiaque et notifications, pensée pour un mode de vie actif.',
    stock: 'En stock',
  },
  {
    id: 4,
    name: 'Casque audio premium',
    category: 'Électronique',
    price: 76000,
    oldPrice: 120000,
    rating: 4.6,
    reviews: 119,
    shipping: 'Livraison 24h',
    tag: 'Flash sale',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    seller: 'AudioMali',
    description:
      'Casque ultra confortable avec son immersif, réduction de bruit active et autonomie d’écoute impressionnante.',
    stock: 'Disponible',
  },
  {
    id: 5,
    name: 'Sac à dos de voyage',
    category: 'Mode',
    price: 54000,
    oldPrice: 89000,
    rating: 4.5,
    reviews: 71,
    shipping: 'En stock',
    tag: 'Recommandé',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    seller: 'Mali Travel',
    description:
      'Sac robuste et spacieux, idéal pour les déplacements, avec compartiments utiles et matière résistante aux intempéries.',
    stock: 'En stock',
  },
  {
    id: 6,
    name: 'Électrodes de machine à café',
    category: 'Maison',
    price: 42000,
    oldPrice: 59000,
    rating: 4.4,
    reviews: 58,
    shipping: 'Vendue en ligne',
    tag: 'Boîte à cadeaux',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    seller: 'Maison D’or',
    description:
      'Lot premium pour préparer des boissons délicieuses et garder un esprit café de qualité à la maison.',
    stock: 'Très demandé',
  },
  {
    id: 7,
    name: 'Vélo urbain Bamako',
    category: 'Sport',
    price: 320000,
    oldPrice: 430000,
    rating: 4.8,
    reviews: 143,
    shipping: 'Livraison sécurisée',
    tag: 'Offre spéciale',
    image:
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=80',
    seller: 'Bamako Cyclisme',
    description:
      'Vélo urbain léger, confortable et pratique pour les déplacements rapide dans la ville et autour de Bamako.',
    stock: 'En stock',
  },
  {
    id: 8,
    name: 'Set beauté anti-âge',
    category: 'Beauté',
    price: 67000,
    oldPrice: 105000,
    rating: 4.7,
    reviews: 88,
    shipping: 'Stock limité',
    tag: 'Meilleur choix',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    seller: 'Mali Glow',
    description:
      'Routine beauté complète avec soins nutritionnels, hydratation intense et finition éclatante pour toute peau.',
    stock: 'Stock limité',
  },
];

const featuredDeals = [
  { title: 'Achat de la semaine', value: 'Jusqu’à 70% de réduction' },
  { title: 'Livraison Bamako', value: 'Sous 48h seulement' },
  { title: 'Paiement sécurisé', value: '100% fiable' },
];

function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(value);
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    const results = products.filter((product) => {
      const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      return [...results].sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'price-high') {
      return [...results].sort((a, b) => b.price - a.price);
    }

    if (sortBy === 'rating') {
      return [...results].sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [selectedCategory, searchTerm, sortBy]);

  const addToCart = (product) => {
    setCart((current) => {
      const itemExists = current.find((item) => item.id === product.id);

      if (itemExists) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <div className="brand-logo">M</div>
            <div>
              <div className="brand-name">Mali Commerce</div>
              <div className="brand-subtitle">Bamako • Mali</div>
            </div>
          </div>

          <nav className="main-nav">
            <a href="#">Accueil</a>
            <a href="#">Offres</a>
            <a href="#">Catégories</a>
            <a href="#">Vendeurs</a>
            <a href="#">Aide</a>
          </nav>

          <div className="nav-actions">
            <button className="ghost-btn" onClick={() => setIsAuthOpen(true)}>
              Connexion
            </button>
            <button className="primary-btn" onClick={() => setIsCartOpen(true)}>
              Panier ({cartCount})
            </button>
          </div>
        </div>
      </header>

      <div className="promo-strip">
        <div className="container promo-content">
          <span>Livraison partout au Mali</span>
          <span>•</span>
          <span>Produits garantis</span>
          <span>•</span>
          <span>Remises jusqu’à 70%</span>
        </div>
      </div>

      <main className="container page-content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Boutique en ligne moderne</span>
            <h1>Des meilleures offres pour toute la famille.</h1>
            <p>
              Découvrez des produits de qualité, des marques fiables et une expérience d’achat rapide inspirée des meilleurs marchés e-commerce.
            </p>

            <div className="hero-search">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un produit..."
              />
              <button>Rechercher</button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>50k+</strong>
                <span>Commandes</span>
              </div>
              <div>
                <strong>1.2k</strong>
                <span>Vendeurs</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Note clients</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mini-card card-top">
              <span>Top vente</span>
              <strong>Smartphone Mali X Pro</strong>
            </div>
            <div className="product-preview">
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80"
                alt="Produit phare"
              />
            </div>
            <div className="mini-card card-bottom">
              <span>À partir de</span>
              <strong>{formatPrice(245000)}</strong>
            </div>
          </div>
        </section>

        <section className="deals-grid">
          {featuredDeals.map((deal) => (
            <div className="deal-card" key={deal.title}>
              <span>{deal.title}</span>
              <strong>{deal.value}</strong>
            </div>
          ))}
        </section>

        <section className="catalogue">
          <div className="section-head">
            <div>
              <span className="eyebrow">Catalogue</span>
              <h2>Produits populaires</h2>
            </div>

            <div className="controls-wrap">
              <div className="filter-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={category === selectedCategory ? 'filter-chip active' : 'filter-chip'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="popular">Les plus populaires</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <span className="product-tag">{product.tag}</span>
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <div className="product-seller">{product.seller}</div>
                  <h3>{product.name}</h3>

                  <div className="rating-row">
                    <span>★ {product.rating}</span>
                    <small>({product.reviews})</small>
                  </div>

                  <div className="price-row">
                    <strong>{formatPrice(product.price)}</strong>
                    <span>{formatPrice(product.oldPrice)}</span>
                  </div>

                  <div className="shipping-row">{product.shipping}</div>

                  <div className="product-actions">
                    <button className="secondary-btn" onClick={() => setSelectedProduct(product)}>
                      Détails
                    </button>
                    <button className="product-btn" onClick={() => addToCart(product)}>
                      Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="features-panel">
          <div className="feature-copy">
            <span className="eyebrow">Pourquoi nous choisir ?</span>
            <h2>Une expérience d’achat fiable et rapide.</h2>
          </div>

          <div className="feature-list">
            <div>
              <strong>Vérification des vendeurs</strong>
              <p>Chaque boutique est contrôlée pour garantir la qualité et la fiabilité.</p>
            </div>
            <div>
              <strong>Paiement sécurisé</strong>
              <p>Transactions protégées et support client réactif à Bamako et dans le pays.</p>
            </div>
            <div>
              <strong>Livraison rapide</strong>
              <p>Faites vos achats sans attendre des délais excessifs. Livraison fiable.</p>
            </div>
          </div>
        </section>

        <section className="mobile-banner">
          <div>
            <span className="eyebrow">Application mobile</span>
            <h2>Téléchargez l’application Mali Commerce.</h2>
          </div>
          <button className="primary-btn">Télécharger maintenant</button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="brand-logo footer-logo">M</div>
            <p>Mali Commerce • Boutique intelligente pour Bamako et le Mali.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li>Accueil</li>
              <li>Offres</li>
              <li>Catégories</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Contact</li>
              <li>Livraison</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>
              ×
            </button>

            <div className="modal-image-box">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="modal-content">
              <span className="eyebrow">{selectedProduct.tag}</span>
              <h3>{selectedProduct.name}</h3>
              <div className="rating-row">
                <span>★ {selectedProduct.rating}</span>
                <small>({selectedProduct.reviews} avis)</small>
              </div>

              <div className="price-row big-price">
                <strong>{formatPrice(selectedProduct.price)}</strong>
                <span>{formatPrice(selectedProduct.oldPrice)}</span>
              </div>

              <p className="modal-description">{selectedProduct.description}</p>

              <div className="modal-meta">
                <span>Vendeur: {selectedProduct.seller}</span>
                <span>État: {selectedProduct.stock}</span>
              </div>

              <div className="modal-actions">
                <button className="secondary-btn" onClick={() => setSelectedProduct(null)}>
                  Continuer
                </button>
                <button className="product-btn" onClick={() => addToCart(selectedProduct)}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Mon panier</h3>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Votre panier est vide.</p>
            <button className="primary-btn" onClick={() => setIsCartOpen(false)}>
              Continuer les achats
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <span>{item.quantity} × {formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Total</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <button className="primary-btn full-width">Valider la commande</button>
            </div>
          </>
        )}
      </aside>

      <div className={`auth-panel ${isAuthOpen ? 'open' : ''}`}>
        <div className="auth-header">
          <h3>Connexion</h3>
          <button className="close-cart" onClick={() => setIsAuthOpen(false)}>
            ×
          </button>
        </div>

        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="vous@example.com" />
          </label>
          <label>
            Mot de passe
            <input type="password" placeholder="••••••••" />
          </label>
          <button type="button" className="primary-btn full-width" onClick={() => setIsAuthOpen(false)}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
