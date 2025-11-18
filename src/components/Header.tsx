import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showDashboardLink?: boolean;
}

const categories = ["All", "POS", "Booking", "Hospitality", "Retail", "Tools"];

export const Header = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  showDashboardLink = false
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GROBERN
              </div>
            </Link>
            {showDashboardLink && (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="lg:hidden">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground hidden lg:block">
            Smart Web Apps for Modern Businesses
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 w-full sm:w-[300px] bg-muted/50 border-border rounded-full"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFilterChange(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {showDashboardLink && (
              <Link to="/dashboard" className="hidden lg:block">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
