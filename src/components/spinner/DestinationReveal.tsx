import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Heart, 
  RotateCcw, 
  ExternalLink,
  Clock,
  Users,
  Camera
} from 'lucide-react';
import { Destination } from '@/types/destination';

interface DestinationRevealProps {
  destination: Destination;
  onSave: () => void;
  onExplore: () => void;
  onSpinAgain: () => void;
  isSaved?: boolean;
}

const DestinationReveal: React.FC<DestinationRevealProps> = ({
  destination,
  onSave,
  onExplore,
  onSpinAgain,
  isSaved = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        {/* Pin Drop Animation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            className="inline-block"
          >
            <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            {destination.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-2xl md:text-3xl text-yellow-400 font-semibold mb-2"
          >
            {destination.tagline}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-white/80 text-lg"
          >
            {destination.country}
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={destination.image_url || 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg'}
                alt={destination.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 animate-pulse" />
              )}
            </div>
            
            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span className="text-sm">Stunning views await</span>
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-green-400" />
                  Budget Estimate
                </h3>
                <p className="text-white/90 text-lg">{destination.budget_estimate}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-400" />
                  Best Time to Visit
                </h3>
                <p className="text-white/90 text-lg">{destination.best_time_to_visit}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-yellow-400" />
                  Visa Requirements
                </h3>
                <p className="text-white/90 text-lg">{destination.visa_requirements}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-purple-400" />
                  Suggested Activities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/20 text-white border-white/30"
                    >
                      {activity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={onSave}
            size="lg"
            className={`${
              isSaved 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            } text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <Heart className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved!' : 'Save Destination'}
          </Button>

          <Button
            onClick={onExplore}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Explore Deeper
          </Button>

          <Button
            onClick={onSpinAgain}
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Spin Again
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-white/60 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Destination selected based on your traveler preferences
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DestinationReveal;