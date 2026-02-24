import { motion } from "framer-motion";
import { FileSpreadsheet, BarChart3, ArrowRight } from "lucide-react";

export function BeforeAfterSlider() {
  return (
    <div className="relative w-full h-48 bg-neutral-800 rounded-xl border border-neutral-600 select-none shadow-inner flex items-center p-2 gap-2 md:gap-3">
      
      {/* 🔴 LHS: The Problem (Manual Work) */}
      <div className="flex-1 h-full bg-red-950/20 border border-red-500/20 rounded-lg p-3 md:p-4 flex flex-col justify-center relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"></div>
        
        <div className="relative z-10 w-full">
          <div className="flex flex-col xl:flex-row xl:items-center gap-2 text-red-400 font-bold mb-3 md:mb-4">
            <FileSpreadsheet size={18} className="shrink-0" />
            <span className="text-[10px] md:text-xs tracking-wide leading-tight">6 HRS MANUAL</span>
          </div>
          
          {/* Mock Excel Rows */}
          <div className="flex flex-col gap-1.5 md:gap-2 w-full">
            <div className="flex gap-1.5 md:gap-2">
              <div className="h-2 w-6 bg-red-500/30 rounded"></div>
              <div className="h-2 w-full bg-red-500/30 rounded"></div>
              <div className="h-2 w-8 bg-red-500/30 rounded"></div>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              <div className="h-2 w-6 bg-red-500/30 rounded"></div>
              <div className="h-2 w-3/4 bg-red-500/30 rounded"></div>
              <div className="h-2 w-10 bg-red-500/30 rounded"></div>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              <div className="h-2 w-6 bg-red-500/30 rounded"></div>
              <div className="h-2 w-5/6 bg-red-500/30 rounded"></div>
              <div className="h-2 w-6 bg-red-500/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ➡️ MIDDLE: The Transformation Arrow */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <motion.div 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-700 border border-neutral-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={18} className="text-cyan-400" />
        </motion.div>
      </div>

      {/* 🔵 RHS: The Solution (Automated Insights) */}
      <div className="flex-1 h-full bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3 md:p-4 flex flex-col justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
        <div className="relative z-10 w-full">
          <div className="flex flex-col xl:flex-row xl:items-center gap-2 text-cyan-400 font-bold mb-3 md:mb-4">
            <BarChart3 size={18} className="shrink-0" />
            <span className="text-[10px] md:text-xs tracking-wide leading-tight text-white">15 MINS AUTOMATED</span>
          </div>
          
          {/* Mock Glowing Bar Chart */}
          <div className="flex items-end gap-1.5 md:gap-2 h-10 md:h-12 w-full md:w-4/5 mx-auto">
            <motion.div className="w-full bg-cyan-400/30 rounded-t" initial={{ height: "30%" }} animate={{ height: ["30%", "40%", "30%"] }} transition={{ duration: 2, repeat: Infinity }}></motion.div>
            <motion.div className="w-full bg-cyan-400/50 rounded-t" initial={{ height: "50%" }} animate={{ height: ["50%", "70%", "50%"] }} transition={{ duration: 2.5, repeat: Infinity }}></motion.div>
            <motion.div className="w-full bg-cyan-400/70 rounded-t" initial={{ height: "80%" }} animate={{ height: ["80%", "60%", "80%"] }} transition={{ duration: 3, repeat: Infinity }}></motion.div>
            <div className="w-full bg-cyan-400 rounded-t shadow-[0_0_10px_rgba(34,211,238,0.8)] relative h-full">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-[0_0_5px_white]"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}