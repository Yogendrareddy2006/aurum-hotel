import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Home.css';

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] } })
};

const heroImages = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c4fe1962?w=1920&q=80',
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [featRef, featInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [offerRef, offerInView] = useInView();

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: '◈', title: 'Luxury Suites', desc: 'Curated spaces designed for the discerning traveler, each suite a sanctuary of refined elegance.' },
    { icon: '◇', title: 'Fine Dining', desc: 'Three award-winning restaurants helmed by Michelin-starred chefs, celebrating global cuisine.' },
    { icon: '◉', title: 'Spa & Wellness', desc: 'A 3,000 sq ft wellness retreat offering bespoke treatments and holistic healing rituals.' },
    { icon: '◈', title: 'Concierge', desc: 'Your personal concierge anticipates every desire, crafting bespoke experiences around the clock.' },
  ];

  const stats = [
    { num: '48', label: 'Luxury Suites' },
    { num: '3', label: 'Restaurants' },
    { num: '24/7', label: 'Butler Service' },
    { num: '★5', label: 'Rating' },
  ];

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            className="hero-bg"
            style={{ backgroundImage: `url(${heroImages[heroIdx]})`, y: heroY }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to Aurum Grand
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Where Luxury<br />
            <em>Becomes Art</em>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            An unparalleled sanctuary of refinement in the heart of the city
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link to="/rooms" className="btn-primary">Explore Rooms</Link>
            <Link to="/dining" className="btn-ghost">Our Restaurants</Link>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="hero-dots">
          {heroImages.map((_, i) => (
            <button key={i} className={`dot ${i === heroIdx ? 'active' : ''}`} onClick={() => setHeroIdx(i)} />
          ))}
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" ref={featRef}>
        <motion.div
          className="features-header"
          variants={fadeUp}
          initial="hidden"
          animate={featInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">The Aurum Experience</p>
          <h2 className="section-title">Crafted for Connoisseurs</h2>
          <div className="divider" />
        </motion.div>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              variants={fadeUp}
              initial="hidden"
              animate={featInView ? 'visible' : 'hidden'}
              custom={i}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section className="quote-section">
        <div className="quote-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1600&q=80)` }} />
        <div className="quote-overlay" />
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          "Luxury is not about the price tag — it is about the feeling of being truly seen."
          <cite>— The Aurum Philosophy</cite>
        </motion.blockquote>
      </section>

      {/* STATS */}
      <section className="stats-section" ref={statsRef}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-item"
            variants={fadeUp}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            custom={i}
          >
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ROOMS PREVIEW */}
      <section className="rooms-preview" ref={offerRef}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={offerInView ? 'visible' : 'hidden'}
          className="preview-header"
        >
          <p className="section-label">Accommodations</p>
          <h2 className="section-title">Your Private Retreat</h2>
          <div className="divider" />
          <p className="preview-desc">
            Each of our 48 suites is a curated world unto itself — blending architectural precision with warm, tactile luxury.
          </p>
        </motion.div>

        <div className="rooms-grid">
          {[
            { img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', name: 'Deluxe Suite', price: 'From $420/night' },
            { img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', name: 'Grand Suite', price: 'From $680/night' },
            { img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', name: 'Penthouse', price: 'From $1,200/night' },
          ].map((room, i) => (
            <motion.div
              key={room.name}
              className="room-preview-card"
              variants={fadeUp}
              initial="hidden"
              animate={offerInView ? 'visible' : 'hidden'}
              custom={i + 1}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="room-img-wrap">
                <img src={room.img} alt={room.name} />
                <div className="room-img-overlay" />
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.price}</p>
                <Link to="/rooms" className="room-link">View Details →</Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="preview-cta">
          <Link to="/rooms" className="btn-primary">View All Rooms</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="logo-main">AURUM</p>
            <p className="logo-sub">Grand Hotel</p>
            <p className="footer-tagline">Where every moment is crafted with intention.</p>
          </div>
          <div className="footer-links">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/dining">Dining</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <span>1 Aurum Boulevard</span>
            <span>reservations@aurum.hotel</span>
            <span>+1 (800) 287-6347</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Aurum Grand Hotel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
