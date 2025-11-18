export interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  featured?: boolean;
  badge?: string;
  features?: string[];
  overview?: string;
}
