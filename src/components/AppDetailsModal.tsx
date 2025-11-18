import { App } from "@/types/app";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Mail, CheckCircle, List, Star } from "lucide-react";

interface AppDetailsModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AppDetailsModal = ({ app, isOpen, onClose }: AppDetailsModalProps) => {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">App Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* App Info */}
          <div className="flex gap-6 flex-col sm:flex-row">
            <div className="w-[100px] h-[100px] rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl flex-shrink-0">
              <i className={`fas ${app.icon}`}></i>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">{app.name}</h3>
              <p className="text-muted-foreground mb-4">{app.description}</p>
              <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                {app.category}
              </Badge>
            </div>
          </div>

          {/* Overview */}
          {app.overview && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <List className="w-5 h-5 text-primary" />
                Overview
              </h4>
              <p className="text-muted-foreground">{app.overview}</p>
            </div>
          )}

          {/* Features */}
          {app.features && app.features.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Key Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {app.features.map((feature, index) => {
                  const [title, description] = feature.split(" - ");
                  return (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium">{title}</h5>
                        {description && (
                          <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button className="flex-1 bg-primary hover:bg-teal-hover text-primary-foreground">
              <PlayCircle className="w-4 h-4 mr-2" />
              Try Demo
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
