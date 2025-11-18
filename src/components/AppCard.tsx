import { App } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Info } from "lucide-react";

interface AppCardProps {
  app: App;
  onViewDetails: (app: App) => void;
}

export const AppCard = ({ app, onViewDetails }: AppCardProps) => {
  return (
    <div className="group relative bg-card border border-border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
      
      {/* Badge */}
      {app.badge && (
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {app.badge}
        </Badge>
      )}

      {/* Icon */}
      <div className="w-[70px] h-[70px] rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 text-white text-3xl">
        <i className={`fas ${app.icon}`}></i>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 text-foreground">{app.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{app.description}</p>
      
      {/* Category */}
      <Badge variant="secondary" className="mb-6 bg-secondary/20 text-secondary">
        {app.category}
      </Badge>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          className="flex-1 rounded-full bg-primary hover:bg-teal-hover text-primary-foreground"
          onClick={() => app.demoLink && window.open(app.demoLink, '_blank')}
          disabled={!app.demoLink}
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          Demo
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={() => onViewDetails(app)}
        >
          <Info className="w-4 h-4 mr-2" />
          Details
        </Button>
      </div>
    </div>
  );
};
