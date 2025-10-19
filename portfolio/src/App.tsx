import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThreeHero from './components/ThreeHero'
import GitHubShowcase from './components/GitHubShowcase'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Navbar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
        <NavLink to="/" className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          Vinayak Potdar
        </NavLink>
        <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }: { isActive: boolean }) =>
                `${isActive ? 'color: var(--color-primary-400)' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Home() {
  return (
    <main style={{ padding: '4rem 1.5rem', margin: '0 auto', maxWidth: 1280 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-bold"
          >
            Building delightful interactive experiences
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            Full‑stack engineer crafting 3D, motion, and rich UI on the web.
          </motion.p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href="https://github.com/vinayakpotdar79"
              target="_blank"
              style={{ borderRadius: 8, background: 'var(--color-primary)', padding: '0.75rem 1.25rem', fontWeight: 600, boxShadow: 'var(--shadow-glow)' }}
            >
              GitHub
            </a>
            <a
              href="#projects"
              style={{ borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', fontWeight: 600 }}
            >
              View Projects
            </a>
          </div>
        </div>
        <div style={{ height: 420, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <ThreeHero />
        </div>
      </div>
    </main>
  )
}

function Projects() {
  return (
    <main id="projects" style={{ padding: '4rem 1.5rem', margin: '0 auto', maxWidth: 1280 }}>
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Projects</h2>
      <GitHubShowcase username="vinayakpotdar79" />
    </main>
  )
}

function About() {
  return (
    <main style={{ padding: '4rem 1.5rem', margin: '0 auto', maxWidth: 1280 }}>
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">About</h2>
      <p className="text-white/70">Engineer passionate about 3D and immersive UI.</p>
    </main>
  )
}

function Contact() {
  return (
    <main style={{ padding: '4rem 1.5rem', margin: '0 auto', maxWidth: 1280 }}>
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Contact</h2>
      <p className="text-white/70">Drop a message via GitHub.</p>
    </main>
  )
}

export default App
