import { useState } from "react";
import { App } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";

interface AppFormProps {
  app?: App | null;
  onSave: (app: Omit<App, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

const suggestedCategories = ["POS", "Booking", "Hospitality", "Retail", "Tools"];
const icons = [
  "fa-cash-register",
  "fa-calendar-check",
  "fa-chart-line",
  "fa-store",
  "fa-concierge-bell",
  "fa-tasks",
  "fa-tablet-alt",
  "fa-users",
  "fa-utensils",
  "fa-hotel",
  "fa-shopping-cart",
  "fa-clipboard-list"
];

export const AppForm = ({ app, onSave, onCancel }: AppFormProps) => {
  const [formData, setFormData] = useState({
    name: app?.name || "",
    description: app?.description || "",
    category: app?.category || "",
    icon: app?.icon || "fa-cash-register",
    demoLink: app?.demoLink || "",
    badge: app?.badge || "",
    overview: app?.overview || "",
    features: app?.features || [""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFeatures = formData.features.filter(f => f.trim() !== "");
    onSave({
      ...formData,
      features: filteredFeatures.length > 0 ? filteredFeatures : undefined,
      badge: formData.badge || undefined,
      demoLink: formData.demoLink || undefined,
      overview: formData.overview || undefined,
      id: app?.id,
    });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">App Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Enter category (e.g., POS, Booking, Retail)"
            list="category-suggestions"
            required
          />
          <datalist id="category-suggestions">
            {suggestedCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="demoLink">Demo Link</Label>
        <Input
          id="demoLink"
          type="url"
          value={formData.demoLink}
          onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
          placeholder="https://example.com/demo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          value={formData.overview}
          onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon *</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => setFormData({ ...formData, icon: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {icons.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  <div className="flex items-center gap-2">
                    <i className={`fas ${icon}`}></i>
                    <span>{icon}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge">Badge (optional)</Label>
          <Input
            id="badge"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            placeholder="e.g., Popular, New"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Features</Label>
          <Button type="button" size="sm" variant="outline" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-1" />
            Add Feature
          </Button>
        </div>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="Feature name - Description"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFeature(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {app ? "Update App" : "Create App"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
