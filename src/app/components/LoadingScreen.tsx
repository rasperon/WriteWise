import { motion } from "framer-motion";
import translations from "../locales/translations";

interface LoadingScreenProps {
  language: "tr" | "az";
}

export default function LoadingScreen({ language }: LoadingScreenProps) {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="mt-4 text-white text-lg">{t.loading}</p>
      </div>
    </motion.div>
  );
} 