import { motion } from "framer-motion";
import translations from "../locales/translations";
import { Instagram, Github, MessageCircle, Star } from "lucide-react";

interface FooterProps {
  language: "tr" | "az";
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 pb-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* GitHub Star Banner - Üst Kısım */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/rasperon/writewise"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-amber-500/10 p-4 rounded-2xl border border-yellow-200/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-3">
              <Star className="text-yellow-600 dark:text-yellow-400" size={24} />
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                {t.footer.starProject}
              </span>
              <Star className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </motion.a>
        </motion.div>

        {/* Reklam Panosu */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 p-8 rounded-3xl border border-purple-200/20 backdrop-blur-sm shadow-xl"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {t.footer.adTitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center text-lg leading-relaxed max-w-2xl mx-auto">
              {t.footer.adText}
            </p>
        
          </div>
        </motion.div>

        {/* Geliştirici Bilgileri */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://instagram.com/rasperon.c"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/rasperon/writewise"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://discord.com/users/1108799838876868738"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              <MessageCircle size={24} />
            </motion.a>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{t.footer.developedBy}</p>
            <p>© 2025 WriteWise</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 