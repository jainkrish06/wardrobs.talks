'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Mail, Phone, MessageCircle, ChevronRight, ChevronLeft, LogOut, Plus, Trash2, Edit3, Eye, EyeOff } from 'lucide-react'

/* ------------------------------ Constants ------------------------------ */
const NAV = [
  { key: 'home', label: 'Home' },
  { key: 'women', label: 'Women' },
  { key: 'men', label: 'Men' },
  { key: 'celebrity', label: 'Celebrity' },
  { key: 'about', label: 'About' },
  { key: 'blogs', label: 'Journal' },
  { key: 'contact', label: 'Contact' },
]

const WOMEN_SUBCATS = ['Bridal Edit', 'Bridal Blouse', 'Bridal Lehenga', 'Casual Lehenga', 'Anarkali', 'Silk Palazzo', 'Co-ords', 'Ethnic Wear', 'Sharara & Kurta']

const HERO_IMG = 'https://images.unsplash.com/photo-1629118477133-b8b1499f2b8a?w=1920&q=85'
const ABOUT_DESIGNER = 'https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?w=900&q=85'
const ABOUT_WORKSHOP_1 = 'https://images.pexels.com/photos/9850415/pexels-photo-9850415.jpeg?w=900'
const ABOUT_WORKSHOP_2 = 'https://images.pexels.com/photos/7763068/pexels-photo-7763068.jpeg?w=900'
const INSTA_IMGS = [
  'https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?w=600',
  'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=600',
  'https://images.pexels.com/photos/37628608/pexels-photo-37628608.jpeg?w=600',
  'https://images.unsplash.com/photo-1707576618343-26a1b377ca7a?w=600',
  'https://images.pexels.com/photos/28405815/pexels-photo-28405815.jpeg?w=600',
  'https://images.unsplash.com/photo-1654764746225-e63f5e90facd?w=600',
]

/* ------------------------------ API ------------------------------ */
const api = {
  get: (p) => fetch(`/api${p}`).then(r => r.json()),
  post: (p, b, t) => fetch(`/api${p}`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) }, body: JSON.stringify(b) }).then(r => r.json()),
  put: (p, b, t) => fetch(`/api${p}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` }, body: JSON.stringify(b) }).then(r => r.json()),
  del: (p, t) => fetch(`/api${p}`, { method: 'DELETE', headers: { Authorization: `Bearer ${t}` } }).then(r => r.json()),
}

/* ------------------------------ Header ------------------------------ */
const Header = ({ view, navigate }) => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled || view !== 'home' ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#D8C4A0]/20' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <button onClick={() => navigate('home')} className="flex items-baseline gap-2">
          <span className={`font-serif text-2xl tracking-wide ${scrolled || view !== 'home' ? 'text-[#F5F1E8]' : 'text-white'}`}>Wardrobe</span>
          <span className={`font-serif italic text-lg ${scrolled || view !== 'home' ? 'text-[#C6A972]' : 'text-[#D8C4A0]'}`}>Talks</span>
        </button>
        <nav className="hidden lg:flex gap-9">
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => navigate(n.key)}
              className={`text-xs uppercase tracking-luxury gold-underline transition ${
                (view === n.key || (view === 'collection' && n.key === 'women'))
                  ? (scrolled || view !== 'home' ? 'text-[#C6A972]' : 'text-[#D8C4A0]')
                  : (scrolled || view !== 'home' ? 'text-[#F5F1E8]' : 'text-white')
              }`}
            >{n.label}</button>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} className={`lg:hidden ${scrolled || view !== 'home' ? 'text-[#F5F1E8]' : 'text-white'}`}><Menu size={24} /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.4 }} className="fixed inset-0 bg-[#121212] z-50 lg:hidden">
            <div className="flex justify-end p-6"><button onClick={() => setOpen(false)}><X size={28} /></button></div>
            <div className="flex flex-col items-center gap-7 pt-12">
              {NAV.map(n => (
                <button key={n.key} onClick={() => { navigate(n.key); setOpen(false) }} className="font-serif text-3xl text-[#F5F1E8] hover:text-[#C6A972] transition">{n.label}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ------------------------------ Hero ------------------------------ */
const Hero = ({ navigate, settings }) => (
  <section className="relative h-screen w-full overflow-hidden">
    <img src={HERO_IMG} alt="Wardrobe Talks Couture" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
    <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="uppercase tracking-luxury text-xs text-[#D8C4A0] mb-6">{settings?.brandTagline || 'Where threads tell stories.'}</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] max-w-5xl">
        {settings?.heroHeadline || 'Couture, Quietly Spoken.'}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="mt-7 font-serif italic text-lg md:text-xl text-white/85 max-w-xl">
        {settings?.heroSubtext || 'A Mumbai atelier crafting heirloom Indian wear since 2014.'}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="mt-10 flex gap-4">
        <button onClick={() => navigate('women')} className="px-8 py-3.5 bg-[#1C1C1C] text-[#F5F1E8] text-xs uppercase tracking-luxury hover:bg-[#D8C4A0] hover:text-white transition">Explore Collections</button>
        <button onClick={() => navigate('about')} className="px-8 py-3.5 border border-white/70 text-white text-xs uppercase tracking-luxury hover:bg-[#1C1C1C] hover:text-[#F5F1E8] transition">The House</button>
      </motion.div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[10px] uppercase tracking-luxury animate-pulse">Scroll</div>
  </section>
)

/* ------------------------------ Product Card ------------------------------ */
const ProductCard = ({ p, navigate }) => (
  <button onClick={() => navigate('product', { id: p.id })} className="text-left group block">
    <div className="zoom-img relative aspect-[3/4] bg-[#1C1C1C] overflow-hidden">
      <img src={p.images?.[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
      {p.featured && <span className="absolute top-3 left-3 bg-[#C6A972] text-[#121212] text-[9px] uppercase tracking-luxury px-2 py-1">Signature</span>}
    </div>
    <div className="pt-4 px-1">
      <p className="text-[10px] uppercase tracking-luxury text-[#C6A972]">{p.subcategory}</p>
      <h3 className="font-serif text-lg mt-1.5 group-hover:text-[#C6A972] transition">{p.title}</h3>
      <p className="text-xs text-[#A8A8A8] italic mt-1 line-clamp-1">{p.fabric}</p>
    </div>
  </button>
)

/* ------------------------------ Section Title ------------------------------ */
const SectionTitle = ({ kicker, title, sub }) => (
  <div className="text-center mb-14">
    {kicker && <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">{kicker}</p>}
    <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F5F1E8]">{title}</h2>
    {sub && <p className="mt-3 font-serif italic text-[#A8A8A8] max-w-xl mx-auto">{sub}</p>}
  </div>
)

/* ------------------------------ Home ------------------------------ */
const HomeView = ({ navigate, products, blogs, settings }) => {
  const featured = products.filter(p => p.featured)
  const latest = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8)
  const bridal = products.filter(p => p.subcategory?.toLowerCase().includes('bridal'))
  const celeb = products.filter(p => p.category === 'Celebrity')

  return (
    <div>
      <Hero navigate={navigate} settings={settings} />

      {/* Featured Collections */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <SectionTitle kicker="The Signature Edit" title="Featured Collections" sub="A curated set of pieces close to the house's heart this season." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featured.slice(0, 8).map(p => <ProductCard key={p.id} p={p} navigate={navigate} />)}
        </div>
      </section>

      {/* Bridal */}
      <section className="py-24 px-6 bg-[#1C1C1C]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="zoom-img aspect-[4/5]">
            <img src="https://images.unsplash.com/photo-1610047614301-13c63f00c032?w=900" alt="Bridal collection" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">The Bridal Edit</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-[#F5F1E8]">For the bride who wears<br/><em className="text-[#C6A972]">a story.</em></h2>
            <p className="mt-6 text-[#A8A8A8] leading-relaxed max-w-md">Every bridal piece is hand-embroidered in our Mumbai atelier over months. Zardozi, gota, dabka — heirloom techniques shaped for the modern woman.</p>
            <button onClick={() => navigate('collection', { sub: 'Bridal Lehenga' })} className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#C6A972] hover:gap-4 transition-all">View The Bridal Edit <ChevronRight size={14} /></button>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {bridal.slice(0, 3).map(p => (
                <button key={p.id} onClick={() => navigate('product', { id: p.id })} className="zoom-img aspect-square">
                  <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <SectionTitle kicker="New In" title="Latest Arrivals" sub="Just off our karigars' tables." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {latest.map(p => <ProductCard key={p.id} p={p} navigate={navigate} />)}
        </div>
      </section>

      {/* Celebrity */}
      <section className="py-24 px-6 bg-[#1C1C1C] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">As Seen On</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">The Celebrity Edit</h2>
            <p className="mt-3 font-serif italic text-white/60 max-w-xl mx-auto">Worn on the red carpet, on the silver screen, and into the spotlight.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {celeb.slice(0, 2).map(p => (
              <button key={p.id} onClick={() => navigate('product', { id: p.id })} className="zoom-img relative aspect-[4/5] group text-left">
                <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] uppercase tracking-luxury text-[#D8C4A0]">{p.subcategory}</p>
                  <h3 className="font-serif text-3xl mt-2">{p.title}</h3>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate('celebrity')} className="text-xs uppercase tracking-luxury text-[#D8C4A0] hover:text-white transition">View Celebrity Archive →</button>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <SectionTitle kicker="@wardrobetalks" title="The Daily Atelier" sub="A peek into the workshop, on Instagram." />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {INSTA_IMGS.map((src, i) => (
            <a key={i} href="#" className="zoom-img aspect-square block relative group">
              <img src={src} alt="Instagram" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#1C1C1C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-6">In Their Words</p>
          <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-[#F5F1E8]">
            &ldquo;Aanya didn't just design my lehenga — she designed the way I felt walking down the aisle. Every stitch felt like it knew me.&rdquo;
          </p>
          <p className="mt-8 text-xs uppercase tracking-luxury">— Riya M., Bride, December 2024</p>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <SectionTitle kicker="The Journal" title="Stories from the Atelier" />
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map(b => (
            <button key={b.id} onClick={() => navigate('blog-detail', { id: b.id })} className="text-left group">
              <div className="zoom-img aspect-[4/3]"><img src={b.cover} alt={b.title} loading="lazy" className="w-full h-full object-cover" /></div>
              <h3 className="font-serif text-2xl mt-5 group-hover:text-[#C6A972] transition">{b.title}</h3>
              <p className="text-sm text-[#A8A8A8] mt-2 line-clamp-2">{b.excerpt}</p>
              <p className="mt-4 text-[10px] uppercase tracking-luxury text-[#D8C4A0]">Read Story →</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ------------------------------ Collection ------------------------------ */
const CollectionView = ({ navigate, products, category, initialSub }) => {
  const [sub, setSub] = useState(initialSub || 'All')
  const items = useMemo(() => {
    let list = products.filter(p => p.category === category)
    if (sub !== 'All') list = list.filter(p => p.subcategory === sub)
    return list
  }, [products, category, sub])
  const subs = category === 'Women' ? ['All', ...WOMEN_SUBCATS] : ['All', ...Array.from(new Set(products.filter(p => p.category === category).map(p => p.subcategory)))]
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">The Collection</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-[#F5F1E8]">{category}</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-14 no-scrollbar">
        {subs.map(s => (
          <button key={s} onClick={() => setSub(s)} className={`px-5 py-2 text-[11px] uppercase tracking-luxury transition border ${sub === s ? 'bg-[#C6A972] text-[#121212] border-[#C6A972]' : 'text-[#F5F1E8] border-[#C6A972]/25 hover:border-[#C6A972] hover:text-[#C6A972]'}`}>{s}</button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="text-center font-serif italic text-[#A8A8A8] py-20">New pieces coming soon to this edit.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map(p => <ProductCard key={p.id} p={p} navigate={navigate} />)}
        </div>
      )}
    </div>
  )
}

/* ------------------------------ Product Detail ------------------------------ */
const ProductView = ({ navigate, productId, settings }) => {
  const [product, setProduct] = useState(null)
  const [idx, setIdx] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setIdx(0); setProduct(null)
    api.get(`/products/${productId}`).then(setProduct)
  }, [productId])

  useEffect(() => {
    if (product) setForm(f => ({ ...f, message: `Hello, I am interested in "${product.title}". Could you share more details?` }))
  }, [product])

  if (!product) return <div className="pt-32 px-6 text-center font-serif italic text-[#A8A8A8]/60">Loading the piece…</div>
  if (product.error) return <div className="pt-32 px-6 text-center">Not found.</div>

  const waNumber = (settings?.whatsappNumber || '+919999999999').replace(/[^0-9]/g, '')
  const waMessage = encodeURIComponent(`Hello Wardrobe Talks, I'd love to know more about "${product.title}" (${product.subcategory}).`)
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  const submitInquiry = async (e) => {
    e.preventDefault()
    await api.post('/inquiries', { ...form, productId: product.id, productTitle: product.title })
    setSent(true)
    setTimeout(() => { setShowForm(false); setSent(false) }, 2500)
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-[1400px] mx-auto">
      <button onClick={() => navigate('women')} className="text-xs uppercase tracking-luxury text-[#A8A8A8] hover:text-[#C6A972] mb-8">← Back to Collection</button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] bg-[#1C1C1C] overflow-hidden">
            <img src={product.images[idx]} alt={product.title} className="w-full h-full object-cover" />
            {product.images.length > 1 && (
              <>
                <button onClick={() => setIdx((idx - 1 + product.images.length) % product.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1C1C1C]/80 hover:bg-[#1C1C1C] p-2"><ChevronLeft size={18} /></button>
                <button onClick={() => setIdx((idx + 1) % product.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1C1C1C]/80 hover:bg-[#1C1C1C] p-2"><ChevronRight size={18} /></button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`aspect-square border-2 ${idx === i ? 'border-[#C6A972]' : 'border-transparent'}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:pl-8 lg:sticky lg:top-28 self-start">
          <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0]">{product.category} · {product.subcategory}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light mt-3">{product.title}</h1>
          <p className="mt-6 text-[#D8C4A0] leading-relaxed">{product.description}</p>

          <div className="mt-8 space-y-3 border-t border-b border-[#C6A972]/20 py-6">
            <Detail k="Fabric" v={product.fabric} />
            <Detail k="Occasion" v={product.occasion} />
            <Detail k="Designer's Note" v={product.designerNotes} italic />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white py-4 text-xs uppercase tracking-luxury transition">
              <MessageCircle size={16} /> Enquire via WhatsApp
            </a>
            <button onClick={() => setShowForm(true)} className="flex-1 flex items-center justify-center gap-2 bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] py-4 text-xs uppercase tracking-luxury transition">
              <Mail size={16} /> Email Enquiry
            </button>
          </div>

          <p className="mt-5 font-serif italic text-sm text-[#A8A8A8]">All pieces are made to order. Standard delivery 6–10 weeks.</p>
        </div>
      </div>

      {/* Related */}
      {product.related?.length > 0 && (
        <div className="mt-24">
          <SectionTitle title="You May Also Love" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {product.related.map(p => <ProductCard key={p.id} p={p} navigate={navigate} />)}
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="bg-[#121212] max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowForm(false)} className="absolute top-4 right-4"><X size={20} /></button>
              {sent ? (
                <div className="text-center py-8">
                  <p className="font-serif text-3xl text-[#C6A972]">Thank you.</p>
                  <p className="mt-3 text-sm text-[#A8A8A8] font-serif italic">We will reach out within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0]">Private Enquiry</p>
                  <h3 className="font-serif text-2xl mt-2">{product.title}</h3>
                  <form onSubmit={submitInquiry} className="mt-6 space-y-3">
                    <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
                    <input required placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
                    <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
                    <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
                    <button type="submit" className="w-full bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] py-3.5 text-xs uppercase tracking-luxury transition">Send Enquiry</button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Detail = ({ k, v, italic }) => (
  <div className="flex gap-6">
    <span className="uppercase tracking-luxury text-[10px] text-[#A8A8A8] w-32 shrink-0 pt-1">{k}</span>
    <span className={`text-sm text-[#F5F1E8] ${italic ? 'font-serif italic' : ''}`}>{v}</span>
  </div>
)

/* ------------------------------ About ------------------------------ */
const AboutView = () => (
  <div className="pt-32 pb-24">
    <section className="max-w-3xl mx-auto px-6 text-center mb-20">
      <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-4">The House</p>
      <h1 className="font-serif text-5xl md:text-6xl font-light">A Quiet Devotion<br/>to Craft.</h1>
      <p className="mt-8 font-serif italic text-lg text-[#A8A8A8] leading-relaxed">Wardrobe Talks was founded in 2014 in a small Mumbai studio with three karigars and a single vision — to bring back the slow, sacred poetry of Indian couture.</p>
    </section>

    <section className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center mb-24">
      <div className="zoom-img aspect-[4/5]"><img src={ABOUT_DESIGNER} alt="Designer" className="w-full h-full object-cover" /></div>
      <div>
        <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">Meet the Designer</p>
        <h2 className="font-serif text-4xl font-light">Aanya Kapoor</h2>
        <p className="mt-6 text-[#D8C4A0] leading-relaxed">A NIFT alumna and a sixth-generation textile lover, Aanya trained under master karigars in Lucknow and Banaras before founding Wardrobe Talks. Her work has dressed brides across four continents and graced red carpets at Cannes.</p>
        <p className="mt-4 text-[#D8C4A0] leading-relaxed">&ldquo;Couture should feel like a heirloom from the moment you wear it. That has been my only brief, for ten years.&rdquo;</p>
      </div>
    </section>

    <section className="bg-[#1C1C1C] py-20 px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">Our Vision</p>
          <h3 className="font-serif text-3xl font-light">To make heirloom luxury accessible to a new generation of Indian women — without compromising a single thread of its soul.</h3>
        </div>
        <div>
          <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">Our Mission</p>
          <p className="font-serif text-xl italic leading-relaxed text-[#D8C4A0]">To protect, employ, and celebrate the karigars who carry centuries of textile knowledge — and to translate their craft into pieces that future generations will inherit with pride.</p>
        </div>
      </div>
    </section>

    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <SectionTitle kicker="Inside the Atelier" title="The Workshop" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="zoom-img aspect-[4/3]"><img src={ABOUT_WORKSHOP_1} alt="Workshop" className="w-full h-full object-cover" /></div>
        <div className="zoom-img aspect-[4/3]"><img src={ABOUT_WORKSHOP_2} alt="Workshop" className="w-full h-full object-cover" /></div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-6 py-16">
      <SectionTitle kicker="The Story So Far" title="Our Timeline" />
      <div className="space-y-8">
        {[
          ['2014', 'Founded in a 400 sq ft Bandra studio'],
          ['2017', 'Dressed our first Bollywood A-lister'],
          ['2019', 'Opened the flagship Mumbai atelier'],
          ['2022', 'First international showcase, Dubai'],
          ['2024', 'Launched the Celebrity Edit'],
          ['2025', 'Ten years of slow couture'],
        ].map(([y, t]) => (
          <div key={y} className="flex gap-8 border-b border-[#C6A972]/20 pb-6">
            <span className="font-serif text-3xl text-[#C6A972] w-24">{y}</span>
            <span className="text-[#D8C4A0] pt-2">{t}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
)

/* ------------------------------ Blogs ------------------------------ */
const BlogsView = ({ navigate, blogs }) => (
  <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
    <div className="text-center mb-16">
      <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">The Journal</p>
      <h1 className="font-serif text-5xl md:text-6xl font-light">Stories from the Atelier</h1>
    </div>
    <div className="grid md:grid-cols-3 gap-10">
      {blogs.map(b => (
        <button key={b.id} onClick={() => navigate('blog-detail', { id: b.id })} className="text-left group">
          <div className="zoom-img aspect-[4/3]"><img src={b.cover} alt={b.title} className="w-full h-full object-cover" /></div>
          <h3 className="font-serif text-2xl mt-5 group-hover:text-[#C6A972] transition">{b.title}</h3>
          <p className="text-sm text-[#A8A8A8] mt-2 line-clamp-3">{b.excerpt}</p>
        </button>
      ))}
    </div>
  </div>
)

const BlogDetailView = ({ blogId, navigate }) => {
  const [blog, setBlog] = useState(null)
  useEffect(() => { api.get(`/blogs/${blogId}`).then(setBlog) }, [blogId])
  if (!blog) return <div className="pt-32 px-6 text-center font-serif italic text-[#A8A8A8]/60">Loading…</div>
  return (
    <article className="pt-32 pb-24 max-w-3xl mx-auto px-6">
      <button onClick={() => navigate('blogs')} className="text-xs uppercase tracking-luxury text-[#A8A8A8] hover:text-[#C6A972] mb-8">← Back to Journal</button>
      <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0]">Journal</p>
      <h1 className="font-serif text-4xl md:text-5xl font-light mt-3 leading-tight">{blog.title}</h1>
      <div className="zoom-img aspect-[16/9] mt-10"><img src={blog.cover} alt={blog.title} className="w-full h-full object-cover" /></div>
      <div className="mt-10 prose font-serif text-lg leading-relaxed text-[#F5F1E8] whitespace-pre-line">{blog.content}</div>
    </article>
  )
}

/* ------------------------------ Contact ------------------------------ */
const ContactView = ({ settings }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    await api.post('/inquiries', form)
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }
  const waNumber = (settings?.whatsappNumber || '+919999999999').replace(/[^0-9]/g, '')
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="text-center mb-16">
        <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">Get in Touch</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light">Begin the Conversation</h1>
        <p className="mt-5 font-serif italic text-[#A8A8A8] max-w-xl mx-auto">For consultations, custom orders, and press enquiries.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h3 className="font-serif text-2xl mb-6">The Atelier</h3>
          <p className="text-[#D8C4A0] mb-6">12, Linking Road,<br/>Bandra West, Mumbai 400050<br/>India</p>
          <div className="space-y-3 text-sm text-[#D8C4A0]">
            <p className="flex items-center gap-3"><Phone size={14} className="text-[#C6A972]" /> {settings?.whatsappNumber || '+91 99999 99999'}</p>
            <p className="flex items-center gap-3"><Mail size={14} className="text-[#C6A972]" /> {settings?.inquiryEmail || 'inquiries@wardrobetalks.com'}</p>
            <p className="flex items-center gap-3"><Instagram size={14} className="text-[#C6A972]" /> @wardrobetalks</p>
          </div>
          <p className="mt-10 uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-2">Studio hours</p>
          <p className="text-sm text-[#D8C4A0]">Mon – Sat · 11am – 7pm · By appointment</p>
          <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-3 text-xs uppercase tracking-luxury"><MessageCircle size={16} /> Chat on WhatsApp</a>
        </div>
        <div>
          {sent ? (
            <div className="bg-[#1C1C1C] p-10 text-center">
              <p className="font-serif text-3xl text-[#C6A972]">Thank you.</p>
              <p className="mt-3 text-sm text-[#A8A8A8] font-serif italic">Your message has been received. We'll be in touch within 24 hours.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-xs uppercase tracking-luxury text-[#C6A972]">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3.5 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
              <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3.5 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
              <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3.5 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
              <textarea required rows={6} placeholder="Tell us about your enquiry" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3.5 bg-[#1C1C1C] border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
              <button type="submit" className="w-full bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] py-4 text-xs uppercase tracking-luxury transition">Send Enquiry</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ Admin ------------------------------ */
const AdminView = () => {
  const [token, setToken] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: 'admin@wardrobetalks.com', password: '' })
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [blogs, setBlogs] = useState([])
  const [settings, setSettings] = useState({})
  const [editing, setEditing] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    const t = typeof window !== 'undefined' ? sessionStorage.getItem('wt_token') : null
    if (t) setToken(t)
  }, [])

  const loadAll = async () => {
    setProducts(await api.get('/products'))
    setBlogs(await fetch('/api/blogs?all=true').then(r => r.json()))
    setInquiries(await fetch('/api/inquiries', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()))
    setSettings(await api.get('/settings'))
  }
  useEffect(() => { if (token) loadAll() }, [token])

  const doLogin = async (e) => {
    e.preventDefault()
    setErr('')
    const r = await api.post('/auth/login', loginForm)
    if (r.token) { sessionStorage.setItem('wt_token', r.token); setToken(r.token) }
    else setErr(r.error || 'Login failed')
  }
  const logout = () => { sessionStorage.removeItem('wt_token'); setToken(null) }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#121212]">
        <form onSubmit={doLogin} className="bg-[#1C1C1C] p-10 max-w-md w-full border border-[#C6A972]/20">
          <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-3">Wardrobe Talks</p>
          <h1 className="font-serif text-3xl">Admin Sign In</h1>
          <p className="text-xs text-[#A8A8A8] mt-1">Default: admin@wardrobetalks.com / wardrobe@2025</p>
          <div className="mt-6 space-y-3">
            <input required type="email" placeholder="Email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} className="w-full px-4 py-3 border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
            <input required type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full px-4 py-3 border border-[#C6A972]/20 focus:border-[#C6A972] outline-none text-sm" />
            {err && <p className="text-xs text-red-600">{err}</p>}
            <button type="submit" className="w-full bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] py-3 text-xs uppercase tracking-luxury">Sign In</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-[#C6A972]/20 pb-6">
        <div>
          <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0]">Admin</p>
          <h1 className="font-serif text-4xl mt-1">Dashboard</h1>
        </div>
        <button onClick={logout} className="text-xs uppercase tracking-luxury flex items-center gap-2 hover:text-[#C6A972]"><LogOut size={14} /> Sign Out</button>
      </div>
      <div className="flex gap-2 mb-10 flex-wrap">
        {['products', 'inquiries', 'blogs', 'settings'].map(t => (
          <button key={t} onClick={() => { setTab(t); setEditing(null) }} className={`px-5 py-2 text-[11px] uppercase tracking-luxury border ${tab === t ? 'bg-[#C6A972] text-[#121212] border-[#C6A972]' : 'text-[#F5F1E8] border-[#C6A972]/30 hover:border-[#C6A972] hover:text-[#C6A972]'}`}>{t}</button>
        ))}
      </div>

      {tab === 'products' && <AdminProducts products={products} reload={loadAll} token={token} editing={editing} setEditing={setEditing} />}
      {tab === 'inquiries' && <AdminInquiries inquiries={inquiries} reload={loadAll} token={token} />}
      {tab === 'blogs' && <AdminBlogs blogs={blogs} reload={loadAll} token={token} editing={editing} setEditing={setEditing} />}
      {tab === 'settings' && <AdminSettings settings={settings} reload={loadAll} token={token} />}
    </div>
  )
}

const empty = { title: '', description: '', category: 'Women', subcategory: 'Bridal Lehenga', images: [''], designerNotes: '', fabric: '', occasion: '', featured: false }

const AdminProducts = ({ products, reload, token, editing, setEditing }) => {
  const [form, setForm] = useState(empty)
  useEffect(() => { setForm(editing || empty) }, [editing])
  const save = async (e) => {
    e.preventDefault()
    const payload = { ...form, images: form.images.filter(Boolean) }
    if (editing?.id) await api.put(`/products/${editing.id}`, payload, token)
    else await api.post('/products', payload, token)
    setForm(empty); setEditing(null); reload()
  }
  const remove = async (id) => { if (confirm('Delete this product?')) { await api.del(`/products/${id}`, token); reload() } }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl">Products ({products.length})</h2>
          <button onClick={() => { setForm(empty); setEditing(null) }} className="text-xs uppercase tracking-luxury flex items-center gap-1 text-[#C6A972]"><Plus size={14} /> New</button>
        </div>
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="bg-[#1C1C1C] p-4 flex gap-4 items-center border border-[#C6A972]/20">
              <img src={p.images?.[0]} alt={p.title} className="w-16 h-20 object-cover" />
              <div className="flex-1">
                <p className="font-serif text-lg">{p.title}</p>
                <p className="text-xs text-[#A8A8A8]">{p.category} · {p.subcategory} {p.featured && '· ⭐ Featured'}</p>
              </div>
              <button onClick={() => setEditing(p)} className="p-2 hover:text-[#C6A972]"><Edit3 size={16} /></button>
              <button onClick={() => remove(p.id)} className="p-2 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={save} className="bg-[#1C1C1C] p-6 border border-[#C6A972]/20 space-y-3 h-fit sticky top-24">
        <h3 className="font-serif text-xl">{editing ? 'Edit Product' : 'New Product'}</h3>
        <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <textarea required rows={3} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm">
          <option>Women</option><option>Men</option><option>Celebrity</option>
        </select>
        <input placeholder="Subcategory (e.g. Bridal Lehenga)" value={form.subcategory} onChange={e => setForm({ ...form, subcategory: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <input placeholder="Fabric" value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <input placeholder="Occasion" value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <textarea rows={2} placeholder="Designer Notes" value={form.designerNotes} onChange={e => setForm({ ...form, designerNotes: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <div>
          <p className="text-xs uppercase tracking-luxury mb-2">Image URLs</p>
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="https://…" value={img} onChange={e => { const arr = [...form.images]; arr[i] = e.target.value; setForm({ ...form, images: arr }) }} className="flex-1 px-3 py-2 border border-[#C6A972]/20 text-xs" />
              <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, x) => x !== i) })} className="text-red-500">×</button>
            </div>
          ))}
          <button type="button" onClick={() => setForm({ ...form, images: [...form.images, ''] })} className="text-xs text-[#C6A972]">+ Add image</button>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured / Signature</label>
        <button type="submit" className="w-full bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] py-2.5 text-xs uppercase tracking-luxury">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={() => setEditing(null)} className="w-full text-xs text-[#A8A8A8]">Cancel</button>}
      </form>
    </div>
  )
}

const AdminInquiries = ({ inquiries, reload, token }) => {
  const remove = async (id) => { if (confirm('Delete?')) { await api.del(`/inquiries/${id}`, token); reload() } }
  return (
    <div>
      <h2 className="font-serif text-2xl mb-4">Inquiries ({inquiries.length})</h2>
      {inquiries.length === 0 && <p className="font-serif italic text-[#A8A8A8]">No inquiries yet.</p>}
      <div className="space-y-3">
        {inquiries.map(i => (
          <div key={i.id} className="bg-[#1C1C1C] p-5 border border-[#C6A972]/20">
            <div className="flex justify-between">
              <div>
                <p className="font-serif text-lg">{i.name} <span className="text-sm text-[#A8A8A8]">· {i.email}</span></p>
                <p className="text-xs text-[#A8A8A8]">{i.phone} · {new Date(i.createdAt).toLocaleString()}</p>
                {i.productTitle && <p className="text-xs uppercase tracking-luxury text-[#C6A972] mt-2">Re: {i.productTitle}</p>}
              </div>
              <button onClick={() => remove(i.id)} className="text-red-600"><Trash2 size={16} /></button>
            </div>
            <p className="mt-3 text-sm text-[#D8C4A0]">{i.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const emptyBlog = { title: '', excerpt: '', content: '', cover: '', status: 'draft' }
const AdminBlogs = ({ blogs, reload, token, editing, setEditing }) => {
  const [form, setForm] = useState(emptyBlog)
  useEffect(() => { setForm(editing || emptyBlog) }, [editing])
  const save = async (e) => {
    e.preventDefault()
    if (editing?.id) await api.put(`/blogs/${editing.id}`, form, token)
    else await api.post('/blogs', form, token)
    setForm(emptyBlog); setEditing(null); reload()
  }
  const remove = async (id) => { if (confirm('Delete?')) { await api.del(`/blogs/${id}`, token); reload() } }
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl">Blogs ({blogs.length})</h2>
          <button onClick={() => { setForm(emptyBlog); setEditing(null) }} className="text-xs uppercase tracking-luxury text-[#C6A972]"><Plus size={14} className="inline" /> New</button>
        </div>
        <div className="space-y-3">
          {blogs.map(b => (
            <div key={b.id} className="bg-[#1C1C1C] p-4 border border-[#C6A972]/20 flex gap-4">
              <img src={b.cover} alt="" className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <p className="font-serif">{b.title}</p>
                <p className="text-xs text-[#A8A8A8]">{b.status === 'published' ? <span className="text-green-700"><Eye size={12} className="inline" /> Published</span> : <span className="text-[#A8A8A8]"><EyeOff size={12} className="inline" /> Draft</span>}</p>
              </div>
              <button onClick={() => setEditing(b)} className="p-2"><Edit3 size={16} /></button>
              <button onClick={() => remove(b.id)} className="p-2 text-red-600"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={save} className="bg-[#1C1C1C] p-6 border border-[#C6A972]/20 space-y-3 h-fit">
        <h3 className="font-serif text-xl">{editing ? 'Edit Story' : 'New Story'}</h3>
        <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <input placeholder="Cover image URL" value={form.cover} onChange={e => setForm({ ...form, cover: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <textarea rows={2} placeholder="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <textarea rows={8} placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm">
          <option value="draft">Draft</option><option value="published">Published</option>
        </select>
        <button className="w-full bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] py-2.5 text-xs uppercase tracking-luxury">{editing ? 'Update' : 'Create'}</button>
      </form>
    </div>
  )
}

const AdminSettings = ({ settings, reload, token }) => {
  const [form, setForm] = useState(settings)
  useEffect(() => { setForm(settings) }, [settings])
  const save = async (e) => { e.preventDefault(); await api.put('/settings', form, token); reload(); alert('Saved.') }
  return (
    <form onSubmit={save} className="bg-[#1C1C1C] p-6 border border-[#C6A972]/20 max-w-2xl space-y-3">
      <h2 className="font-serif text-2xl">Site Settings</h2>
      <label className="block text-xs uppercase tracking-luxury">WhatsApp Number (with country code)</label>
      <input value={form.whatsappNumber || ''} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
      <label className="block text-xs uppercase tracking-luxury">Inquiry Email</label>
      <input value={form.inquiryEmail || ''} onChange={e => setForm({ ...form, inquiryEmail: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
      <label className="block text-xs uppercase tracking-luxury">Hero Headline</label>
      <input value={form.heroHeadline || ''} onChange={e => setForm({ ...form, heroHeadline: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
      <label className="block text-xs uppercase tracking-luxury">Hero Subtext</label>
      <input value={form.heroSubtext || ''} onChange={e => setForm({ ...form, heroSubtext: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
      <label className="block text-xs uppercase tracking-luxury">Brand Tagline</label>
      <input value={form.brandTagline || ''} onChange={e => setForm({ ...form, brandTagline: e.target.value })} className="w-full px-3 py-2 border border-[#C6A972]/20 text-sm" />
      <button className="bg-[#C6A972] hover:bg-[#D8C4A0] text-[#121212] px-6 py-2.5 text-xs uppercase tracking-luxury">Save</button>
    </form>
  )
}

/* ------------------------------ Footer ------------------------------ */
const Footer = ({ navigate, settings }) => (
  <footer className="bg-[#0a0a0a] text-[#F5F1E8]/80 pt-20 pb-8 px-6 border-t border-[#C6A972]/20">
    <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-10">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-2xl text-[#F5F1E8]">Wardrobe</span>
          <span className="font-serif italic text-lg text-[#D8C4A0]">Talks</span>
        </div>
        <p className="mt-4 text-sm font-serif italic text-white/60">{settings?.brandTagline || 'Where threads tell stories.'}</p>
      </div>
      <div>
        <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-4">Explore</p>
        <ul className="space-y-2 text-sm">
          {NAV.map(n => <li key={n.key}><button onClick={() => navigate(n.key)} className="hover:text-[#D8C4A0]">{n.label}</button></li>)}
        </ul>
      </div>
      <div>
        <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-4">Atelier</p>
        <p className="text-sm">12, Linking Road<br/>Bandra West, Mumbai 400050</p>
        <p className="text-sm mt-3">{settings?.inquiryEmail || 'inquiries@wardrobetalks.com'}</p>
        <p className="text-sm">{settings?.whatsappNumber || '+91 99999 99999'}</p>
      </div>
      <div>
        <p className="uppercase tracking-luxury text-[10px] text-[#D8C4A0] mb-4">Follow</p>
        <a href="#" className="text-sm flex items-center gap-2 hover:text-[#D8C4A0]"><Instagram size={14} /> @wardrobetalks</a>
        <button onClick={() => navigate('admin')} className="mt-6 text-[10px] uppercase tracking-luxury text-white/30 hover:text-[#D8C4A0]">Admin</button>
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/10 text-[11px] text-white/40 text-center">
      © {new Date().getFullYear()} Wardrobe Talks. All pieces are handcrafted with intention.
    </div>
  </footer>
)

/* ------------------------------ App ------------------------------ */
function App() {
  const [view, setView] = useState('home')
  const [params, setParams] = useState({})
  const [products, setProducts] = useState([])
  const [blogs, setBlogs] = useState([])
  const [settings, setSettings] = useState({})

  const navigate = (v, p = {}) => { setView(v); setParams(p); if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }) }

  useEffect(() => {
    api.get('/products').then(d => Array.isArray(d) && setProducts(d))
    api.get('/blogs').then(d => Array.isArray(d) && setBlogs(d))
    api.get('/settings').then(setSettings)
  }, [view])

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView navigate={navigate} products={products} blogs={blogs} settings={settings} />
      case 'women': return <CollectionView navigate={navigate} products={products} category="Women" initialSub={params.sub} />
      case 'collection': return <CollectionView navigate={navigate} products={products} category="Women" initialSub={params.sub} />
      case 'men': return <CollectionView navigate={navigate} products={products} category="Men" />
      case 'celebrity': return <CollectionView navigate={navigate} products={products} category="Celebrity" />
      case 'product': return <ProductView navigate={navigate} productId={params.id} settings={settings} />
      case 'about': return <AboutView />
      case 'blogs': return <BlogsView navigate={navigate} blogs={blogs} />
      case 'blog-detail': return <BlogDetailView navigate={navigate} blogId={params.id} />
      case 'contact': return <ContactView settings={settings} />
      case 'admin': return <AdminView />
      default: return <HomeView navigate={navigate} products={products} blogs={blogs} settings={settings} />
    }
  }

  const waNumber = (settings?.whatsappNumber || '+919999999999').replace(/[^0-9]/g, '')

  return (
    <div className="min-h-screen">
      {view !== 'admin' && <Header view={view} navigate={navigate} />}
      <main className="fade-up">{renderView()}</main>
      {view !== 'admin' && <Footer navigate={navigate} settings={settings} />}
      {view !== 'admin' && (
        <a href={`https://wa.me/${waNumber}?text=Hello%20Wardrobe%20Talks!`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1ebe57] text-white p-4 rounded-full shadow-2xl transition hover:scale-105" aria-label="Chat on WhatsApp">
          <MessageCircle size={24} />
        </a>
      )}
    </div>
  )
}

export default App
