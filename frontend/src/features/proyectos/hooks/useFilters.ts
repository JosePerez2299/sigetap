import React from "react";
import { type FiltersState } from "../types/Projects";

export const useFilters = (initialFilters: FiltersState) => {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters);

  const handleFilterChange = (updates: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    showFilters,
    setShowFilters,
    filters,
    handleFilterChange,
    resetFilters,
  };
};
