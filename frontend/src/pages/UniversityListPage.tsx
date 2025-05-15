import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUniversities } from '../services/api';
import { University } from '../types';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import UniversityList from '../components/UniversityList';

const UniversityListPage = () => {
  const location = useLocation();
  const initialSearchQuery = location.state?.searchQuery || '';

  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [cities, setCities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ city?: string; type?: string }>({});

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await getUniversities();
        setUniversities(data);
        
        // Extract unique cities and types
        const uniqueCities = Array.from(new Set(data.map(uni => uni.city))).sort();
        const uniqueTypes = Array.from(new Set(data.map(uni => uni.type))).sort();
        
        setCities(uniqueCities);
        setTypes(uniqueTypes);
        
        setLoading(false);
      } catch (err) {
        setError('Üniversiteler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    let result = [...universities];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(uni => 
        uni.name.toLowerCase().includes(query) || 
        uni.city.toLowerCase().includes(query)
      );
    }
    
    // Apply city filter
    if (filters.city) {
      result = result.filter(uni => uni.city === filters.city);
    }
    
    // Apply type filter
    if (filters.type) {
      result = result.filter(uni => uni.type === filters.type);
    }
    
    setFilteredUniversities(result);
  }, [universities, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: { city?: string; type?: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Üniversiteler</h1>
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Üniversite adı veya şehir ara..."
          className="max-w-3xl"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <FilterSection 
            cities={cities} 
            types={types} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <div className="md:w-3/4">
          <div className="mb-4">
            <p className="text-gray-600">
              {loading 
                ? 'Yükleniyor...' 
                : `${filteredUniversities.length} üniversite bulundu`}
            </p>
          </div>
          
          <UniversityList 
            universities={filteredUniversities} 
            loading={loading} 
            error={error} 
          />
        </div>
      </div>
    </div>
  );
};

export default UniversityListPage;
