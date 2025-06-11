import React from 'react';
import { Tag, X } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearCategories: () => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onCategoryToggle, 
  onClearCategories 
}: CategoryFilterProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Personnel': 'bg-blue-100 text-blue-700 border-blue-200',
      'Travail': 'bg-purple-100 text-purple-700 border-purple-200',
      'Santé': 'bg-green-100 text-green-700 border-green-200',
      'Éducation': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Loisirs': 'bg-pink-100 text-pink-700 border-pink-200',
      'Finances': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Famille': 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (categories.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filtrer par catégorie</h3>
        </div>
        {selectedCategories.length > 0 && (
          <button
            onClick={onClearCategories}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Effacer</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? `${getCategoryColor(category)} ring-2 ring-offset-1 ring-current`
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Filtres actifs: {selectedCategories.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}