export interface Destination {
  id: string;
  name: string;
  country: string;
  city?: string;
  latitude: number;
  longitude: number;
  tagline: string;
  budget_estimate: string;
  best_time_to_visit: string;
  visa_requirements: string;
  activities: string[];
  image_url?: string;
  description?: string;
}

export interface SavedDestination extends Destination {
  user_id: string;
  saved_at: string;
}

export interface UserSpin {
  id: string;
  user_id?: string;
  destination_name: string;
  traveler_type?: string;
  spun_at: string;
}

export type TravelerType = 'solo' | 'couple' | 'family' | 'friends' | 'business';