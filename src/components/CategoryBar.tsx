import { Button } from "@/components/ui/button";

interface CategoryBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryBar = ({ categories, activeCategory, onCategoryChange }: CategoryBarProps) => {
  return (
    <div className="border-b border-border bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className="rounded-full whitespace-nowrap flex-shrink-0 min-w-[120px] h-12 text-base font-medium"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
