
import { AppEntry } from './types';

export const INITIAL_APPS: AppEntry[] = [
  {
    id: '1',
    name: 'Restaurant POS',
    description: 'Streamline restaurant operations with ease. Manage orders, payments, and inventory all in one place.',
    category: 'POS',
    icon: 'Calculator',
    status: 'Popular',
    demoUrl: 'https://example.com/demo/restaurant',
    features: [
      { id: 'f1', title: 'Table Management', description: 'Easily manage table assignments and status' },
      { id: 'f2', title: 'Order Tracking', description: 'Track orders from kitchen to table in real-time' }
    ]
  },
  {
    id: '2',
    name: 'Hotel Booking',
    description: 'Manage hotel reservations and guest services. Optimized for high-volume booking environments.',
    category: 'Booking',
    icon: 'Calendar',
    status: 'New',
    demoUrl: 'https://example.com/demo/hotel',
    features: [
      { id: 'f3', title: 'Real-time Booking', description: 'Instant confirmation for guests' }
    ]
  },
  {
    id: '3',
    name: 'Retail POS',
    description: 'Complete point of sale for retail stores with deep analytics.',
    category: 'Retail',
    icon: 'Store',
    status: 'Published',
    demoUrl: 'https://example.com/demo/retail',
    features: []
  },
  {
    id: '4',
    name: 'Channel Manager',
    description: 'Sync availability across multiple booking platforms automatically.',
    category: 'Hospitality',
    icon: 'Layers',
    status: 'Published',
    demoUrl: 'https://example.com/demo/channel',
    features: []
  }
];

export const CATEGORIES: string[] = ['All', 'POS', 'Booking', 'Hospitality', 'Retail', 'Tools'];
