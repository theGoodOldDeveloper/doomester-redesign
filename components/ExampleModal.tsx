"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ExampleModalProps {
  example: {
    id: number;
    name: string;
    modalImage: string;
    modalDescription: string;
  };
  onClose: () => void;
}

export default function ExampleModal({ example, onClose }: ExampleModalProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-dark-2 border border-card-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-large"
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-dark-2/90 border border-amber-border rounded-lg text-amber-accent flex items-center justify-center hover:bg-amber-dim transition-colors text-lg font-bold"
            >
              ×
            </button>
            <div className="relative h-56 md:h-80 w-full bg-dark-3 flex items-center justify-center rounded-t-2xl overflow-hidden">
              {!imageError ? (
                <Image
                  src={example.modalImage}
                  alt={example.name}
                  fill
                  className="object-cover rounded-t-2xl"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-cream-muted text-xl font-syne font-bold">{example.name}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-2/80 to-transparent" />
            </div>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold mb-4 text-cream font-syne">{example.name}</h2>
            <p className="text-cream-muted font-lora leading-relaxed text-base whitespace-pre-line">
              {example.modalDescription}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
