
export interface AppFeature {
  id: string;
  title: string;
  description: string;
}

export interface AppEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // Icon name from lucide or FontAwesome string
  features: AppFeature[];
  demoUrl: string;
  status: 'Published' | 'Draft' | 'Popular' | 'New';
}

export type Category = 'All' | 'POS' | 'Booking' | 'Hospitality' | 'Retail' | 'Tools';

export interface AppState {
  apps: AppEntry[];
  view: 'Store' | 'Dashboard';
}
