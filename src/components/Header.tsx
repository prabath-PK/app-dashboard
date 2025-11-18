import { Search, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showDashboardLink?: boolean;
  onDashboardClick?: () => void;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  showDashboardLink = false,
  onDashboardClick
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
              <Button 
                onClick={onDashboardClick}
                className="lg:hidden bg-primary hover:bg-teal-hover text-primary-foreground font-semibold px-6"
                size="sm"
              >
                <Lock className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground hidden lg:block">
            Smart Web Apps for Modern Businesses
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 w-full bg-muted/50 border-border rounded-full"
              />
            </div>

            {showDashboardLink && (
              <Button 
                onClick={onDashboardClick}
                className="hidden lg:flex bg-primary hover:bg-teal-hover text-primary-foreground font-semibold px-8 h-11 text-base"
                size="lg"
              >
                <Lock className="w-5 h-5 mr-2" />
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
