import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client
let db
let seeded = false

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'wardrobe_talks')
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

const ADMIN_EMAIL = 'admin@wardrobetalks.com'
const ADMIN_PASSWORD = 'wardrobe@2025'
const ADMIN_TOKEN = 'wt_admin_secure_token_2025'

function isAuthed(request) {
  const auth = request.headers.get('authorization') || ''
  return auth === `Bearer ${ADMIN_TOKEN}`
}

// Seed initial products if collection empty
async function seedProducts(db) {
  if (seeded) return
  seeded = true

  // Always ensure settings exists with required fields
  const defaultSettings = {
    whatsappNumber: '+919885525611',
    whatsappCommunity: 'https://chat.whatsapp.com/KwfqIRFfq9TIR3O657M0EZ',
    instagramUrl: 'https://www.instagram.com/wardrobe.talks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    facebookUrl: '',
    youtubeUrl: '',
    inquiryEmail: '',
    storeAddress: '12, Linking Road, Bandra West, Mumbai 400050',
    storeMapsUrl: 'https://www.google.com/maps/search/?api=1&query=12+Linking+Road+Bandra+West+Mumbai+400050',
    brandTagline: 'Where threads tell stories.',
    heroHeadline: 'Couture, Quietly Spoken.',
    heroSubtext: 'A Mumbai atelier crafting heirloom Indian wear since 2014.',
  }
  await db.collection('settings').updateOne(
    { id: 'main' },
    { $set: { id: 'main', ...defaultSettings } },
    { upsert: false }
  )
  const exists = await db.collection('settings').findOne({ id: 'main' })
  if (!exists) {
    await db.collection('settings').insertOne({ id: 'main', ...defaultSettings })
  }

  // Always ensure gallery exists
  const galleryCount = await db.collection('gallery').countDocuments()
  if (galleryCount === 0) {
    const galleryImgs = [
      'https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?w=600',
      'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=600',
      'https://images.pexels.com/photos/37628608/pexels-photo-37628608.jpeg?w=600',
      'https://images.unsplash.com/photo-1707576618343-26a1b377ca7a?w=600',
      'https://images.pexels.com/photos/28405815/pexels-photo-28405815.jpeg?w=600',
      'https://images.unsplash.com/photo-1654764746225-e63f5e90facd?w=600',
    ]
    await db.collection('gallery').insertMany(
      galleryImgs.map((src, i) => ({ id: uuidv4(), image: src, link: '', order: i, createdAt: new Date() }))
    )
  }

  // Always ensure hero slides exist
  const heroCount = await db.collection('heroSlides').countDocuments()
  if (heroCount === 0) {
    const heroes = [
      {
        image: 'https://images.unsplash.com/photo-1610047614301-13c63f00c032?w=1920&q=85',
        kicker: 'The Bridal Edit',
        title: 'Heirloom Bridal Couture',
        subtitle: 'Hand-embroidered lehengas crafted over months in our Mumbai atelier.',
        ctaLabel: 'Explore Bridal',
        ctaTarget: 'women',
      },
      {
        image: 'https://images.unsplash.com/photo-1629118477133-b8b1499f2b8a?w=1920&q=85',
        kicker: 'New Arrivals',
        title: 'Couture, Quietly Spoken.',
        subtitle: 'Just off the karigars\u2019 tables \u2014 the season\u2019s newest pieces.',
        ctaLabel: 'View Latest',
        ctaTarget: 'women',
      },
      {
        image: 'https://images.unsplash.com/photo-1503160865267-af4660ce7bf2?w=1920&q=85',
        kicker: 'As Seen On',
        title: 'The Celebrity Edit',
        subtitle: 'Worn on the red carpet, on the silver screen, into the spotlight.',
        ctaLabel: 'See the Archive',
        ctaTarget: 'celebrity',
      },
      {
        image: 'https://images.pexels.com/photos/9850415/pexels-photo-9850415.jpeg?w=1920',
        kicker: 'Inside the Atelier',
        title: 'Where Threads Tell Stories',
        subtitle: 'A decade of slow couture, hand-shaped by twenty-three master karigars.',
        ctaLabel: 'The Atelier Story',
        ctaTarget: 'about',
      },
    ]
    await db.collection('heroSlides').insertMany(
      heroes.map((h, i) => ({ id: uuidv4(), order: i, createdAt: new Date(), ...h }))
    )
  }

  const count = await db.collection('products').countDocuments()
  if (count > 0) return

  const now = new Date()
  const seed = [
    // Bridal Lehenga
    { title: 'Rukmini Bridal Lehenga', description: 'A regal red and gold zardozi lehenga hand-embroidered over 600 hours. Crafted on raw Banarasi silk with vintage motifs.', category: 'Women', subcategory: 'Bridal Lehenga', images: ['https://images.unsplash.com/photo-1610047614301-13c63f00c032', 'https://images.unsplash.com/photo-1610047614256-023d7c028d0b'], designerNotes: 'Inspired by Rajput royalty. Pair with temple jewellery for the muhurat ceremony.', fabric: 'Raw Banarasi Silk, Zardozi work', occasion: 'Wedding, Reception', featured: true },
    { title: 'Mehr Crimson Couture', description: 'A statement bridal piece with mirror and dabka work, paired with a velvet blouse and tulle dupatta.', category: 'Women', subcategory: 'Bridal Lehenga', images: ['https://images.unsplash.com/photo-1610047614256-023d7c028d0b', 'https://images.unsplash.com/photo-1610047614301-13c63f00c032'], designerNotes: 'A modern bride\'s heirloom \u2014 versatile enough to be re-worn.', fabric: 'Velvet, Tulle, Mirror work', occasion: 'Wedding', featured: true },
    { title: 'Ivory Reverie', description: 'A pastel ivory lehenga with delicate French knot embroidery, suitable for the modern intimate wedding.', category: 'Women', subcategory: 'Bridal Edit', images: ['https://images.pexels.com/photos/12791932/pexels-photo-12791932.jpeg'], designerNotes: 'Light yet ornate \u2014 the perfect daytime bride.', fabric: 'Organza, French knot', occasion: 'Wedding, Engagement', featured: true },
    // Bridal Blouse
    { title: 'Heritage Bridal Blouse', description: 'Hand-embroidered raw silk blouse with sleeve gota work and sweetheart neckline.', category: 'Women', subcategory: 'Bridal Blouse', images: ['https://images.pexels.com/photos/12791932/pexels-photo-12791932.jpeg'], designerNotes: 'Pairs with any of our lehengas. Bespoke tailoring available.', fabric: 'Raw Silk, Gota Patti', occasion: 'Wedding', featured: false },
    // Anarkali
    { title: 'Jahanara Anarkali', description: 'A floor-grazing Anarkali in champagne georgette with chikankari and pearl work.', category: 'Women', subcategory: 'Anarkali', images: ['https://images.unsplash.com/photo-1571908599407-cdb918ed83bf', 'https://images.unsplash.com/photo-1597983073750-16f5ded1321f'], designerNotes: 'Designed for sangeet & cocktail evenings.', fabric: 'Georgette, Chikankari', occasion: 'Sangeet, Cocktail', featured: true },
    { title: 'Noor Anarkali Set', description: 'Emerald velvet Anarkali with antique zari motifs and matching organza dupatta.', category: 'Women', subcategory: 'Anarkali', images: ['https://images.unsplash.com/photo-1597983073750-16f5ded1321f'], designerNotes: 'Best worn with statement polki earrings.', fabric: 'Velvet, Zari', occasion: 'Reception', featured: false },
    { title: 'Saanjh Anarkali', description: 'A sunset-hued Anarkali \u2014 ombre dyed and finished with sequin scatter.', category: 'Women', subcategory: 'Anarkali', images: ['https://images.unsplash.com/photo-1756483509254-3cc48a5a15b2'], designerNotes: 'Evening wear, modern silhouette.', fabric: 'Chiffon, Sequin', occasion: 'Cocktail, Mehendi', featured: false },
    // Casual Lehenga / Co-ords
    { title: 'Sehra Casual Lehenga', description: 'Block printed cotton silk lehenga for the joyous Haldi morning.', category: 'Women', subcategory: 'Casual Lehenga', images: ['https://images.unsplash.com/photo-1617039487629-6babdcb2a24b'], designerNotes: 'Lightweight, breathable, vibrant.', fabric: 'Cotton Silk, Block Print', occasion: 'Haldi, Day Function', featured: true },
    { title: 'Mira Co-ord Set', description: 'A printed crop top with high-waist palazzo, finished with mirror detailing.', category: 'Women', subcategory: 'Co-ords', images: ['https://images.pexels.com/photos/37628608/pexels-photo-37628608.jpeg'], designerNotes: 'Travel-friendly couture.', fabric: 'Modal Silk', occasion: 'Brunch, Mehendi', featured: false },
    { title: 'Aarohi Co-ord', description: 'Pastel mint co-ord set with thread embroidery and tassel detail.', category: 'Women', subcategory: 'Co-ords', images: ['https://images.unsplash.com/photo-1707576618343-26a1b377ca7a'], designerNotes: 'Easy luxury for the modern muse.', fabric: 'Crepe', occasion: 'Day Event', featured: false },
    // Silk Palazzo
    { title: 'Roohi Silk Palazzo Set', description: 'Tussar silk kurta with wide palazzo and zari border dupatta.', category: 'Women', subcategory: 'Silk Palazzo', images: ['https://images.pexels.com/photos/20407212/pexels-photo-20407212.jpeg'], designerNotes: 'Heritage silhouette refreshed.', fabric: 'Tussar Silk', occasion: 'Pooja, Festive', featured: false },
    // Sharara
    { title: 'Zoya Sharara & Kurta', description: 'Pista green sharara with sequinned kurta and net dupatta.', category: 'Women', subcategory: 'Sharara & Kurta', images: ['https://images.pexels.com/photos/20158862/pexels-photo-20158862.jpeg'], designerNotes: 'Best for sangeet evenings.', fabric: 'Georgette, Sequin', occasion: 'Sangeet', featured: true },
    // Ethnic Wear
    { title: 'Saanvi Ethnic Set', description: 'A versatile ethnic three-piece with intricate aari work.', category: 'Women', subcategory: 'Ethnic Wear', images: ['https://images.unsplash.com/photo-1654764746225-e63f5e90facd'], designerNotes: 'For the woman who wears tradition with confidence.', fabric: 'Silk Blend, Aari', occasion: 'Festive', featured: false },
    // Men
    { title: 'Raja Bandhgala', description: 'Ink-black raw silk bandhgala with antique brass buttons.', category: 'Men', subcategory: 'Bandhgala', images: ['https://images.pexels.com/photos/28802603/pexels-photo-28802603.jpeg'], designerNotes: 'Sharply tailored \u2014 the wedding-season essential.', fabric: 'Raw Silk', occasion: 'Reception, Wedding', featured: true },
    { title: 'Veer Sherwani', description: 'Ivory sherwani with tone-on-tone resham work and matching stole.', category: 'Men', subcategory: 'Sherwani', images: ['https://images.pexels.com/photos/3998093/pexels-photo-3998093.jpeg'], designerNotes: 'For the groom who values understated luxury.', fabric: 'Silk, Resham', occasion: 'Wedding', featured: true },
    // Celebrity
    { title: 'Red Carpet Saree Drape', description: 'A pre-stitched chiffon saree drape worn at Cannes Film Festival, finished with crystal scatter.', category: 'Celebrity', subcategory: 'Red Carpet', images: ['https://images.unsplash.com/photo-1503160865267-af4660ce7bf2'], designerNotes: 'Crafted exclusively for a marquee Bollywood appearance.', fabric: 'Chiffon, Crystal', occasion: 'Red Carpet', featured: true },
    { title: 'Award Night Gown-Lehenga', description: 'Indo-western gown-lehenga fusion, debuted at a recent awards ceremony.', category: 'Celebrity', subcategory: 'Red Carpet', images: ['https://images.unsplash.com/photo-1668371679302-a8ec781e876e'], designerNotes: 'A bold take on Indian couture for the global stage.', fabric: 'Tulle, Hand-painted', occasion: 'Awards, Red Carpet', featured: true },
  ]

  const docs = seed.map(p => ({ id: uuidv4(), ...p, createdAt: now }))
  await db.collection('products').insertMany(docs)

  // Seed blogs
  const blogs = [
    { id: uuidv4(), title: 'The Art of Zardozi: A Vanishing Craft', excerpt: 'Tracing the centuries-old gold thread embroidery still practised in our Mumbai atelier.', content: 'Zardozi, which literally translates to "gold embroidery", traces its origin to ancient Persia and arrived in India during the Mughal era...\n\nAt Wardrobe Talks, every bridal piece carries a piece of this history. Our master karigars spend months on a single panel \u2014 each stitch deliberate, each motif loaded with story.', cover: 'https://images.pexels.com/photos/9850415/pexels-photo-9850415.jpeg', status: 'published', createdAt: now },
    { id: uuidv4(), title: 'How to Choose Your Bridal Lehenga', excerpt: 'A designer\'s honest guide \u2014 silhouette, fabric, and the emotion behind every choice.', content: 'Your bridal lehenga is not just couture \u2014 it is a memory you wear...\n\nStart by understanding what makes you feel like yourself. Trends will fade; the photograph will not.', cover: 'https://images.unsplash.com/photo-1610047614301-13c63f00c032', status: 'published', createdAt: now },
    { id: uuidv4(), title: 'Behind the Atelier: Our Master Karigars', excerpt: 'A glimpse into the hands that shape every Wardrobe Talks creation.', content: 'In our Mumbai workshop, twenty-three karigars hand-craft every piece...\n\nThis is slow fashion in its truest form.', cover: 'https://images.pexels.com/photos/7763068/pexels-photo-7763068.jpeg', status: 'published', createdAt: now },
  ]
  await db.collection('blogs').insertMany(blogs)
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()
    await seedProducts(db)

    // Health
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Wardrobe Talks API live' }))
    }

    // PRODUCTS
    if (route === '/products' && method === 'GET') {
      const url = new URL(request.url)
      const category = url.searchParams.get('category')
      const subcategory = url.searchParams.get('subcategory')
      const featured = url.searchParams.get('featured')
      const q = {}
      if (category) q.category = category
      if (subcategory) q.subcategory = subcategory
      if (featured === 'true') q.featured = true
      const products = await db.collection('products').find(q).sort({ createdAt: -1 }).toArray()
      return handleCORS(NextResponse.json(products.map(({_id, ...r}) => r)))
    }

    if (route.startsWith('/products/') && method === 'GET') {
      const id = route.split('/')[2]
      const product = await db.collection('products').findOne({ id })
      if (!product) return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
      const { _id, ...rest } = product
      // related
      const related = await db.collection('products')
        .find({ subcategory: product.subcategory, id: { $ne: id } })
        .limit(4).toArray()
      return handleCORS(NextResponse.json({ ...rest, related: related.map(({_id, ...r}) => r) }))
    }

    if (route === '/products' && method === 'POST') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const body = await request.json()
      const doc = { id: uuidv4(), createdAt: new Date(), featured: false, ...body }
      await db.collection('products').insertOne(doc)
      const { _id, ...rest } = doc
      return handleCORS(NextResponse.json(rest))
    }

    if (route.startsWith('/products/') && method === 'PUT') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      const body = await request.json()
      delete body._id; delete body.id
      await db.collection('products').updateOne({ id }, { $set: body })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    if (route.startsWith('/products/') && method === 'DELETE') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      await db.collection('products').deleteOne({ id })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // INQUIRIES
    if (route === '/inquiries' && method === 'POST') {
      const body = await request.json()
      if (!body.name || !body.email || !body.message) {
        return handleCORS(NextResponse.json({ error: 'Missing fields' }, { status: 400 }))
      }
      const doc = { id: uuidv4(), createdAt: new Date(), status: 'new', ...body }
      await db.collection('inquiries').insertOne(doc)
      const { _id, ...rest } = doc
      return handleCORS(NextResponse.json(rest))
    }

    if (route === '/inquiries' && method === 'GET') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const inquiries = await db.collection('inquiries').find({}).sort({ createdAt: -1 }).toArray()
      return handleCORS(NextResponse.json(inquiries.map(({_id, ...r}) => r)))
    }

    if (route.startsWith('/inquiries/') && method === 'DELETE') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      await db.collection('inquiries').deleteOne({ id })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // BLOGS
    if (route === '/blogs' && method === 'GET') {
      const url = new URL(request.url)
      const all = url.searchParams.get('all') === 'true'
      const q = all ? {} : { status: 'published' }
      const blogs = await db.collection('blogs').find(q).sort({ createdAt: -1 }).toArray()
      return handleCORS(NextResponse.json(blogs.map(({_id, ...r}) => r)))
    }

    if (route.startsWith('/blogs/') && method === 'GET') {
      const id = route.split('/')[2]
      const blog = await db.collection('blogs').findOne({ id })
      if (!blog) return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
      const { _id, ...rest } = blog
      return handleCORS(NextResponse.json(rest))
    }

    if (route === '/blogs' && method === 'POST') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const body = await request.json()
      const doc = { id: uuidv4(), createdAt: new Date(), status: 'draft', ...body }
      await db.collection('blogs').insertOne(doc)
      const { _id, ...rest } = doc
      return handleCORS(NextResponse.json(rest))
    }

    if (route.startsWith('/blogs/') && method === 'PUT') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      const body = await request.json()
      delete body._id; delete body.id
      await db.collection('blogs').updateOne({ id }, { $set: body })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    if (route.startsWith('/blogs/') && method === 'DELETE') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      await db.collection('blogs').deleteOne({ id })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // HERO SLIDES
    if (route === '/hero' && method === 'GET') {
      const items = await db.collection('heroSlides').find({}).sort({ order: 1, createdAt: 1 }).toArray()
      return handleCORS(NextResponse.json(items.map(({_id, ...r}) => r)))
    }
    if (route === '/hero' && method === 'POST') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const body = await request.json()
      const doc = { id: uuidv4(), createdAt: new Date(), order: 999, ctaTarget: 'women', ...body }
      await db.collection('heroSlides').insertOne(doc)
      const { _id, ...rest } = doc
      return handleCORS(NextResponse.json(rest))
    }
    if (route.startsWith('/hero/') && method === 'PUT') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      const body = await request.json()
      delete body._id; delete body.id
      await db.collection('heroSlides').updateOne({ id }, { $set: body })
      return handleCORS(NextResponse.json({ ok: true }))
    }
    if (route.startsWith('/hero/') && method === 'DELETE') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      await db.collection('heroSlides').deleteOne({ id })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // GALLERY (Daily Atelier)
    if (route === '/gallery' && method === 'GET') {
      const items = await db.collection('gallery').find({}).sort({ order: 1, createdAt: 1 }).toArray()
      return handleCORS(NextResponse.json(items.map(({_id, ...r}) => r)))
    }
    if (route === '/gallery' && method === 'POST') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const body = await request.json()
      const doc = { id: uuidv4(), createdAt: new Date(), order: 999, link: '', ...body }
      await db.collection('gallery').insertOne(doc)
      const { _id, ...rest } = doc
      return handleCORS(NextResponse.json(rest))
    }
    if (route.startsWith('/gallery/') && method === 'PUT') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      const body = await request.json()
      delete body._id; delete body.id
      await db.collection('gallery').updateOne({ id }, { $set: body })
      return handleCORS(NextResponse.json({ ok: true }))
    }
    if (route.startsWith('/gallery/') && method === 'DELETE') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      await db.collection('gallery').deleteOne({ id })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // SETTINGS
    if (route === '/settings' && method === 'GET') {
      const s = await db.collection('settings').findOne({ id: 'main' })
      if (!s) return handleCORS(NextResponse.json({}))
      const { _id, ...rest } = s
      return handleCORS(NextResponse.json(rest))
    }

    if (route === '/settings' && method === 'PUT') {
      if (!isAuthed(request)) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const body = await request.json()
      delete body._id
      await db.collection('settings').updateOne({ id: 'main' }, { $set: body }, { upsert: true })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // AUTH
    if (route === '/auth/login' && method === 'POST') {
      const { email, password } = await request.json()
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return handleCORS(NextResponse.json({ token: ADMIN_TOKEN, email }))
      }
      return handleCORS(NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error', detail: error.message }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
