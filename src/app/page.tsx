"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoadingScreen from "./components/LoadingScreen";
import TipsModal from "./components/TipsModal";
import Footer from "./components/Footer";
import translations from "./locales/translations";

const TOPICS = [
  {
    title: "Gelecek Teknolojisi",
    prompt: "Describe a technological innovation you expect to see in the next 20 years. How will it change daily life?"
  },
  {
    title: "Hayalindeki Yer",
    prompt: "Write about a place you dream of visiting. What attracts you to this location?"
  },
  {
    title: "Çevre Koruma",
    prompt: "Discuss an environmental issue that concerns you and propose a solution."
  },
  {
    title: "Kültürel Deneyim",
    prompt: "Share a cultural experience or tradition that is meaningful to you."
  },
  {
    title: "Kariyer Hedefleri",
    prompt: "What are your career goals? How do you plan to achieve them?"
  }
];

interface TopicData {
  topic: string;
  example: string;
}

interface FeedbackData {
  grammar: number;
  coherence: number;
  vocabulary: number;
  suggestions: string[];
}

// API anahtarlarını dönüşümlü olarak kullanmak için yardımcı fonksiyon
const API_KEYS = [
  process.env.NEXT_PUBLIC_GEMINI_API_KEY_1 || '',
  process.env.NEXT_PUBLIC_GEMINI_API_KEY_2 || ''
];

let currentApiKeyIndex = 0;

const getNextApiKey = () => {
  const key = API_KEYS[currentApiKeyIndex];
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  return key;
};

const safeJsonParse = (text: string): any => {
  try {
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error('JSON parse error:', err);
    return null;
  }
};

export default function Home() {
  const [text, setText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"tr" | "az">("tr");
  const [currentTopic, setCurrentTopic] = useState<TopicData | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const t = translations[selectedLanguage];

  const generateNewTopic = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(getNextApiKey());
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const result = await model.generateContent(`
        You are an English language learning assistant. Create a writing topic for practice.
        
        Follow these instructions carefully:
        1. Generate an engaging topic title
        2. Create a thought-provoking writing prompt
        3. Write a 2-3 sentence example response
        
        Format your response EXACTLY like this example:
        {
          "topic": "Digital Privacy - How do you protect your personal information online?",
          "example": "In today's digital age, I take several measures to protect my online privacy. I use strong, unique passwords for all my accounts and enable two-factor authentication whenever possible. Additionally, I'm careful about what personal information I share on social media and regularly review my privacy settings."
        }

        Important:
        - Response must be valid JSON
        - Do not include any text before or after the JSON
        - Do not use markdown formatting
        - Make sure the JSON is properly escaped
      `);
      
      const responseText = result.response.text();
      console.log('API Response:', responseText);

      const parsedResponse = safeJsonParse(responseText);
      if (!parsedResponse || !parsedResponse.topic || !parsedResponse.example) {
        throw new Error('Geçersiz API yanıtı');
      }

      setCurrentTopic(parsedResponse);
      setText("");
      setFeedback(null);
      setError(null);
    } catch (err) {
      console.error('Topic generation error:', err);
      setError(t.errors.topicError);
    }
    setLoading(false);
  };

  const evaluateText = async () => {
    if (!text.trim()) {
      setError(t.errors.pleaseEnterText);
      return;
    }

    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    if (sentences.length < 3) {
      setError(t.errors.pleaseWriteThree);
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(getNextApiKey());
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(`
        You are an English language assessment expert.
        
        Text to evaluate:
        "${text}"
        
        Topic:
        "${currentTopic?.topic}"
        
        Evaluate the text and provide detailed feedback. Return the response in this JSON format:
        {
          "grammar": number (0-10),
          "coherence": number (0-10),
          "vocabulary": number (0-10),
          "suggestions": [
            "suggestion 1",
            "suggestion 2",
            "suggestion 3"
          ]
        }

        Scoring criteria:
        1. Grammar (0-10):
           - Grammar accuracy
           - Sentence structure
           - Punctuation
        
        2. Coherence (0-10):
           - Connection to topic
           - Idea development
           - Focus
        
        3. Vocabulary (0-10):
           - Word choice
           - Variety
           - Usage
        
        Provide specific suggestions for improvement in the suggestions array.
        Response must be valid JSON.
      `);

      const feedbackData = safeJsonParse(result.response.text());
      if (!feedbackData || typeof feedbackData.grammar !== 'number') {
        throw new Error('Geçersiz değerlendirme yanıtı');
      }

      setFeedback(feedbackData);
      setError(null);
    } catch (err) {
      console.error('Evaluation error:', err);
      setError(t.errors.evaluationError);
    }
    setLoading(false);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      evaluateText();
    }
  }, [text, currentTopic]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto w-full px-4">
        <AnimatePresence>
          {loading && <LoadingScreen language={selectedLanguage} />}
          {showTips && (
            <TipsModal
              language={selectedLanguage}
              onClose={() => setShowTips(false)}
              topic={currentTopic?.topic || ""}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center"
          >
            {t.appTitle}
          </motion.h1>
          
          <div className="space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center gap-4 flex-wrap"
            >
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as "tr" | "az")}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="tr">{t.languages.tr}</option>
                <option value="az">{t.languages.az}</option>
              </select>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTips(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg"
                >
                  {t.showTips}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateNewTopic}
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? t.loading : t.newTopic}
                </motion.button>
              </div>
            </motion.div>

            {currentTopic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-purple-50 dark:bg-gray-700/50 p-6 rounded-2xl shadow-inner"
                >
                  <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-200 mb-3">{t.topic}:</h2>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{currentTopic.topic}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-pink-50 dark:bg-gray-700/50 p-6 rounded-2xl shadow-inner"
                >
                  <h2 className="text-xl font-semibold text-pink-900 dark:text-pink-200 mb-3">{t.example}:</h2>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{currentTopic.example}</p>
                </motion.div>

                <div className="space-y-4">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.writeMinThree}
                    className="w-full h-40 p-6 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-inner focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg leading-relaxed"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={evaluateText}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? t.evaluating : t.evaluate}
                </motion.button>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-xl shadow-inner"
                    >
                      {error}
                    </motion.div>
                  )}

                  {feedback && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl text-center"
                        >
                          <h4 className="font-semibold text-purple-900 dark:text-purple-200">{t.feedback.grammar}</h4>
                          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{feedback.grammar}/10</p>
                        </motion.div>
                        
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-xl text-center"
                        >
                          <h4 className="font-semibold text-pink-900 dark:text-pink-200">{t.feedback.coherence}</h4>
                          <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">{feedback.coherence}/10</p>
                        </motion.div>
                        
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl text-center"
                        >
                          <h4 className="font-semibold text-indigo-900 dark:text-indigo-200">{t.feedback.vocabulary}</h4>
                          <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{feedback.vocabulary}/10</p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl"
                      >
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4 text-center">
                          {t.feedback.total}: {feedback.grammar + feedback.coherence + feedback.vocabulary}/30
                        </h3>
                        
                        <div className="space-y-2 text-gray-800 dark:text-gray-200">
                          {feedback.suggestions.map((suggestion, index) => (
                            <motion.p
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <span className="text-green-600 dark:text-green-400">•</span>
                              {suggestion}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer language={selectedLanguage} />
    </div>
  );
}
