"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Database, Server, Activity, Cloud, Cpu, Bot, Settings, RefreshCw, ClipboardCheck, Quote, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { DataStreamVisual } from "@/components/DataStreamVisual";
import { AnomalyDetectionVisual } from "@/components/AnomalyDetectionVisual";

// 📂 Projects Data
const PROJECTS = [
  {
    id: 1,
    title: "PLM Data Lake Migration",
    tags: ["AWS", "Snowflake", "dbt"],
    stat: "96% Time Saved",
    desc: "Migrated legacy product lifecycle management data into a unified lakehouse, drastically reducing reporting time.",
    visual: "slider",
  },
  {
    id: 2,
    title: "Global Logistics Lakehouse",
    tags: ["Databricks", "Delta Lake", "Kafka"],
    stat: "5PB+ Data",
    desc: "Constructed a real-time streaming architecture resolving supply chain bottlenecks globally.",
    visual: "stream",
  },
  {
    id: 3,
    title: "Fintech Fraud Detection",
    tags: ["Snowflake", "dbt", "Airflow"],
    stat: "< 50ms latency",
    desc: "Built an end-to-end data pipeline feeding ML models to detect anomalies in real-time.",
    visual: "anomaly",
  },
];

// 📂 Services Data
const SERVICES = [
  {
    icon: <Database className="w-8 h-8 text-cyan-400" />,
    title: "Data Lakehouse Architecture",
    desc: "Unifying the best of data warehouses and data lakes for scalable, high-performance analytics.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-cyan-400" />,
    title: "Cloud Infrastructure",
    desc: "Resilient, secure, and auto-scaling cloud environments on AWS, Azure, and GCP.",
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-cyan-400" />,
    title: "Data Migration",
    desc: "Seamlessly and securely moving legacy on-premise data to modern cloud architectures with zero downtime.",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-cyan-400" />,
    title: "Data Pipeline Audit",
    desc: "Comprehensive analysis of your existing pipelines to identify bottlenecks, reduce costs, and optimize performance.",
  }
];

// 📂 Testimonials Data
const TESTIMONIALS = [
  {
    quote: "They didn't just build a pipeline; they completely rescued our data architecture. We went from daily crashes to a fully automated lakehouse that hasn't dropped a single row.",
    name: "Sarah Jenkins",
    role: "CTO, Finova Tech",
  },
  {
    quote: "The sheer speed of the streaming architecture they deployed is incredible. We are now processing millions of logistics events with sub-50ms latency. Pure engineering excellence.",
    name: "Marcus Thorne",
    role: "VP of Engineering, GlobalFreight",
  },
  {
    quote: "Working with this team feels like having an elite in-house data unit. The pipeline audit alone saved us 40% on our monthly cloud warehouse computing costs.",
    name: "David Chen",
    role: "Head of Analytics, RetailPro",
  }
];

// 🤖 PURE CSS/MOTION COMPONENT: The Data Refinery Robot
const DataRefineryAnimation = () => {
  return (
    <div className="relative w-full h-[400px] bg-neutral-900/80 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute left-4 md:left-12 flex flex-col gap-8">
        {[12, -45, 30].map((rotation, i) => (
          <motion.div
            key={`messy-${i}`}
            className="w-8 h-8 bg-red-500/80 rounded-md border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            initial={{ x: -50, opacity: 0, rotate: rotation }}
            animate={{ x: 100, opacity: [0, 1, 0], rotate: rotation + 90 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-black border-2 border-cyan-500 rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.2)]">
        <Bot size={56} className="text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        <div className="flex gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Settings size={24} className="text-gray-400" />
          </motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Settings size={24} className="text-cyan-400" />
          </motion.div>
        </div>
        <motion.div 
          className="absolute inset-0 border-t-2 border-cyan-400 rounded-xl shadow-[0_0_10px_cyan]"
          animate={{ y: [0, 140, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="absolute right-4 md:right-12 flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`clean-${i}`}
            className="w-12 h-4 bg-cyan-400 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 50, opacity: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3 + 1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const displayProjects = Array(30).fill(PROJECTS).flat();

  const scrollToIndex = useCallback((targetDotIndex: number) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const cardWidthWithGap = (clientWidth * 0.8) + 16;
      
      const currentRawIndex = Math.round(scrollLeft / cardWidthWithGap);
      const currentMod = currentRawIndex % PROJECTS.length;

      let steps = targetDotIndex - currentMod;
      
      if (steps < 0) steps += PROJECTS.length;
      if (steps === 0) return; 

      const nextRawIndex = currentRawIndex + steps;

      sliderRef.current.scrollTo({
        left: nextRawIndex * cardWidthWithGap,
        behavior: "smooth",
      });
      setActiveIndex(targetDotIndex);
    }
  }, []);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const cardWidthWithGap = (clientWidth * 0.8) + 16;
      const rawIndex = Math.round(scrollLeft / cardWidthWithGap);
      setActiveIndex(rawIndex % PROJECTS.length);
    }
  };

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { clientWidth } = sliderRef.current;
        const cardWidthWithGap = (clientWidth * 0.8) + 16;
        sliderRef.current.scrollBy({ left: cardWidthWithGap, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const stopInteracting = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const move = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-cyan-400/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] -z-10 animate-pulse"></div>
        
        {/* TOP: THE DATA PIPELINE VISUAL ANIMATION */}
        <div className="w-full max-w-3xl mx-auto relative mb-16 pt-8">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/10 -translate-y-1/2 z-0 mt-4">
            <motion.div 
              className="h-full bg-cyan-400 shadow-[0_0_15px_cyan]"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              style={{ width: "30%" }}
            />
          </div>

          <div className="flex items-center justify-between w-full relative z-10">
            {["INGESTION", "TRANSFORMATION", "INTELLIGENCE"].map((step) => (
              <div key={step} className="flex flex-col items-center gap-4 bg-neutral-950 px-2 py-4 rounded-full">
                <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <Server className="text-cyan-400 w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">{step}</span>
              </div>
            ))}
          </div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
        >
          Architecting the <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Data Ecosystem</span> of Tomorrow.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light"
        >
          Raw data is only valuable if you can trust it and access it instantly. We act as your dedicated engineering team to eliminate data silos, automate complex pipelines, and build resilient cloud lakehouses. From real-time streaming to full infrastructure migrations, we handle the heavy technical plumbing so your business can thrive on clean, actionable intelligence.
        </motion.p>
      </section>

      {/* 2. TRUST TICKER */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden flex items-center">
        <div className="w-full max-w-7xl mx-auto relative flex overflow-hidden">
          <motion.div
            className="flex gap-24 whitespace-nowrap px-12"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          >
            {["AWS", "SNOWFLAKE", "DATABRICKS", "KAFKA", "DBT", "AIRFLOW", "AWS", "SNOWFLAKE", "DATABRICKS", "KAFKA", "DBT", "AIRFLOW"].map((tech, i) => (
              <span key={i} className="text-2xl font-mono font-bold text-gray-600 tracking-widest uppercase">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. THE DATA REFINERY (The Process Section) */}
      <section className="w-full bg-white/[0.02] border-b border-white/5 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-sm font-mono mb-6">
                <Cpu size={16} /> THE PROCESS
             </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">We turn the chaos of raw data into clarity.</h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              Think of your raw data like a disorganized warehouse. It's all there, but you can't use it.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our pipelines act as the ultimate automated sorting machine—ingesting the mess, applying rigorous cleaning rules, and delivering perfectly structured, analysis-ready data to your team.
            </p>
          </div>
          <DataRefineryAnimation />
        </div>
      </section>

      {/* 4. CORE CAPABILITIES (Services Grid - MOVED UP) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-32 border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">CORE_CAPABILITIES</h2>
          <div className="h-1 w-20 bg-cyan-400 shadow-[0_0_10px_cyan] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-neutral-800 border border-neutral-600 hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg"
            >
              <div className="mb-6 p-4 rounded-xl bg-black/40 inline-block group-hover:bg-cyan-400/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SLIDER (MOVED DOWN) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-32 border-b border-white/5">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 font-mono">FEATURED_PROJECTS</h2>
          <div className="h-1 w-20 bg-cyan-400 shadow-[0_0_10px_cyan] mx-auto md:mx-0"></div>
        </div>

        <div className="relative group">
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={startDragging}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={stopInteracting} 
            onMouseMove={move}
            onMouseEnter={() => setIsPaused(true)}
            className={`flex overflow-x-auto gap-4 snap-x snap-mandatory no-scrollbar px-[10%] py-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProjects.map((project, idx) => (
              <div key={`${project.id}-${idx}`} className="min-w-[80%] snap-center shrink-0 pointer-events-none md:pointer-events-auto">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* 🟢 High-Visibility Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8 relative z-30">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer hover:bg-cyan-300 ${
                activeIndex === index 
                  ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" 
                  : "w-2 bg-white/40"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 6. CLIENT ENDORSEMENTS (Testimonials Section) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-32 pb-40">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">CLIENT_ENDORSEMENTS</h2>
          <div className="h-1 w-20 bg-cyan-400 shadow-[0_0_10px_cyan] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative p-8 rounded-2xl bg-neutral-900 border border-neutral-700 hover:border-cyan-400/30 transition-colors duration-300 flex flex-col shadow-xl"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-cyan-400/10 rotate-180 pointer-events-none" />
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed italic relative z-10">"{testimonial.quote}"</p>
              </div>
              <div className="mt-auto border-t border-neutral-700 pt-6">
                <h4 className="text-white font-bold">{testimonial.name}</h4>
                <p className="text-cyan-400 text-sm font-mono mt-1">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. MINIMALIST FOOTER (The Clean Finish) */}
      <footer className="w-full border-t border-white/5 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal size={20} />
            <span className="font-mono font-bold tracking-wider">DATA_CORE</span>
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Data Engineering Services. All rights reserved.
          </div>
          
          <div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-400/30 text-cyan-400 text-sm font-mono hover:bg-cyan-400 hover:text-black transition-colors duration-300">
              CONTACT_US <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

// 🟢 LIGHTER GRAY PROJECT CARD 
function ProjectCard({ title, tags, stat, desc, visual }: any) {
  return (
    <div className="group relative p-8 h-full flex flex-col bg-neutral-700 border border-neutral-500 rounded-xl hover:border-cyan-400 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.8)] select-none">
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-lg text-gray-200 mb-6 flex-grow leading-relaxed">{desc}</p>
      
      {/* 🖼️ Renders the specific visual component for the project */}
      <div className="mt-4 mb-6">
        {visual === "slider" && <BeforeAfterSlider />}
        {visual === "stream" && <DataStreamVisual />}
        {visual === "anomaly" && <AnomalyDetectionVisual />}
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-500 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-black/60 border border-neutral-500 text-cyan-400 shadow-sm">{tag}</span>
          ))}
        </div>
        <div className="font-mono text-sm text-cyan-300 font-bold bg-black/40 px-3 py-1 rounded border border-neutral-600">METRIC: {stat}</div>
      </div>
    </div>
  );
}