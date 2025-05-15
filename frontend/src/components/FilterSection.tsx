import { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterSectionProps {
  cities: string[];
  types: string[];
  onFilterChange: (filters: { city?: string; type?: string }) => void;
}

const FilterSection = ({ cities, types, onFilterChange }: FilterSectionProps) => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilterChange({
      city: selectedCity || undefined,
      type: selectedType || undefined,
    });
  }, [selectedCity, selectedType, onFilterChange]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city === selectedCity ? '' : city);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type === selectedType ? '' : type);
  };

  const handleReset = () => {
    setSelectedCity('');
    setSelectedType('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <FunnelIcon className="w-5 h-5 mr-2" />
          Filtreler
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-blue-600 md:hidden"
        >
          {isOpen ? 'Gizle' : 'Göster'}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden md:block'}`}>
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
                <label htmlFor={`city-${city}`} className="ml-2 text-sm text-gray-700">
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
              <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
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
  );
};

export default FilterSection;
