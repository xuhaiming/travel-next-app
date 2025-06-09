import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Users, Heart, Briefcase, UserCheck } from 'lucide-react';
import { TravelerType } from '@/types/destination';

interface TravelerTypeSelectorProps {
  onSelect: (type: TravelerType) => void;
  onBack: () => void;
}

const travelerTypes = [
  {
    type: 'solo' as TravelerType,
    icon: User,
    title: 'Solo Traveler',
    description: 'Explore the world on your own terms',
    color: 'from-purple-500 to-pink-500',
    benefits: ['Complete freedom', 'Self-discovery', 'Meet new people']
  },
  {
    type: 'couple' as TravelerType,
    icon: Heart,
    title: 'Couple',
    description: 'Romantic getaways for two',
    color: 'from-red-500 to-pink-500',
    benefits: ['Romantic settings', 'Intimate experiences', 'Quality time']
  },
  {
    type: 'family' as TravelerType,
    icon: Users,
    title: 'Family',
    description: 'Fun adventures for the whole family',
    color: 'from-green-500 to-blue-500',
    benefits: ['Kid-friendly activities', 'Educational experiences', 'Family bonding']
  },
  {
    type: 'friends' as TravelerType,
    icon: UserCheck,
    title: 'Friends',
    description: 'Epic adventures with your crew',
    color: 'from-yellow-500 to-orange-500',
    benefits: ['Group activities', 'Shared memories', 'Adventure sports']
  },
  {
    type: 'business' as TravelerType,
    icon: Briefcase,
    title: 'Business',
    description: 'Professional travel with style',
    color: 'from-gray-600 to-blue-600',
    benefits: ['Business facilities', 'Networking opportunities', 'Efficient travel']
  }
];

const TravelerTypeSelector: React.FC<TravelerTypeSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            What's Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Travel Style?
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose your traveler type to get personalized destination recommendations
          </p>
        </motion.div>

        {/* Traveler Type Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {travelerTypes.map((traveler, index) => (
            <motion.div
              key={traveler.type}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer h-full"
                onClick={() => onSelect(traveler.type)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${traveler.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <traveler.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Title and description */}
                  <h3 className="text-2xl font-bold text-white mb-2">{traveler.title}</h3>
                  <p className="text-white/80 mb-4 flex-grow">{traveler.description}</p>
                  
                  {/* Benefits */}
                  <div className="space-y-2">
                    {traveler.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center justify-center text-sm text-white/70">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover effect indicator */}
                  <motion.div
                    className="mt-4 text-yellow-400 font-semibold opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    Click to select →
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            ← Back to Welcome
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelerTypeSelector;