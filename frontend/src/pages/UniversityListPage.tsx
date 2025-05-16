import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUniversities } from "../services/api";
import { University } from "../types";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import UniversityList from "../components/UniversityList";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";

const UniversityListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialSearchQuery = location.state?.searchQuery || "";

  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [cities, setCities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ city?: string; type?: string }>({});

  // Generate search suggestions from university names
  const searchSuggestions = useMemo(() => {
    const uniNames = universities.map((uni) => uni.name);
    // Add city names that aren't already in the list
    const allSuggestions = [...uniNames];

    // Remove duplicates and sort
    return Array.from(new Set(allSuggestions)).sort();
  }, [universities]);

  // Create a mapping of university names to their IDs for direct navigation
  const universityData = useMemo(() => {
    return universities.map((uni) => ({
      name: uni.name,
      id: uni.id,
    }));
  }, [universities]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await getUniversities();
        setUniversities(data);

        // Extract unique cities and types
        const uniqueCities = Array.from(
          new Set(data.map((uni) => uni.city))
        ).sort();
        const uniqueTypes = Array.from(
          new Set(data.map((uni) => uni.type))
        ).sort();

        setCities(uniqueCities);
        setTypes(uniqueTypes);

        setLoading(false);
      } catch (err) {
        setError("Üniversiteler yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    let result = [...universities];

    // Apply search filter
    if (searchQuery) {
      // Normalize the query for case-insensitive search
      // This handles Turkish characters like İ/i properly
      const query = searchQuery.toLocaleLowerCase("tr-TR");
      result = result.filter(
        (uni) =>
          uni.name.toLocaleLowerCase("tr-TR").includes(query) ||
          uni.city.toLocaleLowerCase("tr-TR").includes(query)
      );
    }

    // Apply city filter
    if (filters.city) {
      result = result.filter((uni) => uni.city === filters.city);
    }

    // Apply type filter
    if (filters.type) {
      result = result.filter((uni) => uni.type === filters.type);
    }

    setFilteredUniversities(result);
  }, [universities, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset to first page when search changes
    setCurrentPage(1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Find the university that matches the suggestion
    const university = universities.find((uni) => uni.name === suggestion);
    if (university) {
      // Navigate to the university detail page
      navigate(`/universities/${university.id}`);
    } else {
      // If no match, just perform a search
      setSearchQuery(suggestion);
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: { city?: string; type?: string }) => {
      setFilters(newFilters);
      // Reset to first page when filters change
      setCurrentPage(1);
    },
    []
  );

  // Use the pagination hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedUniversities,
  } = usePagination(filteredUniversities, {
    initialPage: 1,
    itemsPerPage: 9,
    totalItems: filteredUniversities.length, // Use filtered count instead of total
  });

  // Create pagination controls component
  const paginationControls = (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Üniversiteler</h1>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Üniversite adı veya şehir ara..."
          className="max-w-3xl"
          suggestions={searchSuggestions}
          initialValue={searchQuery}
          onSuggestionClick={handleSuggestionClick}
          suggestionData={universityData}
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
                ? "Yükleniyor..."
                : `${filteredUniversities.length} üniversite bulundu`}
            </p>
          </div>

          <UniversityList
            universities={paginatedUniversities}
            loading={loading}
            error={error}
            paginationControls={paginationControls}
          />
        </div>
      </div>
    </div>
  );
};

export default UniversityListPage;
