import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export function AnomalyDetectionVisual() {
  return (
    <div className="relative w-full h-48 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-600 select-none shadow-inner flex flex-col items-center justify-center">
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:15px_15px]"></div>

      {/* 📡 The Scanning Zone (Center) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 bg-cyan-500/10 border-x border-cyan-500/30 flex flex-col items-center justify-between py-2 z-10">
         <span className="text-[9px] font-mono text-cyan-400 font-bold tracking-widest">ML_MODEL</span>
         <ShieldAlert size={20} className="text-cyan-400/50" />
      </div>

      {/* The Data Track */}
      <div className="w-full h-12 relative flex items-center overflow-hidden border-y border-neutral-800">
        
        {/* Safe Data Node 1 */}
        <motion.div 
          className="absolute w-4 h-4 bg-cyan-400 rounded shadow-[0_0_10px_cyan]"
          animate={{ left: ["-10%", "110%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0 }}
        />
        
        {/* 🚨 THE ANOMALY (Red Node) */}
        <motion.div 
          className="absolute w-4 h-4 bg-red-500 rounded shadow-[0_0_15px_red] z-20 flex items-center justify-center"
          animate={{ left: ["-10%", "48%", "48%", "48%"], scale: [1, 1, 1.5, 0], opacity: [1, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
        >
          {/* Target lock box that appears when it hits the center scanner */}
          <motion.div 
            className="absolute inset-[-6px] border border-red-400"
            animate={{ opacity: [0, 0, 1, 0], scale: [1, 1, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
        </motion.div>

        {/* Safe Data Node 2 */}
        <motion.div 
          className="absolute w-4 h-4 bg-cyan-400 rounded shadow-[0_0_10px_cyan]"
          animate={{ left: ["-10%", "110%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.6 }}
        />
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-cyan-400">
         <CheckCircle2 size={14} />
         <span className="text-[10px] font-mono font-bold">LATENCY: 42ms</span>
      </div>
    </div>
  );
}