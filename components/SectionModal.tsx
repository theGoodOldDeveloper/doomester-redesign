"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SectionModal({ isOpen, onClose, title, children }: SectionModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-2 border border-card-border rounded-2xl shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal header */}
            <div
              className="relative border-b border-amber-border rounded-t-2xl p-6 md:p-8 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(240,140,60,0.1) 0%, #130d1a 35%, #130d1a 65%, rgba(140,80,200,0.08) 100%)" }}
            >
              <div className="relative flex items-start justify-between gap-4">
                <h3 className="text-lg md:text-xl font-extrabold text-cream font-manrope leading-[1.18] pr-8">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Bezárás"
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-dim border border-amber-border text-amber-accent flex items-center justify-center hover:bg-[rgba(240,140,60,0.2)] transition-colors text-lg font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 md:p-8 text-cream-muted font-lora leading-relaxed space-y-4 text-base">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
