import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useRef, useState, useEffect, MouseEvent } from "react";
import { Shield, Zap, TrendingUp, ChevronDown, Dumbbell, Mail, Phone, MapPin, Clock, Star, Target, Activity } from "lucide-react";

const ThreeDHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mouse positioning for interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(smoothMouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-10, 10]);

  // Zooming the main content towards the camera
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="h-[300vh] relative bg-black cursor-none"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-1000">
        
        {/* Background Layer with Depth */}
        <motion.div 
          style={{ scale: bgScale, filter: `blur(${blur}px)` }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
          
          {/* Tech Grid */}
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 184, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 184, 0, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        {/* Floating Decorative HUD Elements */}
        <motion.div style={{ y: layer1Y, rotate: 45 }} className="absolute top-[10%] left-[10%] z-10 opacity-20 hidden lg:flex flex-col gap-2">
            <Target size={120} className="text-primary animate-pulse" />
            <div className="font-mono text-[10px] text-primary tracking-widest uppercase">Target.Lock.Status[OK]</div>
        </motion.div>
        
        <motion.div style={{ y: layer2Y }} className="absolute top-[20%] right-[15%] z-10 opacity-20 hidden lg:flex flex-col items-end">
            <Activity size={80} className="text-primary" />
            <div className="h-20 w-[2px] bg-primary/40 mt-4 mr-10" />
            <div className="font-mono text-[10px] text-primary tracking-widest uppercase mt-2">Bio_Metric.Active</div>
        </motion.div>

        {/* HUD Corners */}
        <div className="absolute inset-0 p-10 pointer-events-none opacity-20 z-20 font-mono text-[10px] hidden md:block">
            <div className="absolute top-10 left-10 flex flex-col gap-1">
                <div className="flex gap-2"><span className="text-primary">LAT:</span> 51.5074° N</div>
                <div className="flex gap-2"><span className="text-primary">LNG:</span> 0.1278° W</div>
            </div>
            <div className="absolute top-10 right-10 flex flex-col gap-1 items-end">
                <div className="flex gap-2">SYS_OPTIMIZED: <span className="text-primary">100%</span></div>
                <div className="flex gap-2 uppercase tracking-tighter">Smart_City_Layer_01</div>
            </div>
            <div className="absolute bottom-10 left-10 flex flex-col gap-1">
                <div className="flex gap-2 items-center text-primary/40 uppercase tracking-widest">System_Active</div>
            </div>
        </div>

        {/* Main Hero "Gateway" */}
        <motion.div
           style={{ 
             scale: smoothScale,
             opacity,
             rotateX,
             rotateY
           }}
           className="relative z-10 flex flex-col items-center justify-center text-center px-6 preserve-3d"
        >
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="preserve-3d"
          >
            <div className="flex items-center justify-center gap-6 mb-8 preserve-3d">
               <motion.div 
                 initial={{ scaleY: 0 }}
                 animate={{ scaleY: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="w-1 h-32 bg-primary origin-top" 
               />
               
               <h1 className="text-[12vw] font-bold tracking-tight uppercase leading-[0.8] mix-blend-overlay drop-shadow-[0_0_30px_rgba(255,184,0,0.3)] bg-gradient-to-r from-transparent via-primary/50 to-transparent bg-[length:200%_auto] animate-shimmer bg-clip-text">
                 <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="block"
                 >SMART</motion.span> 
                 <motion.span 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="block translate-x-4"
                 >CITY <span className="text-primary italic">GYM</span></motion.span>
               </h1>

               <motion.div 
                 initial={{ scaleY: 0 }}
                 animate={{ scaleY: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="w-1 h-32 bg-primary origin-bottom" 
               />
            </div>
            
            <div className="flex flex-col items-center translate-z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center gap-2 mb-6"
                >
                    <span className="font-mono text-primary tracking-[0.5em] text-sm md:text-lg">
                        LADIES & GENTS
                    </span>
                    <div className="h-[1px] w-12 bg-primary/30" />
                    <span className="font-sans text-white/40 text-xs tracking-[0.3em] uppercase">
                        COACH: SHARAFU
                    </span>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl md:text-4xl font-display font-light text-white/60 uppercase tracking-[0.3em]"
                >
                    CHANGE YOUR LIFESTYLE
                </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Scanline */}
        <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-30 pointer-events-none"
        />

        {/* Custom Cursor Circle */}
        <motion.div 
            style={{ x: smoothMouseX, y: smoothMouseY, translateX: '-50%', translateY: '-50%' }}
            className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[100] hidden md:block"
        />

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 flex flex-col items-center gap-4 text-white/30"
        >
            <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono">Push Forward</span>
        </motion.div>
      </div>
    </section>
  );
};

const TrainingBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

    const handleMouseMove = (e: MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const rect = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - rect.left);
        mouseY.set(clientY - rect.top);
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="absolute inset-0 z-0 pointer-events-none"
        >
            <motion.div 
                style={{ 
                    x: smoothX, 
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,184,0,0.05)_0%,transparent_70%)]" />
        </div>
    );
};

const Features = () => {
    return (
        <section id="services" className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase">Our <span className="text-primary italic">Services</span></h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <TrendingUp className="text-primary" />, title: "Weight Management", desc: "Expert weight gaining and loss programs tailored to your body type and goals." },
                    { icon: <Zap className="text-primary" />, title: "Cardio & Aerobics", desc: "High-intensity group aerobics and cardio training for maximum endurance." },
                    { icon: <Dumbbell className="text-primary" />, title: "Body Building", desc: "Professional muscle building and competition training for elite performance." },
                    { icon: <Star className="text-primary" />, title: "Personal Training", desc: "Certified trainers providing one-on-one sessions at gym, home, or park." }
                ].map((f, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover="hover"
                        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group text-center overflow-hidden"
                    >
                        {/* Hover Background Glow */}
                        <motion.div 
                            variants={{
                                hover: { opacity: 0.6 }
                            }}
                            initial={{ opacity: 0 }}
                            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
                        >
                             <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, 0],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-10 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-3xl opacity-50"
                             />
                        </motion.div>

                        <div className="relative z-10">
                            <div className="mb-4 mx-auto p-4 w-fit rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">{f.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-sans">{f.desc}</p>
                        </div>
                        
                        {/* Decorative Corner Accent */}
                        <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 -translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 rounded-bl-xl" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

const PricingSection = () => {
    const prices = [
        { period: "One Day", price: "20", sub: "AED" },
        { period: "One Month", price: "125", sub: "AED" },
        { period: "Two Months", price: "230", sub: "AED" },
        { period: "Three Months", price: "325", sub: "AED", popular: true },
        { period: "Six Months", price: "540", sub: "AED" },
        { period: "One Year", price: "900", sub: "AED" },
    ];

    return (
        <section id="pricing" className="py-24 px-6 bg-black relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-bold uppercase mb-4">Membership <br/><span className="text-primary italic">Plans</span></h2>
                        <div className="w-24 h-1 bg-primary" />
                    </div>
                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl max-w-sm">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <Zap size={20} className="fill-primary" />
                            <span className="font-bold uppercase tracking-wider text-sm">Special Challenge</span>
                        </div>
                        <p className="text-white font-bold text-lg uppercase leading-tight">
                            3 Months Belly Removing Challenge Available Now!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prices.map((p, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-3xl border ${p.popular ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'} group overflow-hidden`}
                        >
                            {p.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <span className="block text-white/40 text-sm uppercase tracking-widest mb-2 font-mono">{p.period}</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">{p.price}</span>
                                    <span className="text-primary font-bold uppercase">{p.sub}</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 text-sm text-white/60">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Full Gym Access
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Ladies & Gents Mixed
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Personal Training Option
                                </li>
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary to-primary/60 text-black flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-3xl font-bold uppercase mb-2">Special Couple Package</h3>
                        <p className="font-medium opacity-80 uppercase tracking-wide">Available for all durations. Transform together.</p>
                    </div>
                    <Star size={48} className="opacity-20 hidden md:block" />
                </div>
            </div>
        </section>
    );
};

const ScheduleSection = () => {
    return (
        <section id="schedule" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8">Working <br/><span className="text-primary italic">Hours</span></h2>
                    <p className="text-white/40 mb-12 max-w-md uppercase tracking-widest text-sm leading-relaxed">
                        Flexible timings designed to fit your busy lifestyle, including dedicated ladies-only hours for privacy and comfort.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-primary font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                                <Clock size={18} /> Monday to Saturday
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-white/60">Morning Session</span>
                                    <span className="font-bold">06.00 AM - 12.00 PM <span className="text-[10px] text-primary/60 ml-2">(MIXED)</span></span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-primary">Ladies Special Time</span>
                                    <span className="font-bold text-primary">12.00 PM - 03.00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Evening Session</span>
                                    <span className="font-bold">03.00 PM - 02.00 AM <span className="text-[10px] text-primary/60 ml-2">(MIXED)</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-primary font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                                <Clock size={18} /> Sunday
                            </h4>
                            <div className="flex justify-between items-center">
                                <span className="text-white/60">Open Hours</span>
                                <span className="font-bold">05.00 PM - 10.00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 relative">
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <img 
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
                            alt="Gym Training"
                            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-primary p-10 rounded-3xl text-black font-bold rotate-3 hidden md:block">
                        <div className="text-4xl uppercase">Join<br/>Now</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ImageGallery = () => {
    const images = [
        "/images/gym_1.jpg",
        "/images/gym_2.jpg",
        "/images/gym_3.jpg",
        "/images/gym_4.jpg",
        "/images/gym_1.jpg",
        "/images/gym_2.jpg",
        "/images/gym_3.jpg",
        "/images/gym_4.jpg",
    ];

    return (
        <section className="py-24 bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-bold uppercase mb-4">Elite <span className="text-primary italic">Facility</span></h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            
            <div className="relative flex">
                <motion.div 
                    animate={{ x: [0, -1600] }}
                    transition={{ 
                        duration: 30, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="flex gap-6 whitespace-nowrap"
                >
                    {images.map((src, i) => (
                        <div key={i} className="w-[400px] h-[600px] rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 flex-shrink-0 border border-white/5">
                            <img 
                                src={src} 
                                alt={`Gym internal ${i}`} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    ))}
                </motion.div>
                
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
            </div>
        </section>
    );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg font-bold text-black font-display">S</div>
        <span className="text-xl font-bold tracking-tighter uppercase">SMART CITY GYM</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest">
        <a href="#training" className="hover:text-primary transition-colors">Training</a>
        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        <a href="#schedule" className="hover:text-primary transition-colors">Schedule</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
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
                                { icon: <Mail size={20} />, label: "Email", value: "sharfu.scg@gmail.com" },
                                { icon: <Phone size={20} />, label: "Phone", value: "052 960 4582" },
                                { icon: <MapPin size={20} />, label: "Location", value: "Tower A1, City Tower, Al Nuaimia 3, Ajman-UAE" },
                                { icon: <Zap size={20} />, label: "WhatsApp", value: "056 577 3090" }
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

                    <div className="flex-1 flex flex-col gap-6 justify-center">
                        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl text-center">
                            <Zap size={48} className="text-primary mx-auto mb-6 fill-primary/20" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">Instant Support</h3>
                            <p className="text-white/60 mb-8 font-sans">
                                The fastest way to join or ask questions is via WhatsApp. Our team is ready to assist you.
                            </p>
                            <a 
                                href="https://wa.me/971565773090" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block w-full bg-primary text-black font-bold py-6 rounded-2xl text-xl uppercase tracking-[0.2em] hover:bg-white transition-all transform active:scale-95 shadow-[0_0_30px_rgba(255,184,0,0.2)]"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                        
                        {/* Google Maps Embed */}
                        <div className="bg-white/5 border border-white/10 p-2 rounded-3xl overflow-hidden h-[300px] relative group">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight={0} 
                                marginWidth={0} 
                                src="https://maps.google.com/maps?q=Smart%20City%20Gym%20Ajman%20City%20Tower&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 pointer-events-none">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-primary" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Tower A1, Ajman</span>
                                </div>
                            </div>
                        </div>
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
      
      <section id="training" className="relative py-32 px-6 overflow-hidden">
        {/* Interactive Background Effect */}
        <TrainingBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
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
                        <div className="text-3xl font-bold text-primary mb-1">1800</div>
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
      <PricingSection />
      <ScheduleSection />
      <ImageGallery />
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
                <a href="https://instagram.com/SHARAFU_TCR" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest hover:text-primary transition-colors text-white/40">Instagram</a>
                <a href="#" className="text-xs uppercase tracking-widest hover:text-primary transition-colors text-white/40">Twitter</a>
                <a href="#" className="text-xs uppercase tracking-widest hover:text-primary transition-colors text-white/40">Facebook</a>
            </div>
        </div>
      </footer>
    </main>
  );
}
