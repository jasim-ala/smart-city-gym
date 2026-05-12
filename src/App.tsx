import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Shield, Zap, TrendingUp, ChevronDown, Dumbbell, Mail, Phone, MapPin, Clock, Star } from "lucide-react";

const ThreeDHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-black pt-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-1000">
        <motion.div
           style={{ 
             rotateX: smoothRotateX, 
             scale: smoothScale,
             opacity 
           }}
           className="relative w-full max-w-5xl aspect-video bg-dark rounded-3xl border border-white/10 overflow-hidden preserve-3d shadow-2xl shadow-primary/20"
        >
          {/* Hero Content Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Interactive Logo Layer */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ y: textY }}
          >
            {/* Logo Silhouette Re-created with SVG if possible, or just bold text */}
            <div className="relative mb-6">
                <Dumbbell className="w-24 h-24 text-primary mb-4" />
                <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-white uppercase leading-none select-none">
                    SMART CITY
                </h1>
                <div className="absolute -top-4 -right-4 bg-primary text-black px-3 py-1 font-mono text-xs font-bold skew-x-12">
                    GYM
                </div>
            </div>
            
            <p className="font-display text-xl md:text-2xl text-white/80 max-w-md text-center px-6">
              GET SMART & LOOK GREAT
            </p>
            <div className="mt-4 px-4 py-1 bg-primary text-black font-bold uppercase tracking-[0.2em] text-sm">
                Change Your Life
            </div>
          </motion.div>

          {/* Decorative Layers for Depth */}
          <motion.div 
            className="absolute top-10 right-10 z-0 opacity-20 hidden md:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-64 h-64 border-2 border-dashed border-primary rounded-full" />
          </motion.div>
        </motion.div>

        {/* Floating Captions */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
            <span className="text-xs uppercase tracking-widest font-mono">Scroll to explore</span>
            <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
};

const Features = () => {
    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase">Our <span className="text-primary italic">Services</span></h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <Zap className="text-primary" />, title: "Cardio Area", desc: "High-end treadmills and ellipticals for peak endurance." },
                    { icon: <Dumbbell className="text-primary" />, title: "Weight Area", desc: "Premium free weights and machines for strength building." },
                    { icon: <Zap className="text-primary" />, title: "Crossfit", desc: "Functional training zone for high-intensity athletes." },
                    { icon: <Shield className="text-primary" />, title: "Personal Trainer", desc: "One-on-one expert guidance to hit your specific goals." }
                ].map((f, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group text-center"
                    >
                        <div className="mb-4 mx-auto p-4 w-fit rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                            {f.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2 uppercase">{f.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed font-sans">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

const SpecialOffer = () => {
    return (
        <section className="py-20 px-6">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] bg-primary p-12 md:p-20 text-black flex flex-col md:flex-row items-center justify-between gap-12"
            >
                <div className="relative z-10 text-center md:text-left">
                    <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                        <Star className="fill-black" />
                        <span className="font-mono font-bold tracking-[0.3em] text-sm md:text-base">SPECIAL OFFER</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-none uppercase">
                        FREE <br/><span className="text-8xl md:text-[10rem]">MEMBERSHIP</span>
                    </h2>
                    <p className="text-xl md:text-3xl font-bold uppercase opacity-80">
                        Sign-up for 3 months & <br/>Get 1 month <span className="underline italic">FREE!</span>
                    </p>
                </div>
                <div className="relative z-10 w-full md:w-auto">
                    <button className="w-full md:w-auto bg-black text-white text-2xl font-bold px-12 py-8 rounded-2xl hover:scale-105 transition-transform uppercase tracking-widest shadow-2xl">
                        Claim Now
                    </button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 -skew-x-12 translate-x-1/2" />
            </motion.div>
        </section>
    )
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg font-bold text-black font-display">S</div>
        <span className="text-xl font-bold tracking-tighter uppercase">SMART CITY GYM</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest">
        <a href="#" className="hover:text-primary transition-colors">Training</a>
        <a href="#" className="hover:text-primary transition-colors">Facility</a>
        <a href="#" className="hover:text-primary transition-colors">Pricing</a>
      </div>
      <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-tight hover:bg-primary transition-colors">
        Join Now
      </button>
    </nav>
  );
};

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">
                            GET IN <span className="text-primary italic">TOUCH.</span>
                        </h2>
                        <p className="text-white/60 mb-12 text-lg font-sans max-w-md">
                            Ready to transform your life? Reach out today and let's start your journey toward elite performance.
                        </p>
                        
                        <div className="space-y-8">
                            {[
                                { icon: <Mail size={20} />, label: "Email", value: "hello@smartcitygym.com" },
                                { icon: <Phone size={20} />, label: "Phone", value: "+1 (555) 000-SCG" },
                                { icon: <MapPin size={20} />, label: "Location", value: "123 Elite Way, Downtown District" },
                                { icon: <Clock size={20} />, label: "Timing", value: "6am - 10am | 4pm - 12midnight" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg text-primary border border-white/10">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-white/40 mb-1 font-mono">
                                            {item.label}
                                        </div>
                                        <div className="text-lg font-medium">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-mono ml-1">Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Carter"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors font-sans"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-mono ml-1">Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors font-sans"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/40 font-mono ml-1">Subject</label>
                                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors font-sans appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Membership Plans</option>
                                    <option>Personal Training</option>
                                    <option>Corporate Partnership</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/40 font-mono ml-1">Message</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Tell us about your goals..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors font-sans"
                                />
                            </div>
                            <button className="w-full bg-primary text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-accent transition-all transform active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function App() {
  return (
    <main className="relative">
      <Navbar />
      <ThreeDHero />
      
      {/* Spacer for transition */}
      <div className="h-[20vh] bg-gradient-to-b from-black to-dark" />
      
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            >
                <div>
                   <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9]">
                    PUSH YOUR <br/>
                    <span className="text-primary italic">BOUNDARY.</span>
                   </h2>
                   <p className="text-xl text-white/60 font-sans mb-12 max-w-xl">
                    Located in the heart of the city, SMART CITY GYM is not just a gym. 
                    It's a hub for high-performance athletes and those who dare to be better.
                   </p>
                   <div className="flex gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex-1">
                        <div className="text-3xl font-bold text-primary mb-1">5000+</div>
                        <div className="text-xs uppercase tracking-widest text-white/40">Sq Ft Space</div>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex-1">
                        <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                        <div className="text-xs uppercase tracking-widest text-white/40">Elite Access</div>
                     </div>
                   </div>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                        src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" 
                        alt="Gym atmosphere"
                        className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-700"
                    />
                </div>
            </motion.div>
        </div>
      </section>

      <Features />
      <SpecialOffer />
      <Contact />
      <footer className="py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg font-bold text-black text-xl">S</div>
                <div>
                  <span className="block text-lg font-bold tracking-tighter uppercase leading-none">SMART CITY GYM</span>
                  <span className="text-[10px] text-primary font-mono tracking-[0.2em] uppercase">Built for Performance</span>
                </div>
                <div className="ml-4 pl-4 border-l border-white/10 text-right">
                  <span className="block text-xl font-bold opacity-40">سمارت سيتي جيم</span>
                </div>
            </div>
            <div className="text-white/40 text-[10px] font-mono text-center md:text-left">
                © 2024 SMART CITY GYM. BUILT FOR PERFORMANCE.
            </div>
            <div className="flex gap-6">
                {['Instagram', 'Twitter', 'Facebook'].map(s => (
                    <a key={s} href="#" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">{s}</a>
                ))}
            </div>
        </div>
      </footer>
    </main>
  );
}
