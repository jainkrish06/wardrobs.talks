# Wardrobe Talks

## 🚀 Tech Stack
- **Next.js 15** (App Router, API routes)
- **Tailwind CSS** (custom luxury palette)
- **Framer Motion** for transitions
- **MongoDB** + native driver
- **lucide-react** icons
- **Marcellus** serif + **Inter** sans typography

## 📁 Project Structure
```
/app
├── app/
│   ├── api/[[...path]]/route.js   # All backend routes (REST)
│   ├── page.js                    # Single-page app (all UI)
│   ├── layout.js                  # Root layout + fonts + meta
│   ├── globals.css                # Tailwind + custom utils
│   └── providers.js               # Client providers wrapper
├── components/ui/                 # shadcn primitives
├── lib/                           # utility helpers
├── public/                        # static assets
├── .env                           # MONGO_URL, DB_NAME, NEXT_PUBLIC_BASE_URL
├── package.json
└── README.md
```

## 🎨 Color Palette
```
Primary BG       #121212
Secondary BG     #1C1C1C
Footer Anchor    #0a0a0a
Luxury Gold      #C6A972   (primary accent / CTA fill)
Champagne Gold   #D8C4A0   (hover lighten / kickers)
Ivory            #F5F1E8   (body text)
White            #FFFFFF   (hero text)
Soft Gray        #A8A8A8   (captions)
```

## 🔑 Admin Access
- URL: click `Admin` link in footer
- Email: `admin@wardrobetalks.com`
- Password: `wardrobe@2025`

## 📊 Data Storage (where inquiries go)

All visitor enquiries are saved into **MongoDB `inquiries` collection** with:
```json
{
  "id": "uuid",
  "name": "Riya M.",
  "email": "riya@example.com",
  "phone": "+91...",
  "message": "...",
  "productId": "uuid (optional)",
  "productTitle": "Rukmini Bridal Lehenga (optional)",
  "status": "new",
  "createdAt": "2026-06-19T..."
}
```

**View enquiries**: Admin Dashboard → Inquiries tab. Each entry shows name, email, phone, the product they enquired about, and the full message.

**Email forwarding** (to forward enquiries to your inbox): Requires SMTP credentials. Add these to `.env` and Nodemailer will forward each new inquiry:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-specific-password
INQUIRY_TO=where-to-receive@gmail.com
```
(Nodemailer wiring is ready to be enabled once you provide these.)

## 🛠 API Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | — | List products (filter by `?category=`, `?subcategory=`, `?featured=true`) |
| GET | `/api/products/:id` | — | Get product + related |
| POST | `/api/products` | Admin | Create |
| PUT | `/api/products/:id` | Admin | Update |
| DELETE | `/api/products/:id` | Admin | Delete |
| POST | `/api/inquiries` | — | Submit visitor enquiry |
| GET | `/api/inquiries` | Admin | List all inquiries |
| DELETE | `/api/inquiries/:id` | Admin | Delete |
| GET | `/api/blogs` | — | List published blogs |
| GET | `/api/gallery` | — | Daily Atelier tiles |
| POST/PUT/DELETE | `/api/gallery[/:id]` | Admin | Manage tiles |
| GET | `/api/settings` | — | Site settings (WhatsApp, social, copy) |
| PUT | `/api/settings` | Admin | Update settings |
| POST | `/api/auth/login` | — | Returns admin token |

## 🏃 Run Locally
```bash
yarn install
# Set .env (MONGO_URL must point to a running MongoDB)
yarn dev      # development
yarn build && yarn start   # production
```
