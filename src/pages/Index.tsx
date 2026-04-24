import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sparkles, Shield, Leaf, Star, ChevronRight, 
  Check, Phone, Mail, MapPin, Facebook, MessageCircle,
  Clock, Home, Building2, Calendar, ArrowRight, Plus, Minus, Heart,
  AirVent, BookImage
} from 'lucide-react';

// --- Constants ---
const FACEBOOK_URL = "https://www.facebook.com/share/1CcBhZ8aD4/?mibextid=wwXIfr";
const WHATSAPP_URL = "http://wa.me/17085481931";
const TIKTOK_URL = "https://www.tiktok.com/@prrfectglocleaning?_r=1&_t=ZT-95Cq7lGXZm9";

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  image: string;
}

interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  special?: boolean;
}

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

// --- Data ---
const SERVICES: Service[] = [
  { id: 'move', title: 'Residential', description: 'Ensure a fresh start with meticulous cleaning.', icon: BookImage, image: '/image2.png' },
  { id: 'commercial', title: 'Deep Cleaning', description: 'Professional environments deserve professional care.', icon: Building2, image: '/image3.png' },
  { id: 'residential', title: 'Move-In/Out', description: 'Comprehensive home cleaning tailored to your lifestyle.', icon: Home, image: '/image0.png' },
  { id: 'airbnb', title: 'Office/Commercial', description: 'Fast turnovers, 5-star results.', icon: Calendar, image: '/office-commercial.jpg' },
  { id: 'deep', title: 'Post-Construction', description: 'A top-to-bottom refresh for every corner.', icon: Sparkles, image: '/image1.png' },
  
];

const PRICING: PricingPackage[] = [
  {
    name: 'Residential Cleaning', price: '$80', description: 'Reliable regular cleaning for a fresh, glowing home.', special: true,
    features: ['1 Bed / 1 Bath: $80', '2 Bed / 1 Bath: $100', '2 Bed / 2 Bath: $130', '3–4 Bed / 2+ Bath: $240–$280', 'Surface Dusting', 'Vacuum & Mop', 'Kitchen Surfaces', 'Trash Removal']
  },
  {
    name: 'Deep Cleaning', price: '$140', description: 'Premium top-to-bottom detailed reset.', popular: true,
    features: ['1 Bed / 1 Bath: $140', '2 Bed / 1 Bath: $180', '2 Bed / 2 Bath: $240', '3–4 Bed / 2+ Bath: $320+', 'Baseboards & Trim', 'Inside Microwave', 'Detailed Dusting']
  },
  {
    name: 'Move-In / Move-Out', price: '$120', description: 'Detailed cleaning for smooth transitions.',
    features: ['1 Bed / 1 Bath: $120', '2 Bed / 1 Bath: $150', '2 Bed / 2 Bath: $200', '3–4 Bed / 2+ Bath: $240+', 'Inside Cabinets', 'Appliance Exteriors', 'Floor Deep Clean']
  }
];

const ADDONS: { name: string; price: string }[] = [
  { name: 'Oven', price: '$15+' },
  { name: 'Fridge', price: '$25+' },
  { name: 'Window', price: '$40+' },
  { name: 'Laundry', price: '$40+' },
];

const TESTIMONIALS: Testimonial[] = [
  { name: 'Sarah J.', location: 'Chicago, IL', text: "Melissa and her team are incredible. I've never seen my kitchen sparkle like this. It truly feels like a sanctuary now.", rating: 5 },
  { name: 'Michael R.', location: 'Chicagoland Area', text: "Professional, punctual, and the attention to detail is unmatched. Best cleaning service in Chicago, hands down.", rating: 5 },
  { name: 'Elena G.', location: 'Naperville', text: "We use Prrfect Glo for our Airbnb turnovers and our ratings have never been higher.", rating: 5 },
  { name: 'David W.', location: 'Evanston', text: "The deep clean was worth every penny. They found dust in places I didn't even know existed.", rating: 5 },
  { name: 'Jessica L.', location: 'Oak Park', text: "Eco-friendly products were a must for my family. Prrfect Glo delivered a spotless home without the harsh chemicals.", rating: 5 },
];

const GALLERY = ['/image7.jpeg', '/image8.jpeg', '/image9.jpeg', '/image6.jpeg'];

const FAQS = [
  { question: "Are you insured and bonded?", answer: "Yes, Prrfect Glo is fully insured and bonded for your peace of mind." },
  { question: "Do I need to provide cleaning supplies?", answer: "No, we bring all our own premium, eco-friendly cleaning supplies and professional-grade equipment." },
  { question: "How do I book a service?", answer: "Simply reach out to us via Facebook or WhatsApp and we'll get you scheduled right away! You can also call or text us at 708-548-1931." },
  { question: "What is your cancellation policy?", answer: "We require 24-hour notice for cancellations." },
  { question: "Do I need to be home during the cleaning?", answer: "It's entirely up to you! Many of our clients provide a key or entry code." },
  { question: "Which areas of Chicago do you serve?", answer: "We serve the entire Chicagoland area, including downtown Chicago, Evanston, Naperville, Oak Park, and surrounding suburbs." },
];

// --- Components ---

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1.7.1 1.41.53 1.98.5.73 1.36 1.19 2.24 1.17.96.03 1.91-.43 2.52-1.18.48-.54.75-1.24.76-1.95-.02-3.8-.02-7.61-.01-11.41z"/></svg>
);

const TopBar = () => (
  <div className="bg-slate-900 text-white py-2 text-[10px] sm:text-xs border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#14B8A6]" /><span>708-548-1931</span></div>
        <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#14B8A6]" /><span className="break-all text-[10px] sm:text-xs">mmata@prrfectglocleaningservice.com</span></div>
        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#14B8A6]" /><span>Mon-Sun: 8am-5pm</span></div>
      </div>
      <div className="flex items-center gap-4">
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#14B8A6] transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
        <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#14B8A6] transition-colors">
          <TikTokIcon className="w-3.5 h-3.5 fill-current" />
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#14B8A6] transition-colors"><MessageCircle className="w-3.5 h-3.5" /></a>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' }, { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' }, { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' }, { name: 'About', href: '#about' }, { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
      <TopBar />
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <a href="#home" className="flex items-center gap-3 group">
          <div className={`bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden group-hover:scale-105 transition-all duration-300 ${isScrolled ? 'w-12 h-12 md:w-16 md:h-16' : 'w-14 h-14 md:w-32 md:h-32'}`}>
            <img src="/image10.jpeg" alt="Prrfect Glo Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div className="flex flex-col">
            <span className={`tracking-tight text-slate-900 transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-2xl md:text-3xl'}`}>
              <span className="font-display font-semibold bg-gradient-to-r from-[#CA8A40] via-[#E8B96E] to-[#CA8A40] bg-clip-text text-transparent drop-shadow-sm">PrrFect</span> <span className="font-display-italic text-[#14B8A6] text-[1.15em]">Glo</span>
            </span>
            {!isScrolled && <span className="text-[10px] md:text-xs font-bold text-[#14B8A6] tracking-[0.2em] uppercase">Cleaning Service</span>}
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-[#14B8A6] transition-colors">{link.name}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-full text-sm font-semibold glow-teal hover:bg-[#0F9488] transition-all active:scale-95 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Contact Us
          </a>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">{link.name}</a>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#25D366] text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#1877F2] text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <Facebook className="w-5 h-5" /> Message on Facebook
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-40 md:pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" alt="Luxury Home" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--cream))]/95 via-[hsl(var(--cream))]/90 to-[hsl(36_60%_88%)]/85 md:bg-gradient-to-r md:from-[hsl(var(--cream))] md:via-[hsl(var(--cream))]/90 md:to-transparent"></div>
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl relative">
        <Sparkles className="absolute -top-6 -left-4 w-5 h-5 text-[hsl(var(--bronze))] animate-sparkle opacity-70" />
        <Sparkles className="absolute top-2 right-12 w-4 h-4 text-[#14B8A6] animate-sparkle opacity-60" style={{ animationDelay: '0.8s' }} />
        <p className="font-display-italic text-2xl md:text-3xl text-slate-700 mb-6">
          Spotless Results. Premium Experience.
        </p>
        {/* Flyer-style banner */}
        <div className="relative mb-8 max-w-xl">
          <div className="bg-slate-900 border-y-4 border-[#CA8A40] px-6 md:px-10 py-5 md:py-6 rounded-sm shadow-2xl relative">
            <div className="absolute inset-x-0 top-0 h-px bg-[#E8B96E]/60"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-[#E8B96E]/60"></div>
            <div className="text-center">
              <div className="text-white font-display tracking-[0.3em] text-sm md:text-base mb-1">PROVIDED</div>
              <h1 className="font-display text-white text-4xl md:text-6xl leading-none tracking-tight">
                CLEANING <span className="font-display-italic bg-gradient-to-r from-[#CA8A40] via-[#E8B96E] to-[#CA8A40] bg-clip-text text-transparent">Services</span>
              </h1>
              <div className="mt-3 pt-3 border-t border-white/20 text-white font-semibold tracking-wider text-xs md:text-sm">
                DETAILED <span className="text-[#E8B96E] mx-2">•</span> RECURRING <span className="text-[#E8B96E] mx-2">•</span> BI-WEEKLY
              </div>
            </div>
          </div>
        </div>
        <p className="text-lg text-slate-800 mb-10 leading-relaxed font-medium max-w-xl">
          Transforming your space into a glowing sanctuary. Premium residential and commercial cleaning with a white-glove touch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#1da851] transition-all flex items-center justify-center gap-2 group">
            <MessageCircle className="w-5 h-5" /> WhatsApp Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#1565c0] transition-all flex items-center justify-center gap-2">
            <Facebook className="w-5 h-5" /> Message on Facebook
          </a>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ icon: Shield, label: 'Fully Insured' }, { icon: Leaf, label: 'Eco-Friendly' }, { icon: Star, label: '5-Star Rated' }, { icon: MapPin, label: 'Chicagoland' }].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
                <item.icon className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <span className="text-sm font-semibold text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-warm-gradient">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm mb-4">Our Services</h2>
        <h3 className="font-display text-5xl md:text-6xl text-slate-900 mb-6 tracking-tight">Tailored Cleaning Solutions for Every Space</h3>
        <p className="text-lg text-slate-600">From luxury homes to professional offices, we deliver sparkling results that exceed expectations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 lg:col-span-2 ${
              index === 3 ? 'lg:col-start-2' : ''
            }`}
          >
            <div className="h-64 overflow-hidden relative">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <service.icon className="w-6 h-6 text-[#14B8A6]" />
              </div>
            </div>
            <div className="p-8"><h4 className="font-display text-3xl text-slate-900">{service.title}</h4></div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { icon: MessageCircle, title: "Contact Us", description: "Reach out via Facebook or WhatsApp to tell us about your space and cleaning needs." },
    { icon: Sparkles, title: "We Clean", description: "Our professional, background-checked team arrives and transforms your space." },
    { icon: Heart, title: "You Relax", description: "Enjoy your sparkling, refreshed home and the peace of mind you deserve." },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm mb-4">How It Works</h2>
          <h3 className="font-display text-5xl md:text-6xl text-slate-900 mb-6 tracking-tight">Your Path to a Glowing Sanctuary</h3>
          <p className="text-lg text-slate-600">Three simple steps to a cleaner, happier home.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#14B8A6]/10 mb-8 hover:border-[#14B8A6] transition-all duration-300">
                <step.icon className="w-10 h-10 text-[#14B8A6]" />
              </div>
              <h4 className="font-display text-3xl text-slate-900 mb-4">{step.title}</h4>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm mb-4">Pricing Packages</h2>
        <h3 className="font-display text-5xl md:text-6xl text-slate-900 mb-6 tracking-tight">Transparent Pricing for a <span className="font-display-italic text-[#14B8A6]">Glowing</span> Home</h3>
        <p className="text-lg text-slate-600">Choose the package that fits your needs. All prices are starting rates and may vary based on home condition.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRICING.map((pkg, i) => (
          <div key={i} className={`relative p-8 rounded-[2.5rem] border-2 transition-all flex flex-col ${pkg.popular ? 'border-[#14B8A6] bg-white shadow-2xl scale-105 z-10' : 'border-slate-100 bg-warm-gradient hover:border-[#14B8A6]/20'}`}>
            {pkg.popular && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#14B8A6] text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap">Most Popular</div>}
            {pkg.special && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[hsl(var(--bronze))] text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap">Special</div>}
            <h4 className="font-display text-3xl text-slate-900 mb-2">{pkg.name}</h4>
            <p className="text-slate-500 mb-6 text-sm">{pkg.description}</p>
            <div className="flex items-baseline gap-1 mb-8"><span className="font-display text-5xl text-slate-900">{pkg.price}</span><span className="text-slate-500 font-medium text-xs">/ starting</span></div>
            <ul className="space-y-4 mb-10 flex-grow">
              {pkg.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="w-4 h-4 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0"><Check className="w-2.5 h-2.5 text-[#14B8A6]" /></div>
                  {feature}
                </li>
              ))}
            </ul>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-2xl font-bold transition-all text-sm flex items-center justify-center gap-2 ${pkg.popular ? 'bg-[#14B8A6] text-white glow-teal hover:bg-[#0F9488]' : 'bg-white text-slate-900 border border-slate-200 hover:border-[#14B8A6] hover:text-[#14B8A6]'}`}>
              <MessageCircle className="w-4 h-4" /> Contact Us
            </a>
          </div>
        ))}
      </div>
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h4 className="font-display text-4xl md:text-5xl text-slate-900 mb-2">Add-Ons</h4>
          <p className="text-slate-500">Customize your clean with extra services.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ADDONS.map((addon, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:border-[#14B8A6]/30 transition-all">
              <div className="text-slate-900 font-bold text-lg mb-1">{addon.name}</div>
              <div className="text-[#14B8A6] font-bold text-xl">{addon.price}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center mt-12 text-slate-500 italic">* Prices are starting rates and can vary based on home size and condition.</p>
    </div>
  </section>
);

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm mb-4">Our Work</h2>
            <h3 className="font-display text-5xl md:text-6xl mb-6 tracking-tight">The Prrfect Glo <span className="font-display-italic">Transformation</span></h3>
            <p className="text-lg text-slate-400">See the difference our meticulous attention to detail makes.</p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all border border-white/10">View All Projects</button>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {GALLERY.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden cursor-pointer group" onClick={() => setSelectedImage(img)}>
              <img src={img} alt={`Clean space ${i}`} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-[#14B8A6]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-12 h-12" /></div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-8 right-8 text-white hover:text-[#14B8A6] transition-colors"><X className="w-10 h-10" /></button>
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={selectedImage} className="max-w-full max-h-full rounded-2xl shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#14B8A6] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-white/70 font-bold tracking-widest uppercase text-sm mb-4">Testimonials</h2>
          <h3 className="font-display text-5xl md:text-6xl text-white tracking-tight">What Our Clients Are <span className="font-display-italic">Saying</span></h3>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 flex flex-col items-center text-center">
                <div className="flex gap-1 mb-8">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />)}</div>
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8 italic">"{TESTIMONIALS[activeIndex].text}"</p>
                <div>
                  <h4 className="font-display text-2xl text-white">{TESTIMONIALS[activeIndex].name}</h4>
                  <p className="text-white/60">{TESTIMONIALS[activeIndex].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className={`w-3 h-3 rounded-full transition-all ${activeIndex === i ? 'bg-white w-8' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative space-y-6">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="/team1.png" alt="Melissa & The Team" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="/team2.png" alt="Prrfect Glo Team Members" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
            <p className="text-[#14B8A6] font-bold text-lg mb-2">"Cleanliness is more than a service, it's a feeling of peace."</p>
            <p className="text-slate-500 text-sm">— Melissa, Founder</p>
          </div>
        </div>
        <div>
          <h2 className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm mb-4">About Prrfect Glo</h2>
          <h3 className="font-display text-5xl md:text-6xl text-slate-900 mb-8 tracking-tight">Meet Melissa & The <span className="font-display-italic text-[#14B8A6]">Team</span></h3>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Prrfect Glo Cleaning Service LLC was born out of a simple belief: every home and workspace should be a sanctuary. Founded by Melissa, a professional with an obsession for detail and a heart for service, we've grown into Chicago's premier choice for high-end cleaning.</p>
            <p>Our team isn't just trained to clean; they're trained to care. We treat every space as if it were our own, using eco-friendly products that are safe for your family, pets, and the environment.</p>
            <p>Whether it's a downtown Chicago high-rise or a suburban family home, we bring the same level of excellence and integrity to every job. We don't just clean—we make your space glow.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div><h4 className="font-display text-5xl text-[#14B8A6] mb-2">500+</h4><p className="text-slate-500 font-medium">Happy Clients</p></div>
            <div><h4 className="font-display text-5xl text-[#14B8A6] mb-2">100%</h4><p className="text-slate-500 font-medium">Satisfaction Rate</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-warm-gradient">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm mb-4">FAQ</h2>
          <h3 className="font-display text-5xl md:text-6xl text-slate-900 tracking-tight">Common <span className="font-display-italic">Questions</span></h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-warm-gradient transition-colors">
                <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                {openIndex === i ? <Minus className="text-[#14B8A6]" /> : <Plus className="text-[#14B8A6]" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-slate-900 text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img src="/image10.jpeg" alt="Prrfect Glo Logo" className="w-full h-full object-contain p-1" />
            </div>
            <span className="text-2xl tracking-tight"><span className="font-semibold">PrrFect</span> <span className="font-display-italic text-[#14B8A6] text-[1.15em]">Glo</span></span>
          </div>
          <p className="text-slate-400 leading-relaxed">Transforming Chicago's spaces into glowing sanctuaries with premium, eco-friendly cleaning services.</p>
          <div className="flex gap-4">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"><TikTokIcon className="w-5 h-5 fill-current" /></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors"><MessageCircle className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-8">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#home" className="hover:text-[#14B8A6] transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-[#14B8A6] transition-colors">Services</a></li>
            <li><a href="#how-it-works" className="hover:text-[#14B8A6] transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-[#14B8A6] transition-colors">Pricing</a></li>
            <li><a href="#gallery" className="hover:text-[#14B8A6] transition-colors">Gallery</a></li>
            <li><a href="#about" className="hover:text-[#14B8A6] transition-colors">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-8">Contact Info</h4>
          <ul className="space-y-6 text-slate-400">
            <li className="flex gap-4"><Phone className="w-5 h-5 text-[#14B8A6] flex-shrink-0" /><span>708-548-1931</span></li>
            <li className="flex gap-4"><Mail className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" /><span className="break-all text-sm sm:text-base">mmata@prrfectglocleaningservice.com</span></li>
            <li className="flex gap-4"><MapPin className="w-5 h-5 text-[#14B8A6] flex-shrink-0" /><span>Serving Chicago, IL & Suburbs</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-8">Business Hours</h4>
          <ul className="space-y-4 text-slate-400">
            <li className="flex justify-between"><span>Mon - Sun:</span><span className="text-white">8:00 AM - 5:00 PM</span></li>
          </ul>
          <div className="mt-8">
            <h4 className="text-lg font-bold mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1da851] transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1565c0] transition-colors">
                <Facebook className="w-4 h-4" /> Facebook Message
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
        <p>© 2026 Prrfect Glo Cleaning Service LLC. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Pricing />
        <GallerySection />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      {/* Floating WhatsApp button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl md:w-auto md:px-8 md:gap-3"
      >
        <MessageCircle className="w-6 h-6" /><span className="hidden md:block font-bold">WhatsApp Us</span>
      </motion.a>
    </div>
  );
};

export default Index;
