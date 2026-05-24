"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ExampleCardProps {
  example: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  onClick: () => void;
}

export default function ExampleCard({ example, onClick }: ExampleCardProps) {
  const [imageError, setImageError] = useState(false);

  const splitName = example.name.split(/[–-]/).map((part) => part.trim());
  const name = splitName[0] || example.name;
  const subname = splitName[1] || "";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-dark-card border border-card-border rounded-2xl overflow-hidden cursor-pointer hover:border-amber-border transition-colors group h-full flex flex-col"
    >
      <div className="relative h-44 w-full overflow-hidden bg-dark-3 flex items-center justify-center flex-shrink-0">
        {!imageError ? (
          <Image
            src={example.image}
            alt={example.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🏠</div>
            <p className="text-cream-muted text-sm font-syne">{example.name}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-[14px] font-extrabold text-cream group-hover:text-amber-accent transition-colors font-syne leading-snug">
            {name}
          </h3>
          {subname && (
            <p className="text-[13px] text-cream-muted font-syne">{subname}</p>
          )}
        </div>
        <p className="text-cream-muted font-lora text-base leading-relaxed flex-grow">
          {example.description}
        </p>
      </div>
    </motion.div>
  );
}
