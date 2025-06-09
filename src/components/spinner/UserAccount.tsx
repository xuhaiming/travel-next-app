import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Calendar, 
  Plus,
  Trash2,
  Edit,
  Share2,
  Download,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

interface UserAccountProps {
  onBack: () => void;
}

const UserAccount: React.FC<UserAccountProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('saved');

  // Mock data for saved destinations
  const savedDestinations = [
    {
      id: '1',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg',
      savedAt: '2024-01-15',
      budget: '$150-300/day'
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg',
      savedAt: '2024-01-10',
      budget: '$100-200/day'
    }
  ];

  // Mock data for moodboards
  const moodboards = [
    {
      id: '1',
      title: 'Tropical Paradise',
      images: [
        'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
        'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
        'https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg'
      ],
      destinations: 3,
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Cultural Adventures',
      images: [
        'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg',
        'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg',
        'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg'
      ],
      destinations: 4,
      createdAt: '2024-01-18'
    }
  ];

  // Mock data for custom plans
  const customPlans = [
    {
      id: '1',
      title: 'European Summer Tour',
      destinations: ['Paris', 'Rome', 'Barcelona'],
      duration: '14 days',
      budget: '$3000-5000',
      status: 'Planning',
      createdAt: '2024-01-25'
    },
    {
      id: '2',
      title: 'Asian Adventure',
      destinations: ['Tokyo', 'Seoul', 'Bangkok'],
      duration: '10 days',
      budget: '$2000-3500',
      status: 'Booked',
      createdAt: '2024-01-22'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Spinner
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">My Travel Hub</h1>
              <p className="text-white/80">Welcome back, {profile?.full_name || user?.email}</p>
            </div>
            
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="saved" className="text-white data-[state=active]:bg-white/20">
              Saved Trips
            </TabsTrigger>
            <TabsTrigger value="moodboards" className="text-white data-[state=active]:bg-white/20">
              Moodboards
            </TabsTrigger>
            <TabsTrigger value="plans" className="text-white data-[state=active]:bg-white/20">
              Custom Plans
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white/20">
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Saved Destinations Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Saved Destinations</h2>
              <Badge variant="secondary" className="bg-purple-600 text-white">
                {savedDestinations.length} destinations
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group hover:bg-white/20 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                        <p className="text-white/80">{destination.country}</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Saved {destination.savedAt}
                        </div>
                        <div className="text-green-400 font-semibold">
                          {destination.budget}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Moodboards Tab */}
          <TabsContent value="moodboards" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Travel Moodboards</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Moodboard
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moodboards.map((moodboard, index) => (
                <motion.div
                  key={moodboard.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group hover:bg-white/20 transition-all duration-300">
                    <div className="grid grid-cols-3 gap-1 p-2">
                      {moodboard.images.map((image, i) => (
                        <div key={i} className="aspect-square overflow-hidden rounded">
                          <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold text-white mb-2">{moodboard.title}</h3>
                      <div className="flex items-center justify-between text-sm text-white/80 mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {moodboard.destinations} destinations
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {moodboard.createdAt}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Custom Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Custom Travel Plans</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Plan
              </Button>
            </div>
            
            <div className="space-y-4">
              {customPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            plan.status === 'Booked' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {plan.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-white/60 text-sm">Destinations</p>
                          <p className="text-white font-semibold">{plan.destinations.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Duration</p>
                          <p className="text-white font-semibold">{plan.duration}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Budget</p>
                          <p className="text-green-400 font-semibold">{plan.budget}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Created</p>
                          <p className="text-white font-semibold">{plan.createdAt}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Plan
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="p-3 bg-white/5 rounded-lg text-white">
                      {profile?.full_name || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="p-3 bg-white/5 rounded-lg text-white">
                      {profile?.email || user?.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Traveler Type
                    </label>
                    <div className="p-3 bg-white/5 rounded-lg text-white">
                      {profile?.traveler_type || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Member Since
                    </label>
                    <div className="p-3 bg-white/5 rounded-lg text-white">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAccount;