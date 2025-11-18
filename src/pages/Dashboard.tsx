import { useState } from "react";
import { App } from "@/types/app";
import { Button } from "@/components/ui/button";
import { AppForm } from "@/components/AppForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ArrowLeft, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  apps: App[];
  onAddApp: (app: Omit<App, "id">) => void;
  onUpdateApp: (app: App) => void;
  onDeleteApp: (id: string) => void;
}

export const Dashboard = ({ apps, onAddApp, onUpdateApp, onDeleteApp }: DashboardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  const handleSave = (appData: Omit<App, "id"> & { id?: string }) => {
    if (appData.id) {
      onUpdateApp(appData as App);
      toast.success("App updated successfully!");
    } else {
      onAddApp(appData);
      toast.success("App created successfully!");
    }
    setIsFormOpen(false);
    setEditingApp(null);
  };

  const handleEdit = (app: App) => {
    setEditingApp(app);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this app?")) {
      onDeleteApp(id);
      toast.success("App deleted successfully!");
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingApp(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your app store applications
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </Link>
              <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-teal-hover">
                <Plus className="w-4 h-4 mr-2" />
                Add New App
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{apps.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Featured Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {apps.filter((app) => app.featured).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(apps.map((app) => app.category)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apps List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5" />
              All Applications
            </CardTitle>
            <CardDescription>
              Manage and edit your app store applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {apps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No apps yet. Create your first app!</p>
                <Button onClick={() => setIsFormOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New App
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl flex-shrink-0">
                      <i className={`fas ${app.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{app.name}</h3>
                        {app.badge && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            {app.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {app.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{app.category}</Badge>
                        {app.featured && (
                          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(app)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(app.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={handleCancel}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingApp ? "Edit App" : "Add New App"}</DialogTitle>
            <DialogDescription>
              {editingApp
                ? "Update the app information below."
                : "Fill in the details to create a new app."}
            </DialogDescription>
          </DialogHeader>
          <AppForm app={editingApp} onSave={handleSave} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
