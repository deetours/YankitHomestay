export const YANKIT_METADATA = {
  name: 'Yankit Homestay',
  tagline: 'Silence in the Himalayas',
  subtitle: 'Discover the art of silence at 12,000 feet',
  location: 'Spiti Valley, Himalayas',
  coordinates: { lat: 32.223, lng: 78.058 },
  whatsapp: '+919418012345',
  email: 'stay@yankithomestay.com',
  instagram: '@yankit_spiti',
} as const;

export const ALTITUDE_LEVELS = [
  { elevation: 12000, label: 'Peak Silence' },
  { elevation: 11000, label: 'Morning Light' },
  { elevation: 10000, label: 'Monastery Bells' },
  { elevation: 8000, label: 'Base Camp' },
] as const;

export const SCROLL_SECTIONS = {
  HERO: { id: 'hero', order: 0 },
  ATMOSPHERE: { id: 'atmosphere', order: 1 },
  ORIGIN: { id: 'origin', order: 2 },
  EXPERIENCE: { id: 'experience', order: 3 },
  SPACES: { id: 'spaces', order: 4 },
  WARMTH: { id: 'warmth', order: 5 },
  PROOF: { id: 'proof', order: 6 },
  RITUALS: { id: 'rituals', order: 7 },
  CLARITY: { id: 'clarity', order: 8 },
  BOOKING: { id: 'booking', order: 9 },
} as const;
