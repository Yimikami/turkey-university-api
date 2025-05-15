import { useState, useEffect } from "react";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface FilterSectionProps {
  cities: string[];
  types: string[];
  onFilterChange: (filters: { city?: string; type?: string }) => void;
}

const FilterSection = ({
  cities,
  types,
  onFilterChange,
}: FilterSectionProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    onFilterChange({
      city: selectedCity || undefined,
      type: selectedType || undefined,
    });
  }, [selectedCity, selectedType, onFilterChange]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city === selectedCity ? "" : city);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  const handleReset = () => {
    setSelectedCity("");
    setSelectedType("");
  };

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
    // Prevent body scrolling when filter is open
    document.body.style.overflow = !mobileFilterOpen ? "hidden" : "";
  };

  const closeMobileFilter = () => {
    setMobileFilterOpen(false);
    document.body.style.overflow = "";
  };

  // Count active filters
  const activeFilterCount = [selectedCity, selectedType].filter(Boolean).length;

  return (
    <>
      {/* Desktop Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 hidden md:block">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filtreler
          </h3>
        </div>

        <div>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Şehir</h4>
            <div className="max-h-40 overflow-y-auto">
              {cities.map((city) => (
                <div key={city} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`city-${city}`}
                    checked={selectedCity === city}
                    onChange={() => handleCityChange(city)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`city-${city}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {city}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Tür</h4>
            {types.map((type) => (
              <div key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={selectedType === type}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`type-${type}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleMobileFilter}
          className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
          Filtreler
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-10 z-50 md:hidden flex items-end">
          <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Filtreler</h3>
              <button onClick={closeMobileFilter} className="text-gray-500">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-6">
                <h4 className="font-medium mb-3">Şehir</h4>
                <div className="max-h-60 overflow-y-auto">
                  {cities.map((city) => (
                    <div key={city} className="flex items-center mb-3 py-1">
                      <input
                        type="checkbox"
                        id={`mobile-city-${city}`}
                        checked={selectedCity === city}
                        onChange={() => handleCityChange(city)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`mobile-city-${city}`}
                        className="ml-3 text-sm text-gray-700"
                      >
                        {city}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Tür</h4>
                {types.map((type) => (
                  <div key={type} className="flex items-center mb-3 py-1">
                    <input
                      type="checkbox"
                      id={`mobile-type-${type}`}
                      checked={selectedType === type}
                      onChange={() => handleTypeChange(type)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`mobile-type-${type}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md transition-colors"
                >
                  Filtreleri Temizle
                </button>
                <button
                  onClick={closeMobileFilter}
                  className="flex-1 py-3 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Sonuçları Göster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSection;
