import { useState, useEffect } from "react";
import { Faculty } from "../types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";

interface FacultyListProps {
  faculties: Faculty[];
  itemsPerPage?: number;
}

const FacultyList = ({ faculties, itemsPerPage = 5 }: FacultyListProps) => {
  const [expandedFaculties, setExpandedFaculties] = useState<number[]>([]);

  // Use pagination hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedFaculties,
  } = usePagination(faculties, {
    initialPage: 1,
    itemsPerPage: itemsPerPage,
    totalItems: faculties.length,
  });

  // Reset expanded faculties when page changes
  useEffect(() => {
    setExpandedFaculties([]);
  }, [currentPage]);

  const toggleFaculty = (facultyId: number) => {
    setExpandedFaculties((prev) =>
      prev.includes(facultyId)
        ? prev.filter((id) => id !== facultyId)
        : [...prev, facultyId]
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        Fakülteler ({faculties.length})
      </h2>

      {faculties.length === 0 ? (
        <p className="text-gray-500">Fakülte bilgisi bulunamadı.</p>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div
                  className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaculty(faculty.id)}
                >
                  <h3 className="font-medium">{faculty.name}</h3>
                  <button className="text-gray-500">
                    {expandedFaculties.includes(faculty.id) ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedFaculties.includes(faculty.id) && (
                  <div className="p-4 bg-white">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Programlar ({faculty.programs.length})
                    </h4>

                    {faculty.programs.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        Program bilgisi bulunamadı.
                      </p>
                    ) : (
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {faculty.programs.map((program, index) => (
                          <li key={index}>{program.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-6"
            />
          )}
        </>
      )}
    </div>
  );
};

export default FacultyList;
