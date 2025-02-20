import { motion } from "framer-motion";
import translations from "../locales/translations";

interface TipsModalProps {
  language: "tr" | "az";
  onClose: () => void;
  topic: string;
}

export default function TipsModal({ language, onClose, topic }: TipsModalProps) {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t.tips.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
              {t.tips.structure}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t.tips.structurePoint1}</li>
              <li>{t.tips.structurePoint2}</li>
              <li>{t.tips.structurePoint3}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-2">
              {t.tips.vocabulary}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t.tips.vocabularyPoint1}</li>
              <li>{t.tips.vocabularyPoint2}</li>
              <li>{t.tips.vocabularyPoint3}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              {t.tips.coherence}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t.tips.coherencePoint1}</li>
              <li>{t.tips.coherencePoint2}</li>
              <li>{t.tips.coherencePoint3}</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 