import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane, Globe, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStartSpin: () => void;
  isAuthenticated: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartSpin, isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <Globe className="w-24 h-24 text-white mx-auto" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <Plane className="w-8 h-8 text-yellow-300 absolute top-2 right-2" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Travel
          <motion.span
            animate={{ color: ['#ffffff', '#fbbf24', '#ffffff'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block"
          >
            Spinner
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Let destiny choose your next adventure. Spin the globe and discover amazing destinations tailored just for you.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            onClick={onStartSpin}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Start the Spin
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="ml-3"
            >
              <Globe className="w-6 h-6" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Globe, title: "Random Discovery", desc: "Let chance guide your next adventure" },
            { icon: Sparkles, title: "Personalized", desc: "Tailored to your travel style" },
            { icon: Plane, title: "Ready to Go", desc: "Complete travel information included" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <feature.icon className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {!isAuthenticated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-white/70 text-sm"
          >
            Sign in to save your discoveries and create personalized travel plans
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;