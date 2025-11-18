import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "@/types/app";
import { Header } from "@/components/Header";
import { CategoryBar } from "@/components/CategoryBar";
import { AppCard } from "@/components/AppCard";
import { AppDetailsModal } from "@/components/AppDetailsModal";
import { PasswordDialog } from "@/components/PasswordDialog";
import { Flame, Grid3x3 } from "lucide-react";

interface StorefrontProps {
  apps: App[];
}

const categories = ["All", "POS", "Booking", "Hospitality", "Retail", "Tools"];

export const Storefront = ({ apps }: StorefrontProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleDashboardClick = () => {
    setShowPasswordDialog(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordDialog(false);
    navigate("/dashboard");
  };

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || app.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const featuredApps = filteredApps.filter((app) => app.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        showDashboardLink={true}
        onDashboardClick={handleDashboardClick}
      />

      <CategoryBar
        categories={categories}
        activeCategory={activeFilter}
        onCategoryChange={setActiveFilter}
      />

      <main className="container mx-auto px-4 py-10">
        {/* Featured Apps */}
        {featuredApps.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Flame className="w-6 h-6 text-primary" />
              Top Used Apps
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
              {featuredApps.map((app) => (
                <div key={app.id} className="min-w-[300px]">
                  <AppCard app={app} onViewDetails={setSelectedApp} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Apps */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Grid3x3 className="w-6 h-6 text-primary" />
            All Applications
          </h2>
          {filteredApps.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No apps found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} onViewDetails={setSelectedApp} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              GROBERN © 2025
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AppDetailsModal
        app={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
      />

      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
};
