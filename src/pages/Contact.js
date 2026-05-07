import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' } })
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', checkin: '', checkout: '', room: 'Deluxe Suite', guests: '2', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const info = [
    { icon: '◈', label: 'Address', value: '1 Aurum Boulevard, Gold District' },
    { icon: '◇', label: 'Telephone', value: '+1 (800) AURUM-GH' },
    { icon: '◉', label: 'Email', value: 'reservations@aurum.hotel' },
    { icon: '◈', label: 'Concierge', value: 'Available 24 hours, 7 days' },
  ];

  return (
    <div className="contact-page page-wrapper">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80)` }} />
        <div className="contact-hero-overlay" />
        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          <p className="section-label">Get in Touch</p>
          <h1 className="section-title" style={{ color: '#fff', fontSize: 'clamp(3rem,7vw,6rem)' }}>
            Reserve Your <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Stay</em>
          </h1>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="contact-main">
        {/* Info Column */}
        <motion.div
          className="contact-info"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p className="section-label" variants={fadeUp} custom={0}>Contact</motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 300, marginBottom: 8 }}>
            We Look Forward<br />To Welcoming You
          </motion.h2>
          <motion.div className="divider" variants={fadeUp} custom={2} />
          <motion.p variants={fadeUp} custom={3}
            style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.9, marginBottom: 48 }}>
            Our reservations team is available around the clock to assist with bookings, special arrangements, and any enquiries to ensure your stay exceeds all expectations.
          </motion.p>

          {info.map((item, i) => (
            <motion.div key={item.label} className="info-item" variants={fadeUp} custom={i + 4}>
              <span className="info-icon">{item.icon}</span>
              <div>
                <p className="info-label">{item.label}</p>
                <p className="info-value">{item.value}</p>
              </div>
            </motion.div>
          ))}

          <motion.div className="social-row" variants={fadeUp} custom={8}>
            {['Instagram', 'Facebook', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="social-link">{s}</a>
            ))}
          </motion.div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 300, marginBottom: 8 }}>
                  Book a Room
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 36 }}>
                  Complete the form and our team will confirm within 2 hours.
                </p>

                <div className="form-row">
                  <div className={`form-field ${focused === 'name' ? 'active' : ''}`}>
                    <label>Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className={`form-field ${focused === 'email' ? 'active' : ''}`}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-field ${focused === 'checkin' ? 'active' : ''}`}>
                    <label>Check-In Date</label>
                    <input
                      type="date"
                      name="checkin"
                      value={form.checkin}
                      onChange={handleChange}
                      onFocus={() => setFocused('checkin')}
                      onBlur={() => setFocused('')}
                      required
                    />
                  </div>
                  <div className={`form-field ${focused === 'checkout' ? 'active' : ''}`}>
                    <label>Check-Out Date</label>
                    <input
                      type="date"
                      name="checkout"
                      value={form.checkout}
                      onChange={handleChange}
                      onFocus={() => setFocused('checkout')}
                      onBlur={() => setFocused('')}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Room Type</label>
                    <select name="room" value={form.room} onChange={handleChange}>
                      <option>Classic Room</option>
                      <option>Deluxe Suite</option>
                      <option>Junior Suite</option>
                      <option>Grand Suite</option>
                      <option>Presidential Suite</option>
                      <option>Sky Penthouse</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Guests</label>
                    <select name="guests" value={form.guests} onChange={handleChange}>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className={`form-field ${focused === 'message' ? 'active' : ''}`}>
                  <label>Special Requests</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Anniversary, dietary requirements, early check-in..."
                    rows={4}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-solid"
                  style={{ width: '100%', padding: '18px', marginTop: 8 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Submit Reservation
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="success-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="success-icon">◈</div>
                <h3>Thank You, {form.name || 'Dear Guest'}</h3>
                <p>Your reservation request has been received. Our concierge team will contact you at <strong>{form.email}</strong> within 2 hours to confirm your stay.</p>
                <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: 32 }}>
                  New Reservation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Map / Location bar */}
      <section className="location-bar">
        <div className="location-img" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80)` }}>
          <div className="location-overlay" />
          <motion.div
            className="location-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="section-label">Find Us</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>1 Aurum Boulevard, Gold District</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
