'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

const products = [
  { id: 1, name: 'LumiLift Peptide Serum', category: 'Face care', price: 4850, oldPrice: 5600, rating: '4.9', reviews: 38, tone: 'from-[#e7d8ff] via-[#c5a7f1] to-[#8b58c4]', badge: 'Best seller', detail: 'Peptides · Niacinamide · Hyaluronic acid' },
  { id: 2, name: 'Glass Skin Repair Cream', category: 'Moisturizers', price: 3900, oldPrice: 4500, rating: '4.8', reviews: 24, tone: 'from-[#f3d9e8] via-[#d8b2d9] to-[#9a6cb6]', badge: 'Clinic pick', detail: 'Ceramides · Squalane · Panthenol' },
  { id: 3, name: 'Calm & Clear Enzyme Peel', category: 'Professional', price: 6200, oldPrice: null, rating: '5.0', reviews: 17, tone: 'from-[#d9e8dc] via-[#afcdaa] to-[#6d8d77]', badge: 'New ritual', detail: 'Papaya enzyme · PHA · Aloe vera' },
  { id: 4, name: 'Sculpt & Glow Face Oil', category: 'Face care', price: 3200, oldPrice: 3800, rating: '4.9', reviews: 51, tone: 'from-[#f4e1bc] via-[#ddb878] to-[#ad7241]', badge: 'Limited', detail: 'Rosehip · Bakuchiol · Vitamin E' },
]

const categories = ['All products', 'Face care', 'Moisturizers', 'Professional']

type Product = (typeof products)[number]
type CartItem = Product & { quantity: number }

function formatPrice(value: number) {
  return `Rs ${value.toLocaleString('en-PK')}`
}

function ProductVisual({ product, small = false }: { product: Product; small?: boolean }) {
  return (
    <div className={`relative flex ${small ? 'h-24' : 'h-72'} items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${product.tone}`}>
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_25%_20%,white_0,transparent_28%),radial-gradient(circle_at_80%_75%,white_0,transparent_24%)]" />
      <div className={`relative flex ${small ? 'h-16 w-11' : 'h-48 w-32'} items-end justify-center rounded-b-[1.5rem] rounded-t-md border border-white/50 bg-white/45 shadow-2xl backdrop-blur-md`}>
        <div className="absolute top-0 h-5 w-[72%] rounded-b-sm bg-[#f6ecfa]/80" />
        <div className={`mb-5 flex ${small ? 'h-9 w-7' : 'h-28 w-20'} items-center justify-center rounded-full bg-white/80 shadow-inner`}>
          <Sparkles className={small ? 'size-3 text-[#7d4ca1]' : 'size-7 text-[#7d4ca1]'} />
        </div>
        {!small && <span className="absolute bottom-7 rotate-90 text-[8px] font-bold tracking-[0.26em] text-[#6b4676]">GLOW</span>}
      </div>
      {!small && <div className="absolute bottom-4 left-4 rounded-full bg-white/55 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#4d315d] backdrop-blur">For clinic rituals</div>}
    </div>
  )
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All products')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toast, setToast] = useState('')

  const filteredProducts = activeCategory === 'All products' ? products : products.filter((product) => product.category === activeCategory)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal >= 3000 || subtotal === 0 ? 0 : 250

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    setToast(`${product.name} added to your bag`)
    setTimeout(() => setToast(''), 2400)
  }

  function updateQuantity(id: number, amount: number) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  const whatsappText = encodeURIComponent(`Hi Glow with Vibes, I want to confirm my order of ${cart.map((item) => `${item.name} x${item.quantity}`).join(', ')}. Total: ${formatPrice(subtotal + delivery)}.`)
  const total = useMemo(() => subtotal + delivery, [subtotal, delivery])

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8ff] text-[#29172f]">
      <div className="bg-[#32163f] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f7eaff] sm:text-xs">Free delivery on orders above Rs 3,000 · Made for modern clinic rituals</div>
      <header className="relative z-10 border-b border-[#eadcf0] bg-[#fbf8ff]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <button className="rounded-full p-2 lg:hidden" aria-label="Open menu"><Menu /></button>
          <a href="#top" className="font-serif text-2xl font-medium tracking-tight text-[#4b2160] sm:text-3xl">Glow <span className="italic">with Vibes</span></a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#674b70] lg:flex"><a href="#shop" className="hover:text-[#7c3fa0]">Shop all</a><a href="#deals" className="hover:text-[#7c3fa0]">Clinic deals</a><a href="#story" className="hover:text-[#7c3fa0]">Our story</a><a href="/admin" className="hover:text-[#7c3fa0]">Admin</a></nav>
          <div className="flex items-center gap-1"><button className="hidden rounded-full p-2.5 text-[#684675] transition hover:bg-[#f0e2f5] sm:block" aria-label="Search"><Search /></button><button onClick={() => setCartOpen(true)} className="relative rounded-full p-2.5 text-[#684675] transition hover:bg-[#f0e2f5]" aria-label="Open shopping bag"><ShoppingBag />{itemCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-[#783e94] text-[10px] font-bold text-white">{itemCount}</span>}</button></div>
        </div>
      </header>

      <section id="top" className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-20">
        <div className="relative z-10 max-w-xl"><p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#9a64ae]"><Sparkles className="size-4" /> Clinical care, beautifully done</p><h1 className="font-serif text-5xl leading-[.95] tracking-[-.04em] text-[#381441] sm:text-7xl">Your skin&apos;s <span className="italic text-[#8950a1]">softest</span> era starts here.</h1><p className="mt-7 max-w-md text-base leading-7 text-[#765e7b]">Professional-grade skincare curated for aesthetic clinics, dermatologists and the glow-obsessed.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#shop" className="group inline-flex items-center gap-3 rounded-full bg-[#672e7c] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_#672e7c] transition hover:bg-[#4b2160]">Explore collection <ArrowRight className="size-4 transition group-hover:translate-x-1" /></a><a href="#deals" className="rounded-full border border-[#dac3e3] bg-white/60 px-6 py-3.5 text-sm font-semibold text-[#672e7c] transition hover:bg-white">View clinic deals</a></div><div className="mt-12 flex items-center gap-5 text-xs text-[#765e7b]"><div className="flex -space-x-2"><div className="size-8 rounded-full border-2 border-[#fbf8ff] bg-[#d6b8e2]" /><div className="size-8 rounded-full border-2 border-[#fbf8ff] bg-[#bda7d7]" /><div className="size-8 rounded-full border-2 border-[#fbf8ff] bg-[#e2c5be]" /></div><span><strong className="text-[#4d2b57]">Loved by 120+</strong> clinic professionals</span></div></div>
        <div className="relative min-h-[390px] sm:min-h-[480px]"><div className="absolute -right-20 top-0 size-72 rounded-full bg-[#ead8f1] blur-3xl" /><div className="absolute bottom-0 left-6 size-44 rounded-full bg-[#d8c1e5] blur-3xl" /><div className="relative mx-auto max-w-md rotate-2 rounded-[2.5rem] bg-gradient-to-br from-[#f0e1f7] to-[#b987cb] p-3 shadow-[0_35px_70px_-25px_#865296]"><div className="rounded-[2rem] bg-[#d7b9e4] p-5"><div className="rounded-[1.5rem] bg-gradient-to-br from-[#cab0db] via-[#eee4f4] to-[#b78ac5] p-8"><div className="mx-auto flex h-64 max-w-[220px] items-center justify-center rounded-[5rem] border border-white/60 bg-white/20 shadow-inner backdrop-blur"><div className="h-48 w-28 rounded-[2rem] bg-white/75 shadow-2xl"><div className="mx-auto mt-5 h-4 w-16 rounded-full bg-[#eee0f4]" /><div className="mt-12 text-center font-serif text-3xl italic text-[#714183]">G</div><div className="mt-10 text-center text-[8px] font-bold tracking-[.25em] text-[#714183]">GLOW WITH VIBES</div></div></div></div><div className="mt-5 flex justify-between px-2 text-xs font-medium text-[#5b3b64]"><span>Daily ritual no. 01</span><span>01 / 04</span></div></div></div><div className="absolute -bottom-5 -left-4 rounded-2xl bg-white px-4 py-3 shadow-xl"><p className="flex items-center gap-1 text-xs font-bold text-[#5b2d6b]"><Star className="size-3 fill-[#c18bd6] text-[#c18bd6]" /> 4.9/5</p><p className="mt-1 text-[10px] text-[#8a7290]">Clinic-loved formulas</p></div></div>
      </section>

      <section id="deals" className="border-y border-[#eadcf0] bg-[#f3eafb] px-5 py-5 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="rounded-full bg-[#7d4496] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Clinic deal</span><p className="text-sm font-medium text-[#593367]">Buy any 2 professional products and unlock <strong>10% off</strong></p></div><span className="text-xs text-[#8c6992]">Code: CLINIC10</span></div></section>

      <section id="shop" className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#9a64ae]">The glow edit</p><h2 className="font-serif text-4xl tracking-tight text-[#381441] sm:text-5xl">Curated for <span className="italic text-[#8950a1]">results.</span></h2></div><div className="flex items-center gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${activeCategory === category ? 'bg-[#672e7c] text-white' : 'bg-white text-[#805889] hover:bg-[#f0e2f5]'}`}>{category}</button>)}</div></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product) => <article key={product.id} className="group"><div className="relative"><ProductVisual product={product} /><span className="absolute left-4 top-4 rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#68416f] backdrop-blur">{product.badge}</span><button className="absolute right-4 top-4 rounded-full bg-white/75 p-2 text-[#83508f] opacity-0 backdrop-blur transition group-hover:opacity-100" aria-label={`Save ${product.name}`}><Heart className="size-4" /></button></div><div className="px-1 pt-4"><div className="flex items-center justify-between gap-2"><p className="text-[10px] font-bold uppercase tracking-wider text-[#a078aa]">{product.category}</p><span className="flex items-center gap-1 text-[10px] text-[#916e98]"><Star className="size-3 fill-[#c18bd6] text-[#c18bd6]" /> {product.rating} ({product.reviews})</span></div><h3 className="mt-2 font-serif text-xl text-[#43204e]">{product.name}</h3><p className="mt-1 text-xs text-[#8b708e]">{product.detail}</p><div className="mt-4 flex items-center justify-between"><div><span className="font-semibold text-[#572461]">{formatPrice(product.price)}</span>{product.oldPrice && <span className="ml-2 text-xs text-[#b394b9] line-through">{formatPrice(product.oldPrice)}</span>}</div><button onClick={() => addToCart(product)} className="group/button flex items-center gap-1 rounded-full bg-[#f0e2f5] px-3 py-2 text-xs font-bold text-[#672e7c] transition hover:bg-[#672e7c] hover:text-white"><Plus className="size-3 transition group-hover/button:rotate-90" /> Add</button></div></div></article>)}</div></section>

      <section id="story" className="bg-[#32163f] px-5 py-16 text-[#f8effb] lg:px-10 lg:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#d7a7e4]">Why clinics choose us</p><h2 className="font-serif text-4xl leading-tight sm:text-5xl">High-performance care, with a little <span className="italic text-[#d6a9e2]">magic.</span></h2></div><div className="grid gap-4 sm:grid-cols-3"><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><Sparkles className="size-5 text-[#d7a7e4]" /><h3 className="mt-8 font-semibold">Pro formulas</h3><p className="mt-2 text-sm leading-6 text-[#cbb4d2]">Thoughtfully selected actives made for visible, lasting results.</p></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><Heart className="size-5 text-[#d7a7e4]" /><h3 className="mt-8 font-semibold">Trusted by pros</h3><p className="mt-2 text-sm leading-6 text-[#cbb4d2]">Chosen by aesthetic doctors and skin experts across Pakistan.</p></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><Check className="size-5 text-[#d7a7e4]" /><h3 className="mt-8 font-semibold">Easy ordering</h3><p className="mt-2 text-sm leading-6 text-[#cbb4d2]">Simple checkout, invoice on WhatsApp and free delivery over Rs 3,000.</p></div></div></div></section>

      <footer className="bg-[#fbf8ff] px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-[#8b708e] sm:flex-row"><span>© 2026 Glow with Vibes</span><span>Skincare that feels like self-care.</span></div></footer>

      {toast && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#32163f] px-5 py-3 text-sm font-medium text-white shadow-2xl animate-in slide-in-from-bottom-4"><Check className="size-4 text-[#d7a7e4]" /> {toast}</div>}

      {cartOpen && <div className="fixed inset-0 z-40"><button className="absolute inset-0 bg-[#28132f]/45 backdrop-blur-sm" onClick={() => setCartOpen(false)} aria-label="Close bag" /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fbf8ff] p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#9a64ae]">Your edit</p><h2 className="mt-1 font-serif text-3xl text-[#381441]">Shopping bag <span className="text-base text-[#a17da8]">({itemCount})</span></h2></div><button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-[#f0e2f5]" aria-label="Close shopping bag"><X /></button></div>{cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center text-center"><ShoppingBag className="size-10 text-[#c6a6cf]" /><p className="mt-4 font-serif text-2xl text-[#51255d]">Your bag is waiting.</p><p className="mt-2 text-sm text-[#8b708e]">Add a little glow to get started.</p><button onClick={() => setCartOpen(false)} className="mt-6 rounded-full bg-[#672e7c] px-5 py-3 text-sm font-semibold text-white">Continue shopping</button></div> : <><div className="flex-1 overflow-y-auto py-7">{cart.map((item) => <div key={item.id} className="mb-5 flex gap-4 border-b border-[#eadcf0] pb-5"><ProductVisual product={item} small /><div className="min-w-0 flex-1"><p className="font-serif text-lg text-[#51255d]">{item.name}</p><p className="mt-1 text-xs text-[#8b708e]">{formatPrice(item.price)}</p><div className="mt-3 flex items-center gap-2"><button onClick={() => updateQuantity(item.id, -1)} className="rounded-full border border-[#ddc9e4] p-1" aria-label="Decrease quantity"><Minus className="size-3" /></button><span className="w-5 text-center text-sm">{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} className="rounded-full border border-[#ddc9e4] p-1" aria-label="Increase quantity"><Plus className="size-3" /></button></div></div><span className="text-sm font-semibold text-[#572461]">{formatPrice(item.price * item.quantity)}</span></div>)}</div><div className="border-t border-[#eadcf0] pt-5"><div className="flex justify-between text-sm text-[#8b708e]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="mt-2 flex justify-between text-sm text-[#8b708e]"><span>Delivery</span><span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span></div><div className="mt-4 flex justify-between text-lg font-semibold text-[#43204e]"><span>Total</span><span>{formatPrice(total)}</span></div><button onClick={() => setCheckoutOpen(true)} className="mt-5 w-full rounded-full bg-[#672e7c] py-4 text-sm font-semibold text-white shadow-lg shadow-[#672e7c]/20 transition hover:bg-[#4b2160]">Create invoice & checkout <ArrowRight className="ml-2 inline size-4" /></button></div></>}</aside></div>}

      {checkoutOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#28132f]/60 p-4 backdrop-blur-sm"><div className="relative w-full max-w-lg rounded-[2rem] bg-[#fbf8ff] p-6 shadow-2xl sm:p-8"><button onClick={() => setCheckoutOpen(false)} className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#f0e2f5]" aria-label="Close checkout"><X /></button><p className="text-xs font-bold uppercase tracking-[.2em] text-[#9a64ae]">Almost glowing</p><h2 className="mt-2 font-serif text-3xl text-[#381441]">Delivery details</h2><p className="mt-2 text-sm text-[#8b708e]">We&apos;ll add these details to your invoice before you confirm on WhatsApp.</p><form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); setCheckoutOpen(false); setCartOpen(false) }}><input required placeholder="Full name" className="rounded-2xl border border-[#ddc9e4] bg-white px-4 py-3 text-sm outline-none focus:border-[#8d50a2]" /><input required type="tel" placeholder="WhatsApp number" className="rounded-2xl border border-[#ddc9e4] bg-white px-4 py-3 text-sm outline-none focus:border-[#8d50a2]" /><textarea required placeholder="Complete delivery address" rows={3} className="resize-none rounded-2xl border border-[#ddc9e4] bg-white px-4 py-3 text-sm outline-none focus:border-[#8d50a2]" /><div className="rounded-2xl bg-[#f1e4f5] p-4 text-sm text-[#694572]"><div className="flex justify-between"><span>Invoice total</span><strong>{formatPrice(total)}</strong></div><p className="mt-2 text-xs">Free delivery applied automatically on orders above Rs 3,000.</p></div><a href={`https://wa.me/?text=${whatsappText}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#672e7c] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#4b2160]">Create invoice & share on WhatsApp <ArrowRight className="ml-2 inline size-4" /></a></form></div></div>}
    </main>
  )
}
