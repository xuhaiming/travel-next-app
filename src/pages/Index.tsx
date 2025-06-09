import { Button } from "@/components/ui/button";
import AuthContainer from "@/components/auth/AuthContainer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Travel Next</h1>
          {user && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[300px]">
              <AuthContainer />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-4">
            Your Next Adventure Awaits
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing destinations tailored just for you
          </p>
          
          {user ? (
            <div className="space-y-4">
              <p className="text-lg">Welcome back! Ready to explore?</p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                Start Exploring
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg mb-6">Sign in to start your personalized travel journey</p>
              <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <AuthContainer />
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <h3 className="text-xl font-semibold mb-3">Personalized Recommendations</h3>
            <p className="opacity-90">Get destination suggestions based on your travel style and preferences</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <h3 className="text-xl font-semibold mb-3">Save Favorites</h3>
            <p className="opacity-90">Build your personal collection of dream destinations to visit</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <h3 className="text-xl font-semibold mb-3">Travel Insights</h3>
            <p className="opacity-90">Access detailed information about costs, best times to visit, and more</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;