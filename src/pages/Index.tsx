import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "@/types/app";
import { initialApps } from "@/data/initialApps";
import { Storefront } from "./Storefront";
import { Dashboard } from "./Dashboard";

const Index = () => {
  const [apps, setApps] = useState<App[]>(initialApps);

  const handleAddApp = (appData: Omit<App, "id">) => {
    const newApp: App = {
      ...appData,
      id: Date.now().toString(),
    };
    setApps([...apps, newApp]);
  };

  const handleUpdateApp = (updatedApp: App) => {
    setApps(apps.map((app) => (app.id === updatedApp.id ? updatedApp : app)));
  };

  const handleDeleteApp = (id: string) => {
    setApps(apps.filter((app) => app.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Storefront apps={apps} />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            apps={apps}
            onAddApp={handleAddApp}
            onUpdateApp={handleUpdateApp}
            onDeleteApp={handleDeleteApp}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Index;
