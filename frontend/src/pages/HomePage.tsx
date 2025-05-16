import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {
  getUniversities,
  searchFaculties,
  searchPrograms,
} from "../services/api";
import { SearchFacultyResult, SearchProgramResult } from "../types";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<
    "university" | "faculty" | "program"
  >("university");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // State to store university data for direct navigation
  const [universityData, setUniversityData] = useState<
    Array<{ name: string; id: number }>
  >([]);

  // Load suggestions based on search type
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        if (searchType === "university") {
          // Load university suggestions
          const universities = await getUniversities();
          setSuggestions(universities.map((uni) => uni.name));

          // Store university data for direct navigation
          setUniversityData(
            universities.map((uni) => ({
              name: uni.name,
              id: uni.id,
            }))
          );
        } else if (searchType === "faculty") {
          // For faculties, we'll make a search with a common term to get some initial suggestions
          try {
            // Use a common search term that will likely match many faculties
            const results = await searchFaculties("fakülte");
            // Extract faculty names from results
            const facultyNames = results.flatMap((uni: SearchFacultyResult) =>
              uni.faculties.map((faculty) => faculty.name)
            );

            // Remove duplicates and sort
            setSuggestions(
              Array.from(new Set(facultyNames)).sort() as string[]
            );

            // Create mapping for direct navigation
            const data: Array<{ name: string; id: number }> = [];
            results.forEach((uni: SearchFacultyResult) => {
              uni.faculties.forEach((faculty) => {
                data.push({
                  name: faculty.name,
                  id: uni.id,
                });
              });
            });

            setUniversityData(data);
          } catch (err) {
            console.error("Failed to load faculty suggestions:", err);
            setSuggestions([]);
            setUniversityData([]);
          }
        } else if (searchType === "program") {
          // For programs, we'll make a search with a common term to get some initial suggestions
          try {
            // Use a common search term that will likely match many programs
            const results = await searchPrograms("program");
            // Extract program names from results
            const programNames = results.flatMap((uni: SearchProgramResult) =>
              uni.faculties.flatMap((faculty) =>
                faculty.programs.map((program) => program.name)
              )
            );

            // Remove duplicates and sort
            setSuggestions(
              Array.from(new Set(programNames)).sort() as string[]
            );

            // Create mapping for direct navigation
            const data: Array<{ name: string; id: number }> = [];
            results.forEach((uni: SearchProgramResult) => {
              uni.faculties.forEach((faculty) => {
                faculty.programs.forEach((program) => {
                  data.push({
                    name: program.name,
                    id: uni.id,
                  });
                });
              });
            });

            setUniversityData(data);
          } catch (err) {
            console.error("Failed to load program suggestions:", err);
            setSuggestions([]);
            setUniversityData([]);
          }
        }
      } catch (error) {
        console.error("Failed to load suggestions:", error);
        setSuggestions([]);
        setUniversityData([]);
      }
    };

    loadSuggestions();
  }, [searchType]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    if (searchType === "university") {
      navigate("/universities", { state: { searchQuery: query } });
    } else if (searchType === "faculty") {
      navigate("/search", { state: { type: "faculty", searchQuery: query } });
    } else if (searchType === "program") {
      navigate("/search", { state: { type: "program", searchQuery: query } });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (searchType === "university") {
      // For university suggestions, find the matching university and navigate directly to its detail page
      const university = universityData.find(
        (item) => item.name === suggestion
      );
      if (university) {
        navigate(`/universities/${university.id}`);
        return;
      }
      // If no match found, fall back to search page
      navigate("/universities", { state: { searchQuery: suggestion } });
    } else if (searchType === "faculty") {
      // For faculty suggestions, navigate to the faculty search page
      navigate("/search", {
        state: { type: "faculty", searchQuery: suggestion },
      });
    } else if (searchType === "program") {
      // For program suggestions, navigate to the program search page
      navigate("/search", {
        state: { type: "program", searchQuery: suggestion },
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Türkiye Üniversiteleri
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Türkiye'deki tüm üniversiteler, fakülteler ve programlar hakkında
          bilgi edinin
        </p>

        <div className="mb-8">
          <div className="flex justify-center mb-4 px-2">
            <div
              className="inline-flex rounded-md shadow-sm w-full max-w-md"
              role="group"
            >
              <button
                type="button"
                onClick={() => setSearchType("university")}
                className={`flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-l-lg ${
                  searchType === "university"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border border-gray-200`}
              >
                <BuildingLibraryIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-0 sm:mr-1" />
                <span className="hidden xs:inline">Üniversite</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchType("faculty")}
                className={`flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium ${
                  searchType === "faculty"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border-t border-b border-gray-200`}
              >
                <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-0 sm:mr-1" />
                <span className="hidden xs:inline">Fakülte</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchType("program")}
                className={`flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-r-lg ${
                  searchType === "program"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border border-gray-200`}
              >
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-0 sm:mr-1" />
                <span className="hidden xs:inline">Program</span>
              </button>
            </div>
          </div>

          <SearchBar
            onSearch={handleSearch}
            placeholder={
              searchType === "university"
                ? "Üniversite ara..."
                : searchType === "faculty"
                ? "Fakülte ara..."
                : "Program ara..."
            }
            className="max-w-2xl mx-auto px-2 sm:px-0"
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            suggestionData={universityData}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <BuildingLibraryIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Üniversiteler
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Türkiye'deki tüm devlet ve vakıf üniversitelerini keşfedin
            </p>
            <button
              onClick={() => navigate("/universities")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Tümünü Gör
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <AcademicCapIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Fakülteler
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Üniversitelerin fakülteleri hakkında detaylı bilgi alın
            </p>
            <button
              onClick={() =>
                navigate("/search", { state: { type: "faculty" } })
              }
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Fakülteleri Ara
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none">
            <MapPinIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Programlar
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Fakültelerin sunduğu eğitim programlarını inceleyin
            </p>
            <button
              onClick={() =>
                navigate("/search", { state: { type: "program" } })
              }
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Programları Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
