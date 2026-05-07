import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Dining.css';

const restaurants = [
  {
    id: 1,
    name: 'Lumière',
    tag: 'Fine Dining',
    stars: '★★',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80',
    desc: 'Our flagship restaurant, where modern French technique meets the finest seasonal ingredients. Chef Laurent Dubois crafts tasting menus that tell the story of each harvest.',
    hours: 'Tue – Sun: 6:30pm – 11pm',
    cuisine: 'Modern French',
    dress: 'Formal Attire',
    menu: ['Foie Gras Terrine', 'Lobster Bisque', 'Wagyu Tenderloin', 'Grand Soufflé'],
  },
  {
    id: 2,
    name: 'Sakura',
    tag: 'Japanese Omakase',
    stars: '★',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1000&q=80',
    desc: 'An intimate 12-seat omakase counter where Chef Hiroshi Nakamura presents the finest Tokyo-style sushi, flown daily from Toyosu Market.',
    hours: 'Wed – Mon: 6pm – 10pm',
    cuisine: 'Japanese Omakase',
    dress: 'Smart Casual',
    menu: ['Otoro Sashimi', 'Uni on Rice', 'Wagyu Nigiri', 'Matcha Dessert'],
  },
  {
    id: 3,
    name: 'The Terrace',
    tag: 'All-Day Dining',
    stars: '',
    img: 'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1000&q=80',
    desc: 'An open-air sanctuary overlooking manicured gardens, serving Mediterranean-inspired dishes from breakfast through to late evening cocktails.',
    hours: 'Daily: 7am – 11pm',
    cuisine: 'Mediterranean',
    dress: 'Casual',
    menu: ['Avocado Toast', 'Grilled Seabass', 'Garden Salad', 'Champagne Sorbet'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' } })
};

export default function Dining() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '1',
    restaurant: 'Lumière'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Booking submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '1',
        restaurant: 'Lumière'
      });
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const current = restaurants[active];

  return (
    <div className="dining-page page-wrapper">
      {/* Hero */}
      <section className="dining-hero">
        <div className="dining-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1800&q=80)` }} />
        <div className="dining-hero-overlay" />
        <motion.div
          className="dining-hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          <p className="section-label">Culinary Excellence</p>
          <h1 className="section-title" style={{ color: '#fff', fontSize: 'clamp(3rem,7vw,6rem)' }}>
            Dining <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>& Cuisine</em>
          </h1>
          <p style={{ marginTop: 20, color: 'rgba(255,255,255,0.6)', maxWidth: 500, fontSize: 13, lineHeight: 1.8 }}>
            Three distinct culinary worlds, each a destination in itself.
          </p>
        </motion.div>
      </section>

      {/* Restaurant Selector */}
      <section className="restaurant-tabs">
        {restaurants.map((r, i) => (
          <motion.button
            key={r.id}
            className={`tab-btn ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
            whileHover={{ y: -3 }}
          >
            <span className="tab-name">{r.name}</span>
            <span className="tab-tag">{r.tag}</span>
            {r.stars && <span className="tab-stars">{r.stars}</span>}
          </motion.button>
        ))}
      </section>

      {/* Restaurant Detail */}
      <AnimatePresence mode="wait">
        <motion.section
          key={current.id}
          className="restaurant-detail"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="restaurant-img-col">
            <img src={current.img} alt={current.name} />
            <div className="restaurant-img-overlay" />
            <div className="restaurant-quick-info">
              <div className="qi-item">
                <p className="qi-label">Hours</p>
                <p className="qi-value">{current.hours}</p>
              </div>
              <div className="qi-item">
                <p className="qi-label">Cuisine</p>
                <p className="qi-value">{current.cuisine}</p>
              </div>
              <div className="qi-item">
                <p className="qi-label">Dress Code</p>
                <p className="qi-value">{current.dress}</p>
              </div>
            </div>
          </div>
          <div className="restaurant-info-col">
            <p className="section-label">{current.tag}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 300 }}>
              {current.name} {current.stars && <span style={{ color: 'var(--gold)', fontSize: '60%' }}>{current.stars}</span>}
            </h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: 14, marginBottom: 40 }}>
              {current.desc}
            </p>
            <p className="section-label" style={{ marginBottom: 20 }}>Signature Dishes</p>
            <ul className="menu-list">
              {current.menu.map((dish, i) => (
                <motion.li
                  key={dish}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="dish-dot">◆</span>
                  {dish}
                </motion.li>
              ))}
            </ul>
            <div style={{ marginTop: 48 }}>
              <button className="btn-primary" onClick={() => setModalOpen(true)}>Reserve a Table</button>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Bar section */}
      <section className="bar-section">
        <motion.div
          className="bar-content"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Craft Cocktails</p>
          <h2 className="section-title">The Aurum Bar</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 32, fontSize: 14 }}>
            Settle into our intimate cocktail bar where our master mixologist creates bespoke libations inspired by travel, seasons, and stories. Over 400 rare spirits await discovery.
          </p>
          <div className="cocktail-list">
            {['The Aurum Signature', 'Ceylon Spice Negroni', 'Garden Sour', 'Black Pearl Old Fashioned'].map((c, i) => (
              <motion.div
                key={c}
                className="cocktail-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                <p>{c}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <button className="btn-primary" onClick={() => setMenuModalOpen(true)}>View Menu</button>
          </div>
        </motion.div>
        <motion.div
          className="bar-img"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" alt="Aurum Bar" />
        </motion.div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="booking-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Book a Table</h3>
                <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
              </div>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-group">
                    <label htmlFor="name">Guest Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="time">Time</label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Time</option>
                        {Array.from({ length: 11 }, (_, i) => {
                          const hour = 18 + Math.floor(i / 2);
                          const minute = i % 2 === 0 ? '00' : '30';
                          const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
                          const displayTime = hour <= 12 ? `${hour}:${minute} PM` : `${hour - 12}:${minute} PM`;
                          return (
                            <option key={timeString} value={timeString}>
                              {displayTime}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="guests">Number of Guests</label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                      >
                        {Array.from({ length: 8 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="restaurant">Restaurant</label>
                      <select
                        id="restaurant"
                        name="restaurant"
                        value={formData.restaurant}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Lumière">Lumière</option>
                        <option value="Sakura">Sakura</option>
                        <option value="The Terrace">The Terrace</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-submit">Submit Reservation</button>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h4>Reservation Confirmed!</h4>
                  <p>Thank you for choosing Aurum Grand Hotel. We'll send a confirmation email shortly.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Modal */}
      <AnimatePresence>
        {menuModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuModalOpen(false)}
          >
            <motion.div
              className="menu-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>The Aurum Bar Menu</h3>
                <button className="modal-close" onClick={() => setMenuModalOpen(false)}>✕</button>
              </div>
              
              <div className="menu-content">
                <div className="menu-section">
                  <h4>Signature Cocktails</h4>
                  <div className="menu-items">
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">The Aurum Signature</span>
                        <span className="item-desc">Premium vodka, elderflower, lime, gold leaf</span>
                      </div>
                      <span className="item-price">$28</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Ceylon Spice Negroni</span>
                        <span className="item-desc">Gin, Campari, sweet vermouth, cinnamon infusion</span>
                      </div>
                      <span className="item-price">$26</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Garden Sour</span>
                        <span className="item-desc">Bourbon, fresh herbs, lemon, honey syrup</span>
                      </div>
                      <span className="item-price">$24</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Black Pearl Old Fashioned</span>
                        <span className="item-desc">Rye whiskey, black walnut bitters, orange zest</span>
                      </div>
                      <span className="item-price">$27</span>
                    </div>
                  </div>
                </div>

                <div className="menu-section">
                  <h4>Wine Selection</h4>
                  <div className="menu-items">
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Chateau Margaux 2015</span>
                        <span className="item-desc">Bordeaux, France - Cabernet Sauvignon blend</span>
                      </div>
                      <span className="item-price">$450</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Domaine de la Romanée-Conti 2018</span>
                        <span className="item-desc">Burgundy, France - Pinot Noir</span>
                      </div>
                      <span className="item-price">$2,800</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Opus One 2016</span>
                        <span className="item-desc">Napa Valley, USA - Cabernet Sauvignon blend</span>
                      </div>
                      <span className="item-price">$380</span>
                    </div>
                  </div>
                </div>

                <div className="menu-section">
                  <h4>Champagne & Sparkling</h4>
                  <div className="menu-items">
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Dom Pérignon 2010</span>
                        <span className="item-desc">Champagne, France - Vintage Brut</span>
                      </div>
                      <span className="item-price">$280</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Krug Grande Cuvée</span>
                        <span className="item-desc">Champagne, France - Multi-vintage Brut</span>
                      </div>
                      <span className="item-price">$220</span>
                    </div>
                  </div>
                </div>

                <div className="menu-section">
                  <h4>Non-Alcoholic</h4>
                  <div className="menu-items">
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Aurum Sparkling Mocktail</span>
                        <span className="item-desc">Sparkling water, elderflower, citrus, edible gold</span>
                      </div>
                      <span className="item-price">$16</span>
                    </div>
                    <div className="menu-item">
                      <div className="item-info">
                        <span className="item-name">Herbal Infusion</span>
                        <span className="item-desc">House-blended herbal tea, seasonal fruits</span>
                      </div>
                      <span className="item-price">$12</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
