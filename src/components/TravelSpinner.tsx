import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useDestinations } from '@/hooks/useDestinations';
import { Destination, TravelerType } from '@/types/destination';

// Import all spinner components
import WelcomeScreen from './spinner/WelcomeScreen';
import TravelerTypeSelector from './spinner/TravelerTypeSelector';
import SpinningGlobe from './spinner/SpinningGlobe';
import DestinationReveal from './spinner/DestinationReveal';
import DestinationExplorer from './spinner/DestinationExplorer';
import UserAccount from './spinner/UserAccount';

type SpinnerStep = 'welcome' | 'traveler-type' | 'spinning' | 'reveal' | 'explore' | 'account';

const TravelSpinner: React.FC = () => {
  const { user } = useAuth();
  const { saveDestination, recordSpin, isDestinationSaved } = useDestinations();
  
  const [currentStep, setCurrentStep] = useState<SpinnerStep>('welcome');
  const [selectedTravelerType, setSelectedTravelerType] = useState<TravelerType>('solo');
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);

  const handleStartSpin = () => {
    setCurrentStep('traveler-type');
  };

  const handleTravelerTypeSelect = (type: TravelerType) => {
    setSelectedTravelerType(type);
    setCurrentStep('spinning');
  };

  const handleDestinationSelected = async (destination: Destination) => {
    setCurrentDestination(destination);
    
    // Record the spin
    await recordSpin(destination.name, selectedTravelerType);
    
    setCurrentStep('reveal');
  };

  const handleSaveDestination = async () => {
    if (currentDestination) {
      await saveDestination(currentDestination);
    }
  };

  const handleExploreDestination = () => {
    setCurrentStep('explore');
  };

  const handleSpinAgain = () => {
    setCurrentDestination(null);
    setCurrentStep('spinning');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
    setCurrentDestination(null);
  };

  const handleBackToReveal = () => {
    setCurrentStep('reveal');
  };

  const handleShowAccount = () => {
    setCurrentStep('account');
  };

  const handleBackToSpinner = () => {
    setCurrentStep('welcome');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen 
              onStartSpin={handleStartSpin}
              isAuthenticated={!!user}
            />
          </motion.div>
        )}

        {currentStep === 'traveler-type' && (
          <motion.div
            key="traveler-type"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <TravelerTypeSelector 
              onSelect={handleTravelerTypeSelect}
              onBack={handleBackToWelcome}
            />
          </motion.div>
        )}

        {currentStep === 'spinning' && (
          <motion.div
            key="spinning"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <SpinningGlobe 
              travelerType={selectedTravelerType}
              onDestinationSelected={handleDestinationSelected}
            />
          </motion.div>
        )}

        {currentStep === 'reveal' && currentDestination && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <DestinationReveal 
              destination={currentDestination}
              onSave={handleSaveDestination}
              onExplore={handleExploreDestination}
              onSpinAgain={handleSpinAgain}
              isSaved={isDestinationSaved(currentDestination.name)}
            />
          </motion.div>
        )}

        {currentStep === 'explore' && currentDestination && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <DestinationExplorer 
              destination={currentDestination}
              onBack={handleBackToReveal}
              onSave={handleSaveDestination}
            />
          </motion.div>
        )}

        {currentStep === 'account' && (
          <motion.div
            key="account"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <UserAccount 
              onBack={handleBackToSpinner}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Account Button */}
      {user && currentStep !== 'account' && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={handleShowAccount}
          className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default TravelSpinner;