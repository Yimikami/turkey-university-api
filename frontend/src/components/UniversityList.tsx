import { University } from "../types";
import UniversityCard from "./UniversityCard";

interface UniversityListProps {
  universities: University[];
  loading?: boolean;
  error?: string;
  // Pagination props are optional to maintain backward compatibility
  paginationControls?: React.ReactNode;
}

const UniversityList = ({
  universities,
  loading,
  error,
  paginationControls,
}: UniversityListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Hata!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div
        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">Sonuç bulunamadı.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {universities.map((university) => (
          <div key={university.id} className="h-full">
            <UniversityCard university={university} />
          </div>
        ))}
      </div>

      {paginationControls && <div className="mt-8">{paginationControls}</div>}
    </div>
  );
};

export default UniversityList;
