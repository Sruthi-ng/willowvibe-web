import { motion } from "framer-motion";
import { Database, Cpu, Wifi } from "lucide-react";

export function DataStreamVisual() {
  return (
    <div className="relative w-full h-48 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-600 select-none shadow-inner flex items-center justify-between px-6">
      
      {/* 📡 Left Side: Data Sources */}
      <div className="flex flex-col gap-6 relative z-10">
        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-500 flex items-center justify-center shadow-lg">
          <Wifi size={18} className="text-cyan-400" />
        </div>
        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-500 flex items-center justify-center shadow-lg">
          <Cpu size={18} className="text-cyan-400" />
        </div>
        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-500 flex items-center justify-center shadow-lg">
          <Database size={18} className="text-cyan-400" />
        </div>
      </div>

      {/* ⚡ The Streaming Packets */}
      <div className="absolute left-16 right-20 top-0 bottom-0 pointer-events-none">
        {/* Top Stream */}
        <motion.div 
          className="absolute top-[40px] w-3 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.1 }}
        />
        {/* Middle Stream */}
        <motion.div 
          className="absolute top-[94px] w-6 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear", delay: 0.4 }}
        />
        {/* Bottom Stream */}
        <motion.div 
          className="absolute bottom-[40px] w-4 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_cyan]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear", delay: 0.2 }}
        />
      </div>

      {/* 🏢 Right Side: The Lakehouse */}
      <div className="relative z-10 w-24 h-32 bg-cyan-950/40 border-2 border-cyan-400 rounded-xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        <Database size={32} className="text-cyan-400 mb-2" />
        <span className="text-[10px] font-mono text-cyan-200 font-bold">LAKEHOUSE</span>
      </div>

    </div>
  );
}