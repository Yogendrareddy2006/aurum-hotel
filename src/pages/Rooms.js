import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Rooms.css';

const rooms = [
  {
    id: 1,
    name: 'Classic Room',
    size: '38 sqm',
    price: '$280',
    category: 'classic',
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
    amenities: ['King Bed', 'City View', 'Marble Bath', 'Mini Bar'],
    desc: 'A sanctuary of understated elegance with floor-to-ceiling windows framing the city skyline.',
  },
  {
    id: 2,
    name: 'Deluxe Suite',
    size: '58 sqm',
    price: '$420',
    category: 'suite',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    amenities: ['King Bed', 'Panoramic View', 'Rain Shower', 'Sitting Room'],
    desc: 'Expansive living spaces adorned with hand-selected art and bespoke furnishings.',
  },
  {
    id: 3,
    name: 'Grand Suite',
    size: '90 sqm',
    price: '$680',
    category: 'suite',
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
    amenities: ['King Bed', 'Terrace', 'Soaking Tub', 'Dining Area'],
    desc: 'A palatial retreat with a private terrace, separate dining, and a dedicated butler.',
  },
  {
    id: 4,
    name: 'Junior Suite',
    size: '65 sqm',
    price: '$520',
    category: 'suite',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
    amenities: ['King Bed', 'Garden View', 'Freestanding Bath', 'Lounge'],
    desc: 'Serene garden vistas from a spacious suite blending natural materials and refined comfort.',
  },
  {
    id: 5,
    name: 'Presidential Suite',
    size: '160 sqm',
    price: '$1,200',
    category: 'penthouse',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80',
    amenities: ['2 Bedrooms', '360° Views', 'Private Pool', 'Chef Service'],
    desc: 'The pinnacle of luxury — a two-level suite with a private infinity pool and dedicated chef.',
  },
  {
    id: 6,
    name: 'Sky Penthouse',
    size: '220 sqm',
    price: '$1,800',
    category: 'penthouse',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
    amenities: ['3 Bedrooms', 'Private Terrace', 'Butler 24/7', 'Art Collection'],
    desc: 'An entire floor of curated luxury, with an original art collection and unrivaled panoramas.',
  },
];

const categories = ['all', 'classic', 'suite', 'penthouse'];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' } })
};

export default function Rooms() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'all' ? rooms : rooms.filter(r => r.category === filter);

  return (
    <div className="rooms-page page-wrapper">
      {/* Page header */}
      <section className="rooms-header">
        <div className="rooms-header-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80)` }} />
        <div className="rooms-header-overlay" />
        <motion.div
          className="rooms-header-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          <p className="section-label">Accommodations</p>
          <h1 className="section-title" style={{ color: '#fff', fontSize: 'clamp(3rem,7vw,6rem)' }}>
            Our Rooms<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>& Suites</em>
          </h1>
        </motion.div>
      </section>

      {/* Filter bar */}
      <section className="rooms-filter-bar">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </motion.button>
        ))}
      </section>

      {/* Rooms grid */}
      <section className="rooms-grid-section">
        <motion.div className="rooms-grid-2" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((room, i) => (
              <motion.div
                key={room.id}
                className="room-card"
                layout
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                custom={i}
                onClick={() => setSelected(room)}
                whileHover={{ y: -6 }}
              >
                <div className="room-card-img">
                  <img src={room.img} alt={room.name} />
                  <div className="room-card-overlay" />
                  <span className="room-badge">{room.category}</span>
                </div>
                <div className="room-card-body">
                  <div className="room-card-top">
                    <h3>{room.name}</h3>
                    <span className="room-size">{room.size}</span>
                  </div>
                  <p>{room.desc}</p>
                  <div className="room-amenities">
                    {room.amenities.map(a => <span key={a}>{a}</span>)}
                  </div>
                  <div className="room-card-footer">
                    <div>
                      <p className="room-price-label">From</p>
                      <p className="room-price">{room.price}<small>/night</small></p>
                    </div>
                    <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '9px' }}>
                      Book Suite
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
              <img src={selected.img} alt={selected.name} className="modal-img" />
              <div className="modal-body">
                <p className="section-label">{selected.category}</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 300 }}>{selected.name}</h2>
                <div className="divider" />
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24 }}>{selected.desc}</p>
                <div className="modal-amenities">
                  {selected.amenities.map(a => <span key={a}>{a}</span>)}
                </div>
                <div className="modal-footer">
                  <p className="room-price">{selected.price}<small>/night</small></p>
                  <Link to="/contact" className="btn-solid" onClick={() => setSelected(null)}>Reserve Now</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
