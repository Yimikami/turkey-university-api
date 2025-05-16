import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchFaculties, searchPrograms } from "../services/api";
import { SearchFacultyResult, SearchProgramResult } from "../types";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const SearchResultsPage = () => {
  const location = useLocation();
  const initialSearchType = location.state?.type || "faculty";
  const initialSearchQuery = location.state?.searchQuery || "";

  const [searchType, setSearchType] = useState<"faculty" | "program">(
    initialSearchType
  );
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [facultyResults, setFacultyResults] = useState<SearchFacultyResult[]>(
    []
  );
  const [programResults, setProgramResults] = useState<SearchProgramResult[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use pagination for faculty results
  const {
    currentPage: facultyPage,
    setCurrentPage: setFacultyPage,
    totalPages: facultyTotalPages,
    paginatedData: paginatedFacultyResults,
  } = usePagination(facultyResults, {
    initialPage: 1,
    itemsPerPage: 5,
    totalItems: facultyResults.length,
  });

  // Use pagination for program results
  const {
    currentPage: programPage,
    setCurrentPage: setProgramPage,
    totalPages: programTotalPages,
    paginatedData: paginatedProgramResults,
  } = usePagination(programResults, {
    initialPage: 1,
    itemsPerPage: 5,
    totalItems: programResults.length,
  });

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchType]);

  // Generate search suggestions based on current results
  const searchSuggestions = useMemo(() => {
    if (searchType === "faculty") {
      // Extract faculty names from results
      const suggestions = facultyResults.flatMap((result) =>
        result.faculties.map((faculty) => faculty.name)
      );
      return Array.from(new Set(suggestions)).sort();
    } else {
      // Extract program names from results
      const suggestions = programResults.flatMap((result) =>
        result.faculties.flatMap((faculty) =>
          faculty.programs.map((program) => program.name)
        )
      );
      return Array.from(new Set(suggestions)).sort();
    }
  }, [facultyResults, programResults, searchType]);

  const performSearch = async (query: string) => {
    setLoading(true);
    setError("");

    try {
      if (searchType === "faculty") {
        const results = await searchFaculties(query);
        setFacultyResults(results);
        setProgramResults([]);
      } else {
        const results = await searchPrograms(query);
        setProgramResults(results);
        setFacultyResults([]);
      }
    } catch (err) {
      setError("Arama sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // Reset to first page when search changes
      if (searchType === "faculty") {
        setFacultyPage(1);
      } else {
        setProgramPage(1);
      }

      // If query is empty, don't perform search
      if (!query.trim()) {
        setFacultyResults([]);
        setProgramResults([]);
        return;
      }

      performSearch(query);
    },
    [searchType]
  );

  const renderFacultyResults = () => {
    if (facultyResults.length === 0 && !loading && searchQuery) {
      return (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Arama kriterlerinize uygun fakülte bulunamadı.
          </span>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {paginatedFacultyResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{result.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.type.toLowerCase().includes("devlet")
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {result.type}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              <span className="font-medium">Şehir:</span> {result.city}
            </p>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">Eşleşen Fakülteler</h4>
              <ul className="space-y-2">
                {result.faculties.map((faculty) => (
                  <li key={faculty.id} className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center">
                      <AcademicCapIcon className="w-5 h-5 text-blue-600 mr-2" />
                      <span>{faculty.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to={`/universities/${result.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Üniversite Detaylarını Gör
              </Link>
            </div>
          </div>
        ))}

        {facultyResults.length > 0 && facultyTotalPages > 1 && (
          <Pagination
            currentPage={facultyPage}
            totalPages={facultyTotalPages}
            onPageChange={setFacultyPage}
          />
        )}
      </div>
    );
  };

  const renderProgramResults = () => {
    if (programResults.length === 0 && !loading && searchQuery) {
      return (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Arama kriterlerinize uygun program bulunamadı.
          </span>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {paginatedProgramResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{result.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.type.toLowerCase().includes("devlet")
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {result.type}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              <span className="font-medium">Şehir:</span> {result.city}
            </p>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">Eşleşen Programlar</h4>
              {result.faculties.map((faculty) => (
                <div key={faculty.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <BuildingLibraryIcon className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium">{faculty.name}</span>
                  </div>
                  <ul className="space-y-1 pl-7">
                    {faculty.programs.map((program, index) => (
                      <li key={index} className="text-gray-700">
                        • {program.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to={`/universities/${result.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Üniversite Detaylarını Gör
              </Link>
            </div>
          </div>
        ))}

        {programResults.length > 0 && programTotalPages > 1 && (
          <Pagination
            currentPage={programPage}
            totalPages={programTotalPages}
            onPageChange={setProgramPage}
          />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Ana Sayfaya Dön
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {searchType === "faculty" ? "Fakülte Arama" : "Program Arama"}
        </h1>

        <div className="flex justify-start mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setSearchType("faculty")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                searchType === "faculty"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } border border-gray-200`}
            >
              <AcademicCapIcon className="w-5 h-5 inline mr-1" />
              Fakülte
            </button>
            <button
              type="button"
              onClick={() => setSearchType("program")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                searchType === "program"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } border border-gray-200`}
            >
              <BuildingLibraryIcon className="w-5 h-5 inline mr-1" />
              Program
            </button>
          </div>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder={
            searchType === "faculty" ? "Fakülte ara..." : "Program ara..."
          }
          className="max-w-3xl"
          suggestions={searchSuggestions}
          initialValue={searchQuery}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <div>
          {searchType === "faculty"
            ? renderFacultyResults()
            : renderProgramResults()}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
